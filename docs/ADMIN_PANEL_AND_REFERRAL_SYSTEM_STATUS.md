# CertCoach — Admin Panel & Teacher Referral System: Status

Last updated: Aug 11 2026. Read this file first, before touching
`/admin-senmas` or anything under `app/api/admin/`, `app/api/webhooks/stripe`,
or `supabase/migrations/030_referral_commission.sql` — it tells you exactly
what's real, what's still missing, and why things are built the way they
are, so you don't redo work or reintroduce mock data.

Related docs, read in this order if you need the full history:
1. `docs/admin-dashboard-plan.md` — the original Admin Control Center spec.
2. `docs/REFERRAL_COMMISSION_MIGRATION_PLAN.md` — the schema audit and
   migration plan (3 revisions) that led to migration 030.
3. This file — current status of everything built on top of that plan.
4. `docs/E2E_VERIFICATION_STATUS.md` — in-progress, real end-to-end
   verification of the whole chain (teacher → code → student →
   purchase → commission → refund → payout → audit → RBAC), paused
   mid-way — read that file before resuming E2E testing or starting
   Reports/Export.

---

## 1. What's live in production right now

**Database (Supabase):** migrations 001–030 have all actually been run
against the live database (confirmed via a real reconciliation query in
the Supabase SQL Editor on Aug 11 2026 — see
`REFERRAL_COMMISSION_MIGRATION_PLAN.md` section 1a for that query and
why it matters: earlier in this project, migrations 028/029 were
written but never actually executed for weeks, which silently broke
the admin pages that depended on them. **Always verify a migration
actually ran with a real query before building UI against it — do not
trust the repo's migration file list alone.**

**Environment variables (Vercel):** `ADMIN_EMAILS` (server-side) and
`NEXT_PUBLIC_ADMIN_EMAILS` (client-side) are two *separate* variables
that must both be set — this tripped up an earlier session for almost
an hour. Both are currently set to the project owner's email.

**Admin panel (`/admin-senmas`):**
- Dashboard (`page.tsx`) — fully wired to `/api/admin/dashboard-summary`.
  No hardcoded numbers anywhere.
- Dozenten-Codes (`/dozenten-codes`) — fully wired, matches the
  approved design reference (KPI cards, search/filter, info footer).
  No hardcoded numbers; see section 3 below for exactly what each
  number means.
- Studenten, B2B & Gruppen — wired to real data (built in an earlier
  phase, before this file existed).

**Teacher referral system (migration 030 tables: `teachers`,
`referrals`, `commission_ledger`):**
- Admin can create a teacher (free-text name, no fixed pattern) and a
  code (free-text, admin chooses it, DB-enforced unique) via the
  Dozenten-Codes page. A second code for the same teacher links to the
  same `teacher_id` — teacher identity is a real row, not a repeated
  string.
- Admin can create a real login account for a teacher
  (`app/api/admin/teachers/[id]/login`, "Login erstellen" button): a
  real Supabase Auth user, admin-chosen email + password (email only
  needs to be validly *formatted* — `email_confirm: true` means no
  confirmation email is sent, so a placeholder domain like
  `name@certcoach-lehrer.local` works fine). Gets a complimentary
  yearly subscription (`plan='yearly'`, `status='active'`,
  `amount_paid_cents` stays 0/null so it's honestly "free"). Renewal
  is a deliberate once-a-year manual admin action
  (`action: 'renew'` on the same route), not a cron job.
- Student redemption flow: student enters a teacher's code at
  `/upgrade` → Stripe Checkout uses `trial_period_days` = the code's
  `extra_days`, so a 30-day plan becomes 40 days of access before the
  first real charge (`30 + 10 = 40`, exactly the business rule).
  `create-checkout-session` rejects an inactive, expired
  (`valid_until`), or usage-capped (`max_uses`) code before Stripe is
  even involved.
- On successful payment (`checkout.session.completed` webhook):
  writes a real `referrals` row (unique on `student_user_id` — one
  locked attribution per student, enforced by the database) and a
  real `commission_ledger` row (`type='EARNED'`, `status='PENDING'`,
  unique on `(stripe_event_id, type)` so a redelivered webhook can
  never double-credit a teacher). Increments
  `teacher_coupons.used_count`.

**Commission policy for v1 (advisor-approved, not a DB table — see
`REFERRAL_COMMISSION_MIGRATION_PLAN.md` section 4a):**
```
COMMISSION_TRIGGER = FIRST_PURCHASE   (renewals currently earn no commission —
                                        the webhook only computes commission in
                                        checkout.session.completed, not on renewal
                                        events, so this is already the actual
                                        behavior, just not yet in a named config file)
COMMISSION_RATE_DEFAULT = 50%          (per-code override: teacher_coupons.commission_rate)
REFERRAL_BONUS_DAYS_DEFAULT = 10 days  (per-code override: teacher_coupons.extra_days)
```
These constants are **not yet centralized into one `lib/referral/policy.ts`
file** as the plan doc's section 4a describes — right now the 50%/10-day
defaults just live as column defaults in the migration SQL, and the
actual commission math is duplicated in two places:
`app/api/webhooks/stripe/route.ts` (real commission, on payment) and
`app/api/admin/teacher-coupons/route.ts` (recomputed for display in the
admin table). Centralizing this into a real `CommissionService` is
still open — see section 2.

---

## 2. What's explicitly NOT built yet

Don't assume any of these exist. Each one needs real work, and per the
project's standing rule, anything touching the database needs a
migration proposal reviewed before it's executed — don't rush these.

- **Payouts.** No `payouts` table. "Provision ausstehend" on the
  Dozenten-Codes page is a real `commission_ledger` balance
  (EARNED − PAID − REVERSED, currently just EARNED-and-unpaid since
  nothing can be marked PAID yet), but there's no admin UI to actually
  record a payout, and `commission_ledger.status` never moves past
  `PENDING`.
- **Audit log.** No `audit_logs` table. The `/admin-senmas` sidebar has
  an "Audit Logs" link but the page behind it (if it exists) is not
  wired to anything real.
- **RBAC.** `requireAdmin.ts` is a single boolean check
  (`is this email in ADMIN_EMAILS?`), not the
  SUPER_ADMIN/ADMIN/FINANCE_ADMIN/SUPPORT/AUDITOR roles the original
  spec describes.
- **Teacher detail page** (`/admin/dozenten/:teacherId` or similar) —
  doesn't exist. Right now a teacher's data is only visible as rows in
  the Dozenten-Codes table, not aggregated per-teacher across their
  possibly-multiple codes.
- **Server-side search/pagination/sort** for Dozenten-Codes — current
  implementation is client-side, which is fine at today's scale (a
  handful of codes) but was a deliberate, documented deferral, not an
  oversight. Revisit once the list is realistically multiple pages.
- **Centralized `CommissionService` / `ReferralPolicy` module** — see
  section 1 above; the 50%/10-day/FIRST_PURCHASE rules work correctly
  today but aren't yet pulled into one reusable module.
- **Refund/reversal handling.** If a Stripe payment tied to a
  commission is refunded, nothing currently writes a `REVERSAL` row to
  `commission_ledger`. The `type` column supports it; no code creates
  one yet.
- **Renewal commission** (intentionally out of scope for v1, per the
  advisor's approved decision — not a gap, a decision).

---

## 3. Exactly what each Dozenten-Codes number means (don't guess)

These formulas matter — earlier drafts of this page used shortcuts
that the senior advisor explicitly rejected. If you touch
`app/api/admin/teacher-coupons/route.ts`, keep these exact:

- **Verwendete Codes** = `COUNT(codes WHERE stats.count > 0)` — codes
  with at least one real redemption. NOT `SUM(usage_count)`.
- **Geschenkte Tage** = `SUM(referrals.bonus_days_granted)` — actual
  days granted via real redemptions. A code that exists but was never
  used contributes 0, regardless of its configured `extra_days`.
- **Provision ausstehend** = `SUM(commission_ledger.commission_amount_cents)
  WHERE type='EARNED' AND status IN ('PENDING','APPROVED')` — a real
  ledger balance. NOT `revenue × commission_rate` (that shortcut
  double-counts nothing today only because nothing has been paid out
  yet — it will silently become wrong the moment payouts exist, so
  don't reintroduce it).
- **Umsatz / Provision (€) per code** (table columns) = aggregated
  from real `subscriptions.amount_paid_cents` /
  `teacher_commission_cents` grouped by `teacher_coupon_id` — this
  predates migration 030 and still works because those columns are
  still written on every payment (migration 030 added the ledger
  *alongside* this, didn't replace it).

---

## 4. Known workflow constraints (why some things are built the way they are)

- **No direct DB access.** Every schema-verification step in this
  project happened via the owner running a read-only SQL query in the
  Supabase SQL Editor and pasting the result back into chat — there is
  no tool that queries the live database directly. If you need to
  verify a table/column exists, ask for that, don't assume from the
  migration files alone (see section 1's warning).
- **No direct git push access** — every code change in this project's
  history was committed locally in a sandboxed container, then pushed
  using a short-lived GitHub Personal Access Token the owner pasted
  into chat and revoked immediately after use. If a push is needed and
  no token is available, say so plainly rather than assuming access.
- **Migrations are proposed, never executed by the assistant.** Every
  `.sql` file is written, tested with `tsc`/`eslint`/`npm run build`
  against placeholder env vars, committed, and pushed for review — the
  owner alone runs it in the Supabase SQL Editor after reviewing (and,
  for anything non-trivial, after the senior advisor reviews the
  written migration plan first).
- **Free Tier discipline** (Supabase free plan) — summarized in
  `REFERRAL_COMMISSION_MIGRATION_PLAN.md` section 7: one combined
  query per page/endpoint (not one per widget), server-side
  aggregation, minimal indexes added only for queries that actually
  exist, no unnecessary Realtime subscriptions or Storage buckets, no
  denormalized copies of existing tables. Keep following this as the
  system grows.
- **"No fake data" is the single most repeated instruction across this
  entire project's history**, from the very first spec through every
  revision. When real data for something doesn't exist yet (an empty
  table, an unbuilt feature), the correct UI state is an honest empty
  state, a loading skeleton, or "nicht verfügbar" — never a
  placeholder number that could be mistaken for real.
