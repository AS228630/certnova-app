import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 9 (Payout History). Strictly read-only by
 * design: this route has no POST/PATCH — a teacher can never create,
 * approve, or change a payout's status themselves, per the advisor's
 * explicit spec section 8. Only app/api/admin/payouts (financial.manage
 * RBAC permission) can mutate payouts.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: payouts, error } = await supabase
    .from('payouts')
    .select('id, amount_cents, method, status, created_at, paid_at')
    .eq('teacher_id', auth.teacherId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'PAYOUTS_NOT_INSTALLED', detail: error.message }, { status: 503 });
  }

  return NextResponse.json({ payouts });
}
