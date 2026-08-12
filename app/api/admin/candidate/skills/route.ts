import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.category || !body?.name) {
    return NextResponse.json({ error: 'CANDIDATE_ID_CATEGORY_NAME_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('candidate_skills')
    .insert({
      candidate_id: body.candidateId,
      category: body.category,
      name: body.name,
      level: body.level ?? null,
      sort_order: body.sortOrder ?? 0,
      is_public: body.isPublic ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_SKILL_ADDED',
    resourceType: 'candidate_skill',
    resourceId: data.id,
    metadata: { category: body.category, name: body.name },
  });

  return NextResponse.json({ skill: data }, { status: 201 });
}
