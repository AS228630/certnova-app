-- DIAGNOSTIC QUERY (mobile-friendly version) — read-only, changes
-- nothing. Everything is combined into ONE text column so nothing gets
-- cut off on a phone screen.
--
-- Replace 'PASTE_EMAIL_HERE' below with the account's email address.

with target_user as (
  select id from auth.users where email = 'PASTE_EMAIL_HERE'
)
select
  'user_question_answers: rows=' ||
    (select count(*) from public.user_question_answers
     where cert_id = 'az-900' and user_id = (select id from target_user)) ||
  ', question# range=' ||
    coalesce((select min((regexp_replace(question_id, '^real-az900-', ''))::int)::text
     from public.user_question_answers
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none') ||
  '..' ||
    coalesce((select max((regexp_replace(question_id, '^real-az900-', ''))::int)::text
     from public.user_question_answers
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none')
  as result

union all

select
  'section_best_scores: rows=' ||
    (select count(*) from public.section_best_scores
     where cert_id = 'az-900' and user_id = (select id from target_user)) ||
  ', section# range=' ||
    coalesce((select min(section_index)::text from public.section_best_scores
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none') ||
  '..' ||
    coalesce((select max(section_index)::text from public.section_best_scores
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none')

union all

select
  'unlocked_sections: rows=' ||
    (select count(*) from public.unlocked_sections
     where cert_id = 'az-900' and user_id = (select id from target_user)) ||
  ', section# range=' ||
    coalesce((select min(section_index)::text from public.unlocked_sections
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none') ||
  '..' ||
    coalesce((select max(section_index)::text from public.unlocked_sections
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none')

union all

select
  'section_attempts: rows=' ||
    (select count(*) from public.section_attempts
     where cert_id = 'az-900' and user_id = (select id from target_user)) ||
  ', section# range=' ||
    coalesce((select min(section_index)::text from public.section_attempts
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none') ||
  '..' ||
    coalesce((select max(section_index)::text from public.section_attempts
     where cert_id = 'az-900' and user_id = (select id from target_user)), 'none');
