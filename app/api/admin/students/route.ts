import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

// Supabase's admin.listUsers() is paginated; 200/page keeps this to a
// single request for now. If the school grows past that, switch this to
// real pagination in the UI rather than raising the limit indefinitely.
const PAGE_SIZE = 200;

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: usersPage, error: usersError } = await supabase.auth.admin.listUsers({ page: 1, perPage: PAGE_SIZE });
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }
  const userIds = usersPage.users.map((u) => u.id);

  const [{ data: profiles }, { data: subs }, { data: coupons }] = await Promise.all([
    supabase.from('profiles').select('id, full_name').in('id', userIds),
    supabase
      .from('subscriptions')
      .select('user_id, plan, status, current_period_end, applied_coupon_code, teacher_coupon_id')
      .in('user_id', userIds),
    supabase.from('teacher_coupons').select('id, teacher_name'),
  ]);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  const subMap = new Map((subs ?? []).map((s) => [s.user_id, s]));
  const teacherNameById = new Map((coupons ?? []).map((c) => [c.id, c.teacher_name]));

  const students = usersPage.users
    .map((u) => {
      const sub = subMap.get(u.id);
      return {
        id: u.id,
        email: u.email ?? '—',
        fullName: profileMap.get(u.id)?.full_name ?? null,
        createdAt: u.created_at,
        plan: sub?.plan ?? 'free',
        status: sub?.status ?? 'active',
        currentPeriodEnd: sub?.current_period_end ?? null,
        referredByCode: sub?.applied_coupon_code ?? null,
        referredByTeacher: sub?.teacher_coupon_id ? teacherNameById.get(sub.teacher_coupon_id) ?? null : null,
      };
    })
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  return NextResponse.json({ students, total: usersPage.users.length });
}
