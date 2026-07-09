-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Creates the exam-question bank. Content must be ORIGINAL questions written
-- from official "skills measured" outlines (or by SMEs) — never copied real
-- exam questions from dump sites, which violates certification NDAs and
-- copyright, regardless of where they are hosted.

create table if not exists public.exam_questions (
  id uuid primary key default gen_random_uuid(),
  cert_id text not null,                    -- e.g. "az-104"
  topic text,                               -- e.g. "Azure Storage"
  question_text text not null,
  options jsonb not null,                   -- ["Option A", "Option B", "Option C", "Option D"]
  correct_answer_index integer not null check (correct_answer_index >= 0),
  explanation text,                         -- shown after the user answers
  difficulty text not null default 'Beginner'
    check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  source text not null default 'original',  -- always "original" — never "dump"
  reviewed_by text,                         -- name/handle of the SME who verified it
  created_at timestamptz not null default now()
);

create index if not exists exam_questions_cert_id_idx on public.exam_questions (cert_id);

alter table public.exam_questions enable row level security;

-- Everyone (including anonymous visitors) can read questions — this is
-- practice content, not user data.
create policy "Anyone can read exam questions"
  on public.exam_questions for select
  using (true);

-- Only your own backend (service role key) should insert/update questions —
-- never expose write access to the public anon key.
