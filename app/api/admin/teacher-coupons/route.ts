import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

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
    .select('teacher_coupon_id, amount_paid_cents, teacher_commission_cents, status')
    .not('teacher_coupon_id', 'is', null);

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

  const enriched = (coupons ?? []).map((c) => ({
    ...c,
    stats: stats.get(c.id) ?? { count: 0, revenueCents: 0, commissionCents: 0 },
  }));

  return NextResponse.json({ coupons: enriched });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  const teacherName = String(body?.teacherName ?? '').trim();
  const teacherEmail = body?.teacherEmail ? String(body.teacherEmail).trim() : null;
  const code = String(body?.code ?? '').trim().toUpperCase();
  const extraDays = Number.isFinite(Number(body?.extraDays)) ? Number(body.extraDays) : 10;
  const commissionRate = Number.isFinite(Number(body?.commissionRate)) ? Number(body.commissionRate) : 0.5;

  if (!teacherName || !code) {
    return NextResponse.json({ error: 'teacherName and code are required' }, { status: 400 });
  }
  if (commissionRate < 0 || commissionRate > 1) {
    return NextResponse.json({ error: 'commissionRate must be between 0 and 1' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('teacher_coupons')
    .insert({
      teacher_name: teacherName,
      teacher_email: teacherEmail,
      code,
      extra_days: extraDays,
      commission_rate: commissionRate,
    })
    .select()
    .single();

  if (error) {
    const status = error.code === '23505' ? 409 : 500; // unique violation -> code already exists
    return NextResponse.json({ error: error.message }, { status });
  }

  return NextResponse.json({ coupon: data }, { status: 201 });
}
