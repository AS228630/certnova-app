-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- STATUS: DRAFT — review before running.
--
-- One small additive column, needed to match the approved design
-- reference exactly (the "Gesuchte Positionen" / desired-positions
-- chips section) — migrations 034/035 are already live, so this is a
-- new, separately reviewable file rather than an edit to either.

alter table public.candidate_profiles
  add column if not exists desired_positions text[];
