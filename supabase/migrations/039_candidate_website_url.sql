-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- STATUS: DRAFT — NOT EXECUTED. Prepared ahead of time so it's ready
-- the moment the current real-data validation phase is confirmed
-- complete and this (plus the other two pending GAPs) gets explicit
-- approval to run — per the standing "no new migrations until full
-- real-data validation" agreement, still in effect as of this draft.
--
-- Resolves GAP #3 (personal website field) — the other two pending
-- GAPs (candidate_education.location, candidate_documents.sort_order)
-- are tracked separately and not included here, so each can be
-- reviewed/approved independently if needed.

alter table public.candidate_profiles
  add column if not exists website_url text;
