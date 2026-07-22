-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Implements the "Section Progress & Unlock System" spec:
--   1. section_attempts — one row per COMPLETED attempt at a section
--      (never updated or deleted — full history, every attempt kept
--      forever, matching "هیچ Attempt حذف نشود").
--   2. unlocked_sections — a PERMANENT record of which sections have
--      been unlocked for a user+cert. Once a row exists here, that
--      section stays unlocked forever, even if the user later retries
--      the section that unlocked it and scores lower. This is
--      deliberately a SEPARATE table from section_attempts (which is
--      just a log) so "unlocked" is never re-derived live from
--      possibly-lower later scores — it's a one-way ratchet.
--
-- Both tables are keyed by cert_id (text, not a foreign key) so this
-- works identically for every certification/company without any
-- per-cert code changes — matches spec section 9 ("این سیستم نباید
-- فقط برای AZ-900 طراحی شود").

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

-- No update/delete policies on purpose — attempt history is immutable
-- once recorded, matching the spec.

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

-- No update/delete here either — once unlocked, a row simply exists
-- forever. "ON CONFLICT DO NOTHING" is used on insert from the app,
-- so re-unlocking an already-unlocked section is a harmless no-op.
