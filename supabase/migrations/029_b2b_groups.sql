-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds B2B / group licensing: a company or school gets one shared code
-- for N seats; each student redeems it once to get real access, no
-- separate Stripe charge per student (the company is billed outside
-- this flow, e.g. an invoice) — this table is the source of truth for
-- how many of the purchased seats have actually been used.

create table if not exists public.b2b_groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'unternehmen' check (type in ('unternehmen', 'bildungseinrichtung')),
  code text not null unique,
  total_licenses int not null check (total_licenses > 0),
  plan text not null default 'monthly' check (plan in ('monthly', 'yearly')),
  valid_until date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists b2b_groups_code_lower_idx on public.b2b_groups (lower(code));

alter table public.b2b_groups enable row level security;
-- No public policies — same reasoning as teacher_coupons: only ever
-- read/written server-side with the service role key.

create table if not exists public.b2b_redemptions (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.b2b_groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  redeemed_at timestamptz not null default now(),
  unique (group_id, user_id)
);

alter table public.b2b_redemptions enable row level security;

create index if not exists b2b_redemptions_group_idx on public.b2b_redemptions (group_id);

alter table public.subscriptions
  add column if not exists b2b_group_id uuid references public.b2b_groups(id);
