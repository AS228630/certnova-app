import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';

const BUCKET = 'candidate-private';

/** Certification logos aren't confidential — any recruiter who can
 * already see the public certifications list (via a valid token) can
 * see the logos too. Still resolved through a signed URL, never a
 * bare Storage path, matching every other file in this system. */
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string; id: string }> }) {
  const { token, id } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const supabase = getSupabaseAdmin();
  const { data: cert, error } = await supabase
    .from('candidate_certifications')
    .select('logo_url, candidate_id, is_public')
    .eq('id', id)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!cert || cert.candidate_id !== verified.link.candidate_id || !cert.is_public) {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
  if (!cert.logo_url || cert.logo_url.startsWith('http')) return NextResponse.json({ url: cert?.logo_url ?? null });

  const { data: signed, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(cert.logo_url, 60 * 60);
  if (signError || !signed) return NextResponse.json({ error: signError?.message ?? 'SIGNED_URL_FAILED' }, { status: 500 });
  return NextResponse.json({ url: signed.signedUrl });
}
