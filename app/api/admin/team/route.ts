import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

const VALID_ROLES = ['SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN', 'SUPPORT', 'AUDITOR'];

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'admin_users.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id, user_id, email, role, created_at')
    .order('created_at', { ascending: true });

  if (error) {
    // migration 031 not run yet — tell the truth, don't pretend an empty list.
    return NextResponse.json({ error: 'RBAC_NOT_INSTALLED', detail: error.message }, { status: 503 });
  }

  return NextResponse.json({ admins: data });
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'admin_users.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  const email = String(body?.email ?? '').trim().toLowerCase();
  const role = String(body?.role ?? '');

  if (!email) return NextResponse.json({ error: 'EMAIL_REQUIRED' }, { status: 400 });
  if (!VALID_ROLES.includes(role)) return NextResponse.json({ error: 'INVALID_ROLE' }, { status: 400 });

  const supabase = getSupabaseAdmin();

  // The person being granted a role must already have a real
  // CertCoach account (student or teacher account both work — this
  // just elevates an existing auth.users row, it never creates one).
  const { data: users, error: userError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (userError) return NextResponse.json({ error: userError.message }, { status: 500 });
  const targetUser = users.users.find((u) => u.email?.toLowerCase() === email);
  if (!targetUser) {
    return NextResponse.json({ error: 'NO_ACCOUNT_WITH_THIS_EMAIL' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('admin_users')
    .upsert(
      { user_id: targetUser.id, email, role, created_by: auth.userId, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ admin: data }, { status: 201 });
}
