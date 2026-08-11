# CertCoach — Referral + Commission: Migration-Based Schema Audit & Migration Plan

Status: **PROPOSAL ONLY — no migration executed. No new production database. Same live Supabase instance stays the single source of truth.**

**Architecture APPROVED by the senior advisor (Aug 11 2026) — three tables: `teachers`, `referrals`, `commission_ledger`. `commission_policies` is explicitly NOT required for v1 (see section 2 and section 4a).**

Revision 3 — corrects a terminology error the advisor flagged in Revision
2: section 1 below is a **Migration-Based Schema Audit**, not a live
database audit. It is reconstructed from every `.sql` file in
`/migrations/supabase` (001-029) that is *supposed* to have been run
against the live database — this repo's migration history, not a live
query against Supabase itself, since Claude has no direct SQL console
access. It is possible one of these 29 files was skipped, run out of
order, or that a manual change was made directly in the Supabase
dashboard at some point — this document cannot rule that out on its
own. **Section 1a below (new in this revision) is the reconciliation
step**: a read-only query the owner runs directly against the live
database, so the assumptions in section 1 are verified, not just
assumed, before any new SQL is written against production. It also
keeps the Free Tier consumption engineering explicit instead of a side
note, per the original spec document's own rules (para 3, 21, 65-68)
-- see section 7, unchanged from Revision 2 and re-approved by the
advisor as-is.

---

## 1. Migration-Based Schema Audit (reconstructed from repository history, NOT a live-database query)

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

## 1a. Schema Reconciliation — REQUIRED before any migration is written to run

This is the advisor's required step between "migration-based audit" and
"final migration SQL": confirm section 1 above actually matches what is
live in Supabase right now, not just what the `.sql` files in the repo
say *should* be there.

**Action needed from the project owner (not something Claude can run —
no direct database access):** paste the query below into the Supabase
SQL Editor (read-only — `SELECT` against `information_schema` and
`pg_indexes` only, no `INSERT`/`UPDATE`/`DELETE`, safe to run on
production) and paste the result back into the chat.

```sql
-- Read-only reconciliation query. Confirms the actual live schema for
-- every table this migration plan touches, plus confirms the three
-- new table names are not already taken by something else.
select table_name, column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('profiles', 'subscriptions', 'teacher_coupons',
                      'b2b_groups', 'b2b_redemptions',
                      'teachers', 'referrals', 'commission_ledger')
order by table_name, ordinal_position;

select tablename, indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('subscriptions', 'teacher_coupons', 'b2b_groups', 'b2b_redemptions')
order by tablename, indexname;

select tablename, policyname, cmd, qual
from pg_policies
where schemaname = 'public'
  and tablename in ('profiles', 'subscriptions', 'teacher_coupons', 'b2b_groups', 'b2b_redemptions')
order by tablename, policyname;
```

Until this comes back and matches section 1, the migration SQL in
section 4/4a below stays a **draft for review**, not a file the owner
should paste into the SQL Editor and run.

---

## 2. Direct answer to "do we really need 4 new tables, or does teacher_coupons already cover it?"

Checked against the actual schema above, not assumed:

