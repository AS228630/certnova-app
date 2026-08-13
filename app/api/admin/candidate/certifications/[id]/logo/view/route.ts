import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

const BUCKET = 'candidate-private';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: cert, error } = await supabase.from('candidate_certifications').select('logo_url').eq('id', id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!cert?.logo_url || cert.logo_url.startsWith('http')) return NextResponse.json({ url: cert?.logo_url ?? null });

  const { data: signed, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(cert.logo_url, 60 * 60);
  if (signError || !signed) return NextResponse.json({ error: signError?.message ?? 'SIGNED_URL_FAILED' }, { status: 500 });
  return NextResponse.json({ url: signed.signedUrl });
}
