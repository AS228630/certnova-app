import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

/**
 * Private Candidate Profile — admin side. Single combined GET
 * (profile + skills + certifications + experiences + projects +
 * documents in one response), per the spec's own Free-Tier rule
 * (section 60: "one optimized server request", not one query per
 * card). Since this is a single-candidate system, GET returns the
 * one existing profile (or null if not created yet — the admin UI's
 * first action is then to create it via POST).
 */
export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: profile, error } = await supabase.from('candidate_profiles').select('*').limit(1).maybeSingle();
  if (error) {
    return NextResponse.json({ error: 'CANDIDATE_PROFILE_NOT_INSTALLED', detail: error.message }, { status: 503 });
  }
  if (!profile) {
    return NextResponse.json({ profile: null, skills: [], certifications: [], experiences: [], projects: [], documents: [] });
  }

  const [{ data: skills }, { data: certifications }, { data: experiences }, { data: projects }, { data: documents }] = await Promise.all([
    supabase.from('candidate_skills').select('*').eq('candidate_id', profile.id).order('sort_order'),
    supabase.from('candidate_certifications').select('*').eq('candidate_id', profile.id).order('sort_order'),
    supabase.from('candidate_experiences').select('*').eq('candidate_id', profile.id).order('sort_order'),
    supabase.from('candidate_projects').select('*').eq('candidate_id', profile.id).order('sort_order'),
    supabase.from('candidate_documents').select('*').eq('candidate_id', profile.id).is('deleted_at', null).order('created_at', { ascending: false }),
  ]);

  return NextResponse.json({
    profile,
    skills: skills ?? [],
    certifications: certifications ?? [],
    experiences: experiences ?? [],
    projects: projects ?? [],
    documents: documents ?? [],
  });
}

/** Create or update the (single) candidate profile row. */
export async function PUT(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.displayName) return NextResponse.json({ error: 'DISPLAY_NAME_REQUIRED' }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: existing } = await supabase.from('candidate_profiles').select('id').limit(1).maybeSingle();

  const payload: Record<string, unknown> = {
    display_name: body.displayName,
    professional_title: body.professionalTitle ?? null,
    bio: body.bio ?? null,
    location: body.location ?? null,
    availability: body.availability ?? null,
    work_mode: body.workMode ?? null,
    email: body.email ?? null,
    linkedin_url: body.linkedinUrl ?? null,
    github_url: body.githubUrl ?? null,
    updated_at: new Date().toISOString(),
  };
  // Only included when the caller actually sends it, so existing
  // saves keep working even before migration 036
  // (candidate_profiles.desired_positions) has been run.
  if (Array.isArray(body.desiredPositions)) {
    payload.desired_positions = body.desiredPositions;
  }

  const { data, error } = existing
    ? await supabase.from('candidate_profiles').update(payload).eq('id', existing.id).select().single()
    : await supabase.from('candidate_profiles').insert(payload).select().single();

  // Second-row prevention is application-layer only here (the
  // existing-row check above), per the senior architect's final
  // PHASE 2 decision — no database-level singleton constraint for
  // this admin-only-managed table. See
  // docs/CANDIDATE_PROFILE_PHASE2_REVIEW.md section 5.
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'PROFILE_UPDATED',
    resourceType: 'candidate_profile',
    resourceId: data.id,
    metadata: { wasCreate: !existing },
  });

  return NextResponse.json({ profile: data });
}