- **`teacher_coupons` cannot become the "teacher" entity as-is**, because `teacher_name` is a plain `text` column with no uniqueness constraint and no relationship to anything else. Two rows with `teacher_name = 'Ahmad Mahmoud'` today are two unrelated strings to Postgres -- there is no way to query "give me all codes belonging to this teacher" reliably (a typo or a different capitalization silently creates a second, disconnected "teacher"). Since the locked business requirement (from the advisor's own Phase-2 directive) is **one teacher, multiple codes**, this needs a real foreign key, which means a real `teachers` table with an `id` that `teacher_coupons` points to. This is not a duplicate structure -- it is the one piece of identity `teacher_coupons` is missing.
- **`referrals` cannot be replaced by reading `subscriptions.teacher_coupon_id`**, because that column only tells you the *current* redemption, not the historical one -- if `subscriptions` is later updated by a renewal event unrelated to any coupon, or if business logic ever needs to change which subscription row exists, there is nothing that independently proves "this specific student redeemed this specific code on this specific date." That is exactly the "historical rule" the advisor required -- it needs its own row, not a derived read.
- **`commission_ledger` cannot be replaced by re-reading `subscriptions.teacher_commission_cents`**, for the reason in section 1: that column gets overwritten on renewal and was never designed to be idempotent against webhook retries. A financial record that can silently change value when unrelated activity happens is not a ledger.
- **`commission_policies`** -- **advisor's final decision: not a table for v1.** Instead, the policy lives as centralized constants in the application layer (see section 4a) referenced by one `CommissionService`, never scattered as magic numbers across multiple files.

**APPROVED (advisor, Aug 11 2026): 3 tables — `teachers`, `referrals`, `commission_ledger`. No `commission_policies` table for v1.**

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

### 4a. Business Configuration (replaces `commission_policies` table)

The v1 policy is centralized in one application-layer module, not a database table and not repeated in multiple files:

```
ReferralPolicy (constants)
   COMMISSION_TRIGGER      = 'FIRST_PURCHASE'
   COMMISSION_RATE_DEFAULT = 0.50   -- per-code override still lives on teacher_coupons.commission_rate, unchanged
   REFERRAL_BONUS_DAYS_DEFAULT = 10 -- per-code override still lives on teacher_coupons.extra_days, unchanged
        |
        v
CommissionService  -- the ONLY place that reads ReferralPolicy and writes to commission_ledger
        |
        v
commission_ledger
```

Concretely: one file (proposed `lib/referral/policy.ts`), imported only
by the future `CommissionService`. No component, API route, or webhook
handler computes `amount * 0.5` directly — they all call the service.
This satisfies the advisor's instruction ("these values must remain
configurable at the appropriate business-rule layer and must not be
scattered as magic numbers") without a table, and if a future version
needs `FIRST_3_PURCHASES` or `ALL_RENEWALS`, only this one module
changes — `commission_ledger`'s schema and every caller of
`CommissionService` stay untouched. Not implemented yet — this is the
design for Phase 2 Step 3 (Instructor Referral model / Commission
Service), which comes after the migration itself is approved and live.

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

## 10. Production deployment steps (advisor's required final sequence)

1. **Existing production schema verification** -- owner runs the section 1a query against the live database, pastes the result back.
2. **Reconcile with migration-derived schema** -- section 1 above is checked line-by-line against that result; any mismatch is resolved here, before a single line of new SQL is written to run.
3. **Final migration SQL review** -- the draft in section 4/4a (once written as an actual `.sql` file) is reviewed against the reconciled schema, not the assumed one.
4. **Local/staging migration test** -- run against a disposable copy before touching production (a free Supabase project, or `supabase db diff` locally, is enough for this project's scale).
5. **Integrity checks** -- confirm every FK resolves, confirm the backfill (section 8) produces zero unresolved duplicate-student rows before the unique constraint is added.
6. **Performance/index checks** -- confirm the three indexes from section 4 are actually created and are the only ones added (matches section 7's Free-Tier discipline).
7. **Rollback verification** -- confirm the section 9 rollback (drop 3 tables + 2 columns) actually leaves the app working, tested on the same staging copy.
8. **Explicit production approval** -- advisor + owner both confirm, in writing, after steps 1-7 are done.
9. **Production migration** -- owner pastes the approved SQL into the Supabase SQL Editor, same manual process as every migration before it (001-029).
10. **Post-migration verification** -- confirm "Success" in the SQL Editor, re-run the section 1a query and confirm the three new tables now appear with the expected columns/indexes/policies, confirm the existing Dashboard/Dozenten-Codes/Studenten/B2B pages still load correctly with no regression.

Only after step 10 does application code (Referral model -> Commission Service -> Commission Ledger writes from the webhook -> teacher-detail page -> payout foundation -> audit log -> RBAC) get built against this schema.

---

**Nothing above has been executed.** Architecture is approved (3 tables, no `commission_policies` table). Next action is step 1: the owner runs the section 1a reconciliation query and shares the result.
