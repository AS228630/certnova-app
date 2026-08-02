import { createClient } from '@supabase/supabase-js';

/**
 * Verifies that a request genuinely comes from an authenticated admin.
 *
 * This is the real (server-side) authorization check that
 * components/admin/AdminGuard.tsx explicitly says is still missing —
 * that guard only controls what the *page* renders in the browser; it
 * does nothing to protect the API routes themselves. Every admin API
 * route must call this before touching real data.
 *
 * Uses ADMIN_EMAILS (server-only, NOT NEXT_PUBLIC_ADMIN_EMAILS — that
 * one is intentionally public/client-readable and only used for the UI
 * redirect, never for real authorization).
 */
export async function requireAdmin(accessToken: string | undefined | null): Promise<
  { ok: true; email: string } | { ok: false; status: number; error: string }
> {
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

  return { ok: true, email };
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
  );
}
