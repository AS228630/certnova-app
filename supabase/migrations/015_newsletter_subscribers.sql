-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds a lightweight table for real newsletter signups from the footer
-- form shown on every page.

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "Anyone can subscribe to the newsletter" on public.newsletter_subscribers;
create policy "Anyone can subscribe to the newsletter"
  on public.newsletter_subscribers for insert
  with check (true);
