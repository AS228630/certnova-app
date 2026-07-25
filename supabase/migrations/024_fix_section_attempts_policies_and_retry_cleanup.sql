-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Part A fixes the REAL root cause of why migration 023 appeared to run
-- successfully but changed nothing: section_attempts had policies for
-- select and insert only — no delete, no update. Under RLS, an
-- operation with no matching policy is silently denied (0 rows
-- affected, no error), exactly like the user_question_answers issue
-- fixed earlier in migration 019. So 023's DELETE and UPDATE both
-- quietly did nothing.
--
-- Part B re-runs the same cleanup logic from 023 now that it can
-- actually take effect.

-- ── Part A: add the missing policies ──────────────────────────────
drop policy if exists "Users can delete their own section attempts" on public.section_attempts;
create policy "Users can delete their own section attempts"
  on public.section_attempts for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can update their own section attempts" on public.section_attempts;
create policy "Users can update their own section attempts"
  on public.section_attempts for update
  using (auth.uid() = user_id);

-- ── Part B: re-run the cleanup (same logic as migration 023) ─────
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
delete from public.section_attempts
where id not in (select id from keep);

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
