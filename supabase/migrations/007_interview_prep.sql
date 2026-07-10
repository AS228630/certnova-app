-- Run this once in the Supabase SQL Editor, in addition to the earlier
-- migrations. Backs the Interview-Vorbereitung (interview prep) page:
-- which career goal the user is preparing for, their real interview
-- session history (only written when a session actually completes), and
-- per-topic practice progress (e.g. "Windows Support: 120 questions").

create table if not exists public.interview_prefs (
  user_id uuid primary key references auth.users(id) on delete cascade,
  career_goal_id text not null,
  updated_at timestamptz not null default now()
);

alter table public.interview_prefs enable row level security;

drop policy if exists "Users can view their own interview prefs" on public.interview_prefs;
create policy "Users can view their own interview prefs"
  on public.interview_prefs for select
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own interview prefs" on public.interview_prefs;
create policy "Users can upsert their own interview prefs"
  on public.interview_prefs for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own interview prefs" on public.interview_prefs;
create policy "Users can update their own interview prefs"
  on public.interview_prefs for update
  using (auth.uid() = user_id);

-- One row per completed (or in-progress) mock interview session. Only
-- written by the app when a session is actually started/finished — never
-- pre-seeded, so a brand-new user genuinely has zero rows here.
create table if not exists public.interview_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  career_goal_id text not null,
  session_type text not null check (session_type in ('technical', 'hr', 'practical', 'mock')),
  topic_id text,
  score_percent integer,
  duration_seconds integer,
  status text not null default 'in_progress' check (status in ('in_progress', 'completed', 'abandoned')),
  transcript jsonb not null default '[]'::jsonb,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists interview_sessions_user_id_idx on public.interview_sessions(user_id, started_at desc);

alter table public.interview_sessions enable row level security;

drop policy if exists "Users can view their own interview sessions" on public.interview_sessions;
create policy "Users can view their own interview sessions"
  on public.interview_sessions for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own interview sessions" on public.interview_sessions;
create policy "Users can create their own interview sessions"
  on public.interview_sessions for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own interview sessions" on public.interview_sessions;
create policy "Users can update their own interview sessions"
  on public.interview_sessions for update
  using (auth.uid() = user_id);

-- Per-topic practice progress (e.g. "windows-support": 34 of 120 answered,
-- 29 correct). Updated incrementally as the user practices interview
-- questions for a given topic within their chosen career goal.
create table if not exists public.interview_topic_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  questions_answered integer not null default 0,
  questions_correct integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, topic_id)
);

alter table public.interview_topic_progress enable row level security;

drop policy if exists "Users can view their own topic progress" on public.interview_topic_progress;
create policy "Users can view their own topic progress"
  on public.interview_topic_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own topic progress" on public.interview_topic_progress;
create policy "Users can upsert their own topic progress"
  on public.interview_topic_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own topic progress" on public.interview_topic_progress;
create policy "Users can update their own topic progress"
  on public.interview_topic_progress for update
  using (auth.uid() = user_id);
