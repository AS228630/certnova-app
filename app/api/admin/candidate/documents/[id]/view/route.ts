import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

const BUCKET = 'candidate-private';
const SIGNED_URL_EXPIRY_SECONDS = 10 * 60; // 10 minutes, per PHASE 5 design section 9

/**
 * Admin-side document view. Authorization is checked FIRST
 * (requirePermission), and only after it passes does this request a
 * signed URL from Storage — per PHASE 5 design section 9, the signed
 * URL is generated fresh every time, never cached or stored anywhere
 * (not in the database, not in audit_logs metadata).
 *
 * The recruiter-facing equivalent (checking a document_access_grant
 * instead of an admin permission, per PHASE 3's security-flow design)
 * is PHASE 8 — not built here.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const forceDownload = req.nextUrl.searchParams.get('download') === 'true';
  const supabase = getSupabaseAdmin();

  const { data: doc, error: fetchError } = await supabase
    .from('candidate_documents')
    .select('id, storage_path, deleted_at, storage_deleted_at, file_name')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!doc) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  if (doc.storage_deleted_at) return NextResponse.json({ error: 'FILE_PERMANENTLY_DELETED' }, { status: 410 });

  // `download: doc.file_name` sets Content-Disposition: attachment on
  // Supabase's response, so the browser downloads the file directly
  // when navigated to this URL — no client-side fetch/blob needed,
  // which avoids a CORS round-trip that was silently failing (the
  // real bug reported: the download button did nothing because a
  // background fetch to the Storage domain was blocked, while
  // navigating directly via window.open worked fine since it isn't
  // subject to CORS).
  const { data: signed, error: signError } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(doc.storage_path, SIGNED_URL_EXPIRY_SECONDS, forceDownload ? { download: doc.file_name } : undefined);
  if (signError || !signed) {
    return NextResponse.json({ error: signError?.message ?? 'SIGNED_URL_FAILED' }, { status: 500 });
  }

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: forceDownload ? 'DOCUMENT_DOWNLOADED' : 'DOCUMENT_VIEWED',
    resourceType: 'candidate_document',
    resourceId: id,
  });

  return NextResponse.json({ url: signed.signedUrl, fileName: doc.file_name, expiresInSeconds: SIGNED_URL_EXPIRY_SECONDS });
}
