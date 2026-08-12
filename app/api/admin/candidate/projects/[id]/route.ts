import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const map: Record<string, string> = {
    title: 'title', description: 'description', projectUrl: 'project_url', repoUrl: 'repo_url',
    isPublic: 'is_public', sortOrder: 'sort_order',
  };
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [key, column] of Object.entries(map)) {
    if (body[key] !== undefined) patch[column] = body[key];
  }
  if (Array.isArray(body.technologies)) patch.technologies = body.technologies;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('candidate_projects').update(patch).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_PROJECT_UPDATED',
    resourceType: 'candidate_project',
    resourceId: id,
    metadata: patch,
  });

  return NextResponse.json({ project: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('candidate_projects').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_PROJECT_REMOVED',
    resourceType: 'candidate_project',
    resourceId: id,
  });

  return NextResponse.json({ deleted: true });
}
