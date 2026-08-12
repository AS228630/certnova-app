import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { verifyShareToken } from '@/lib/candidate/verifyShareLink';

const BUCKET = 'candidate-private';

export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const verified = await verifyShareToken(token);
  if (!verified.ok) return NextResponse.json({ error: verified.error }, { status: verified.status });

  const supabase = getSupabaseAdmin();
  const { data: profile } = await supabase.from('candidate_profiles').select('profile_photo_path').eq('id', verified.link.candidate_id).maybeSingle();
  if (!profile?.profile_photo_path) return NextResponse.json({ url: null });

  const { data: signed } = await supabase.storage.from(BUCKET).createSignedUrl(profile.profile_photo_path, 60 * 60);
  return NextResponse.json({ url: signed?.signedUrl ?? null });
}
