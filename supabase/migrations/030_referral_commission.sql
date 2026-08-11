-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Adds the real Referral + Commission architecture on top of the
-- existing teacher_coupons/subscriptions system, per
-- docs/REFERRAL_COMMISSION_MIGRATION_PLAN.md (Revision 3, approved by
-- the senior advisor Aug 11 2026: 3 tables — teachers, referrals,
-- commission_ledger — no commission_policies table for v1; that
-- policy lives as application-layer constants instead, see the doc's
-- section 4a).
--
-- Confirmed safe against the ACTUAL live schema (not just the repo's
-- migration history) via the section 1a reconciliation query run
-- directly in the Supabase SQL Editor on Aug 11 2026, after which
-- migrations 028 and 029 were also confirmed to have actually run.
-- teacher_coupons and subscriptions (with their 028/029 columns) are
-- therefore now real and present — this migration only adds to them.
--
-- Everything below is additive: new tables, and nullable new columns
-- on existing tables. Nothing existing is renamed, dropped, or made
-- non-nullable. Rollback = drop the 3 new tables + drop the 2 new
-- columns (see the plan doc's section 9).

-- --------------------------------------------------------------------
-- 1. teachers — the missing identity anchor so one teacher can own
--    multiple codes (teacher_coupons.teacher_name today is free text
--    with no uniqueness or relationship to anything else).
-- --------------------------------------------------------------------

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.teachers enable row level security;
-- No public policies, intentionally — same pattern as teacher_coupons
-- and b2b_groups: only ever read/written server-side with the
-- service role key. There is no legitimate reason for a browser to
-- query this table directly.

-- --------------------------------------------------------------------
-- 2. teacher_coupons: connect each existing code to its owning
--    teacher, and add the optional usage/validity fields the original
--    spec asked for but that didn't exist yet (max_uses, used_count,
--    valid_from, valid_until). teacher_id starts nullable so existing
--    rows keep working until the backfill (section 6 below) runs.
-- --------------------------------------------------------------------

alter table public.teacher_coupons
  add column if not exists teacher_id uuid references public.teachers(id),
  add column if not exists max_uses int,
  add column if not exists used_count int not null default 0,
  add column if not exists valid_from date not null default current_date,
  add column if not exists valid_until date;

create index if not exists teacher_coupons_teacher_id_idx
  on public.teacher_coupons (teacher_id);

-- --------------------------------------------------------------------
-- 3. referrals — the immutable historical record of one redemption
--    event: which student redeemed which code, belonging to which
--    teacher, on which date, for how many bonus days. Survives the
--    code later being renamed, disabled, or the teacher's own record
--    changing — code_at_redemption is a snapshot, not a live lookup.
-- --------------------------------------------------------------------

create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  student_user_id uuid not null references auth.users(id) on delete cascade,
  teacher_id uuid not null references public.teachers(id),
  teacher_coupon_id uuid not null references public.teacher_coupons(id),
  code_at_redemption text not null,
  bonus_days_granted int not null,
  redeemed_at timestamptz not null default now(),
  -- One locked attribution per student, ever. A second redemption
  -- attempt hits this constraint at the database level — the
  -- application must return a controlled business error, never
  -- silently overwrite an existing referral.
  unique (student_user_id)
);

alter table public.referrals enable row level security;
-- No public policies, intentionally — same reasoning as above.

create index if not exists referrals_teacher_id_idx on public.referrals (teacher_id);
create index if not exists referrals_teacher_coupon_id_idx on public.referrals (teacher_coupon_id);

-- --------------------------------------------------------------------
-- 4. commission_ledger — the independent, append-only financial
--    record. Closes the actual gap in subscriptions (which is one row
--    per user, overwritten on renewal — not a transaction log). Every
--    row here is a snapshot of one specific commission-worthy event,
--    immune to subscriptions later being overwritten.
-- --------------------------------------------------------------------

