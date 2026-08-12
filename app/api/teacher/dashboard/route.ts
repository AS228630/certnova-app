import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 4 (Dashboard). Every query below is filtered
 * by `teacher_id` (or `teacherId`, resolved server-side from the
 * session by requireTeacher — never from the request), per the
 * advisor's data-isolation rule. No number is hardcoded; a teacher
 * with zero referrals correctly sees zeros, not sample data.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { teacherId } = auth;

  const [{ data: codes }, { data: referrals }, { data: ledger }] = await Promise.all([
    supabase.from('teacher_coupons').select('id, code, is_active').eq('teacher_id', teacherId),
    supabase.from('referrals').select('student_user_id, redeemed_at').eq('teacher_id', teacherId),
    supabase.from('commission_ledger').select('type, status, commission_amount_cents, created_at').eq('teacher_id', teacherId),
  ]);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const newStudents = (referrals ?? []).filter((r) => new Date(r.redeemed_at) >= thirtyDaysAgo).length;

  const earnedCents = (ledger ?? []).filter((l) => l.type === 'EARNED').reduce((s, l) => s + l.commission_amount_cents, 0);
  const reversedCents = (ledger ?? []).filter((l) => l.type === 'REVERSAL').reduce((s, l) => s + Math.abs(l.commission_amount_cents), 0);
  const paidCents = (ledger ?? []).filter((l) => l.type === 'EARNED' && l.status === 'PAID').reduce((s, l) => s + l.commission_amount_cents, 0);
  const pendingCents = earnedCents - reversedCents - paidCents;

  // Real 7-day referral activity, grouped by actual redemption date —
  // not a fabricated shape.
  const days: { date: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = (referrals ?? []).filter((r) => r.redeemed_at.slice(0, 10) === dateStr).length;
    days.push({ date: dateStr, count });
  }

  return NextResponse.json({
    teacherName: auth.teacherName,
    summary: {
      totalStudents: (referrals ?? []).length,
      newStudents30d: newStudents,
      earnedCents,
      pendingCents,
      paidCents,
      activeCodes: (codes ?? []).filter((c) => c.is_active).length,
      totalCodes: (codes ?? []).length,
    },
    activityChart: days,
  });
}
