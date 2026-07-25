select
  section_index,
  best_score_percent,
  total_attempts
from public.section_best_scores
where cert_id = 'az-900'
  and user_id = (select id from auth.users where email = 'PASTE_EMAIL_HERE')
order by section_index;
