import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';
import { validateUploadFile, extensionForMimeType } from '@/lib/candidate/fileValidation';

const BUCKET = 'candidate-private';

/**
 * PHASE 5 IMPLEMENTATION — document upload.
 *
 * Requires migration 035 (candidate_documents.storage_deleted_at) and
 * the candidate-private bucket (also created by 035) to actually be
 * live. Until then this fails with a real Postgres/Storage error —
 * same pattern as every other "written ahead of its migration"
 * route in this project, not a silent mock.
 *
 * Orphan-file handling (PHASE 5 design section 11): upload to Storage
 * first, then insert the metadata row; if the insert fails, the
 * just-uploaded Storage object is deleted before returning the error.
 */
export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const formData = await req.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: 'INVALID_FORM_DATA' }, { status: 400 });

  const file = formData.get('file');
  const candidateId = formData.get('candidateId');
  const title = formData.get('title');
  const documentType = formData.get('documentType');
  const visibility = formData.get('visibility') === 'public' ? 'public' : 'private';
  const allowDownload = formData.get('allowDownload') === 'true';
  const description = formData.get('description');

  if (!(file instanceof File) || typeof candidateId !== 'string' || typeof title !== 'string' || !candidateId || !title) {
    return NextResponse.json({ error: 'FILE_CANDIDATE_ID_TITLE_REQUIRED' }, { status: 400 });
  }

  const validation = await validateUploadFile(file);
  if (!validation.ok) return NextResponse.json({ error: validation.error }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const documentId = randomUUID();
  const ext = extensionForMimeType(file.type);
  const storagePath = `candidate/${candidateId}/documents/${documentId}/${randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(storagePath, file, {
    contentType: file.type,
    upsert: false,
  });
  if (uploadError) {
    return NextResponse.json({ error: 'UPLOAD_FAILED', detail: uploadError.message }, { status: 500 });
  }

  const { data, error: dbError } = await supabase
    .from('candidate_documents')
    .insert({
      id: documentId,
      candidate_id: candidateId,
      title,
      description: typeof description === 'string' ? description : null,
      document_type: typeof documentType === 'string' ? documentType : null,
      storage_path: storagePath,
      file_name: file.name,
      mime_type: file.type,
      file_size_bytes: file.size,
      visibility,
      allow_download: allowDownload,
    })
    .select()
    .single();

  if (dbError) {
    // Orphan-file cleanup: the DB row never got created, so the file
    // that was just uploaded must not be left behind (PHASE 5 design
    // section 11).
    await supabase.storage.from(BUCKET).remove([storagePath]);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'DOCUMENT_UPLOADED',
    resourceType: 'candidate_document',
    resourceId: data.id,
    metadata: { title, mimeType: file.type, fileSizeBytes: file.size, visibility },
  });

  return NextResponse.json({ document: data }, { status: 201 });
}
