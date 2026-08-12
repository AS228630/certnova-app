import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 8 (Commission). This teacher's own real
 * commission_ledger rows only — same source of truth the admin's
 * teacher-detail page reads, filtered by teacherId server-side.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: ledger, error } = await supabase
    .from('commission_ledger')
    .select('id, student_user_id, gross_amount_cents, commission_amount_cents, type, status, created_at')
    .eq('teacher_id', auth.teacherId)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const studentIds = [...new Set((ledger ?? []).map((l) => l.student_user_id))];
  let profileMap = new Map<string, { display_name?: string; email?: string }>();
  if (studentIds.length > 0) {
    const { data: profiles } = await supabase.from('profiles').select('id, display_name, email').in('id', studentIds);
    profileMap = new Map((profiles ?? []).map((p) => [p.id, p]));
  }

  const entries = (ledger ?? []).map((l) => {
    const profile = profileMap.get(l.student_user_id);
    return {
      id: l.id,
      studentName: profile?.display_name ?? profile?.email ?? '—',
      amountCents: l.commission_amount_cents,
      type: l.type,
      status: l.status,
      date: l.created_at,
    };
  });

  const earnedCents = entries.filter((e) => e.type === 'EARNED').reduce((s, e) => s + e.amountCents, 0);
  const reversedCents = entries.filter((e) => e.type === 'REVERSAL').reduce((s, e) => s + Math.abs(e.amountCents), 0);
  const paidCents = entries.filter((e) => e.type === 'EARNED' && e.status === 'PAID').reduce((s, e) => s + e.amountCents, 0);
  const pendingCents = earnedCents - reversedCents - paidCents;

  return NextResponse.json({ entries, summary: { earnedCents, reversedCents, paidCents, pendingCents } });
}
