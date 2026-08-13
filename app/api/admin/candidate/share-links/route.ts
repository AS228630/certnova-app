import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { generateShareToken, hashShareToken, generateAccessCode, hashAccessCode } from '@/lib/candidate/shareLinkAuth';

/**
 * Creates a per-company share link. The raw token and raw access code
 * are returned ONLY in this response, exactly once — the database
 * only ever stores their hashes (share_links.token_hash,
 * document_access_codes.code_hash), per spec sections 14-15/21.
 * There is no way to recover the raw token or code later, even for
 * the admin — if lost, the link must be revoked and a new one issued.
 */
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  if (!body?.candidateId || !body?.companyName) {
    return NextResponse.json({ error: 'CANDIDATE_ID_COMPANY_NAME_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const requireAccessCode = body.requireAccessCode ?? true;
  const expiresInDays = typeof body.expiresInDays === 'number' ? body.expiresInDays : 30;
  const documentIds: string[] = Array.isArray(body.documentIds) ? body.documentIds : [];

  // Per the advisor's final URL design decision, the URL is now
  // /c/{token} — a short (128-bit, ~22 char), URL-safe token, no
  // separate name-slug segment needed anymore (see
  // lib/candidate/shareLinkAuth.ts for the length/entropy rationale).
  const rawToken = generateShareToken();
  const { data: link, error: linkError } = await supabase
    .from('share_links')
    .insert({
      candidate_id: body.candidateId,
      company_name: body.companyName,
      recruiter_name: body.recruiterName ?? null,
      recruiter_email: body.recruiterEmail ?? null,
      token_hash: hashShareToken(rawToken),
      expires_at: expiresInDays > 0 ? new Date(Date.now() + expiresInDays * 86400000).toISOString() : null,
      require_access_code: requireAccessCode,
      allow_download: body.allowDownload ?? false,
    })
    .select()
    .single();

  if (linkError) return NextResponse.json({ error: linkError.message }, { status: 500 });

  // Grant this link permission to see exactly the private documents
  // the admin picked — never "all private documents by default"
  // (spec sections 26-27: each company's grants are independently
  // chosen).
  if (documentIds.length > 0) {
    const { error: gdError } = await supabase
      .from('share_link_documents')
      .insert(documentIds.map((documentId) => ({ share_link_id: link.id, document_id: documentId })));
    if (gdError) {
      await supabase.from('share_links').delete().eq('id', link.id); // roll back the orphaned link
      return NextResponse.json({ error: gdError.message }, { status: 500 });
    }
  }

  let rawAccessCode: string | null = null;
  if (requireAccessCode) {
    rawAccessCode = generateAccessCode();
    const { error: codeError } = await supabase
      .from('document_access_codes')
      .insert({ share_link_id: link.id, code_hash: hashAccessCode(rawAccessCode) });
    if (codeError) {
      await supabase.from('share_links').delete().eq('id', link.id);
      return NextResponse.json({ error: codeError.message }, { status: 500 });
    }
  }

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'SHARE_LINK_CREATED',
    resourceType: 'share_link',
    resourceId: link.id,
    metadata: { companyName: body.companyName, documentCount: documentIds.length, requireAccessCode },
  });

  return NextResponse.json(
    {
      shareLink: link,
      // Shown once — the frontend must display these prominently and
      // never re-request them (they cannot be re-requested; only the
      // hashes exist afterward).
      rawToken,
      rawAccessCode,
      shareUrl: `/c/${rawToken}`,
    },
    { status: 201 },
  );
}

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('share_links')
    .select('id, company_name, recruiter_name, recruiter_email, expires_at, revoked_at, require_access_code, access_count, allow_download, created_at, last_accessed_at')
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: 'SHARE_LINKS_NOT_AVAILABLE', detail: error.message }, { status: 503 });
  return NextResponse.json({ shareLinks: data ?? [] });
}
