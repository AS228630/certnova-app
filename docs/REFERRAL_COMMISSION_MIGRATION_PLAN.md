# CertCoach — Referral + Commission: Real Schema Audit & Migration Plan

Status: **PROPOSAL ONLY — no migration executed. No new production database. Same live Supabase instance stays the single source of truth.**

Revision 2 — responds directly to the senior advisor's Aug 11 2026 note:
this version replaces the assumed schema from v1 with the **actual**
schema, read from every migration file that has been run against the
live database (`/migrations/supabase`, files 001-029 -- this repo's own
migration history *is* the audit trail, since Claude has no direct SQL
console access to Supabase; the owner runs each file by hand and this
is the complete, ordered record of what exists). It also makes the
Free Tier consumption engineering explicit instead of a side note,
per the original spec document's own rules (para 3, 21, 65-68) -- see
section 7 below, which is new in this revision.

---

## 1. Complete current schema audit (tables relevant to referral/commission)

### `auth.users` -- Supabase-managed, not in our migrations
- `id uuid` (PK), `email`, `created_at` -- read-only for us.

### `public.profiles` (migration 004)
```
id          uuid PK, references auth.users(id) on delete cascade
full_name   text
email       text
avatar_url  text
bio         text
location    text
updated_at  timestamptz not null default now()
```
RLS: enabled. `select` for everyone (public profile), `insert`/`update` only by owner (`auth.uid() = id`). No `delete` policy -- rows are removed only via the `on delete cascade` from `auth.users`.

### `public.subscriptions` (migration 016, extended by 028 and 029)
```
id                        uuid PK default gen_random_uuid()
user_id                   uuid not null, UNIQUE, references auth.users(id) on delete cascade
stripe_customer_id        text
stripe_subscription_id    text
plan                      text not null default 'free', check in ('free','monthly','yearly')
status                    text not null default 'active', check in ('active','canceled','past_due','incomplete')
current_period_end        timestamptz
created_at                timestamptz not null default now()
updated_at                timestamptz not null default now()
-- added by 028:
teacher_coupon_id         uuid, references teacher_coupons(id)
applied_coupon_code       text
amount_paid_cents         int
teacher_commission_cents  int
bonus_days_granted        int not null default 0
-- added by 029:
b2b_group_id              uuid, references b2b_groups(id)
```
Indexes: `user_id`, `stripe_customer_id`, `teacher_coupon_id`.
RLS: enabled. Only `select` policy, owner-only (`auth.uid() = user_id`). All writes are server-side via the service-role key in `app/api/webhooks/stripe/route.ts`.

**The one fact that drives this entire plan:** `user_id` is `UNIQUE`. This table is *one row per user*, `upsert`-ed with `onConflict: 'user_id'` on every Stripe webhook. It is a **current-state table, not a transaction log**. A renewal overwrites `amount_paid_cents` and `teacher_commission_cents` from the previous payment. There is no way to reconstruct "how much did this user pay in March" from this table alone -- that history simply isn't kept anywhere today. This is the actual gap `commission_ledger` exists to close; it is not a duplicate of anything that already exists.

### `public.teacher_coupons` (migration 028)
```
id                uuid PK default gen_random_uuid()
teacher_name      text not null
teacher_email     text
code              text not null, UNIQUE
extra_days        int not null default 10
commission_rate   numeric(4,3) not null default 0.500, check 0-1
is_active         boolean not null default true
created_at        timestamptz not null default now()
updated_at        timestamptz not null default now()
```
Unique index: `lower(code)` (case-insensitive uniqueness).
RLS: enabled, **zero public policies** -- only reachable via the service-role key, server-side.

**No `max_uses`, `valid_from`, `valid_until`, `used_count` columns exist.** No `teacher_id` -- `teacher_name` is a free-text field, not a foreign key to anything.

### `public.b2b_groups` / `public.b2b_redemptions` (migration 029)
Separate flow (company seat licensing), included here only because it shares `subscriptions.b2b_group_id`. Not touched by this plan.

### Tables that do **not** exist (confirmed by grepping every migration file)
`teachers`, `referrals`, `commission_ledger`, `commission_policies`, `payouts`, `audit_logs`, any `transactions`/`payments` ledger table. Confirmed: `grep -rl "payout\|audit_log\|commission_ledger" supabase/migrations/` returns nothing.

---

## 2. Direct answer to "do we really need 4 new tables, or does teacher_coupons already cover it?"

