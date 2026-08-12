import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

/**
 * Requires migration 037 (candidate_education table) to be live.
 * Until then this fails with a real Postgres "relation does not
 * exist" error — same pattern as every other "written ahead of its
 * migration" route in this project, not a silent mock.
 */
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.institutionName) {
    return NextResponse.json({ error: 'CANDIDATE_ID_INSTITUTION_NAME_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('candidate_education')
    .insert({
      candidate_id: body.candidateId,
      institution_name: body.institutionName,
      degree: body.degree ?? null,
      field_of_study: body.fieldOfStudy ?? null,
      graduation_date: body.graduationDate ?? null,
      logo_url: body.logoUrl ?? null,
      website_url: body.websiteUrl ?? null,
      is_public: body.isPublic ?? true,
      sort_order: body.sortOrder ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: 'CANDIDATE_EDUCATION_NOT_INSTALLED', detail: error.message }, { status: 503 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_EDUCATION_ADDED',
    resourceType: 'candidate_education',
    resourceId: data.id,
    metadata: { institutionName: body.institutionName },
  });

  return NextResponse.json({ education: data }, { status: 201 });
}
