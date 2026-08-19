import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { issueToken } from '@/lib/cv/accessToken';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  // Anonymous, code-guessable endpoint — cap attempts per IP before even
  // checking the code, so a script can't brute-force CV_ACCESS_CODE by
  // firing requests as fast as the network allows.
  const ip = getClientIp(req);
  const { allowed } = await checkRateLimit(`cv-access:${ip}`, 10, 15);
  if (!allowed) {
    return NextResponse.json({ granted: false, error: 'rate_limited' }, { status: 429 });
  }

  const { code } = await req.json().catch(() => ({ code: '' }));
  const expected = process.env.CV_ACCESS_CODE;

  if (!expected) {
    // Not configured yet — fail closed, not open.
    return NextResponse.json({ granted: false, error: 'not_configured' }, { status: 503 });
  }

  const provided = String(code || '');
  const a = Buffer.from(provided.padEnd(expected.length, '\0'));
  const b = Buffer.from(expected.padEnd(provided.length, '\0'));
  const match = a.length === b.length && crypto.timingSafeEqual(a, b) && provided === expected;

  if (!match) {
    return NextResponse.json({ granted: false }, { status: 401 });
  }

  const token = issueToken();
  const res = NextResponse.json({ granted: true });
  res.cookies.set('cv_access', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 6, // 6 hours, matches accessToken.ts TTL
  });
  return res;
}
