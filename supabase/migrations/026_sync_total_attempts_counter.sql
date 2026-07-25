-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- The "Versuche" number shown at the top of each section's row comes
-- from section_best_scores.total_attempts — a SEPARATE counter column,
-- not a live count of section_attempts rows. Migrations 023/024/025
-- cleaned up section_attempts itself (so the expandable detail list
-- now correctly shows just the real attempt(s)), but never touched
-- this counter, so the summary row kept showing the old inflated
-- number (16) even though only 1 real row was left underneath it.
--
-- This syncs total_attempts to the real, current row count for every
-- (user, cert, section). Safe to re-run any time — it's a pure
-- recalculation, not an increment.

update public.section_best_scores sbs
set total_attempts = coalesce((
  select count(*)
  from public.section_attempts sa
  where sa.user_id = sbs.user_id
    and sa.cert_id = sbs.cert_id
    and sa.section_index = sbs.section_index
), 0);
