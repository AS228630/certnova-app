-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds real subscription tracking, populated by the Stripe webhook once
-- a payment actually succeeds — not a fixed/fake status.

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'free' check (plan in ('free', 'monthly', 'yearly')),
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due', 'incomplete')),
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_user_id_idx on public.subscriptions (user_id);
create index if not exists subscriptions_stripe_customer_idx on public.subscriptions (stripe_customer_id);

alter table public.subscriptions enable row level security;

-- Users can only read their own subscription status. All writes happen
-- server-side (Stripe webhook using the service role key), never
-- directly from the browser — a user should never be able to grant
-- themselves a paid plan by writing to this table.
drop policy if exists "Users can view their own subscription" on public.subscriptions;
create policy "Users can view their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);
