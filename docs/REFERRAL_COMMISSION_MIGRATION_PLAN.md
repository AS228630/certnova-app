# CertCoach — Referral + Commission Architecture Audit & Migration Plan

Status: **PROPOSAL ONLY — no migration has been executed.**
Requested by: senior advisor, Phase 2 directive (Aug 11 2026).
Business decision locked for v1.0 by the senior advisor:

```
COMMISSION_TRIGGER = FIRST_PURCHASE
COMMISSION_RATE    = 50%   (per-code override allowed)
```

This document is deliverable #1 (audit) and #2
(`REFERRAL_COMMISSION_MIGRATION_PLAN.md` itself) from the Phase 2
directive. Deliverable #3 (which existing tables are reused vs. new)
is section 3 below. **No `CREATE TABLE` / `ALTER TABLE` in this
document has been run against production.** Per the project's own
rule, that only happens after explicit sign-off, then by the owner
pasting the SQL into the Supabase SQL Editor.

---

## 1. Existing tables discovered

| Table | Key columns | Notes |
|---|---|---|
| `auth.users` | `id`, `email`, `created_at` | Supabase-managed, not migrated by us |
| `profiles` | `id → auth.users.id`, `full_name`, `email` | 1 row per user, public-readable |
| `subscriptions` | `user_id` **(unique)**, `plan`, `status`, `stripe_subscription_id`, `current_period_end`, `amount_paid_cents`, `teacher_coupon_id`, `applied_coupon_code`, `teacher_commission_cents`, `bonus_days_granted` | **One row per user, upserted on every Stripe event** (`onConflict: 'user_id'`). Not a transaction log — a renewal overwrites the previous row's `amount_paid_cents`/`teacher_commission_cents`. This is the single most important existing-schema fact for this migration. |
| `teacher_coupons` | `id`, `teacher_name`, `teacher_email`, `code` (unique, case-insensitive), `extra_days`, `commission_rate`, `is_active` | One row *is* one code today — teacher identity and code identity are the same row. No `max_uses`, `valid_from`, `valid_until`. |
| `b2b_groups` / `b2b_redemptions` | — | Separate flow (company seats), not part of this migration, mentioned only because `subscriptions.b2b_group_id` exists on the same table. |

## 2. Existing relationships discovered

```
auth.users (1) ── (1) profiles
auth.users (1) ── (1) subscriptions      [unique on user_id — the constraint we must work around]
subscriptions (N) ── (1) teacher_coupons  [via teacher_coupon_id, nullable]
```

The webhook (`app/api/webhooks/stripe/route.ts`) already:
- reads `subscription.metadata.teacher_coupon_id` / `bonus_days_granted` / `coupon_code` (set at checkout time in `create-checkout-session`), and
- computes `teacher_commission_cents = amount × coupon.commission_rate` **only** in the `checkout.session.completed` handler — **not** in `customer.subscription.updated` (renewals). So the current code already behaves like "commission on first purchase only" by accident of which handler writes the field — it just never persists that as a distinct, queryable, immutable record.

Stripe already gives us a natural idempotency key that isn't used yet: `event.id` on every webhook event, and `session.id` / `subscription.id` on the payment itself.

## 3. Tables that can be reused vs. tables that must be added

**Reused, unchanged:**
- `auth.users`, `profiles` — student identity, no changes needed.
- `subscriptions` — stays exactly as is; it remains the record of "what plan is this user on right now." We do **not** try to turn it into a ledger — that's what the new `commission_ledger` table is for. Two new nullable columns are proposed (below) purely for a fast join, not a behavior change.

**Reused with additive columns only (no data loss, no rename):**
- `teacher_coupons` — gains `max_uses`, `valid_from`, `valid_until`, `updated_at`-tracked `status` (already has `is_active` — kept, not replaced). No column removed or renamed, so every existing row and every existing query (`teacher-coupons` API, `dozenten-codes` page) keeps working unmodified.

