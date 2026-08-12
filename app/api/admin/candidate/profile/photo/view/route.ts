import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

const BUCKET = 'candidate-private';
const SIGNED_URL_EXPIRY_SECONDS = 60 * 60; // 1 hour — a photo is low-risk to view repeatedly during a session, unlike a confidential document

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: profile, error } = await supabase.from('candidate_profiles').select('profile_photo_path').limit(1).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!profile?.profile_photo_path) return NextResponse.json({ url: null });

  const { data: signed, error: signError } = await supabase.storage.from(BUCKET).createSignedUrl(profile.profile_photo_path, SIGNED_URL_EXPIRY_SECONDS);
  if (signError || !signed) return NextResponse.json({ error: signError?.message ?? 'SIGNED_URL_FAILED' }, { status: 500 });

  return NextResponse.json({ url: signed.signedUrl });
}
