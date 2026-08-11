import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'admin_users.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const supabase = getSupabaseAdmin();

  const { data: target, error: targetError } = await supabase
    .from('admin_users')
    .select('id, user_id, role')
    .eq('id', id)
    .maybeSingle();
  if (targetError) return NextResponse.json({ error: targetError.message }, { status: 500 });
  if (!target) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });

  if (target.user_id === auth.userId) {
    return NextResponse.json({ error: 'CANNOT_REMOVE_YOURSELF' }, { status: 400 });
  }

  if (target.role === 'SUPER_ADMIN') {
    const { count } = await supabase
      .from('admin_users')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'SUPER_ADMIN');
    if ((count ?? 0) <= 1) {
      return NextResponse.json({ error: 'CANNOT_REMOVE_LAST_SUPER_ADMIN' }, { status: 400 });
    }
  }

  const { error } = await supabase.from('admin_users').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ removed: true });
}
