import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const map: Record<string, string> = {
    issuer: 'issuer', name: 'name', credentialId: 'credential_id', issueDate: 'issue_date',
    expiryDate: 'expiry_date', verificationUrl: 'verification_url', certificateFileId: 'certificate_file_id',
    badgeFileId: 'badge_file_id', isPublic: 'is_public', sortOrder: 'sort_order',
  };
  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [key, column] of Object.entries(map)) {
    if (body[key] !== undefined) patch[column] = body[key];
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from('candidate_certifications').update(patch).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_CERTIFICATION_UPDATED',
    resourceType: 'candidate_certification',
    resourceId: id,
    metadata: patch,
  });

  return NextResponse.json({ certification: data });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'candidate_profile.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from('candidate_certifications').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'CANDIDATE_CERTIFICATION_REMOVED',
    resourceType: 'candidate_certification',
    resourceId: id,
  });

  return NextResponse.json({ deleted: true });
}
