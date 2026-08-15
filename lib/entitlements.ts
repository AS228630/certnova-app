import { createClient } from "@supabase/supabase-js";

export type Entitlement = {
  userId: string | null;
  /** True only once a real "active" paid row has been read from the
   * subscriptions table — never assumed, never defaulted to true. */
  isPro: boolean;
};

const GUEST_ENTITLEMENT: Entitlement = { userId: null, isPro: false };

/**
 * Resolves what a request is actually entitled to, purely from a
 * Supabase access token sent by the client — a client-supplied boolean
 * ("amIPremium: true") is never trusted. Mirrors the exact verification
 * pattern already used in /api/create-checkout-session:
 *   1. The anon-key client asks Supabase Auth who this token belongs to.
 *   2. The service-role client reads that user's real row in the
 *      `subscriptions` table (RLS restricts normal reads to
 *      auth.uid() = user_id, so a server-side service-role read is
 *      needed here to look the user up by id).
 * A missing/invalid token, or no active paid subscription row, both
 * resolve to isPro:false — the same honest-default behavior already
 * used by subscriptionStore.ts on the client.
 *
 * This is the single source of truth every gated API route should call
 * — no route should re-implement its own premium check.
 */
export async function resolveEntitlement(accessToken: string | null | undefined): Promise<Entitlement> {
  if (!accessToken) return GUEST_ENTITLEMENT;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  const authClient = createClient(supabaseUrl, anonKey);
  const {
    data: { user },
    error: userError,
  } = await authClient.auth.getUser(accessToken);

  if (userError || !user) return GUEST_ENTITLEMENT;

  const admin = createClient(supabaseUrl, serviceRoleKey);
  const { data: sub } = await admin
    .from("subscriptions")
    .select("plan, status")
    .eq("user_id", user.id)
    .maybeSingle();

  const isPro = !!sub && sub.plan !== "free" && sub.status === "active";
  return { userId: user.id, isPro };
}
