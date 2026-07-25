-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- One-time DATA BACKFILL, not a code bug fix.
--
-- The permanent unlock table (unlocked_sections, migration 018) was only
-- added on 2026-07-22. Before that date, "is the next section unlocked"
-- was computed live in the browser from local/session state and never
-- written to the database anywhere. Anyone who genuinely passed a
-- section (>=90%) BEFORE that date has the real score sitting in
-- section_best_scores (that table existed and was written to correctly
-- the whole time) — but they never got a real unlocked_sections row for
-- the section that score should have unlocked, because the code that
-- writes that row didn't exist yet when they earned it. Going forward,
-- every new pass correctly writes its own unlock row (see
-- sectionAttemptsStore.recordAttempt) — this migration only repairs
-- accounts with genuine, already-earned history from before that point.
--
-- Logic: for every (user, cert, section) in section_best_scores whose
-- best score ever recorded was >=90%, make sure the NEXT section
-- (section_index + 1) has a real row in unlocked_sections. Uses the
-- same 90% mastery bar as the app itself (SECTION_PASS_THRESHOLD /
-- UNLOCK_THRESHOLD). Safe to run more than once — ON CONFLICT DO
-- NOTHING means it can never create a duplicate or downgrade anything
-- that's already unlocked.

insert into public.unlocked_sections (user_id, cert_id, section_index)
select user_id, cert_id, section_index + 1
from public.section_best_scores
where best_score_percent >= 90
on conflict (user_id, cert_id, section_index) do nothing;
