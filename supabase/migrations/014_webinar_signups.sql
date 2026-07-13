-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds a lightweight table to store real email signups from the
-- Webinars resource page. No webinars are actually scheduled yet — this
-- table exists so visitors who want to be notified when a real one is
-- planned can genuinely leave their email, rather than the page showing
-- fabricated events with fake dates.

create table if not exists public.webinar_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create index if not exists webinar_signups_created_idx on public.webinar_signups (created_at desc);

alter table public.webinar_signups enable row level security;

-- Anyone (including anonymous visitors, since this page doesn't require
-- login) can submit their email, but nobody can read the list back
-- through the public API — only the site owner via the Supabase
-- dashboard, which bypasses RLS for the project owner.
drop policy if exists "Anyone can sign up for webinar notifications" on public.webinar_signups;
create policy "Anyone can sign up for webinar notifications"
  on public.webinar_signups for insert
  with check (true);
