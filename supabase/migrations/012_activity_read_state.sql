-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds a `read_at` column to the existing user_activity_log table (from
-- migration 011) so the same real activity events (lab completed, mock
-- exam passed, certificate earned) can power an honest notification bell
-- — no new table, no fabricated notification content. A notification is
-- simply "an activity log row the user hasn't opened the bell to see
-- yet." NULL means unread; a timestamp means read.

alter table public.user_activity_log
  add column if not exists read_at timestamptz;

drop policy if exists "Users can update their own activity" on public.user_activity_log;
create policy "Users can update their own activity"
  on public.user_activity_log for update
  using (auth.uid() = user_id);
