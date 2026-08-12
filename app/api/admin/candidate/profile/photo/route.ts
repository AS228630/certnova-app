import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { validateUploadFile, extensionForMimeType } from '@/lib/candidate/fileValidation';

const BUCKET = 'candidate-private';

/**
 * Profile photo upload. Same bucket, same validation, same
 * signed-URL-only access pattern as documents — per PHASE 5 FINAL
 * REVIEW's single-bucket decision, a photo is not a special case.
 * Replaces any previous photo (old Storage object removed after the
 * new one is confirmed uploaded and the profile row updated, same
 * ordering as document replace).
 */
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: profile, error: fetchError } = await supabase.from('candidate_profiles').select('id, profile_photo_path').limit(1).maybeSingle();
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!profile) return NextResponse.json({ error: 'NO_PROFILE_YET' }, { status: 400 });

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'FILE_REQUIRED' }, { status: 400 });

  const validation = await validateUploadFile(file);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'MUST_BE_AN_IMAGE' }, { status: 400 });

  const ext = extensionForMimeType(file.type);
  const newPath = `candidate/${profile.id}/photo/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, file, { contentType: file.type, upsert: false });
  if (uploadError) return NextResponse.json({ error: 'UPLOAD_FAILED', detail: uploadError.message }, { status: 500 });

  const { data, error: dbError } = await supabase
    .from('candidate_profiles')
    .update({ profile_photo_path: newPath, updated_at: new Date().toISOString() })
    .eq('id', profile.id)
    .select()
    .single();

  if (dbError) {
    await supabase.storage.from(BUCKET).remove([newPath]); // orphan cleanup
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (profile.profile_photo_path) {
    await supabase.storage.from(BUCKET).remove([profile.profile_photo_path]);
  }

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'PROFILE_PHOTO_UPDATED',
    resourceType: 'candidate_profile',
    resourceId: profile.id,
  });

  return NextResponse.json({ profile: data });
}
