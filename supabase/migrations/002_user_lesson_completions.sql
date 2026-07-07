-- Run this once in the Supabase SQL Editor, in addition to
-- 001_user_progress.sql. Tracks exactly which individual lessons a user
-- has completed (not just the aggregate per-cert percent), so the Lernpfad
-- checkmarks survive a page refresh instead of resetting.

create table if not exists public.user_lesson_completions (
  user_id uuid not null references auth.users(id) on delete cascade,
  cert_id text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, cert_id, lesson_id)
);

alter table public.user_lesson_completions enable row level security;

create policy "Users can view their own lesson completions"
  on public.user_lesson_completions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own lesson completions"
  on public.user_lesson_completions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own lesson completions"
  on public.user_lesson_completions for delete
  using (auth.uid() = user_id);
