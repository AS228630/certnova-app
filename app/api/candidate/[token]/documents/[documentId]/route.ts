import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';
import { verifyUnlockToken, unlockCookieName } from '@/lib/candidate/unlockSession';

const BUCKET = 'candidate-private';
const SIGNED_URL_EXPIRY_SECONDS = 10 * 60;

/**
 * The IDOR-critical route (spec section 66/OWASP Broken Object Level
 * Authorization): a document is only ever served if it belongs to
 * THIS token's candidate AND is either public, or has a live,
 * unrevoked document_access_grants row for THIS EXACT share_link_id
 * + document_id pair — never "any grant exists for this link" and
 * never "the document exists", both of which would let Company A
 * reach Company B's document by editing an id in the URL.
 *
 * Browser-scoped unlock (fix, Aug 2026): a live grant alone is no
 * longer sufficient for a private document — this browser must ALSO
 * hold the signed unlock cookie proving it itself entered the access
 * code for this exact link (see lib/candidate/unlockSession.ts and
 * the access-code/route.ts + [token]/route.ts fixes alongside this
 * one). Without it, even a genuinely granted document is refused —
 * this is what stops the confidential section from silently
 * reappearing on a second device that never entered any code.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; documentId: string }> }) {
  const { token, documentId } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const supabase = getSupabaseAdmin();
  const { link } = verified;
  const forceDownload = req.nextUrl.searchParams.get('download') === 'true';

  const { data: doc, error: docError } = await supabase
    .from('candidate_documents')
    .select('id, candidate_id, storage_path, file_name, visibility, deleted_at, storage_deleted_at')
    .eq('id', documentId)
    .maybeSingle();

  if (docError) return NextResponse.json({ error: docError.message }, { status: 500 });
  if (!doc || doc.candidate_id !== link.candidate_id || doc.deleted_at) {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
  if (doc.storage_deleted_at) return NextResponse.json({ error: 'FILE_PERMANENTLY_DELETED' }, { status: 410 });

  if (doc.visibility === 'private') {
    const cookieToken = req.cookies.get(unlockCookieName(link.id))?.value;
    if (!verifyUnlockToken(cookieToken, link.id)) {
      return NextResponse.json({ error: 'NOT_AUTHORIZED' }, { status: 403 });
    }
    const { data: grant } = await supabase
      .from('document_access_grants')
      .select('id')
      .eq('share_link_id', link.id)
      .eq('document_id', documentId)
      .is('revoked_at', null)
      .maybeSingle();
    if (!grant) return NextResponse.json({ error: 'NOT_AUTHORIZED' }, { status: 403 });
  }

  if (forceDownload && !link.allow_download) {
    return NextResponse.json({ error: 'DOWNLOAD_NOT_ALLOWED' }, { status: 403 });
  }

  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(doc.storage_path, SIGNED_URL_EXPIRY_SECONDS, forceDownload ? { download: doc.file_name } : undefined);
  if (signError || !signed) return NextResponse.json({ error: signError?.message ?? 'SIGNED_URL_FAILED' }, { status: 500 });

  await logAudit({
    actorId: null,
    actorEmail: null,
    action: forceDownload ? 'DOCUMENT_DOWNLOADED' : 'DOCUMENT_VIEWED',
    resourceType: 'candidate_document',
    resourceId: documentId,
    metadata: { companyName: link.company_name, shareLinkId: link.id },
  });

  return NextResponse.json({ url: signed.signedUrl, fileName: doc.file_name });
}
