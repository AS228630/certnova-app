import crypto from 'node:crypto';

/**
 * Signs a short-lived access token proving the HR passcode was verified.
 * This never touches the client until /api/cv-access confirms the code —
 * the token is issued server-side and stored in an httpOnly cookie, so
 * client-side JavaScript (and therefore anyone reading page source or
 * network requests before unlocking) never sees the secret or a valid
 * token without going through the real check.
 */

const SECRET = process.env.CV_ACCESS_SECRET || '';
const TOKEN_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function sign(payload: string): string {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
}

export function issueToken(): string {
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = String(expires);
  const sig = sign(payload);
  return `${payload}.${sig}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token || !SECRET) return false;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  const validSig =
    expected.length === sig.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  if (!validSig) return false;
  return Date.now() < Number(payload);
}
