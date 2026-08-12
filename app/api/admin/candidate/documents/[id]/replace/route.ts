import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { validateUploadFile, extensionForMimeType } from '@/lib/candidate/fileValidation';

const BUCKET = 'candidate-private';

/**
 * Replace a document's file (PHASE 5 design section 7): upload the
 * new file to a NEW storage_path first, update the database row to
 * point at it, and only delete the OLD Storage object after both of
 * those succeed — never delete-then-upload, which would leave the
 * document with no file at all if the new upload then failed.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchError } = await supabase
    .from('candidate_documents')
    .select('id, candidate_id, storage_path, deleted_at')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!existing) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  if (existing.deleted_at) return NextResponse.json({ error: 'CANNOT_REPLACE_A_DELETED_DOCUMENT' }, { status: 400 });

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');
  if (!(file instanceof File)) return NextResponse.json({ error: 'FILE_REQUIRED' }, { status: 400 });

  const validation = await validateUploadFile(file);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });

  const ext = extensionForMimeType(file.type);
  const newStoragePath = `candidate/${existing.candidate_id}/documents/${id}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(newStoragePath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ error: 'UPLOAD_FAILED', detail: uploadError.message }, { status: 500 });

  const { data, error: dbError } = await supabase
    .from('candidate_documents')
    .update({
      storage_path: newStoragePath,
      file_name: file.name,
      mime_type: file.type,
      file_size_bytes: file.size,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (dbError) {
    // The DB update failed — clean up the new file we just uploaded
    // (orphan-file handling), leave the old file/row untouched so the
    // document is never left broken.
    await supabase.storage.from(BUCKET).remove([newStoragePath]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  // Only now, after both the new upload and the DB update are
  // confirmed, remove the old file.
  await supabase.storage.from(BUCKET).remove([existing.storage_path]);

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'DOCUMENT_REPLACED',
    resourceType: 'candidate_document',
    resourceId: id,
    metadata: { newFileName: file.name, newMimeType: file.type, newFileSizeBytes: file.size },
  });

  return NextResponse.json({ document: data });
}
