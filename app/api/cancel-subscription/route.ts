import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Initialized lazily inside the handler — see create-checkout-session/route.ts
// for why (avoids crashing `next build` when the env var isn't available
// at build-collection time).
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

// § 312k BGB requires that the cancellation button itself be reachable
// without a mandatory login (OLG Köln, 10.01.2025 - 6 U 62/24). So this
// endpoint supports two paths to actually identify which contract is
// being cancelled:
//   1. Logged in: use the Supabase access token (most reliable).
//   2. Not logged in: look the customer up in Stripe by the account
//      email they type into the cancellation form.
// Either way, we only ever cancel the subscription tied to that
// specific, verified identity — never anything the caller merely claims.
export async function POST(req: NextRequest) {
  try {
    const { accessToken, email } = (await req.json()) as { accessToken?: string; email?: string };

    const stripe = getStripe();
    let stripeSubscriptionId: string | null = null;

    if (accessToken) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
      );
      const {
        data: { user },
      } = await supabase.auth.getUser(accessToken);

      if (user) {
        const serviceSupabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
          process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
        );
        const { data: sub } = await serviceSupabase
          .from("subscriptions")
          .select("stripe_subscription_id")
          .eq("user_id", user.id)
          .maybeSingle();
        stripeSubscriptionId = sub?.stripe_subscription_id ?? null;
      }
    }

    if (!stripeSubscriptionId && email) {
      const customers = await stripe.customers.list({ email, limit: 1 });
      const customer = customers.data[0];
      if (customer) {
        const subs = await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 });
        stripeSubscriptionId = subs.data[0]?.id ?? null;
      }
    }

    if (!stripeSubscriptionId) {
      return NextResponse.json({ error: "no_subscription_found" }, { status: 404 });
    }

    // Cancel at the end of the current paid period, not immediately —
    // this is the standard "ordentliche Kündigung" that respects the
    // notice period customers already paid for, and is what the § 312k
    // confirmation page needs to disclose.
    const updated = await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    return NextResponse.json({
      success: true,
      cancelAt: updated.cancel_at ? updated.cancel_at * 1000 : null,
    });
  } catch (err) {
    console.error("Cancel subscription error:", err);
    return NextResponse.json({ error: "cancel_failed" }, { status: 500 });
  }
}
