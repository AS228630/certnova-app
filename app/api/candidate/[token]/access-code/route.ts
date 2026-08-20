import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { verifyAccessCode } from '@/lib/candidate/shareLinkAuth';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';
import { issueUnlockToken, unlockCookieName } from '@/lib/candidate/unlockSession';
import { candidateAccessCodeSchema } from '@/lib/apiSchemas';

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
 * correct code — is refused.
 *
 * Browser-scoped unlock (fix, Aug 2026 — real security gap found by
 * the owner's own testing): document_access_grants alone made the
 * *link* look unlocked to anyone holding it, once ANY browser had
 * entered the code — including a second device the owner opened the
 * same link on, which never should have shown confidential documents
 * without its own code entry. The code staying one-time-use globally
 * is correct and unchanged; what's fixed is that the resulting
 * "unlocked" *state* is now additionally scoped to the one browser
 * that actually entered it, via a signed HttpOnly cookie (see
 * lib/candidate/unlockSession.ts) — no other browser, even with the
 * identical link, sees anything unlocked without going through this
 * same verification itself (and by then the code is already spent).
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const rawBody = await req.json().catch(() => null);
  const parsed = candidateAccessCodeSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: 'CODE_REQUIRED' }, { status: 400 });
  }
  const { code } = parsed.data;

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

  const isValid = verifyAccessCode(code, accessCode.code_hash);

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

  const res = NextResponse.json({ unlocked: true, documentCount: linkDocs?.length ?? 0 });
  res.cookies.set(unlockCookieName(link.id), issueUnlockToken(link.id), {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 90 * 24 * 60 * 60, // 90 days, matches issueUnlockToken's TTL
  });
  return res;
}
