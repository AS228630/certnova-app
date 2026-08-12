import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 5/6 (My Codes + Referral Links). Filtered
 * exclusively by this teacher's own teacherId, resolved server-side —
 * a teacher can never fetch another teacher's codes by guessing an id,
 * because no id is ever accepted from the client here.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: codes, error } = await supabase
    .from('teacher_coupons')
    .select('id, code, extra_days, commission_rate, is_active, max_uses, valid_until, created_at')
    .eq('teacher_id', auth.teacherId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: subs } = await supabase
    .from('subscriptions')
    .select('teacher_coupon_id, amount_paid_cents')
    .in('teacher_coupon_id', (codes ?? []).map((c) => c.id));

  const stats = new Map<string, { studentsCount: number; revenueCents: number }>();
  for (const s of subs ?? []) {
    if (!s.teacher_coupon_id) continue;
    const entry = stats.get(s.teacher_coupon_id) ?? { studentsCount: 0, revenueCents: 0 };
    entry.studentsCount += 1;
    entry.revenueCents += s.amount_paid_cents ?? 0;
    stats.set(s.teacher_coupon_id, entry);
  }

  const enriched = (codes ?? []).map((c) => ({
    ...c,
    stats: stats.get(c.id) ?? { studentsCount: 0, revenueCents: 0 },
    // The referral link a teacher can copy and send to their students —
    // real registration URL, this code as a query param, resolved from
    // the actual site origin rather than a hardcoded domain.
    referralPath: `/register?ref=${encodeURIComponent(c.code)}`,
  }));

  return NextResponse.json({ codes: enriched });
}
