import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { issueToken } from '@/lib/cv/accessToken';

export async function POST(req: NextRequest) {
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
