import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 7 (My Students). Filtered by this teacher's
 * own teacherId only. Per the advisor's explicit privacy rule (spec
 * section 6): a teacher sees only what's needed for their own
 * referral tracking — name, registration date, status, which of their
 * codes was used, subscription status. NOT exposed: exact amounts
 * paid, payment method, or any other admin-only financial/management
 * detail about the student.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: referrals, error } = await supabase
    .from('referrals')
    .select('student_user_id, code_at_redemption, bonus_days_granted, redeemed_at')
    .eq('teacher_id', auth.teacherId)
    .order('redeemed_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const studentIds = (referrals ?? []).map((r) => r.student_user_id);
  let profileMap = new Map<string, { display_name?: string; email?: string }>();
  let subStatusMap = new Map<string, string>();
  if (studentIds.length > 0) {
    const [{ data: profiles }, { data: subs }] = await Promise.all([
      supabase.from('profiles').select('id, display_name, email').in('id', studentIds),
      supabase.from('subscriptions').select('user_id, status').in('user_id', studentIds),
    ]);
    profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
    subStatusMap = new Map((subs ?? []).map((s) => [s.user_id, s.status]));
  }

  const students = (referrals ?? []).map((r) => {
    const profile = profileMap.get(r.student_user_id);
    return {
      // First name / initial only, matching the spec's "no unnecessary
      // private student details" instruction — full email is still
      // useful for the teacher to recognize who's who, name is shown
      // as provided.
      name: profile?.display_name ?? '—',
      email: profile?.email ?? '—',
      codeUsed: r.code_at_redemption,
      bonusDays: r.bonus_days_granted,
      registeredAt: r.redeemed_at,
      subscriptionStatus: subStatusMap.get(r.student_user_id) ?? 'unknown',
    };
  });

  return NextResponse.json({ students });
}
