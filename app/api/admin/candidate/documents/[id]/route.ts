import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

const BUCKET = 'candidate-private';

/**
 * PATCH — metadata edits (rename/visibility/allow_download/document_type/
 * description) and RESTORE. Never touches the Storage object.
 *
 * Restore (action: 'restore') is only possible while
 * storage_deleted_at IS NULL — the exact distinction the advisor
 * required: soft-deleted-but-file-still-in-Storage is reversible;
 * once the file has actually been removed from Storage (see DELETE
 * ?permanent=true below), restore is correctly refused.
 */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const supabase = getSupabaseAdmin();

  if (body.action === 'restore') {
    const { data: doc, error: fetchError } = await supabase
      .from('candidate_documents')
      .select('id, storage_deleted_at')
      .eq('id', id)
      .maybeSingle();
    if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
    if (!doc) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    if (doc.storage_deleted_at) {
      // The file itself is gone from Storage — restore is genuinely
      // impossible, not just discouraged. Report this plainly rather
      // than silently "succeeding" with a broken document record.
      return NextResponse.json({ error: 'FILE_PERMANENTLY_DELETED_CANNOT_RESTORE' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('candidate_documents')
      .update({ deleted_at: null, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await logAudit({
      actorId: auth.userId,
      actorEmail: auth.email,
      action: 'DOCUMENT_RESTORED',
      resourceType: 'candidate_document',
      resourceId: id,
    });
    return NextResponse.json({ document: data });
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.title !== undefined) patch.title = body.title;
  if (body.description !== undefined) patch.description = body.description;
  if (body.documentType !== undefined) patch.document_type = body.documentType;
  if (body.visibility !== undefined) patch.visibility = body.visibility === 'public' ? 'public' : 'private';
  if (body.allowDownload !== undefined) patch.allow_download = !!body.allowDownload;

  const { data, error } = await supabase.from('candidate_documents').update(patch).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const action = body.visibility !== undefined ? 'DOCUMENT_VISIBILITY_CHANGED' : 'DOCUMENT_METADATA_UPDATED';
  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action,
    resourceType: 'candidate_document',
    resourceId: id,
    metadata: patch,
  });

  return NextResponse.json({ document: data });
}

/**
 * DELETE — soft-delete by default (deleted_at only, file untouched in
 * Storage, still restorable). `?permanent=true` performs the real,
 * irreversible Storage removal (garbage collection) — a deliberate,
 * separate, explicit action, never automatic (PHASE 5 design section
 * 12 / this message's soft-vs-permanent distinction).
 */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const permanent = req.nextUrl.searchParams.get('permanent') === 'true';
  const supabase = getSupabaseAdmin();

  if (!permanent) {
    const { data, error } = await supabase
      .from('candidate_documents')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await logAudit({
      actorId: auth.userId,
      actorEmail: auth.email,
      action: 'DOCUMENT_DELETED',
      resourceType: 'candidate_document',
      resourceId: id,
      metadata: { permanent: false },
    });
    return NextResponse.json({ document: data, permanent: false });
  }

  // Permanent delete: must already be soft-deleted first — a direct
  // permanent delete on a live document is refused, forcing the
  // two-step process the advisor's message requires (soft-delete,
  // THEN a separate deliberate garbage-collection action).
  const { data: doc, error: fetchError } = await supabase
    .from('candidate_documents')
    .select('id, storage_path, deleted_at, storage_deleted_at')
    .eq('id', id)
    .maybeSingle();
  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 });
  if (!doc) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  if (!doc.deleted_at) return NextResponse.json({ error: 'MUST_SOFT_DELETE_FIRST' }, { status: 400 });
  if (doc.storage_deleted_at) return NextResponse.json({ error: 'ALREADY_PERMANENTLY_DELETED' }, { status: 400 });

  const { error: removeError } = await supabase.storage.from(BUCKET).remove([doc.storage_path]);
  if (removeError) return NextResponse.json({ error: removeError.message }, { status: 500 });

  const { data, error } = await supabase
    .from('candidate_documents')
    .update({ storage_deleted_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'DOCUMENT_PERMANENTLY_DELETED',
    resourceType: 'candidate_document',
    resourceId: id,
    metadata: { permanent: true },
  });

  return NextResponse.json({ document: data, permanent: true });
}
