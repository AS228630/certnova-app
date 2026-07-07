-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Creates the real per-user, per-certification progress table. Replaces the
-- hardcoded demo "progress" field in lib/companiesData.ts. Every new user
-- simply has no row for a cert until they start it -- progress reads as 0.

create table if not exists public.user_cert_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  modules_done integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, cert_id)
);

alter table public.user_cert_progress enable row level security;

create policy "Users can view their own cert progress"
  on public.user_cert_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own cert progress"
  on public.user_cert_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cert progress"
  on public.user_cert_progress for update
  using (auth.uid() = user_id);

drop trigger if exists user_cert_progress_set_updated_at on public.user_cert_progress;
create trigger user_cert_progress_set_updated_at
  before update on public.user_cert_progress
  for each row execute function public.set_updated_at();
