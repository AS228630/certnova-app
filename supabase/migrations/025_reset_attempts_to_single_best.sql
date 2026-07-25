-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Simpler, more honest cleanup than migrations 023/024's time-based
-- guess: since there's no reliable way to reconstruct exactly how many
-- real attempts happened before the double-counting bug was fixed,
-- this collapses each (user, cert, section)'s entire attempt history
-- down to ONE row — the single best-scoring attempt — renumbered as
-- attempt_number = 1.
--
-- From this point forward (the bug is already fixed), every real new
-- attempt is counted correctly and adds normally on top of this. This
-- does not touch section_best_scores (the actual best-ever score
-- shown elsewhere) or unlocked_sections — only the attempt-history
-- list/count resets.
--
-- Safe to run even if 023/024 were already run (idempotent — running
-- it again when only 1 row already remains per section just keeps
-- that same row).

with keep as (
  select distinct on (user_id, cert_id, section_index)
    id
  from public.section_attempts
  order by user_id, cert_id, section_index, score_percent desc, completed_at desc
)
delete from public.section_attempts
where id not in (select id from keep);

update public.section_attempts
set attempt_number = 1;
