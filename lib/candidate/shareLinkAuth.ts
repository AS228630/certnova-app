import { randomBytes, createHash, scryptSync, timingSafeEqual } from 'crypto';

/**
 * Per the original spec sections 14-15: the raw token/code exist only
 * in the URL/response the recruiter or admin sees once, and briefly
 * in memory during verification — never persisted. Only a hash goes
 * in the database.
 */

/**
 * 128-bit cryptographically secure token for a share link, base64url
 * encoded (~22 characters) — per the advisor's final URL design
 * decision (Aug 2026): short enough for a clean /c/{token} URL in a
 * CV/email, while still meeting the explicit "at least 128-bit
 * entropy" floor (crypto.randomBytes, never Math.random). Previously
 * 256 bits/43 characters — that was cryptographically fine but
 * unnecessarily long for this use case; 128 bits is still considered
 * effectively unbreakable by brute force (matches, e.g., a standard
 * AES-128 key).
 */
export function generateShareToken(): string {
  return randomBytes(16).toString('base64url');
}

/** SHA-256 is fine for the share token: it's already 256 bits of real
 * randomness, not a human-guessable secret like a password — a fast
 * hash just needs to prevent the raw token being recoverable from a
 * database leak, which SHA-256 already does. */
export function hashShareToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

/** A short, human-typeable access code — e.g. "K7M2-QX9P". Unlike the
 * token, this IS meant to be read and typed by a person, so it's
 * short — the real protection against guessing is the failed-attempt
 * lockout (see verifyAccessCode below), not the code's length alone. */
export function generateAccessCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I — avoids visual ambiguity
  const part = () => Array.from(randomBytes(4)).map((b) => alphabet[b % alphabet.length]).join('');
  return `${part()}-${part()}`;
}

/** scrypt with a random per-code salt, stored as "salt:hash" in the
 * single code_hash column — a human-typed code is a much lower-entropy
 * secret than the share token, so it gets a real password-hashing KDF
 * (scrypt, built into Node — no new dependency), not a fast hash. */
export function hashAccessCode(code: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(code.toUpperCase().trim(), salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyAccessCode(code: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const candidate = scryptSync(code.toUpperCase().trim(), salt, 64);
  const expected = Buffer.from(hash, 'hex');
  if (candidate.length !== expected.length) return false;
  return timingSafeEqual(candidate, expected);
}
