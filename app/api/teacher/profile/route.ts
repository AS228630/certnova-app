import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher Portal — STEP 10 (Profile). Deliberately GET-only: per the
 * advisor's spec section 9, a teacher must never be able to change
 * teacher_id, commission_rate, commission status, or referral
 * ownership themselves — those stay Admin/business-rule controlled.
 * This route doesn't even expose a way to attempt it.
 */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: teacher, error } = await supabase
    .from('teachers')
    .select('name, email, status, access_valid_until, created_at')
    .eq('id', auth.teacherId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ teacher });
}
