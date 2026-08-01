import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.isActive === 'boolean') patch.is_active = body.isActive;
  if (Number.isFinite(Number(body.totalLicenses)) && Number(body.totalLicenses) > 0) patch.total_licenses = Number(body.totalLicenses);
  if (typeof body.validUntil === 'string') patch.valid_until = body.validUntil;
  if (typeof body.name === 'string' && body.name.trim()) patch.name = body.name.trim();

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('b2b_groups').update(patch).eq('id', id).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ group: data });
}
