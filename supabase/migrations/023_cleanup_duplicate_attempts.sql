-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- One-time DATA CLEANUP for the (now-fixed) double-counting bug: fixing
-- a single wrong answer used to silently record a brand new "attempt"
-- every time, so accounts that used that feature before the fix ended
-- up with far more Versuche than they actually completed (e.g. 19
-- recorded instead of 5 real ones).
--
-- There is no stored flag distinguishing "a genuine new full run" from
-- "a bogus row created by re-checking one question" — but the bogus
-- ones have a very distinctive fingerprint: they always happened
-- seconds to a couple of minutes after the row before them (the time
-- it takes to click one wrong answer, fix it, and hit Check), while a
-- genuine new attempt means working through up to 50 questions again,
-- which realistically takes several minutes at minimum.
--
-- This clusters each (user, cert, section)'s attempts by time: any run
-- of attempts that are all within 4 minutes of the one before are
-- treated as ONE real session (keeping only the best-scoring row from
-- that cluster — matching the app's own "always show the best result"
-- principle), and attempts separated by more than 4 minutes start a
-- new cluster. After collapsing, attempt_number is renumbered 1..N in
-- chronological order per section so "Versuch 1..5" displays cleanly
-- with no gaps.
--
-- This is a heuristic, not a perfect reconstruction — if you genuinely
-- completed two full attempts back-to-back in under 4 minutes, this
-- would (incorrectly) merge them into one. It cannot be run more than
-- once safely in the sense of "undoing" itself, so review the numbers
-- look right afterward.

with ordered as (
  select
    id, user_id, cert_id, section_index, score_percent, completed_at,
    lag(completed_at) over (
      partition by user_id, cert_id, section_index order by completed_at
    ) as prev_completed_at
  from public.section_attempts
),
clustered as (
  select
    *,
    sum(
      case
        when prev_completed_at is null
          or completed_at - prev_completed_at > interval '4 minutes'
        then 1 else 0
      end
    ) over (
      partition by user_id, cert_id, section_index order by completed_at
    ) as cluster_id
  from ordered
),
keep as (
  select distinct on (user_id, cert_id, section_index, cluster_id)
    id
  from clustered
  order by user_id, cert_id, section_index, cluster_id, score_percent desc, completed_at desc
)
-- Step 1: delete every attempt that isn't the kept representative of its cluster.
delete from public.section_attempts
where id not in (select id from keep);

-- Step 2: renumber what's left so it reads 1, 2, 3... with no gaps.
with renumbered as (
  select
    id,
    row_number() over (
      partition by user_id, cert_id, section_index order by completed_at
    ) as new_attempt_number
  from public.section_attempts
)
update public.section_attempts sa
set attempt_number = r.new_attempt_number
from renumbered r
where sa.id = r.id;
