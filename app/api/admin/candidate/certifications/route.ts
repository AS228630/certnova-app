import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

/**
 * Per spec section 7: if there's no real credential_id or
 * verification_url, leave them null — the public-facing UI (a later
 * step) must render "Verification unavailable" for a null
 * verification_url, never fabricate one.
 */
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.issuer || !body?.name) {
    return NextResponse.json({ error: 'CANDIDATE_ID_ISSUER_NAME_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const payload: Record<string, unknown> = {
    candidate_id: body.candidateId,
    issuer: body.issuer,
    name: body.name,
    credential_id: body.credentialId ?? null,
    issue_date: body.issueDate ?? null,
    expiry_date: body.expiryDate ?? null,
    verification_url: body.verificationUrl ?? null,
    certificate_file_id: body.certificateFileId ?? null,
    badge_file_id: body.badgeFileId ?? null,
    is_public: body.isPublic ?? true,
    sort_order: body.sortOrder ?? 0,
  };
  // logo_url only exists once migration 037 has been run — only
  // included when actually sent, so certification creation keeps
  // working before that migration is live (same pattern as
  // candidate_profiles.desired_positions in PHASE 6).
  if (body.logoUrl !== undefined) payload.logo_url = body.logoUrl || null;

  const { data, error } = await supabase
    .from('candidate_certifications')
    .insert(payload)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_CERTIFICATION_ADDED',
    resourceType: 'candidate_certification',
    resourceId: data.id,
    metadata: { issuer: body.issuer, name: body.name },
  });

  return NextResponse.json({ certification: data }, { status: 201 });
}
