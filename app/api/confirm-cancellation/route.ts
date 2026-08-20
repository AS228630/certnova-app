import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

function getAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
}

const confirmSchema = z.object({ token: z.string().trim().min(1).max(200) });

// Step two of the email-confirmed cancellation flow — see
// app/api/cancel-subscription/route.ts and
// supabase/migrations/041_cancellation_requests.sql for the full
// picture. Only reaching this endpoint with the exact token from the
// emailed link actually cancels the Stripe subscription.
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const { allowed } = await checkRateLimit(`confirm-cancellation:${ip}`, 10, 15);
    if (!allowed) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    const rawBody = await req.json().catch(() => null);
    const parsed = confirmSchema.safeParse(rawBody);
    if (!parsed.success) {
      return NextResponse.json({ error: "invalid_token" }, { status: 400 });
    }
    const tokenHash = crypto.createHash("sha256").update(parsed.data.token).digest("hex");

    const admin = getAdmin();
    const { data: request, error: fetchError } = await admin
      .from("cancellation_requests")
      .select("id, stripe_subscription_id, expires_at, confirmed_at")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (fetchError || !request) {
      return NextResponse.json({ error: "invalid_token" }, { status: 404 });
    }
    if (request.confirmed_at) {
      return NextResponse.json({ error: "already_confirmed" }, { status: 409 });
    }
    if (new Date(request.expires_at) < new Date()) {
      return NextResponse.json({ error: "expired" }, { status: 410 });
    }

    const stripe = getStripe();
    const updated = await stripe.subscriptions.update(request.stripe_subscription_id, {
      cancel_at_period_end: true,
    });

    await admin.from("cancellation_requests").update({ confirmed_at: new Date().toISOString() }).eq("id", request.id);

    return NextResponse.json({
      success: true,
      cancelAt: updated.cancel_at ? updated.cancel_at * 1000 : null,
    });
  } catch (err) {
    console.error("Confirm cancellation error:", err);
    return NextResponse.json({ error: "cancel_failed" }, { status: 500 });
  }
}