create table if not exists public.commission_ledger (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  student_user_id uuid not null references auth.users(id),
  referral_id uuid not null references public.referrals(id),
  -- Idempotency key: Stripe's own event.id. A redelivered webhook
  -- event hits the unique constraint below on its second insert
  -- attempt and is safely ignored — the teacher is never credited
  -- twice for one payment.
  stripe_event_id text not null,
  stripe_session_or_invoice_id text,
  gross_amount_cents int not null,
  commission_rate numeric(4,3) not null,
  commission_amount_cents int not null,
  currency text not null default 'eur',
  type text not null check (type in ('EARNED', 'REVERSAL', 'ADJUSTMENT', 'PAYOUT')),
  status text not null default 'PENDING'
    check (status in ('PENDING', 'APPROVED', 'PAID', 'REVERSED', 'CANCELLED')),
  -- FK to payouts is added later, once that table exists (Phase 2,
  -- a later step) — left as a plain nullable uuid for now.
  payout_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

alter table public.commission_ledger enable row level security;
-- No public policies, intentionally — same reasoning as above.

create unique index if not exists commission_ledger_stripe_event_type_idx
  on public.commission_ledger (stripe_event_id, type);
create index if not exists commission_ledger_teacher_id_idx on public.commission_ledger (teacher_id);
create index if not exists commission_ledger_status_idx on public.commission_ledger (status);
create index if not exists commission_ledger_created_at_idx on public.commission_ledger (created_at);

-- --------------------------------------------------------------------
-- 5. subscriptions: one nullable pointer for a cheap join from a
--    subscription to the referral that produced it. Nothing about
--    existing behavior changes — no existing query reads this column.
-- --------------------------------------------------------------------

alter table public.subscriptions
  add column if not exists referral_id uuid references public.referrals(id);

-- --------------------------------------------------------------------
-- 6. Backfill — reconstruct history from existing data, additive only.
--    Per the migration plan's section 8: run this in the same
--    transaction as the schema above, review the output before
--    trusting it, and only THEN (in a separate follow-up migration,
--    not this one) would the unique constraints already declared
--    above start rejecting any real duplicate this backfill finds.
--    Since the unique constraints are already declared inline above
--    (sections 3 and 4), this backfill will itself fail loudly on any
--    genuine duplicate rather than silently picking one — which is
--    the correct, safe behavior: if it fails, STOP and inspect the
--    conflicting rows manually before re-running.
-- --------------------------------------------------------------------

-- 6a. One teachers row per distinct existing teacher_coupons.teacher_name.
insert into public.teachers (name, email)
select distinct on (tc.teacher_name) tc.teacher_name, tc.teacher_email
from public.teacher_coupons tc
where not exists (
  select 1 from public.teachers t where t.name = tc.teacher_name
);

-- 6b. Point every existing coupon at its teacher row.
update public.teacher_coupons tc
set teacher_id = t.id
from public.teachers t
where tc.teacher_id is null
  and t.name = tc.teacher_name;

-- 6c. One referrals row per subscription that already used a coupon.
-- (No-op today if no coupon has been redeemed yet — safe either way.)
insert into public.referrals (student_user_id, teacher_id, teacher_coupon_id, code_at_redemption, bonus_days_granted, redeemed_at)
select
  s.user_id,
  tc.teacher_id,
  s.teacher_coupon_id,
  coalesce(s.applied_coupon_code, tc.code),
  s.bonus_days_granted,
  s.created_at
from public.subscriptions s
join public.teacher_coupons tc on tc.id = s.teacher_coupon_id
where s.teacher_coupon_id is not null
  and not exists (
    select 1 from public.referrals r where r.student_user_id = s.user_id
  );

-- 6d. Link each subscription back to the referral row just created.
update public.subscriptions s
set referral_id = r.id
from public.referrals r
where s.referral_id is null
  and r.student_user_id = s.user_id
  and s.teacher_coupon_id is not null;

-- 6e. One commission_ledger row (type EARNED, status PENDING — NOT
-- 'PAID': there is no payouts table yet, so nothing has actually been
-- marked paid anywhere in the system; inventing a PAID status for old
-- data would be fake data) for every subscription that already
-- recorded a commission amount.
insert into public.commission_ledger
  (teacher_id, student_user_id, referral_id, stripe_event_id, stripe_session_or_invoice_id,
   gross_amount_cents, commission_rate, commission_amount_cents, type, status, created_at)
select
  r.teacher_id,
  s.user_id,
  r.id,
  -- No real Stripe event.id was stored historically for these rows,
  -- so a synthetic-but-unique key is used for the backfill only,
  -- clearly marked as such. Every commission recorded going forward
  -- (Phase 2, later step) uses the real stripe_event_id instead.
  'backfill:' || s.id::text,
  s.stripe_subscription_id,
  coalesce(s.amount_paid_cents, 0),
  tc.commission_rate,
  coalesce(s.teacher_commission_cents, 0),
  'EARNED',
  'PENDING',
  s.created_at
from public.subscriptions s
join public.referrals r on r.student_user_id = s.user_id
join public.teacher_coupons tc on tc.id = s.teacher_coupon_id
where s.teacher_commission_cents is not null
  and s.teacher_commission_cents > 0
  and not exists (
    select 1 from public.commission_ledger cl where cl.stripe_event_id = 'backfill:' || s.id::text
  );
