-- Run this once in the Supabase SQL Editor, after 002_user_cert_progress.sql.
-- Extends per-cert progress with real per-cert lab completion and practice
-- question stats, so the "Praxis-Labore" and "Prüfungs-Simulation" phase
-- cards on the certification overview page can show real numbers scoped to
-- that specific certification instead of platform-wide totals.

alter table public.user_cert_progress
  add column if not exists lab_completed boolean not null default false,
  add column if not exists questions_answered integer not null default 0,
  add column if not exists questions_correct integer not null default 0;