Checked against the actual schema above, not assumed:

- **`teacher_coupons` cannot become the "teacher" entity as-is**, because `teacher_name` is a plain `text` column with no uniqueness constraint and no relationship to anything else. Two rows with `teacher_name = 'Ahmad Mahmoud'` today are two unrelated strings to Postgres -- there is no way to query "give me all codes belonging to this teacher" reliably (a typo or a different capitalization silently creates a second, disconnected "teacher"). Since the locked business requirement (from the advisor's own Phase-2 directive) is **one teacher, multiple codes**, this needs a real foreign key, which means a real `teachers` table with an `id` that `teacher_coupons` points to. This is not a duplicate structure -- it is the one piece of identity `teacher_coupons` is missing.
- **`referrals` cannot be replaced by reading `subscriptions.teacher_coupon_id`**, because that column only tells you the *current* redemption, not the historical one -- if `subscriptions` is later updated by a renewal event unrelated to any coupon, or if business logic ever needs to change which subscription row exists, there is nothing that independently proves "this specific student redeemed this specific code on this specific date." That is exactly the "historical rule" the advisor required -- it needs its own row, not a derived read.
- **`commission_ledger` cannot be replaced by re-reading `subscriptions.teacher_commission_cents`**, for the reason in section 1: that column gets overwritten on renewal and was never designed to be idempotent against webhook retries. A financial record that can silently change value when unrelated activity happens is not a ledger.
- **`commission_policies`** is the smallest and most optional of the four -- technically the single locked rule (`FIRST_PURCHASE`, 50%) could live as an environment variable instead of a table. It's proposed as a table only so a future policy change doesn't require a code deploy. **This one is the most negotiable of the four -- if the advisor prefers an env-var/config-constant for v1.0 instead of a table, that removes one table entirely and is a smaller, equally safe change.**

**Revised recommendation: 3 tables are architecturally required (`teachers`, `referrals`, `commission_ledger`); the 4th (`commission_policies`) is optional for v1.0 and can be a constant instead, pending the advisor's preference.**

Everything else -- `profiles`, `subscriptions`, `teacher_coupons`, `b2b_groups` -- is reused exactly as-is; nothing about them is duplicated.

## 3. Current -> additive -> final (as requested)

```
CURRENT DATABASE                         ADDITIVE CHANGES                    FINAL DATABASE
-----------------                        -----------------                   --------------
auth.users             -------------------------------------------------->   auth.users (unchanged)
profiles                -------------------------------------------------->  profiles (unchanged)
subscriptions           + referral_id (nullable FK) -------------------->    subscriptions (1 new column)
teacher_coupons         + teacher_id (nullable FK), max_uses, used_count,
                           valid_from, valid_until ---------------------->    teacher_coupons (5 new columns)
b2b_groups /
b2b_redemptions         -------------------------------------------------->   unchanged
                         + teachers (new table)      -------------------->   teachers
                         + referrals (new table)     -------------------->   referrals
                         + commission_ledger (new)   -------------------->   commission_ledger
                         (+ commission_policies -- optional, pending advisor)
```

## 4. New tables -- full spec (per-table, as requested)

### `teachers`
- **Purpose:** the missing identity anchor so one teacher can own multiple codes, requested explicitly in Phase 2.
- **Columns:** `id uuid`, `name text not null`, `email text`, `status text not null default 'active' check (status in ('active','inactive'))`, `created_at timestamptz not null default now()`, `updated_at timestamptz not null default now()`.
- **PK:** `id`. **FK:** none (root entity). **Unique:** none required (two teachers could share a display name; `email` is optional so not made unique). **Index:** none needed beyond the PK -- table stays small (dozens of rows, not thousands).
- **RLS:** enabled, zero public policies -- service-role only, same pattern as `teacher_coupons`.
- **Relationship to existing tables:** `teacher_coupons.teacher_id -> teachers.id` (new FK, nullable during backfill).

### `referrals`
- **Purpose:** the immutable historical record of one redemption event.
- **Columns:** `id uuid`, `student_user_id uuid not null`, `teacher_id uuid not null`, `teacher_coupon_id uuid not null`, `code_at_redemption text not null` (snapshot -- survives the code being renamed/disabled), `bonus_days_granted int not null`, `redeemed_at timestamptz not null default now()`.
- **PK:** `id`. **FK:** `student_user_id -> auth.users(id) on delete cascade` (matches `subscriptions`' own cascade policy); `teacher_id -> teachers(id)` no cascade; `teacher_coupon_id -> teacher_coupons(id)` no cascade (disabling a code must never delete referral history). **Unique:** `(student_user_id)` -- one locked attribution per student, enforced at the database level per the advisor's explicit rule. **Index:** `teacher_id`, `teacher_coupon_id`.
- **RLS:** enabled, zero public policies.
- **Relationship to existing tables:** `subscriptions.referral_id -> referrals.id` (new nullable FK, for a cheap join from a subscription to its referral without re-deriving it).

### `commission_ledger`
- **Purpose:** the independent, append-only financial record -- the actual gap in the current schema.
- **Columns:** `id uuid`, `teacher_id uuid not null`, `student_user_id uuid not null`, `referral_id uuid not null`, `stripe_event_id text not null` (idempotency key), `stripe_session_or_invoice_id text`, `gross_amount_cents int not null`, `commission_rate numeric(4,3) not null`, `commission_amount_cents int not null`, `currency text not null default 'eur'`, `type text not null check (type in ('EARNED','REVERSAL','ADJUSTMENT','PAYOUT'))`, `status text not null default 'PENDING' check (status in ('PENDING','APPROVED','PAID','REVERSED','CANCELLED'))`, `payout_id uuid` (FK added later once `payouts` exists, Phase 2 Step 6), `created_at`, `updated_at`, `paid_at timestamptz`.
- **PK:** `id`. **FK:** `teacher_id -> teachers(id)`, `student_user_id -> auth.users(id)`, `referral_id -> referrals(id)` -- none cascade-delete; a financial record must survive even if the referring account is later removed for another reason. **Unique:** `(stripe_event_id, type)` -- the idempotency guard: a redelivered Stripe webhook hits this constraint on the second insert attempt and is safely ignored. **Index:** `teacher_id`, `status`, `created_at`.
- **RLS:** enabled, zero public policies.
- **Relationship to existing tables:** reads `subscriptions`/Stripe data at write time only (via the webhook), doesn't duplicate it -- `gross_amount_cents` is a snapshot of what was actually charged for *this* event, immune to `subscriptions` later being overwritten by a renewal.

## 5. Modifications to existing tables -- full spec (per-column, as requested)

| Current table | New column | Type | Nullable | Default | FK | Index | Reason |
|---|---|---|---|---|---|---|---|
| `teacher_coupons` | `teacher_id` | `uuid` | nullable (until backfilled) | -- | `-> teachers.id` | yes | connects a code to its owning teacher |
| `teacher_coupons` | `max_uses` | `int` | nullable | -- | -- | no | optional usage cap, per original spec para 17 |
| `teacher_coupons` | `used_count` | `int` | not null | `0` | -- | no | running counter, updated at redemption |
| `teacher_coupons` | `valid_from` | `date` | not null | `current_date` | -- | no | code validity window |
| `teacher_coupons` | `valid_until` | `date` | nullable | -- | -- | no | code validity window (open-ended if null) |
| `subscriptions` | `referral_id` | `uuid` | nullable | -- | `-> referrals.id` | no (covered by `referrals`' own index) | cheap join from a subscription to the referral that produced it |

None of these change an existing column's type, nullability, or default -- every existing query in `app/api/admin/*`, `app/api/create-checkout-session`, and `app/api/webhooks/stripe` keeps working unmodified the moment this migration runs, because it never reads a column that changed.

## 6. RLS / security considerations

All three new tables follow the exact pattern already established by `teacher_coupons` and `b2b_groups`: RLS **enabled**, **zero public policies**. They are reachable only through the service-role key from server-side API routes -- there is no legitimate reason for a browser to query referral or commission data directly, mirroring the existing project convention rather than inventing a new one.

## 7. Free-tier database consumption -- explicit, not a footnote

This section exists because it must not be glossed over: the project runs on **Supabase's free tier**, and the original spec document (the first PDF sent to Claude) is explicit about this in several places that this plan follows point-by-point, not just in spirit:

- **Para 3 of the original spec ("Database Free Tier"):** don't run a separate query per dashboard card. **Already satisfied**: `/api/admin/dashboard-summary` (built in the previous phase) is one combined endpoint, not five. The new teacher-detail and ledger endpoints (Phase 2, later steps) will follow the same rule -- one summary query per page, never per widget.
- **Para 21 ("Chart query must not send thousands of rows to the browser"):** any commission chart must use `GROUP BY` server-side, never raw ledger rows. This plan's indexes (`commission_ledger.created_at`, `.status`, `.teacher_id`) exist specifically to make that `GROUP BY` cheap.
- **Para 65-66 (performance targets, no N+1, no full-table scans):** the three FKs in `commission_ledger` plus the three indexes in section 4 are deliberately minimal -- exactly enough to cover the teacher-detail page, the status filter, and the date-range chart, and nothing speculative. Every index has a real write-cost on a free tier; none are added "just in case."
- **Para 67-68 (caching, 30-60s TTL for summary reads, cache is never the source of truth):** when the teacher-detail and ledger-list endpoints are built in Phase 2, they inherit the same manual/interval-refresh pattern already used in the current dashboard (refresh button + optional periodic refresh), not aggressive polling. The `commission_ledger` table itself is never cached -- only its aggregated summaries are, and only for reads.
- **Row-count reality check:** at CertCoach's current scale (tens to low hundreds of referred students), `teachers` + `referrals` + `commission_ledger` together add a trivial amount of storage -- this migration's actual free-tier risk is near zero today. The engineering discipline above (aggregation, indexes, caching, no N+1) is what keeps it near zero as the referral program grows, rather than something to revisit only once a problem appears.
- **What this plan deliberately does NOT do, to protect the free tier:** no new Realtime subscriptions, no new Storage buckets, no materialized views (unnecessary at this scale and an extra maintenance burden), no speculative indexes beyond the three listed, no denormalized copies of `teacher_coupons` or `subscriptions` data into the new tables (every new table references the existing ones by FK instead of copying their columns).

## 8. Data migration requirements (backfill)

1. For each existing `teacher_coupons` row, create one `teachers` row (`name = teacher_name`, `email = teacher_email`), then backfill `teacher_coupons.teacher_id` to point at it.
2. For each existing `subscriptions` row with a non-null `teacher_coupon_id`, create one `referrals` row (`redeemed_at = subscriptions.created_at` as best available proxy, `bonus_days_granted = subscriptions.bonus_days_granted`). **Must run before** the `referrals.student_user_id` unique constraint is added; if any student appears more than once in this backfill (e.g. re-subscribed under a different code historically), that row needs a manual decision from the owner, not an automatic pick.
3. For each existing `subscriptions` row with `teacher_commission_cents > 0`, create one `commission_ledger` row, `type = 'EARNED'`. **Status must be `'PENDING'`, not `'PAID'`** for backfilled rows -- there is no `payouts` table yet, so nothing has actually been marked paid anywhere in the system; inventing a `'PAID'` status for old data would be exactly the kind of fake data the project's core rule forbids.
4. (If `commission_policies` is kept as a table, per section 2) seed exactly one row: `trigger = 'FIRST_PURCHASE'`, `is_active = true`.

## 9. Rollback strategy

Every change above is additive except the two unique constraints (`referrals.student_user_id`, `commission_ledger.stripe_event_id + type`). Rollback = drop the 3 new tables + drop the 2 new nullable columns; nothing in `auth.users`, `profiles`, `subscriptions`, or `teacher_coupons` is altered destructively, so the app keeps working mid-rollback. The riskiest single step is section 8.2's backfill: if it surfaces a genuine duplicate student, the migration script must stop and surface that row for a manual decision rather than silently resolving it.

## 10. Production deployment steps

1. Advisor reviews this revision, confirms: (a) 3-table vs 4-table decision from section 2, (b) whether `commission_policies` is a table or a constant.
2. Owner reviews and gives explicit go-ahead -- no SQL runs before this.
3. Migration file `030_referral_commission.sql` created (or two files, per section 9's suggestion to separate the additive schema from the two unique constraints, so a backfill hiccup never blocks the safe part from shipping).
4. Owner pastes into Supabase SQL Editor -> Run -> confirms "Success", exactly like every migration before it (001-029).
5. Backfill script run and reviewed row-by-row for duplicates before the unique constraints are added.
6. Application code (Referral model -> Commission Ledger writes from the webhook -> teacher-detail page -> payout foundation -> audit log -> RBAC) built only after step 4 is confirmed live.

---

**Nothing above has been executed.** Waiting for the advisor's answer on section 2 (3 vs 4 tables) before writing the actual `.sql` migration file.
