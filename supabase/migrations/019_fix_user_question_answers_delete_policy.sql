-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Fixes a real, confirmed bug: migration 017 enabled row level security on
-- user_question_answers and added policies for select/insert/update, but
-- never added one for DELETE. Under Postgres RLS, an operation with no
-- matching policy is denied by default — silently, with no error thrown
-- and no exception on the client side, it just deletes 0 rows.
--
-- Every "clear my answers" action in the app (the section-level
-- Wiederholen / Gemischt wiederholen buttons, and the full "restart the
-- whole exam" button) calls a DELETE against this table. Because of the
-- missing policy, none of those deletes ever actually removed anything
-- from the database: the app's local state was cleared optimistically
-- (so the screen correctly showed 0% right after clicking), but the old
-- rows were still sitting in Postgres — so reloading the page (which
-- re-fetches from the database) brought the old green/answered state
-- right back, making it look like the reset never happened.
--
-- This does not affect section_attempts, unlocked_sections, or
-- section_best_scores — none of those are ever deleted from by the app
-- (attempts are trimmed by the existing trigger, best scores and
-- unlocks are permanent by design), so they don't need an equivalent
-- policy.

drop policy if exists "Users can delete their own question answers" on public.user_question_answers;
create policy "Users can delete their own question answers"
  on public.user_question_answers for delete
  using (auth.uid() = user_id);
