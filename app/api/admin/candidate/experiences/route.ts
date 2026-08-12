import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.roleTitle || !body?.companyName) {
    return NextResponse.json({ error: 'CANDIDATE_ID_ROLE_TITLE_COMPANY_NAME_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('candidate_experiences')
    .insert({
      candidate_id: body.candidateId,
      role_title: body.roleTitle,
      company_name: body.companyName,
      location: body.location ?? null,
      start_date: body.startDate ?? null,
      end_date: body.endDate ?? null, // null = "heute" / present, per the schema's own convention
      description: body.description ?? null,
      sort_order: body.sortOrder ?? 0,
      is_public: body.isPublic ?? true,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_EXPERIENCE_ADDED',
    resourceType: 'candidate_experience',
    resourceId: data.id,
    metadata: { roleTitle: body.roleTitle, companyName: body.companyName },
  });

  return NextResponse.json({ experience: data }, { status: 201 });
}
