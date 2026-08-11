import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { logAudit } from "@/lib/admin/audit";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? "");
}

// Uses the Supabase service role key (server-only, never exposed to the
// browser) because writing subscription status must bypass the RLS
// policy that otherwise only allows users to read (not write) their own
// row — a paid plan must only ever be granted by a verified Stripe
// event, never by a client-side request.
function getSupabaseAdmin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "", process.env.SUPABASE_SERVICE_ROLE_KEY ?? "");
}

// Stripe moved `current_period_end` off the top-level Subscription object
// and onto each subscription item in newer API versions. Read it from
// whichever location has it, and never hand toISOString() a bad value —
// an unexpected shape here should skip the field, not crash the whole
// webhook (which would otherwise leave the paid status stuck as free).
function extractPeriodEndIso(subscription: Stripe.Subscription): string | null {
  const topLevel = (subscription as unknown as { current_period_end?: number }).current_period_end;
  const itemLevel = (
    subscription.items?.data?.[0] as unknown as { current_period_end?: number } | undefined
  )?.current_period_end;
  const periodEnd = topLevel ?? itemLevel;

  if (typeof periodEnd !== "number" || !Number.isFinite(periodEnd)) {
    return null;
  }
  const date = new Date(periodEnd * 1000);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    // Verifies the request genuinely came from Stripe (not spoofed) —
    // critical, since this endpoint grants paid access.
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.client_reference_id;
        if (!userId || !session.subscription) break;

        const subscription = await getStripe().subscriptions.retrieve(session.subscription as string);
        const priceAmount = subscription.items.data[0]?.price?.unit_amount ?? 0;
        const plan = priceAmount >= 15000 ? "yearly" : "monthly";

        const row: Record<string, unknown> = {
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: subscription.id,
          plan,
          status: "active",
          amount_paid_cents: priceAmount,
          updated_at: new Date().toISOString(),
        };
        const periodEndIso = extractPeriodEndIso(subscription);
        if (periodEndIso) row.current_period_end = periodEndIso;

        // If a teacher coupon was applied, record the referral and
        // compute the commission from that coupon's *current* rate at
        // the time of this specific purchase — not recalculated later,
        // so a future rate change never rewrites past commissions.
        //
        // This also writes the real referrals + commission_ledger rows
        // (migration 030) — the historical, immutable record of this
        // redemption, independent of subscriptions ever being
        // overwritten by a later renewal. Both inserts are safe against
        // Stripe redelivering this same webhook event twice:
        //   - referrals is unique on student_user_id, so a second
        //     attempt for the same student hits that constraint (error
        //     23505) and is caught/ignored below — one locked
        //     attribution per student, exactly as required.
        //   - commission_ledger is unique on (stripe_event_id, type),
        //     using this event's own real event.id, so a redelivered
        //     webhook can never double-credit the teacher.
        const teacherCouponId = subscription.metadata?.teacher_coupon_id;
        if (teacherCouponId) {
          const admin = getSupabaseAdmin();
          const { data: coupon } = await admin
            .from("teacher_coupons")
            .select("commission_rate, teacher_id, code, used_count")
            .eq("id", teacherCouponId)
            .maybeSingle();

          const bonusDaysGranted = Number(subscription.metadata?.bonus_days_granted ?? 0);
          const commissionCents = coupon ? Math.round(priceAmount * Number(coupon.commission_rate)) : 0;

          row.teacher_coupon_id = teacherCouponId;
          row.applied_coupon_code = subscription.metadata?.coupon_code ?? null;
          row.bonus_days_granted = bonusDaysGranted;
          row.teacher_commission_cents = commissionCents;

          if (coupon?.teacher_id) {
            const { data: referral, error: referralError } = await admin
              .from("referrals")
              .insert({
                student_user_id: userId,
                teacher_id: coupon.teacher_id,
                teacher_coupon_id: teacherCouponId,
                code_at_redemption: subscription.metadata?.coupon_code ?? coupon.code,
                bonus_days_granted: bonusDaysGranted,
              })
              .select("id")
              .single();

            // 23505 = unique_violation: this student already has a
            // locked referral (from an earlier redemption or a
            // redelivered webhook). Not an error — the correct,
            // expected outcome of "one referral attribution per
            // student, ever". Any other error is logged but doesn't
            // block granting the subscription itself.
            if (referralError && referralError.code !== "23505") {
              console.error("referrals insert error:", referralError);
            }

            if (referral) {
              row.referral_id = referral.id;

              // Best-effort increment — acceptable read-then-write at
              // this project's current scale (see docs/REFERRAL_COMMISSION_MIGRATION_PLAN.md
              // section 7 on not over-engineering for scale that
              // doesn't exist yet); revisit with an atomic RPC if
              // concurrent redemptions of the same code become common.
              await admin
                .from("teacher_coupons")
                .update({ used_count: (coupon.used_count ?? 0) + 1 })
                .eq("id", teacherCouponId);

              const { error: ledgerError } = await admin.from("commission_ledger").insert({
                teacher_id: coupon.teacher_id,
                student_user_id: userId,
                referral_id: referral.id,
                stripe_event_id: event.id,
                stripe_session_or_invoice_id: session.id,
                gross_amount_cents: priceAmount,
                commission_rate: coupon.commission_rate,
                commission_amount_cents: commissionCents,
                type: "EARNED",
                status: "PENDING",
              });
              if (ledgerError && ledgerError.code !== "23505") {
                console.error("commission_ledger insert error:", ledgerError);
              }
            }
          }
        }

        await getSupabaseAdmin().from("subscriptions").upsert(row, { onConflict: "user_id" });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.supabase_user_id;
        if (!userId) break;

        const updateRow: Record<string, unknown> = {
          status: subscription.status === "active" ? "active" : subscription.status === "past_due" ? "past_due" : "canceled",
          updated_at: new Date().toISOString(),
        };
        const periodEndIso = extractPeriodEndIso(subscription);
        if (periodEndIso) updateRow.current_period_end = periodEndIso;

        await getSupabaseAdmin()
          .from("subscriptions")
          .update(updateRow)
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await getSupabaseAdmin()
          .from("subscriptions")
          .update({ plan: "free", status: "canceled", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", subscription.id);
        break;
      }

      // Refund → Commission Reversal (senior advisor priority order,
      // Phase 4: after RBAC, Audit Log, and the Teacher Detail Page).
      //
      // A real charge was refunded — if that charge belonged to a
      // student who was referred by a teacher and already earned that
      // teacher a commission, write a REVERSAL row. The original
      // EARNED row is never touched or deleted, per the advisor's
      // explicit "ledger, not a single mutable balance" requirement —
      // commission_ledger stays a real append-only history, and every
      // balance (teacher detail page, Dozenten-Codes "ausstehend")
      // is computed by aggregating EARNED − REVERSAL, never by editing
      // a stored total.
      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id;
        if (!customerId || !charge.amount || !charge.amount_refunded) break;

        const admin = getSupabaseAdmin();

        const { data: sub } = await admin
          .from("subscriptions")
          .select("user_id")
          .eq("stripe_customer_id", customerId)
          .maybeSingle();
        if (!sub?.user_id) break; // not a referred/tracked purchase — nothing to reverse

        const { data: referral } = await admin
          .from("referrals")
          .select("id, teacher_id")
          .eq("student_user_id", sub.user_id)
          .maybeSingle();
        if (!referral) break; // this student was never referred — no commission exists to reverse

        const { data: ledgerRows } = await admin
          .from("commission_ledger")
          .select("id, type, commission_amount_cents")
          .eq("referral_id", referral.id);

        const earnedCents = (ledgerRows ?? [])
          .filter((l) => l.type === "EARNED")
          .reduce((sum, l) => sum + l.commission_amount_cents, 0);
        const alreadyReversedCents = (ledgerRows ?? [])
          .filter((l) => l.type === "REVERSAL")
          .reduce((sum, l) => sum + Math.abs(l.commission_amount_cents), 0);
        const remainingEarnedCents = earnedCents - alreadyReversedCents;
        if (remainingEarnedCents <= 0) break; // nothing left to reverse

        // Proportional to how much of the original charge was actually
        // refunded (handles partial refunds correctly, per the
        // advisor's explicit partial-refund example), capped so this
        // can never reverse more than what's actually still earned.
        const refundRatio = charge.amount_refunded / charge.amount;
        const targetReversedCents = Math.round(earnedCents * refundRatio);
        const reversalCents = Math.min(remainingEarnedCents, Math.max(0, targetReversedCents - alreadyReversedCents));
        if (reversalCents <= 0) break;

        const { error: reversalError } = await admin.from("commission_ledger").insert({
          teacher_id: referral.teacher_id,
          student_user_id: sub.user_id,
          referral_id: referral.id,
          stripe_event_id: event.id,
          stripe_session_or_invoice_id: charge.id,
          gross_amount_cents: -charge.amount_refunded,
          commission_rate: earnedCents > 0 ? reversalCents / earnedCents : 0,
          commission_amount_cents: -reversalCents,
          type: "REVERSAL",
          status: "REVERSED",
        });
        // Unique on (stripe_event_id, type) — a redelivered charge.refunded
        // event hits this constraint and is safely ignored (23505),
        // same idempotency pattern as the EARNED insert above.
        if (reversalError && reversalError.code !== "23505") {
          console.error("commission_ledger reversal insert error:", reversalError);
        } else if (!reversalError) {
          // System-triggered, not an admin action — actorId is null,
          // actorEmail records the source, matching the advisor's
          // audit event list (COMMISSION_REVERSED) even though no
          // admin was logged in when this happened.
          await logAudit({
            actorId: null,
            actorEmail: "stripe-webhook",
            action: "COMMISSION_REVERSED",
            resourceType: "commission_ledger",
            resourceId: referral.id,
            metadata: { teacherId: referral.teacher_id, reversalCents, chargeId: charge.id },
          });
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
