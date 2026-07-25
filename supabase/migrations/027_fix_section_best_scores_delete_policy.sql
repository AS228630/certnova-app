-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Same pattern as migrations 019 and 024: section_best_scores only ever
-- had select/insert/update policies, never delete. Needed for the new
-- "reset my progress" feature (Settings page + the practice page's
-- "restart the whole exam" button, which was silently NOT clearing the
-- Attempt History table despite clearing question answers) to actually
-- work — without this, its DELETE call would be silently denied by RLS
-- (0 rows affected, no error).

drop policy if exists "Users can delete their own best scores" on public.section_best_scores;
create policy "Users can delete their own best scores"
  on public.section_best_scores for delete
  using (auth.uid() = user_id);
