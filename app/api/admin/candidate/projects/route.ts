import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.title) {
    return NextResponse.json({ error: 'CANDIDATE_ID_TITLE_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('candidate_projects')
    .insert({
      candidate_id: body.candidateId,
      title: body.title,
      description: body.description ?? null,
      technologies: Array.isArray(body.technologies) ? body.technologies : null,
      project_url: body.projectUrl ?? null,
      repo_url: body.repoUrl ?? null,
      sort_order: body.sortOrder ?? 0,
      is_public: body.isPublic ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_PROJECT_ADDED',
    resourceType: 'candidate_project',
    resourceId: data.id,
    metadata: { title: body.title },
  });

  return NextResponse.json({ project: data }, { status: 201 });
}
