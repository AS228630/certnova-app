import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Fixes a real security gap found by the owner's own testing (Aug
 * 2026): the access code is correctly one-time-use across the whole
 * lifetime of a share link (per the previously-approved design), but
 * the resulting "unlocked" state was being treated as global to the
 * link -- meaning once ANY browser entered the code, confidential
 * documents appeared unlocked to EVERY browser holding that same
 * link (including the owner's own second device), with no way to
 * tell who actually entered the code.
 *
 * Fix: unlock state is now scoped to the specific browser that
 * entered the code, via a signed, stateless session token stored in
 * an HttpOnly cookie. No new database table -- the token is fully
 * self-verifying (HMAC-signed), so nothing needs to be persisted or
 * looked up beyond what already exists (document_access_grants still
 * governs *which* documents this link is even allowed to reveal,
 * this only governs *whether this particular browser* gets to see
 * them as unlocked).
 *
 * The HMAC key is derived from SUPABASE_SERVICE_ROLE_KEY (already a
 * strong, existing server-only secret) rather than requiring a new
 * environment variable to be configured.
 */

function signingKey(): string {
  const base = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!base) throw new Error('SUPABASE_SERVICE_ROLE_KEY not configured');
  return createHmac('sha256', 'candidate-unlock-session-v1').update(base).digest('hex');
}

const SESSION_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days -- long enough that the one legitimate recipient doesn't get logged out mid-review, short enough to not be effectively permanent

/** Issues a signed token proving "this browser successfully entered
 * the access code for this exact share link", valid for 90 days. */
export function issueUnlockToken(shareLinkId: string): string {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = `${shareLinkId}.${expires}`;
  const sig = createHmac('sha256', signingKey()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

/** Verifies a token was issued for this exact share link, hasn't
 * expired, and hasn't been tampered with. */
export function verifyUnlockToken(token: string | undefined, shareLinkId: string): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [tokenLinkId, expiresStr, sig] = parts;
  if (tokenLinkId !== shareLinkId) return false;
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;

  const payload = `${tokenLinkId}.${expiresStr}`;
  const expectedSig = createHmac('sha256', signingKey()).update(payload).digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Cookie name is per-link (short hash suffix) so multiple share
 * links open in the same browser don't collide or leak into each
 * other. */
export function unlockCookieName(shareLinkId: string): string {
  return `cc_unlock_${shareLinkId.replace(/-/g, '').slice(0, 12)}`;
}
