import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'instructor_code.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.isActive === 'boolean') patch.is_active = body.isActive;
  if (Number.isFinite(Number(body.extraDays))) patch.extra_days = Number(body.extraDays);
  if (Number.isFinite(Number(body.commissionRate))) {
    const rate = Number(body.commissionRate);
    if (rate < 0 || rate > 1) return NextResponse.json({ error: 'commissionRate must be between 0 and 1' }, { status: 400 });
    patch.commission_rate = rate;
  }
  if (typeof body.teacherName === 'string' && body.teacherName.trim()) patch.teacher_name = body.teacherName.trim();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('teacher_coupons')
    .update(patch)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ coupon: data });
}
