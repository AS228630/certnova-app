-- DIAGNOSTIC QUERY — read-only, changes nothing.
-- Replace 'PASTE_EMAIL_HERE' with the account's email address.

with target_user as (
  select id from auth.users where email = 'PASTE_EMAIL_HERE'
)
select
  'Teil ' || (section_index + 1) || ': attempts=' || count(*) ||
  ', best=' || max(score_percent) || '%' ||
  ', numbers=' || string_agg(attempt_number::text, ',' order by attempt_number)
  as result
from public.section_attempts
where cert_id = 'az-900' and user_id = (select id from target_user)
group by section_index
order by section_index;
