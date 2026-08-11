import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: coupons, error: couponsError } = await supabase
    .from('teacher_coupons')
    .select('*')
    .order('created_at', { ascending: false });

  if (couponsError) {
    return NextResponse.json({ error: couponsError.message }, { status: 500 });
  }

  // Aggregate real revenue/commission per coupon from actual subscriptions.
  const { data: subs, error: subsError } = await supabase
    .from('subscriptions')
    .select('teacher_coupon_id, amount_paid_cents, teacher_commission_cents, status');

  if (subsError) {
    return NextResponse.json({ error: subsError.message }, { status: 500 });
  }

  const stats = new Map<string, { count: number; revenueCents: number; commissionCents: number }>();
  for (const s of subs ?? []) {
    if (!s.teacher_coupon_id) continue;
    const entry = stats.get(s.teacher_coupon_id) ?? { count: 0, revenueCents: 0, commissionCents: 0 };
    entry.count += 1;
    entry.revenueCents += s.amount_paid_cents ?? 0;
    entry.commissionCents += s.teacher_commission_cents ?? 0;
    stats.set(s.teacher_coupon_id, entry);
  }

  // teacher_id may be null on very old rows that predate migration 030's
  // backfill (shouldn't happen after the backfill, but don't crash if it does).
  const teacherIds = [...new Set((coupons ?? []).map((c) => c.teacher_id).filter(Boolean))] as string[];
  const teacherMap = new Map<string, { id: string; name: string; user_id: string | null; access_valid_until: string | null }>();
  if (teacherIds.length > 0) {
    const { data: teachers } = await supabase
      .from('teachers')
      .select('id, name, user_id, access_valid_until')
      .in('id', teacherIds);
    for (const t of teachers ?? []) teacherMap.set(t.id, t);
  }

  const enriched = (coupons ?? []).map((c) => ({
    ...c,
    stats: stats.get(c.id) ?? { count: 0, revenueCents: 0, commissionCents: 0 },
    teacher: c.teacher_id ? (teacherMap.get(c.teacher_id) ?? null) : null,
  }));

  // KPI summary — every number computed from real rows, per the
  // approved spec's exact definitions (not code-count guesses):
  //   - "Verwendete Codes" = codes with at least one real redemption,
  //     not sum(usage_count).
  //   - "Geschenkte Tage" = actual bonus days granted via real
  //     referrals, not (code count × extra_days) — a code nobody used
  //     yet has granted 0 days, regardless of its extra_days setting.
  //   - "Provision Ausstehend" = real commission_ledger balance
  //     (EARNED, not yet PAID or REVERSED), not revenue × rate.
  const totalCodes = enriched.length;
  const activeCodes = enriched.filter((c) => c.is_active).length;
  const usedCodes = enriched.filter((c) => c.stats.count > 0).length;

  const { data: referrals } = await supabase.from('referrals').select('bonus_days_granted');
  const grantedBonusDays = (referrals ?? []).reduce((sum, r) => sum + (r.bonus_days_granted ?? 0), 0);

  const { data: ledgerRows } = await supabase
    .from('commission_ledger')
    .select('commission_amount_cents, type, status');
  const outstandingCommissionCents = (ledgerRows ?? [])
    .filter((r) => r.type === 'EARNED' && (r.status === 'PENDING' || r.status === 'APPROVED'))
    .reduce((sum, r) => sum + (r.commission_amount_cents ?? 0), 0);

  const summary = { totalCodes, activeCodes, usedCodes, grantedBonusDays, outstandingCommissionCents };

  return NextResponse.json({ coupons: enriched, summary });
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'instructor_code.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  const teacherId = body?.teacherId ? String(body.teacherId) : null;
  const teacherName = String(body?.teacherName ?? '').trim();
  const teacherEmail = body?.teacherEmail ? String(body.teacherEmail).trim() : null;
  const code = String(body?.code ?? '').trim().toUpperCase();
  const extraDays = Number.isFinite(Number(body?.extraDays)) ? Number(body.extraDays) : 10;
  const commissionRate = Number.isFinite(Number(body?.commissionRate)) ? Number(body.commissionRate) : 0.5;
  const maxUses = body?.maxUses !== undefined && body.maxUses !== null && body.maxUses !== ''
    ? Number(body.maxUses)
    : null;
  const validUntil = body?.validUntil ? String(body.validUntil) : null;

  if (!code) {
    return NextResponse.json({ error: 'code is required' }, { status: 400 });
  }
  if (!teacherId && !teacherName) {
    return NextResponse.json({ error: 'teacherId or teacherName is required' }, { status: 400 });
  }
  if (commissionRate < 0 || commissionRate > 1) {
    return NextResponse.json({ error: 'commissionRate must be between 0 and 1' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Resolve (or create) the teacher this code belongs to. Existing
  // teacher selected from the real teachers table (migration 030) is
  // always preferred over creating a new, possibly-duplicate one — a
  // second code for the same person should link to the same teacher_id,
  // per the advisor's "don't use teacher name as the unique identifier"
  // instruction.
  let resolvedTeacherId = teacherId;
  let resolvedTeacherName = teacherName;
  let resolvedTeacherEmail = teacherEmail;
  if (!resolvedTeacherId) {
    const { data: newTeacher, error: teacherError } = await supabase
      .from('teachers')
      .insert({ name: teacherName, email: teacherEmail })
      .select('id')
      .single();
    if (teacherError) return NextResponse.json({ error: teacherError.message }, { status: 500 });
    resolvedTeacherId = newTeacher.id;
  } else {
    // teacher_name/teacher_email on teacher_coupons are legacy, NOT NULL
    // columns kept for backward compatibility with older code paths —
    // populate them from the real teachers row so they never go stale
    // or empty when an existing teacher is selected.
    const { data: existing, error: existingError } = await supabase
      .from('teachers')
      .select('name, email')
      .eq('id', resolvedTeacherId)
      .maybeSingle();
    if (existingError) return NextResponse.json({ error: existingError.message }, { status: 500 });
    if (!existing) return NextResponse.json({ error: 'TEACHER_NOT_FOUND' }, { status: 404 });
    resolvedTeacherName = existing.name;
    resolvedTeacherEmail = existing.email;
  }

  const { data, error } = await supabase
    .from('teacher_coupons')
    .insert({
      teacher_id: resolvedTeacherId,
      teacher_name: resolvedTeacherName,
      teacher_email: resolvedTeacherEmail,
      code,
      extra_days: extraDays,
      commission_rate: commissionRate,
      max_uses: maxUses,
      valid_until: validUntil,
    })
    .select()
    .single();

  if (error) {
    const status = error.code === '23505' ? 409 : 500; // unique violation -> code already exists
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json({ coupon: data }, { status: 201 });
}
