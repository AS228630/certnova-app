import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Teacher login accounts — a real CertCoach account the admin creates
 * for a teacher, with admin-chosen email/password (the teacher does
 * not self-register) and a complimentary yearly subscription that the
 * admin renews once a year.
 *
 * Depends on migrations/supabase/030_referral_commission.sql
 * (teachers.user_id) — not usable until that migration has actually
 * been run against the live database. This route does not create fake
 * data if it's missing: it will fail with a real Postgres error
 * ("column teachers.user_id does not exist" / "relation teachers does
 * not exist") until then, which is the correct behavior rather than
 * silently succeeding against a schema that isn't there yet.
 *
 * Design choices, matching the rest of the admin API:
 * - Email + password are fully admin-chosen (not the teacher's real
 *   email necessarily) — same "flexible, admin decides" pattern
 *   already used for teacher_coupons.code.
 * - "Complimentary" is represented the same way the rest of this
 *   codebase represents a real vs. free transaction: amount_paid_cents
 *   stays 0/null. No new "is_complimentary" flag needed — a $0
 *   amount on a real subscriptions row already means "free", exactly
 *   like teacher_commission_cents being 0 already means "no
 *   commission" elsewhere in this schema.
 * - Renewal is a deliberate one-a-year admin action (POST again to
 *   the same route with action=renew), not an automated cron job —
 *   consistent with this project's small scale and the Free-Tier
 *   principle of not running unnecessary background jobs.
 */

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'teacher_login.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id: teacherId } = await params;
  const body = await req.json().catch(() => null);
  const action = body?.action === 'renew' ? 'renew' : 'create';

  const supabase = getSupabaseAdmin();

  const { data: teacher, error: teacherError } = await supabase
    .from('teachers')
    .select('id, name, user_id')
    .eq('id', teacherId)
    .maybeSingle();

  if (teacherError) return NextResponse.json({ error: teacherError.message }, { status: 500 });
  if (!teacher) return NextResponse.json({ error: 'TEACHER_NOT_FOUND' }, { status: 404 });

  const newPeriodEnd = new Date(Date.now() + ONE_YEAR_MS).toISOString();

  if (action === 'renew') {
    if (!teacher.user_id) {
      return NextResponse.json({ error: 'TEACHER_HAS_NO_LOGIN_YET' }, { status: 400 });
    }
    const { error: renewError } = await supabase
      .from('subscriptions')
      .update({ current_period_end: newPeriodEnd, status: 'active', updated_at: new Date().toISOString() })
      .eq('user_id', teacher.user_id);
    if (renewError) return NextResponse.json({ error: renewError.message }, { status: 500 });

    await supabase.from('teachers').update({ access_valid_until: newPeriodEnd.slice(0, 10) }).eq('id', teacherId);

    return NextResponse.json({ renewed: true, validUntil: newPeriodEnd });
  }

  // action === 'create'
  if (teacher.user_id) {
    return NextResponse.json({ error: 'TEACHER_ALREADY_HAS_LOGIN' }, { status: 409 });
  }

  const email = String(body?.email ?? '').trim().toLowerCase();
  const password = String(body?.password ?? '');
  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: 'EMAIL_AND_PASSWORD_REQUIRED_MIN_8_CHARS' }, { status: 400 });
  }

  // Real Supabase Auth account — this teacher can log into CertCoach
  // exactly like a student, using these admin-chosen credentials.
  const { data: created, error: createError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createError || !created.user) {
    return NextResponse.json({ error: createError?.message ?? 'AUTH_USER_CREATE_FAILED' }, { status: 500 });
  }

  const userId = created.user.id;

  // Complimentary yearly access: a real subscriptions row, amount_paid_cents
  // left at 0/null so it's honestly "free", not a fabricated payment.
  const { error: subError } = await supabase.from('subscriptions').upsert(
    {
      user_id: userId,
      plan: 'yearly',
      status: 'active',
      current_period_end: newPeriodEnd,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (subError) return NextResponse.json({ error: subError.message }, { status: 500 });

  const { error: linkError } = await supabase
    .from('teachers')
    .update({ user_id: userId, access_valid_until: newPeriodEnd.slice(0, 10) })
    .eq('id', teacherId);
  if (linkError) return NextResponse.json({ error: linkError.message }, { status: 500 });

  return NextResponse.json({ created: true, userId, validUntil: newPeriodEnd }, { status: 201 });
}
