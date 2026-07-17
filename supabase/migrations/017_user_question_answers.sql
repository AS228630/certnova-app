-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Fixes a real bug: whether a practice-exam question was answered
-- correctly only ever lived in React component state (PracticeClient's
-- `answers`/`checked`), which is wiped every time the page unmounts —
-- closing the tab or coming back the next day. Since section-unlocking
-- (see lib/practiceSections.ts, UNLOCK_THRESHOLD = 90) depends on the
-- accuracy of the *previous* section, a user who passed section 1 and 2
-- and was partway through section 3 would find section 3 locked again
-- on their next visit, because their answer history had vanished.
--
-- This table gives that history a permanent home. One row per
-- (user, cert, question), upserted every time the question is checked —
-- so re-answering a question later just updates its latest result.

create table if not exists public.user_question_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  question_id text not null,
  correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (user_id, cert_id, question_id)
);

create index if not exists user_question_answers_user_cert_idx
  on public.user_question_answers (user_id, cert_id);

alter table public.user_question_answers enable row level security;

-- Users can only ever see or write their own answer history.
drop policy if exists "Users can view their own question answers" on public.user_question_answers;
create policy "Users can view their own question answers"
  on public.user_question_answers for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own question answers" on public.user_question_answers;
create policy "Users can insert their own question answers"
  on public.user_question_answers for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own question answers" on public.user_question_answers;
create policy "Users can update their own question answers"
  on public.user_question_answers for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
