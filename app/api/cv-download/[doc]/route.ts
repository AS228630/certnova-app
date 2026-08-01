import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { verifyToken } from '@/lib/cv/accessToken';

// Allow-list of downloadable documents: maps a public-facing key to the
// actual filename on disk. This also prevents any kind of path traversal
// since the incoming `doc` param is only ever used as a lookup key, never
// concatenated directly into a file path.
const DOCUMENTS: Record<string, { file: string; displayName: string }> = {
  lebenslauf: { file: 'lebenslauf.pdf', displayName: 'Lebenslauf.pdf' },
  zeugnisse: { file: 'zeugnisse.pdf', displayName: 'Zeugnisse.pdf' },
  zertifikate: { file: 'zertifikate.pdf', displayName: 'Zertifikate.pdf' },
  arbeitsnachweise: { file: 'arbeitsnachweise.pdf', displayName: 'Arbeitsnachweise.pdf' },
};

// Stored outside /public and outside app/ on purpose — files here are
// never served as static assets by a guessable URL. The only way to get
// bytes out of this directory is through this route, after the cookie
// check below passes.
const DOCS_DIR = path.join(process.cwd(), 'private-documents', 'cv');

export async function GET(req: NextRequest, { params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const token = req.cookies.get('cv_access')?.value;

  if (!verifyToken(token)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const entry = DOCUMENTS[doc];
  if (!entry) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  try {
    const bytes = await readFile(path.join(DOCS_DIR, entry.file));
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${entry.displayName}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    // File not uploaded yet — honest 404, not a fake/broken download.
    return NextResponse.json({ error: 'file_not_uploaded_yet' }, { status: 404 });
  }
}
