import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { PLAN_PRICES } from "@/lib/stripeConfig";
import { checkRateLimit } from "@/lib/rateLimit";

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
    const { plan, accessToken, widerrufConsent, couponCode, returnTo } = (await req.json()) as {
      plan: "monthly" | "yearly";
      accessToken: string;
      widerrufConsent?: boolean;
      couponCode?: string;
      returnTo?: string;
    };

    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    if (!accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // Without this explicit, recorded consent, the early-expiry clause in
    // § 356 Abs. 4 BGB never applies, and the customer would retain a
    // full 14-day withdrawal right even after we've granted access — so
    // this isn't optional, it's the actual legal basis for selling
    // immediate-access digital subscriptions at all.
    if (!widerrufConsent) {
      return NextResponse.json({ error: "Widerrufsrecht-Zustimmung erforderlich" }, { status: 400 });
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

    // Teacher referral coupon (optional). Looked up server-side with the
    // service role key — never exposed to or trusted from the client,
    // and the code is validated here, not just cosmetically checked in
    // the UI. An explicitly wrong code fails the request rather than
    // silently being ignored, so the person knows to fix it or remove it.
    let teacherCouponId: string | null = null;
    let bonusDays = 0;
    if (couponCode && couponCode.trim()) {
      // Logged-in already, but the coupon code is still guessable by
      // brute force — cap attempts per user so teacher_coupons.code
      // can't be enumerated by scripting this endpoint.
      const { allowed } = await checkRateLimit(`checkout-coupon:${user.id}`, 15, 60);
      if (!allowed) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 });
      }

      const admin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
      );
      const { data: coupon } = await admin
        .from("teacher_coupons")
        .select("id, extra_days, is_active, valid_until, max_uses, used_count")
        .ilike("code", couponCode.trim())
        .maybeSingle();

      if (!coupon || !coupon.is_active) {
        return NextResponse.json({ error: "invalid_coupon" }, { status: 400 });
      }
      if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
        return NextResponse.json({ error: "coupon_expired" }, { status: 400 });
      }
      if (coupon.max_uses !== null && (coupon.used_count ?? 0) >= coupon.max_uses) {
        return NextResponse.json({ error: "coupon_usage_limit_reached" }, { status: 400 });
      }
      teacherCouponId = coupon.id;
      bonusDays = coupon.extra_days;
    }

    const priceInfo = PLAN_PRICES[plan];
    const origin = req.headers.get("origin") ?? "https://www.certcoach.de";

    // returnTo lets a purchase started from a mid-session paywall (a
    // locked Practice section, Lab, or Exam Simulation) resume exactly
    // where the person left off instead of always dropping them on
    // /upgrade — but it's attacker-controllable input, so it's only ever
    // used if it's a real same-site relative path (starts with a single
    // "/", never "//" or an absolute URL), otherwise we fall back to the
    // safe default. The target page itself still re-verifies Premium
    // access server-side via the real subscriptions table before showing
    // any gated content — this only decides where the browser lands.
    const isSafeReturnTo = typeof returnTo === "string" && returnTo.startsWith("/") && !returnTo.startsWith("//");
    const successPath = isSafeReturnTo
      ? `${returnTo}${returnTo.includes("?") ? "&" : "?"}premium_activated=true`
      : "/upgrade?success=true";

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
        // A teacher coupon's "extra days free" is implemented as a
        // Stripe trial period: billing simply starts N days later,
        // rather than us trying to bolt days onto a period after the
        // fact — this is the correct, Stripe-native way to do it.
        ...(bonusDays > 0 ? { trial_period_days: bonusDays } : {}),
        metadata: {
          supabase_user_id: user.id,
          widerruf_consent: "true",
          widerruf_consent_at: new Date().toISOString(),
          ...(teacherCouponId
            ? {
                teacher_coupon_id: teacherCouponId,
                coupon_code: couponCode!.trim().toUpperCase(),
                bonus_days_granted: String(bonusDays),
              }
            : {}),
        },
      },
      success_url: `${origin}${successPath}`,
      cancel_url: `${origin}/upgrade?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout session error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