**New tables required (none exist today):**
- `teachers` — currently "teacher" is just a free-text name on each coupon row, which is exactly the anti-pattern the advisor flagged ("Do NOT use teacher name as the unique identifier"). A real `teachers` table is required so one teacher can own multiple codes.
- `referrals` — the historical, immutable record of "this student redeemed this code on this date," independent of the coupon's later mutations.
- `commission_ledger` — the independent financial ledger, one row per commission-worthy event (`EARNED` / `REVERSAL` / `ADJUSTMENT` / `PAYOUT`), keyed by Stripe's own event/session id for idempotency.
- `payouts` — not in scope for this document (Phase 2 Step 6), listed here only so the ledger's `payout_id` foreign key target is clear.
- `commission_policies` — the configurable policy table, so `FIRST_PURCHASE` / `ALL_RENEWALS` / `FIRST_N_RENEWALS` is data, not code.

## 4. Columns to add (additive only, existing tables)

```sql
-- teacher_coupons: still one row = one code, now explicitly owned by a teacher
alter table public.teacher_coupons
  add column if not exists teacher_id uuid references public.teachers(id),
  add column if not exists max_uses int,
  add column if not exists used_count int not null default 0,
  add column if not exists valid_from date not null default current_date,
  add column if not exists valid_until date;

-- subscriptions: two nullable pointers for a cheap join; nothing about
-- existing behavior changes, nothing existing is read differently
alter table public.subscriptions
  add column if not exists referral_id uuid references public.referrals(id);
```

`teacher_coupons.teacher_id` starts nullable so existing rows keep working during backfill (see §9); it is not made `not null` until every existing coupon has been backfilled with a matching `teachers` row.

## 5. New tables — proposed DDL (proposal, not executed)

```sql
create table public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.referrals (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references auth.users(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id),
  teacher_coupon_id uuid not null references public.teacher_coupons(id),
  code_at_redemption text not null,        -- snapshot: survives the code being renamed/disabled later
  bonus_days_granted int not null,
  redeemed_at timestamptz not null default now(),
  -- one locked attribution per student, ever — see "student attribution" rule
  unique (student_user_id)
);

create table public.commission_policies (
  id uuid primary key default gen_random_uuid(),
  trigger text not null default 'FIRST_PURCHASE'
    check (trigger in ('FIRST_PURCHASE', 'ALL_RENEWALS', 'FIRST_N_RENEWALS', 'CUSTOM')),
  renewal_count_limit int,                 -- used only when trigger = FIRST_N_RENEWALS
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);
-- seed row (proposal): trigger = 'FIRST_PURCHASE', is_active = true

create table public.commission_ledger (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  student_user_id uuid not null references auth.users(id),
  referral_id uuid not null references public.referrals(id),
  stripe_event_id text not null,           -- idempotency key: Stripe's own event.id
  stripe_session_or_invoice_id text,
  gross_amount_cents int not null,
  commission_rate numeric(4,3) not null,
  commission_amount_cents int not null,
  currency text not null default 'eur',
  type text not null check (type in ('EARNED', 'REVERSAL', 'ADJUSTMENT', 'PAYOUT')),
  status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'PAID', 'REVERSED', 'CANCELLED')),
  payout_id uuid,                          -- FK added once `payouts` exists (Step 6)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);
```

## 6. Foreign keys

