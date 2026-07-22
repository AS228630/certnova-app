-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Implements the "Section Progress & Unlock System" spec, WITH ONE
-- DELIBERATE CHANGE from the original spec: unlimited retries are still
-- allowed, but full attempt HISTORY is capped at the 20 most recent
-- attempts per (user, cert, section) instead of kept forever. On the
-- free Supabase plan (500MB), "never delete a row, ever" combined with
-- "unlimited retries" is an unbounded-growth risk — a handful of users
-- retrying a section hundreds of times would eventually fill the
-- database. The cap is enforced by a trigger at the DATABASE level
-- (not just app code), so it holds regardless of how the app calls it.
--
-- The "always show the best score" requirement (spec section 7) is NOT
-- affected by this cap: section_best_scores below is a separate,
-- upserted (not appended) table — exactly ONE row per (user, cert,
-- section) no matter how many times they retry, so it can never grow
-- unbounded, and the best-ever score is never lost even if it falls
-- outside the 20 most recent attempts.

create table if not exists public.section_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  section_index integer not null check (section_index >= 0),
  attempt_number integer not null check (attempt_number >= 1),
  score_percent integer not null check (score_percent >= 0 and score_percent <= 100),
  correct_count integer not null check (correct_count >= 0),
  total_count integer not null check (total_count >= 0),
  passed boolean not null,
  completed_at timestamptz not null default now()
);

create index if not exists section_attempts_user_cert_section_idx
  on public.section_attempts (user_id, cert_id, section_index, completed_at desc);

alter table public.section_attempts enable row level security;

drop policy if exists "Users can view their own section attempts" on public.section_attempts;
create policy "Users can view their own section attempts"
  on public.section_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own section attempts" on public.section_attempts;
create policy "Users can insert their own section attempts"
  on public.section_attempts for insert
  with check (auth.uid() = user_id);

-- Keeps only the 20 most recent attempts per (user, cert, section) —
-- runs automatically after every insert, so the table can never grow
-- past roughly (users × certs-in-progress × sections × 20) rows,
-- regardless of how many times anyone retries.
create or replace function public.trim_section_attempts()
returns trigger as $$
begin
  delete from public.section_attempts
  where id in (
    select id from public.section_attempts
    where user_id = new.user_id
      and cert_id = new.cert_id
      and section_index = new.section_index
    order by completed_at desc
    offset 20
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trim_section_attempts_trigger on public.section_attempts;
create trigger trim_section_attempts_trigger
  after insert on public.section_attempts
  for each row execute function public.trim_section_attempts();

create table if not exists public.unlocked_sections (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  section_index integer not null check (section_index >= 0),
  unlocked_at timestamptz not null default now(),
  primary key (user_id, cert_id, section_index)
);

alter table public.unlocked_sections enable row level security;

drop policy if exists "Users can view their own unlocked sections" on public.unlocked_sections;
create policy "Users can view their own unlocked sections"
  on public.unlocked_sections for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own unlocked sections" on public.unlocked_sections;
create policy "Users can insert their own unlocked sections"
  on public.unlocked_sections for insert
  with check (auth.uid() = user_id);

-- Permanent best-score-ever tracker, PLUS a running total-attempts
-- counter. One row per (user, cert, section), always UPSERTED (never
-- appended) — so no matter how many times a section is retried, this
-- table contributes at most one small row per section per user. This
-- is what "always show the Best Score" reads from, and it's also how
-- "Attempt Number" stays correct (Attempt 21, 22, ...) even past the
-- 20-attempt history cap above, since the counter itself never gets
-- trimmed.
create table if not exists public.section_best_scores (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  section_index integer not null check (section_index >= 0),
  best_score_percent integer not null check (best_score_percent >= 0 and best_score_percent <= 100),
  total_attempts integer not null default 0 check (total_attempts >= 0),
  updated_at timestamptz not null default now(),
  primary key (user_id, cert_id, section_index)
);

alter table public.section_best_scores enable row level security;

drop policy if exists "Users can view their own best scores" on public.section_best_scores;
create policy "Users can view their own best scores"
  on public.section_best_scores for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own best scores" on public.section_best_scores;
create policy "Users can insert their own best scores"
  on public.section_best_scores for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own best scores" on public.section_best_scores;
create policy "Users can update their own best scores"
  on public.section_best_scores for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
