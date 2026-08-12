import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { verifyAccessCode } from '@/lib/candidate/shareLinkAuth';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

/**
 * Verifies a recruiter-entered access code and, on success, creates
 * document_access_grants for every document this share link was
 * given (share_link_documents) — never "unlocks everything private",
 * only what this specific link was granted (spec sections 26-27).
 *
 * One-time use (explicit requirement): `used_at` is set the moment
 * verification succeeds, and any later attempt — even with the
 * correct code — is refused. The code_hash for this share link is
 * created exactly once (at share-link creation), so "one-time use"
 * effectively means "the confidential section can be unlocked once,
 * ever, for this recruiter's link" — matching the request precisely:
 * one company gets one shot to unlock, not unlimited repeat access
 * from the raw code.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const body = await req.json().catch(() => null);
  if (typeof body?.code !== 'string' || !body.code.trim()) {
    return NextResponse.json({ error: 'CODE_REQUIRED' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { link } = verified;

  const { data: accessCode, error: fetchError } = await supabase
    .from('document_access_codes')
    .select('id, code_hash, failed_attempts, locked_until, used_at')
    .eq('share_link_id', link.id)
    .maybeSingle();

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!accessCode) return NextResponse.json({ error: 'NO_ACCESS_CODE_CONFIGURED' }, { status: 400 });

  if (accessCode.used_at) {
    return NextResponse.json({ error: 'CODE_ALREADY_USED' }, { status: 410 });
  }
  if (accessCode.locked_until && new Date(accessCode.locked_until) > new Date()) {
    return NextResponse.json({ error: 'TOO_MANY_ATTEMPTS_LOCKED' }, { status: 429 });
  }

  const isValid = verifyAccessCode(body.code, accessCode.code_hash);

  if (!isValid) {
    const failedAttempts = accessCode.failed_attempts + 1;
    const patch: Record<string, unknown> = { failed_attempts: failedAttempts };
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      patch.locked_until = new Date(Date.now() + LOCKOUT_MINUTES * 60000).toISOString();
    }
    await supabase.from('document_access_codes').update(patch).eq('id', accessCode.id);

    await logAudit({
      actorId: null,
      actorEmail: null,
      action: 'ACCESS_CODE_FAILED',
      resourceType: 'share_link',
      resourceId: link.id,
      metadata: { companyName: link.company_name, failedAttempts }, // never logs the submitted code itself
    });

    return NextResponse.json({ error: 'INVALID_CODE' }, { status: 401 });
  }

  // Success: mark the code permanently used, then grant every
  // document this link was configured for.
  await supabase.from('document_access_codes').update({ used_at: new Date().toISOString() }).eq('id', accessCode.id);

  const { data: linkDocs } = await supabase.from('share_link_documents').select('document_id').eq('share_link_id', link.id);
  if (linkDocs && linkDocs.length > 0) {
    await supabase.from('document_access_grants').insert(
      linkDocs.map((d) => ({ share_link_id: link.id, document_id: d.document_id })),
    );
  }

  await logAudit({
    actorId: null,
    actorEmail: null,
    action: 'ACCESS_CODE_SUCCESS',
    resourceType: 'share_link',
    resourceId: link.id,
    metadata: { companyName: link.company_name, documentsGranted: linkDocs?.length ?? 0 },
  });

  return NextResponse.json({ unlocked: true, documentCount: linkDocs?.length ?? 0 });
}
