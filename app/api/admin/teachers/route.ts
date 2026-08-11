import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Lists real teachers (migration 030) for the "select existing teacher"
 * picker on the Dozenten-Codes page — so a second code for the same
 * teacher links to the same teacher_id instead of creating a second,
 * disconnected teacher row from a slightly different name spelling.
 */
export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: teachers, error } = await supabase
    .from('teachers')
    .select('id, name, email, user_id, access_valid_until, status')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: coupons } = await supabase.from('teacher_coupons').select('teacher_id');
  const codeCounts = new Map<string, number>();
  for (const c of coupons ?? []) {
    if (!c.teacher_id) continue;
    codeCounts.set(c.teacher_id, (codeCounts.get(c.teacher_id) ?? 0) + 1);
  }

  const enriched = (teachers ?? []).map((t) => ({ ...t, codeCount: codeCounts.get(t.id) ?? 0 }));

  return NextResponse.json({ teachers: enriched });
}
