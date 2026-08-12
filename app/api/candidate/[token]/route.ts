import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';

/**
 * The real recruiter-facing endpoint (PHASE 7). No admin session
 * involved at all — authorization is entirely the token. Returns
 * only is_public-flagged content, plus a count (never the content) of
 * confidential documents, which stay locked until the access-code
 * route grants them.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const supabase = getSupabaseAdmin();
  const { link } = verified;

  const [{ data: profile }, { data: skills }, { data: certifications }, { data: experiences }, { data: projects }, { data: education }, { data: documents }, { data: grantedDocIds }] = await Promise.all([
    supabase.from('candidate_profiles').select('id, display_name, professional_title, bio, location, availability, work_mode, email, linkedin_url, github_url, profile_photo_path, desired_positions, created_at').eq('id', link.candidate_id).maybeSingle(),
    supabase.from('candidate_skills').select('*').eq('candidate_id', link.candidate_id).eq('is_public', true).order('sort_order'),
    supabase.from('candidate_certifications').select('*').eq('candidate_id', link.candidate_id).eq('is_public', true).order('sort_order'),
    supabase.from('candidate_experiences').select('*').eq('candidate_id', link.candidate_id).eq('is_public', true).order('sort_order'),
    supabase.from('candidate_projects').select('*').eq('candidate_id', link.candidate_id).eq('is_public', true).order('sort_order'),
    supabase.from('candidate_education').select('*').eq('candidate_id', link.candidate_id).eq('is_public', true).order('sort_order'),
    supabase.from('candidate_documents').select('id, title, document_type, visibility').eq('candidate_id', link.candidate_id).is('deleted_at', null),
    supabase.from('document_access_grants').select('document_id').eq('share_link_id', link.id).is('revoked_at', null),
  ]);

  const grantedIds = new Set((grantedDocIds ?? []).map((g) => g.document_id));
  const publicDocuments = (documents ?? []).filter((d) => d.visibility === 'public');
  // "Confidential" here specifically means: this document was chosen
  // for THIS share link (share_link_documents) and is private, not
  // "every private document the candidate has" — a different link
  // could have a different set (spec sections 26-27).
  const { data: linkDocIds } = await supabase.from('share_link_documents').select('document_id').eq('share_link_id', link.id);
  const linkDocIdSet = new Set((linkDocIds ?? []).map((d) => d.document_id));
  const confidentialDocuments = (documents ?? [])
    .filter((d) => d.visibility === 'private' && linkDocIdSet.has(d.id))
    .map((d) => ({ id: d.id, title: d.title, documentType: d.document_type, unlocked: grantedIds.has(d.id) }));

  // Increment access_count / last_accessed_at and log — fire and
  // forget style is fine here (best-effort), but await it so a
  // failure doesn't silently drop the audit trail.
  await supabase.from('share_links').update({ access_count: link.access_count + 1, last_accessed_at: new Date().toISOString() }).eq('id', link.id);
  await logAudit({
    actorId: null,
    actorEmail: null,
    action: 'PROFILE_VIEWED',
    resourceType: 'share_link',
    resourceId: link.id,
    metadata: { companyName: link.company_name },
  });

  return NextResponse.json({
    companyName: link.company_name,
    requireAccessCode: link.require_access_code,
    allowDownload: link.allow_download,
    profile,
    skills: skills ?? [],
    certifications: certifications ?? [],
    experiences: experiences ?? [],
    projects: projects ?? [],
    education: education ?? [],
    publicDocuments,
    confidentialDocuments,
  });
}
