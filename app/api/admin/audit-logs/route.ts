import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'audit_logs.view');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('audit_logs')
    .select('id, actor_email, action, resource_type, resource_id, metadata, created_at')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) {
    // migration 032 not run yet — say so honestly, don't show a fake empty log.
    return NextResponse.json({ error: 'AUDIT_LOG_NOT_INSTALLED', detail: error.message }, { status: 503 });
  }

  return NextResponse.json({ entries: data });
}
