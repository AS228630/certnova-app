-- DIAGNOSTIC QUERY — read-only, changes nothing. Run this FIRST in the
-- Supabase SQL Editor, before running migration 021, to see what data
-- actually exists for the affected account.
--
-- Replace 'PASTE_EMAIL_HERE' below with the account's email address.

with target_user as (
  select id from auth.users where email = 'PASTE_EMAIL_HERE'
)
select
  'user_question_answers (raw per-question answers)' as source,
  count(*) as row_count,
  min((regexp_replace(question_id, '^real-az900-', ''))::int) as min_qnum,
  max((regexp_replace(question_id, '^real-az900-', ''))::int) as max_qnum
from public.user_question_answers
where cert_id = 'az-900' and user_id = (select id from target_user)

union all

select
  'section_best_scores' as source,
  count(*) as row_count,
  min(section_index) as min_qnum,
  max(section_index) as max_qnum
from public.section_best_scores
where cert_id = 'az-900' and user_id = (select id from target_user)

union all

select
  'unlocked_sections' as source,
  count(*) as row_count,
  min(section_index) as min_qnum,
  max(section_index) as max_qnum
from public.unlocked_sections
where cert_id = 'az-900' and user_id = (select id from target_user)

union all

select
  'section_attempts' as source,
  count(*) as row_count,
  min(section_index) as min_qnum,
  max(section_index) as max_qnum
from public.section_attempts
where cert_id = 'az-900' and user_id = (select id from target_user);