- `teacher_coupons.teacher_id → teachers.id`
- `referrals.student_user_id → auth.users.id` (cascade delete — if a user account is deleted, their referral record goes with it, same policy as `subscriptions.user_id` already uses)
- `referrals.teacher_id → teachers.id`, `referrals.teacher_coupon_id → teacher_coupons.id` (no cascade — a code being disabled must never silently delete referral history, per the advisor's explicit "historical rule")
- `commission_ledger.teacher_id / student_user_id / referral_id` — all `references`, no cascade deletes on the financial table, ever
- `subscriptions.referral_id → referrals.id` (nullable, no cascade)

## 7. Unique constraints

- `referrals (student_user_id)` — **one locked attribution per student**, enforced at the database level, not just application logic. A second redemption attempt must hit this constraint and return a controlled business error (per the advisor's "do not silently overwrite" rule), not a 500.
- `commission_ledger (stripe_event_id, type)` — the idempotency guard. If Stripe redelivers the same `checkout.session.completed` event, the second insert attempt hits this unique constraint and is safely ignored (`on conflict do nothing`), so the teacher is never credited twice for one payment.
- `teacher_coupons (lower(code))` — already exists, unchanged.

## 8. Indexes

```sql
create index on public.referrals (teacher_id);
create index on public.referrals (teacher_coupon_id);
create index on public.commission_ledger (teacher_id);
create index on public.commission_ledger (status);
create index on public.commission_ledger (created_at);
create index on public.teacher_coupons (teacher_id);
```

Kept deliberately minimal — the free-tier Supabase plan means every index has a real storage/write-cost tradeoff (per the project's own Free Tier rule); these five cover exactly the queries the admin pages actually run (teacher detail page, ledger status filter, chart date range), nothing speculative.

## 9. Data migration requirements

This is the part that needs the most care, because `teacher_coupons` today conflates "teacher" and "code" into one row.

1. For each existing `teacher_coupons` row, create one `teachers` row (`name = teacher_name`, `email = teacher_email`).
2. Backfill `teacher_coupons.teacher_id` to point at the matching new `teachers` row.
3. For each existing `subscriptions` row that has a non-null `teacher_coupon_id`, create one `referrals` row (best-effort `redeemed_at = subscriptions.created_at`, `bonus_days_granted = subscriptions.bonus_days_granted`) — this reconstructs history for past redemptions, since no `referrals` table existed before now. This step must run **before** the `referrals.student_user_id` unique constraint is added, and any student who appears more than once (e.g. re-subscribed with a different code) needs a manual decision, not an automatic pick.
4. For each existing `subscriptions` row with `teacher_commission_cents > 0`, create one `commission_ledger` row of `type = 'EARNED'`, `status = 'PAID'` is wrong to assume — status should be set to `'PENDING'` unless the owner confirms which historical commissions were actually paid out already (there is no `payouts` table yet, so today "paid" isn't tracked anywhere — don't invent a paid status for old data).
5. Seed exactly one `commission_policies` row: `trigger = 'FIRST_PURCHASE'`, `is_active = true`.

## 10. Rollback strategy

- Every step above is additive (new tables, nullable new columns) except the two unique constraints in §7. Rollback for a bad deploy is: drop the new tables, drop the two new nullable columns — nothing in `subscriptions`, `teacher_coupons`, `profiles`, or `auth.users` is altered destructively, so existing app behavior (checkout, dashboard, dozenten-codes, studenten, b2b-gruppen) keeps working even mid-rollback.
- The `referrals.student_user_id` unique constraint is the one riskiest piece: if step 9.3's backfill produces a real duplicate (student redeemed two codes historically), the migration must fail loudly on that row and stop, not silently pick one — that decision needs the owner, not an automated script.

## 11. Performance considerations

- `commission_ledger` is append-only and will be the fastest-growing table; the three indexes in §8 cover the only three access patterns the admin UI needs (by teacher, by status, by date range) — no full scans expected even at a few thousand rows.
- The teacher detail page (Phase 2, later step) should read from `commission_ledger` aggregated server-side (`GROUP BY teacher_id`), never load raw rows into the browser, consistent with the "one summary endpoint" principle already used in `dashboard-summary`.

## 12. Free-tier database considerations

- Total new tables: 4 (`teachers`, `referrals`, `commission_policies`, `commission_ledger`) + 1 backfill on an existing table. Row counts stay proportional to actual paying referred students — not a concern at current scale (tens to low hundreds of rows), but worth revisiting if `commission_ledger` ever needs long-term archiving once volume grows.
- No new Realtime subscriptions, no new Storage buckets — this migration is pure Postgres tables, the cheapest kind of Supabase free-tier usage.

## 13. Production deployment steps (for when this plan is approved)

1. Owner reviews and approves this document (no SQL runs before this).
2. Numbered migration file created in `/migrations/supabase` (next number after the existing series) containing exactly the DDL in §5 and §4, nothing else.
3. Owner pastes it into Supabase SQL Editor → "Run" → confirms "Success", per the project's existing migration process.
4. Backfill script (§9) run separately, reviewed row-by-row for the duplicate-student edge case before the unique constraint in §7 is added.
5. Only after backfill is verified: add the two unique constraints from §7 in a second, separate migration file (so a backfill problem never blocks the additive schema from going live).
6. Application code (Steps 3–8 of the Phase 2 order: Instructor Referral model → Commission Ledger → payment integration → payout foundation → audit log → RBAC) is built and tested against this schema **after** step 3 above, not before — so no code ships against a schema that doesn't exist in production yet.

---

**Nothing in this document has been executed.** This is exactly deliverables #1 and #2 of the Phase 2 directive; deliverable #3 is §3 above. Waiting for explicit approval before writing the actual migration file or any application code that depends on it.
