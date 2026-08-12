# CertCoach — E2E Verification: Status (paused, resume from here)

Last updated: Aug 12 2026. Read this before touching E2E testing again —
it tells you exactly which of the advisor's 20 test steps are actually
verified with real evidence, and exactly what's half-set-up so you
don't have to start over.

Companion doc: `docs/ADMIN_PANEL_AND_REFERRAL_SYSTEM_STATUS.md` (what's
built). This file is specifically about *proving* it works, per the
senior advisor's Aug 11-12 2026 directive: do not start Reports/Export
until a full E2E chain (teacher → code → student → purchase →
commission → refund → payout → audit → RBAC → teacher-portal-isolation)
is verified with real database evidence, not assumed.

## Ground rule for this whole effort

Nothing gets marked PASS without a screenshot or a query result as
evidence. A step being "coded" is not the same as a step being
"verified" — this file only records what's actually been proven.

## Test fixtures already created (real, in the production database)

- Teacher: **"E2E Test Teacher"**
- Code: **"E2ETEST10"** (10 bonus days, 50% commission, unlimited uses)
- Test student account: created and logged into by the owner (separate
  from the admin/owner account) — exact email not recorded here
  (private), owner has it.

These are real rows in the same production database (per the advisor's
explicit "one database, single source of truth" rule — no second
database was created). They are clearly named `E2E Test Teacher` /
`E2ETEST10` specifically so they're easy to find and, later, safe to
delete once testing is done.

## Status of each of the advisor's 20 test steps

| # | Step | Status | Evidence |
|---|---|---|---|
| E2E-01 | Create a test Teacher | ✅ **PASS** | Screenshot: Dozenten-Codes table shows "E2E Test Teacher", Gesamt Codes count went 4→5 |
| E2E-02 | Create a unique Teacher Referral Code | ✅ **PASS** | Same screenshot: code "E2ETEST10", +10 Tage, 50%, created 12.8.2026 |
| E2E-03 | Create a test Student | ✅ **PASS** | Owner confirmed logging into a separate test student account |
| E2E-04 | Register the Student through the Referral Code (purchase/redeem) | 🔴 **BLOCKED** | See "Why E2E-04 is blocked" below — not yet re-attempted |
| E2E-05 | Verify Student → Referral Code → Teacher relationship | ⏳ not yet run | depends on E2E-04 |
| E2E-06 | Verify the +10 day referral bonus | ⏳ not yet run | depends on E2E-04 |
| E2E-07 | Verify FIRST_PURCHASE commission | ⏳ not yet run | depends on E2E-04 |
| E2E-08 | Verify 50% commission calculation | ⏳ not yet run | depends on E2E-04 |
| E2E-09 | Verify commission_ledger entry | ⏳ not yet run | depends on E2E-04 |
| E2E-10 | Verify Idempotency | ⏳ not yet run | depends on E2E-04 |
| E2E-11 | Refund | ⏳ not yet run | depends on E2E-04 |
| E2E-12 | Commission Reversal | ⏳ not yet run | depends on E2E-11 |
| E2E-13 | Ledger Integrity (original entry untouched, reversal separate) | ⏳ not yet run | depends on E2E-11 |
| E2E-14 | Payout creation (test/sandbox only) | ⏳ not yet run | — |
| E2E-15 | Payout status transitions | ⏳ not yet run | — |
| E2E-16 | Audit Log entries for every sensitive action | ⏳ not yet run | audit_logs table is live (migration 032 confirmed executed), just not yet checked against real E2E actions |
| E2E-17 | RBAC | ⏳ not yet run | admin_users table is live, owner confirmed as SUPER_ADMIN in the Team & Rollen page — a full RBAC test (e.g. a second role actually being restricted) hasn't been run yet |
| E2E-18 | Teacher Portal | ⚪ **N/A — NOT BUILT** | No separate teacher-facing portal exists; a teacher account only gets regular student-dashboard access. Advisor's explicit instruction: mark this N/A, not PASS, and build the portal later as its own phase if needed |
| E2E-19 | Teacher A cannot access Teacher B's data | ⏳ not yet run | blocked on E2E-18 not existing — there's no teacher-facing surface to test isolation on yet; this would need to be re-scoped to "admin can see Teacher A's data separately from Teacher B's" if the Teacher Portal stays out of scope |
| E2E-20 | Admin can see the complete chain | ⏳ not yet run | depends on E2E-04 through E2E-16 all having real data to show |

## Why E2E-04 is blocked (and what's half-set-up to unblock it)

Attempting the real purchase flow on `certcoach.de/upgrade` with the
Stripe test card (4242 4242 4242 4242) failed with:

> "Your card was declined. Your request was in live mode, but used a
> known test card."

This revealed that **production Stripe is actually in LIVE mode**, not
Test mode (unrelated to anything built in this project's admin/referral
work — this is the payment configuration itself). The owner also
confirmed their real card can't be used either (insufficient funds), so
a real-money purchase isn't a viable way to test.

**Advisor's decision (Aug 12 2026):** do NOT swap Production's Stripe
keys to Test — that would put real users' live payments at risk during
the swap window. Instead, set up a separate Vercel **Preview**
deployment, scoped only to Stripe TEST keys and a TEST webhook, while
Production keeps running on Stripe LIVE, untouched. Same production
database stays the single source of truth for both — no second
database.

### What's actually done toward this

- New git branch `e2e-test-preview` created off `main` at commit
  `5a2bb98` (the tip of main as of Aug 12 2026, includes everything
  through the Payout System phase) and pushed to GitHub. Vercel should
  auto-build this as a Preview deployment.

### What's still needed (owner, when there's time — nothing more for
### the assistant to do until these are done)

1. In Vercel → Settings → Environment Variables, add TEST-scoped
   versions of `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
   and `STRIPE_WEBHOOK_SECRET` — each with Environment set to
   **Preview only** (not Production), so Production's LIVE keys are
   never touched.
2. Find the stable Preview URL for the `e2e-test-preview` branch in
   Vercel (Deployments → the Preview-tagged deployment for that
   branch → Domains — looks like
   `certnova-app-git-e2e-test-preview-<project>.vercel.app`).
3. In Stripe Dashboard, with **Test mode** on, create a new webhook
   endpoint pointed at that Preview URL + `/api/webhooks/stripe`,
   subscribed to at least `checkout.session.completed` and
   `charge.refunded`. Copy its signing secret into the
   `STRIPE_WEBHOOK_SECRET` (Preview-scoped) variable from step 1.
4. Redeploy the `e2e-test-preview` branch so the new env vars take
   effect.
5. Re-attempt E2E-04 against the **Preview URL**, not `certcoach.de` —
   same test card (4242 4242 4242 4242) should now work since that
   deployment is genuinely in Stripe Test mode.

Per the advisor's explicit instruction: Stripe secret keys and webhook
signing secrets should never be pasted into this chat — they go
directly into Vercel's environment variable UI.

## Resuming later

When picking this back up: confirm the 5 steps above are done (ask the
owner, or check Vercel/Stripe directly if the surface allows it), then
continue with E2E-04 on the Preview URL, and work through E2E-05
onward using the same "no PASS without evidence" discipline. Do not
start Reports/Export until this whole table is either PASS or an
explicit, advisor-acknowledged N/A.
