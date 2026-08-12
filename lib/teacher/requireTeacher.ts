import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * The teacher-facing equivalent of lib/admin/requireAdmin.ts — verifies
 * a request comes from an authenticated user who is ALSO a teacher
 * with a real login (teachers.user_id), and resolves their own
 * teacher_id server-side.
 *
 * This is the single most important file in the whole Teacher Portal,
 * per the advisor's explicit "golden rule": role alone is not enough,
 * every query must additionally be scoped to
 * requested_resource.teacher_id === this teacher's own id. Every
 * app/api/teacher/* route below calls this first and uses the
 * returned teacherId to filter every query — it NEVER trusts a
 * teacherId passed in from the client (query param, body, etc.),
 * because that's exactly the "Ahmad edits the URL to see Sarah's
 * data" attack this function exists to prevent.
 */

type TeacherOk = { ok: true; userId: string; teacherId: string; teacherName: string };
type TeacherFail = { ok: false; status: number; error: string };

export async function requireTeacher(accessToken: string | undefined | null): Promise<TeacherOk | TeacherFail> {
  if (!accessToken) {
    return { ok: false, status: 401, error: 'not_authenticated' };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user) {
    return { ok: false, status: 401, error: 'not_authenticated' };
  }

  const admin = getSupabaseAdmin();
  const { data: teacher, error: teacherError } = await admin
    .from('teachers')
    .select('id, name, status')
    .eq('user_id', data.user.id)
    .maybeSingle();

  if (teacherError) {
    return { ok: false, status: 500, error: 'lookup_failed' };
  }
  if (!teacher) {
    // This account is authenticated but is not a teacher account at
    // all (e.g. a regular student) — fail closed, not "show empty
    // portal". A student must never see the Teacher Portal shell.
    return { ok: false, status: 403, error: 'not_a_teacher' };
  }
  if (teacher.status !== 'active') {
    return { ok: false, status: 403, error: 'teacher_inactive' };
  }

  return { ok: true, userId: data.user.id, teacherId: teacher.id, teacherName: teacher.name };
}
