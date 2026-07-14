import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PLAN_PRICES } from "@/lib/stripeConfig";

// Initialized lazily (inside the handler, not at module load time) so
// that Next.js collecting page data during `next build` — which runs
// before the environment variable is guaranteed to be available in
// that exact build context — doesn't crash the whole build. The key is
// only actually needed once a real request comes in at runtime.
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

export async function POST(req: NextRequest) {
  try {
    const { plan, accessToken } = (await req.json()) as { plan: "monthly" | "yearly"; accessToken: string };

    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify the user's Supabase session server-side using their access
    // token, so we know exactly who is paying — never trust a user_id
    // sent directly from the client.
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
    );
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);

    if (userError || !user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const priceInfo = PLAN_PRICES[plan];
    const origin = req.headers.get("origin") ?? "https://www.certcoach.de";

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      // Dynamic payment methods: Stripe automatically shows whichever
      // methods (card, PayPal, Klarna) are enabled in the Dashboard —
      // no separate integration needed for each.
      payment_method_types: ["card", "paypal", "klarna"],
      customer_email: user.email ?? undefined,
      client_reference_id: user.id,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `CertCoach Pro — ${priceInfo.label}` },
            unit_amount: priceInfo.amount,
            recurring: { interval: priceInfo.interval },
          },
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: { supabase_user_id: user.id },
      },
      success_url: `${origin}/upgrade?success=true`,
      cancel_url: `${origin}/upgrade?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
