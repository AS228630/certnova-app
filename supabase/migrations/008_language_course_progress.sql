-- Run this once in the Supabase SQL Editor, in addition to the earlier
-- migrations. Backs the Sprachkurse (language courses) page: real
-- per-user progress per language course. A brand-new user genuinely has
-- zero rows here, so every course card shows 0% until the user actually
-- starts practicing — no fabricated progress.

create table if not exists public.language_course_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  lessons_completed integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_slug)
);

alter table public.language_course_progress enable row level security;

drop policy if exists "Users can view their own language course progress" on public.language_course_progress;
create policy "Users can view their own language course progress"
  on public.language_course_progress for select
  using (auth.uid() = user_id);

drop policy if exists "Users can upsert their own language course progress" on public.language_course_progress;
create policy "Users can upsert their own language course progress"
  on public.language_course_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own language course progress" on public.language_course_progress;
create policy "Users can update their own language course progress"
  on public.language_course_progress for update
  using (auth.uid() = user_id);
