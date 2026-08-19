import { createClient } from "@supabase/supabase-js";

// Shared abuse guard for API routes, backed by the rate_limit_hits table
// (see supabase/migrations/040_rate_limits.sql) so it works correctly
// across every serverless instance — an in-memory counter would reset
// per cold start and under-count real abuse. Same pattern already used
// by app/api/ai-coach/route.ts for its own per-user limit, generalized
// here so other routes don't each reinvent it.
function getAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
}

/**
 * Records a hit under `key` and reports whether the caller is still
 * within `limit` hits over the trailing `windowMinutes`. Fails open
 * (allowed: true) if the rate-limit table itself can't be reached —
 * a transient DB hiccup should never be the reason a legitimate user
 * gets blocked from checkout or login.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMinutes: number
): Promise<{ allowed: boolean }> {
  try {
    const admin = getAdmin();
    const windowStart = new Date(Date.now() - windowMinutes * 60_000).toISOString();

    const { count, error: countError } = await admin
      .from("rate_limit_hits")
      .select("id", { count: "exact", head: true })
      .eq("key", key)
      .gte("created_at", windowStart);

    if (countError) return { allowed: true };
    if ((count ?? 0) >= limit) return { allowed: false };

    await admin.from("rate_limit_hits").insert({ key });
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

/** Best-effort client IP extraction for rate-limit keys on routes that
 * have no authenticated user to key on instead (e.g. cv-access, which
 * is checked before any login exists). Vercel sets x-forwarded-for. */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") ?? "unknown";
}
