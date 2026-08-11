import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Real per-teacher detail — codes, referred students, and a real
 * commission_ledger balance breakdown (Earned / Pending / Paid /
 * Outstanding), per docs section 29/30 of the Dozenten-Codes spec.
 *
 * "Paid" will always be 0 here until the Payout system exists (see
 * docs/ADMIN_PANEL_AND_REFERRAL_SYSTEM_STATUS.md) — the advisor
 * explicitly ordered Payout after this page, not before, so this is
 * an honest reflection of that, not a bug: commission_ledger.status
 * genuinely never reaches 'PAID' yet anywhere in this codebase.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id: teacherId } = await params;
  const supabase = getSupabaseAdmin();

  const { data: teacher, error: teacherError } = await supabase
    .from('teachers')
    .select('id, name, email, user_id, access_valid_until, status, created_at')
    .eq('id', teacherId)
    .maybeSingle();
  if (teacherError) return NextResponse.json({ error: teacherError.message }, { status: 500 });
  if (!teacher) return NextResponse.json({ error: 'TEACHER_NOT_FOUND' }, { status: 404 });

  const [{ data: codes }, { data: referrals }, { data: ledger }] = await Promise.all([
    supabase.from('teacher_coupons').select('*').eq('teacher_id', teacherId).order('created_at', { ascending: false }),
    supabase.from('referrals').select('id, student_user_id, teacher_coupon_id, code_at_redemption, bonus_days_granted, redeemed_at').eq('teacher_id', teacherId).order('redeemed_at', { ascending: false }),
    supabase.from('commission_ledger').select('id, referral_id, gross_amount_cents, commission_amount_cents, type, status, created_at').eq('teacher_id', teacherId).order('created_at', { ascending: false }),
  ]);

  const studentIds = [...new Set((referrals ?? []).map((r) => r.student_user_id))];
  let profileMap = new Map<string, { full_name?: string; email?: string; display_name?: string }>();
  if (studentIds.length > 0) {
    const { data: profiles } = await supabase.from('profiles').select('id, email, display_name').in('id', studentIds);
    profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  }

  // Real subscriptions data per referred student — actual revenue, not a guess.
  let subsByUser = new Map<string, { amount_paid_cents: number | null; status: string; plan: string }>();
  if (studentIds.length > 0) {
    const { data: subs } = await supabase
      .from('subscriptions')
      .select('user_id, amount_paid_cents, status, plan')
      .in('user_id', studentIds);
    subsByUser = new Map((subs ?? []).map((s) => [s.user_id, s]));
  }

  const students = (referrals ?? []).map((r) => {
    const profile = profileMap.get(r.student_user_id);
    const sub = subsByUser.get(r.student_user_id);
    return {
      studentUserId: r.student_user_id,
      name: profile?.display_name ?? profile?.email ?? '—',
      email: profile?.email ?? '—',
      codeUsed: r.code_at_redemption,
      bonusDays: r.bonus_days_granted,
      referredAt: r.redeemed_at,
      subscriptionStatus: sub?.status ?? null,
      subscriptionPlan: sub?.plan ?? null,
      amountPaidCents: sub?.amount_paid_cents ?? 0,
    };
  });

  const codeStats = new Map<string, { revenueCents: number; usedCount: number }>();
  for (const s of students) {
    const code = s.codeUsed;
    const entry = codeStats.get(code) ?? { revenueCents: 0, usedCount: 0 };
    entry.revenueCents += s.amountPaidCents;
    entry.usedCount += 1;
    codeStats.set(code, entry);
  }
  const enrichedCodes = (codes ?? []).map((c) => ({ ...c, stats: codeStats.get(c.code) ?? { revenueCents: 0, usedCount: 0 } }));

  const revenueGeneratedCents = students.reduce((sum, s) => sum + s.amountPaidCents, 0);
  const firstPurchases = students.filter((s) => s.amountPaidCents > 0).length;

  const earnedCents = (ledger ?? [])
    .filter((l) => l.type === 'EARNED')
    .reduce((sum, l) => sum + l.commission_amount_cents, 0);
  const reversedCents = (ledger ?? [])
    .filter((l) => l.type === 'REVERSAL')
    .reduce((sum, l) => sum + Math.abs(l.commission_amount_cents), 0);
  const paidCents = (ledger ?? [])
    .filter((l) => l.type === 'EARNED' && l.status === 'PAID')
    .reduce((sum, l) => sum + l.commission_amount_cents, 0);
  const pendingCents = earnedCents - reversedCents - paidCents;

  return NextResponse.json({
    teacher,
    codes: enrichedCodes,
    students,
    ledger,
    summary: {
      codesCount: (codes ?? []).length,
      studentsReferred: students.length,
      firstPurchases,
      revenueGeneratedCents,
      earnedCents,
      reversedCents,
      paidCents,
      pendingCents,
    },
  });
}
