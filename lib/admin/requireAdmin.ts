import { createClient } from '@supabase/supabase-js';

/**
 * Verifies that a request genuinely comes from an authenticated admin,
 * and (RBAC, added per the senior advisor's Aug 11 2026 directive)
 * which role they hold.
 *
 * ADMIN_EMAILS (server-only) is still the coarse "is this person an
 * admin at all" gate — kept for backward compatibility and as a
 * fail-closed baseline. On top of that, admin_users (migration 031)
 * is the real role source. Until 031 has actually been run, the
 * admin_users lookup fails with "relation does not exist" — that is
 * caught below and treated as "role system not installed yet", which
 * defaults everyone already in ADMIN_EMAILS to SUPER_ADMIN so nothing
 * regresses for the current owner mid-transition. Once 031 is live
 * and admin_users has real rows, roles start being enforced for real.
 */

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'FINANCE_ADMIN' | 'SUPPORT' | 'AUDITOR';

export type Permission =
  | 'instructor_code.manage' // create/update/disable codes, create teachers
  | 'teacher_login.manage' // create/renew a teacher's CertCoach login account
  | 'financial.view' // view commission/payout figures
  | 'financial.manage' // approve/reverse commissions, create payouts (not built yet)
  | 'admin_users.manage' // add/remove admins, change roles
  | 'audit_logs.view' // read the append-only audit trail
  | 'candidate_profile.manage'; // manage the private candidate profile / recruiter share links

const ROLE_PERMISSIONS: Record<Permission, AdminRole[]> = {
  'instructor_code.manage': ['SUPER_ADMIN', 'ADMIN'],
  'teacher_login.manage': ['SUPER_ADMIN', 'ADMIN'],
  'financial.view': ['SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN', 'AUDITOR'],
  'financial.manage': ['SUPER_ADMIN', 'FINANCE_ADMIN'],
  'admin_users.manage': ['SUPER_ADMIN'],
  'audit_logs.view': ['SUPER_ADMIN', 'AUDITOR'],
  'candidate_profile.manage': ['SUPER_ADMIN', 'ADMIN'],
};

type AdminOk = { ok: true; email: string; userId: string; role: AdminRole };
type AdminFail = { ok: false; status: number; error: string };

async function resolveRole(supabase: ReturnType<typeof getSupabaseAdmin>, userId: string): Promise<AdminRole> {
  const { data, error } = await supabase
    .from('admin_users')
    .select('role')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    // Table doesn't exist yet (migration 031 not run) or any other
    // lookup problem — fail open to SUPER_ADMIN for anyone who already
    // passed the ADMIN_EMAILS check, matching pre-RBAC behavior
    // exactly. This is intentionally the ONLY place this project ever
    // "fails open" — everywhere else fails closed — because the
    // alternative (fail closed here) would lock the owner out of
    // their own panel the moment this code ships, before they've had
    // a chance to run migration 031.
    return 'SUPER_ADMIN';
  }
  return (data?.role as AdminRole | undefined) ?? 'SUPER_ADMIN';
}

export async function requireAdmin(accessToken: string | undefined | null): Promise<AdminOk | AdminFail> {
  if (!accessToken) {
    return { ok: false, status: 401, error: 'not_authenticated' };
  }

  const allowed = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length === 0) {
    // Fail closed if not configured — never fall back to "allow all".
    return { ok: false, status: 503, error: 'admin_not_configured' };
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
  );
  const { data, error } = await supabase.auth.getUser(accessToken);
  if (error || !data.user?.email) {
    return { ok: false, status: 401, error: 'not_authenticated' };
  }

  const email = data.user.email.toLowerCase();
  if (!allowed.includes(email)) {
    return { ok: false, status: 403, error: 'not_admin' };
  }

  const adminClient = getSupabaseAdmin();
  const role = await resolveRole(adminClient, data.user.id);

  return { ok: true, email, userId: data.user.id, role };
}

/**
 * Same as requireAdmin, but also enforces that the resolved role has
 * the given permission. Per the advisor's explicit instruction, this
 * is the SERVER-SIDE enforcement — hiding a button in the frontend is
 * not authorization; a request that reaches the API directly (e.g.
 * someone calling the endpoint by hand) must be rejected here too.
 */
export async function requirePermission(
  accessToken: string | undefined | null,
  permission: Permission
): Promise<AdminOk | AdminFail> {
  const result = await requireAdmin(accessToken);
  if (!result.ok) return result;
  if (!ROLE_PERMISSIONS[permission].includes(result.role)) {
    return { ok: false, status: 403, error: 'forbidden_role' };
  }
  return result;
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  );
}
