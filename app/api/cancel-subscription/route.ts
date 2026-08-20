import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { cancelSubscriptionSchema } from "@/lib/apiSchemas";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { sendServerEmail } from "@/lib/serverEmail";

// Initialized lazily inside the handler — see create-checkout-session/route.ts
// for why (avoids crashing `next build` when the env var isn't available
// at build-collection time).
function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

function getAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
}

// § 312k BGB requires that the cancellation button itself be reachable
// without a mandatory login (OLG Köln, 10.01.2025 - 6 U 62/24). So this
// endpoint supports two paths to actually identify which contract is
// being cancelled:
//
//   1. Logged in: use the Supabase access token — this alone already
//      proves who the caller is, so cancellation happens immediately,
//      exactly as before.
//
//   2. Not logged in, email only: previously this cancelled the
//      subscription immediately too, on nothing more than the caller
//      *typing* an email address — meaning anyone who knew (or
//      guessed) a customer's account email could cancel their paid
//      subscription. Fixed here with a two-step, email-confirmed flow
//      (see supabase/migrations/041_cancellation_requests.sql): this
//      request creates a pending row and emails a confirmation link;
//      only actually opening that link (proof of inbox access) calls
//      Stripe. See app/api/confirm-cancellation/route.ts for step two.
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json().catch(() => null);
    const parsed = cancelSubscriptionSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    const { accessToken, email } = parsed.data;

    if (!accessToken && email) {
      const ip = getClientIp(req);
      const { allowed } = await checkRateLimit(`cancel-subscription:${ip}`, 5, 60);
      if (!allowed) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 });
      }
    }

    const stripe = getStripe();

    // Path 1: logged in — unchanged, cancels immediately.
    if (accessToken) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
      );
      const {
        data: { user },
      } = await supabase.auth.getUser(accessToken);

      let stripeSubscriptionId: string | null = null;
      if (user) {
        const serviceSupabase = getAdmin();
        const { data: sub } = await serviceSupabase
          .from("subscriptions")
          .select("stripe_subscription_id")
          .eq("user_id", user.id)
          .maybeSingle();
        stripeSubscriptionId = sub?.stripe_subscription_id ?? null;
      }

      if (!stripeSubscriptionId) {
        return NextResponse.json({ error: "no_subscription_found" }, { status: 404 });
      }

      const updated = await stripe.subscriptions.update(stripeSubscriptionId, {
        cancel_at_period_end: true,
      });

      return NextResponse.json({
        success: true,
        cancelAt: updated.cancel_at ? updated.cancel_at * 1000 : null,
      });
    }

    // Path 2: anonymous, email only — find the subscription, but only
    // ever send a confirmation email. Nothing is cancelled in this
    // request.
    if (!email) {
      return NextResponse.json({ error: "no_subscription_found" }, { status: 404 });
    }

    const customers = await stripe.customers.list({ email, limit: 1 });
    const customer = customers.data[0];
    const subs = customer
      ? await stripe.subscriptions.list({ customer: customer.id, status: "active", limit: 1 })
      : null;
    const stripeSubscriptionId = subs?.data[0]?.id ?? null;

    if (!stripeSubscriptionId) {
      return NextResponse.json({ error: "no_subscription_found" }, { status: 404 });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const admin = getAdmin();
    const { error: insertError } = await admin.from("cancellation_requests").insert({
      email,
      stripe_subscription_id: stripeSubscriptionId,
      token_hash: tokenHash,
    });
    if (insertError) {
      return NextResponse.json({ error: "cancel_failed" }, { status: 500 });
    }

    const confirmUrl = `https://www.certcoach.de/kuendigen-bestaetigen?token=${token}`;
    // EMAILJS_CANCELLATION_TEMPLATE_ID must be created by the owner in
    // the EmailJS dashboard (a template distinct from the contact-form
    // one) with at least a {{confirm_url}} variable — see
    // lib/serverEmail.ts for the other one-time setup step required.
    const templateId = process.env.EMAILJS_CANCELLATION_TEMPLATE_ID;
    if (!templateId) {
      return NextResponse.json({ error: "email_not_configured" }, { status: 503 });
    }
    const { ok } = await sendServerEmail(templateId, { to_email: email, confirm_url: confirmUrl });
    if (!ok) {
      return NextResponse.json({ error: "email_failed" }, { status: 500 });
    }

    return NextResponse.json({ pending: true });
  } catch (err) {
    console.error("Cancel subscription error:", err);
    return NextResponse.json({ error: "cancel_failed" }, { status: 500 });
  }
}

