import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const map: Record<string, string> = {
    roleTitle: 'role_title', companyName: 'company_name', location: 'location', startDate: 'start_date',
    endDate: 'end_date', description: 'description', isPublic: 'is_public', sortOrder: 'sort_order',
  };
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [key, column] of Object.entries(map)) {
    if (body[key] !== undefined) patch[column] = body[key];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('candidate_experiences').update(patch).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ experience: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('candidate_experiences').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ deleted: true });
}
