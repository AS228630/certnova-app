-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- STATUS: DRAFT — review before running. Migrations 034/035/036
-- already live; this is a new, separately reviewable file.
--
-- Covers exactly two things from the advisor's consolidated Aug 12
-- 2026 instructions, both genuinely requiring new schema (everything
-- else in the 12-gap list — reorder, certification status — is
-- covered by existing columns or a computed value, no migration
-- needed):
--   1. Real company logo/website on Experience entries.
--   2. A new candidate_education table (University section didn't
--      exist in the schema at all before this).
-- No guessed/fabricated data ever goes in these columns — they stay
-- null until the owner supplies the real value, and the UI shows an
-- honest empty/unavailable state for null, never a placeholder logo.

alter table public.candidate_experiences
  add column if not exists company_logo_url text,
  add column if not exists company_website_url text;

alter table public.candidate_certifications
  add column if not exists logo_url text;

create table if not exists public.candidate_education (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  institution_name text not null,
  degree text,
  field_of_study text,
  graduation_date date,
  logo_url text,
  website_url text,
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_education enable row level security;
create index if not exists candidate_education_candidate_id_idx on public.candidate_education (candidate_id);
