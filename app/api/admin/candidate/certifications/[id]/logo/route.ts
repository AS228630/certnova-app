import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { validateUploadFile, extensionForMimeType } from '@/lib/candidate/fileValidation';

const BUCKET = 'candidate-private';

/**
 * Certification logo upload — lets the owner upload a real badge
 * screenshot/image directly (e.g. from their Credly/Microsoft Learn/
 * PeopleCert account) instead of having to locate and paste an
 * external URL. Same bucket, same validation, same replace-ordering
 * as documents and the profile photo — per the single-bucket
 * decision, a certification logo isn't a special case.
 *
 * Stores the STORAGE PATH (not a public URL) in
 * candidate_certifications.logo_url — the frontend distinguishes an
 * external URL (starts with http) from an internal storage path and
 * resolves the latter to a fresh signed URL via the logo-view route,
 * since the bucket is private and has no permanent public URLs.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { data: cert, error: fetchError } = await supabase
    .from('candidate_certifications')
    .select('id, candidate_id, logo_url')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!cert) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'FILE_REQUIRED' }, { status: 400 });

  const validation = await validateUploadFile(file);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });
  if (!file.type.startsWith('image/')) return NextResponse.json({ error: 'MUST_BE_AN_IMAGE' }, { status: 400 });

  const ext = extensionForMimeType(file.type);
  const newPath = `candidate/${cert.candidate_id}/certification-logos/${id}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newPath, file, { contentType: file.type, upsert: false });
  if (uploadError) return NextResponse.json({ error: 'UPLOAD_FAILED', detail: uploadError.message }, { status: 500 });

  const { data, error: dbError } = await supabase
    .from('candidate_certifications')
    .update({ logo_url: newPath, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (dbError) {
    await supabase.storage.from(BUCKET).remove([newPath]); // orphan cleanup
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Replace ordering: only remove the OLD logo file after the new one
  // is uploaded and the DB row is confirmed updated — and only if the
  // old value actually was an internal storage path, not an external
  // URL (which isn't ours to delete).
  if (cert.logo_url && !cert.logo_url.startsWith('http')) {
    await supabase.storage.from(BUCKET).remove([cert.logo_url]);
  }

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_CERTIFICATION_LOGO_UPLOADED',
    resourceType: 'candidate_certification',
    resourceId: id,
  });

  return NextResponse.json({ certification: data });
}
