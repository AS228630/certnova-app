import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};
  if (body.category !== undefined) patch.category = body.category;
  if (body.name !== undefined) patch.name = body.name;
  if (body.level !== undefined) patch.level = body.level;
  if (body.sortOrder !== undefined) patch.sort_order = body.sortOrder;
  if (body.isPublic !== undefined) patch.is_public = body.isPublic;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('candidate_skills').update(patch).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_SKILL_UPDATED',
    resourceType: 'candidate_skill',
    resourceId: id,
    metadata: patch,
  });

  return NextResponse.json({ skill: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('candidate_skills').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_SKILL_REMOVED',
    resourceType: 'candidate_skill',
    resourceId: id,
  });

  return NextResponse.json({ deleted: true });
}
