-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds two intentionally lightweight tables for the redesigned dashboard:
--
-- 1. user_topic_mastery: aggregate correct/total counters per broad skill
--    area (cloud, security, networking, linux, devops), NOT a per-question
--    log. Each user has at most 5 rows here — this is what powers the
--    "Fähigkeiten" radar chart honestly, without storing every answer
--    event. Starts empty; a brand-new user (or one who hasn't practiced
--    since this migration ran) shows a "not enough data yet" state
--    rather than a fabricated chart.
--
-- 2. user_activity_log: only meaningful milestones (lab completed, mock
--    exam passed, certificate earned) — never individual question
--    answers, which would grow unbounded. A trigger caps this at the 50
--    most recent rows per user, deleting older ones automatically, so
--    this table cannot grow without bound regardless of usage.

create table if not exists public.user_topic_mastery (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_area text not null check (topic_area in ('cloud', 'security', 'networking', 'linux', 'devops')),
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_area)
);

alter table public.user_topic_mastery enable row level security;

drop policy if exists "Users can view their own topic mastery" on public.user_topic_mastery;
create policy "Users can view their own topic mastery"
  on public.user_topic_mastery for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own topic mastery" on public.user_topic_mastery;
create policy "Users can insert their own topic mastery"
  on public.user_topic_mastery for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own topic mastery" on public.user_topic_mastery;
create policy "Users can update their own topic mastery"
  on public.user_topic_mastery for update
  using (auth.uid() = user_id);

create table if not exists public.user_activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  activity_type text not null check (activity_type in ('lab_completed', 'exam_passed', 'certificate_earned', 'course_milestone')),
  title text not null,
  xp_awarded integer not null default 0,
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists user_activity_log_user_created_idx
  on public.user_activity_log (user_id, created_at desc);

alter table public.user_activity_log enable row level security;

drop policy if exists "Users can view their own activity" on public.user_activity_log;
create policy "Users can view their own activity"
  on public.user_activity_log for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own activity" on public.user_activity_log;
create policy "Users can insert their own activity"
  on public.user_activity_log for insert
  with check (auth.uid() = user_id);

-- Keeps the table bounded: after each insert, delete anything beyond the
-- 50 most recent rows for that user. This runs per-user, so total table
-- size scales with (number of users × 50 rows), never with total lifetime
-- activity — the growth-control principle from the project's database
-- guidance (section 4.1 of the project README).
create or replace function public.trim_user_activity_log()
returns trigger as $$
begin
  delete from public.user_activity_log
  where id in (
    select id from public.user_activity_log
    where user_id = new.user_id
    order by created_at desc
    offset 50
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists user_activity_log_trim on public.user_activity_log;
create trigger user_activity_log_trim
  after insert on public.user_activity_log
  for each row execute function public.trim_user_activity_log();

-- 3. A small addition to the existing user_progress table (not a new
--    table): tracks how many questions were answered *today* specifically,
--    alongside the existing all-time questions_answered counter. This
--    powers an honest "18 / 20 questions solved today" style stat on the
--    redesigned dashboard, mirroring how study_minutes_today already
--    works next to study_minutes_total.
alter table public.user_progress
  add column if not exists questions_answered_today integer not null default 0;

alter table public.user_progress
  add column if not exists daily_question_goal integer not null default 20;
