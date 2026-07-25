-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- One-time DATA CONSISTENCY FIX, not a code bug.
--
-- Some accounts ended up with "gaps" in unlocked_sections — e.g. section
-- 3 locked while sections 4, 5, 6 are unlocked for the same user+cert.
-- This can happen from the historical backfills (020/021) only being
-- able to reconstruct unlock state from sections that still have
-- recoverable data; a section that was genuinely skipped over or whose
-- old data never made it into any table stays locked even though later
-- sections are unlocked, which looks — and is — inconsistent, since
-- reaching a later section necessarily means every earlier one should
-- already be considered cleared.
--
-- This fills every such gap: for every (user, cert), find the highest
-- unlocked section_index, and make sure every section from 0 up to that
-- number has a row. Safe to run more than once (ON CONFLICT DO NOTHING)
-- and purely additive — it can only unlock sections that were already
-- implied by a later unlock, never anything beyond that.

with highest_unlocked as (
  select user_id, cert_id, max(section_index) as max_section
  from public.unlocked_sections
  group by user_id, cert_id
),
all_gaps as (
  select h.user_id, h.cert_id, gs.section_index
  from highest_unlocked h
  cross join lateral generate_series(1, h.max_section) as gs(section_index)
)
insert into public.unlocked_sections (user_id, cert_id, section_index)
select user_id, cert_id, section_index
from all_gaps
on conflict (user_id, cert_id, section_index) do nothing;
