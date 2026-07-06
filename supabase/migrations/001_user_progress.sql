-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Creates the real per-user progress table backing the dashboard's streak,
-- XP, questions-answered, and labs-completed numbers — replacing the
-- hardcoded demo values. Every new user starts at all-zeros.

create table if not exists public.user_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  xp integer not null default 0,
  streak_days integer not null default 0,
  last_active_date date,
  study_minutes_today integer not null default 0,
  study_minutes_total integer not null default 0,
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  labs_completed integer not null default 0,
  daily_goal_minutes integer not null default 20,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Keep updated_at current on every write.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists user_progress_set_updated_at on public.user_progress;
create trigger user_progress_set_updated_at
  before update on public.user_progress
  for each row execute function public.set_updated_at();
