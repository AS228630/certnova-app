-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds the teacher referral coupon system: a teacher_coupons table, and
-- the columns on `subscriptions` needed to record which coupon (if any)
-- was used on each real purchase, so commissions can be calculated and
-- reported per teacher.

create table if not exists public.teacher_coupons (
  id uuid primary key default gen_random_uuid(),
  teacher_name text not null,
  teacher_email text,
  code text not null unique,
  extra_days int not null default 10,
  commission_rate numeric(4,3) not null default 0.500 check (commission_rate >= 0 and commission_rate <= 1),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Codes are looked up case-insensitively ("arnd10" = "ARND10"). This
-- unique index enforces that at the database level too, not just in
-- application code.
create unique index if not exists teacher_coupons_code_lower_idx
  on public.teacher_coupons (lower(code));

alter table public.teacher_coupons enable row level security;

-- No public policies at all, intentionally. This table is only ever
-- read/written server-side using the Supabase service role key (in
-- app/api/create-checkout-session and the new app/api/admin/* routes),
-- which bypasses RLS. There is no legitimate reason for a browser to
-- query this table directly — not even to check if a code is valid,
-- since that check happens as part of creating the checkout session.

-- --------------------------------------------------------------------
-- Extend subscriptions with referral + commission tracking
-- --------------------------------------------------------------------

alter table public.subscriptions
  add column if not exists teacher_coupon_id uuid references public.teacher_coupons(id),
  add column if not exists applied_coupon_code text,
  add column if not exists amount_paid_cents int,
  add column if not exists teacher_commission_cents int,
  add column if not exists bonus_days_granted int not null default 0;

create index if not exists subscriptions_teacher_coupon_idx
  on public.subscriptions (teacher_coupon_id);
