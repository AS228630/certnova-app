-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Second, deeper one-time DATA BACKFILL for AZ-900 (not a code bug).
--
-- Migration 020 backfilled unlocked_sections from section_best_scores —
-- but section_best_scores itself only exists since 2026-07-22. Any
-- account that finished a section even earlier than that (back when the
-- ONLY thing being saved anywhere was individual question answers, via
-- user_question_answers, added 2026-07-21) has no row in
-- section_best_scores either, so migration 020 couldn't help them.
--
-- This one goes one level deeper: it recomputes each section's real
-- accuracy directly from the raw per-question answers that DO still
-- exist for that account, and unlocks the next section anywhere that
-- recomputed accuracy is >=90% — using the exact same rule the app
-- itself uses (correct count out of the section's full size, i.e. an
-- unanswered question counts against you, same as maybeShowScorecard).
--
-- AZ-900-specific: question ids are "real-az900-<n>" for n = 1..564,
-- grouped into 50-question sections (the last section only has 14).
-- Safe to run more than once (ON CONFLICT DO NOTHING) and safe to run
-- even if migration 020 was already run — this only adds rows that are
-- still missing, never removes or changes anything.

with per_question as (
  select
    user_id,
    cert_id,
    (regexp_replace(question_id, '^real-az900-', ''))::int as qnum,
    correct
  from public.user_question_answers
  where cert_id = 'az-900'
    and question_id ~ '^real-az900-\d+$'
),
per_section as (
  select
    user_id,
    cert_id,
    ((qnum - 1) / 50) as section_index,
    count(*) filter (where correct) as correct_count,
    least(50, 564 - ((qnum - 1) / 50) * 50) as section_size
  from per_question
  group by user_id, cert_id, ((qnum - 1) / 50)
),
passing as (
  select distinct user_id, cert_id, section_index
  from per_section
  where correct_count::numeric / section_size >= 0.9
)
insert into public.unlocked_sections (user_id, cert_id, section_index)
select user_id, cert_id, section_index + 1
from passing
on conflict (user_id, cert_id, section_index) do nothing;
