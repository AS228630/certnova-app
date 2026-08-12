-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- STATUS: DRAFT — NOT APPROVED, NOT APPLIED.
--
-- Per the advisor's Aug 12 2026 PHASE 5 IMPLEMENTATION directive: two
-- small, genuinely necessary additions that migration 034 (already
-- live) didn't and shouldn't have included, since Storage was
-- deliberately deferred until now.
--
-- This is NOT a redesign — migration 034's 10 tables are untouched
-- except for the one new column below. Per the standing project rule
-- ("no new migration unless truly proven necessary for a required
-- feature"): the advisor explicitly required a real distinction
-- between "soft-deleted but the file is still recoverable" and
-- "permanently removed, restore no longer possible" — migration 034's
-- `candidate_documents.deleted_at` alone can't express that
-- distinction, so a second timestamp is genuinely needed, not just
-- convenient.

-- --------------------------------------------------------------------
-- 1. candidate_documents.storage_deleted_at — the missing half of the
--    soft-delete/permanent-delete distinction the advisor required.
--
--    deleted_at IS NULL                          -> not deleted at all
--    deleted_at IS NOT NULL, storage_deleted_at IS NULL
--                                                  -> soft-deleted;
--                                                     file still exists
--                                                     in Storage; RESTORE
--                                                     is possible
--    deleted_at IS NOT NULL, storage_deleted_at IS NOT NULL
--                                                  -> permanently deleted;
--                                                     the Storage object
--                                                     has actually been
--                                                     removed; RESTORE is
--                                                     no longer possible
-- --------------------------------------------------------------------

alter table public.candidate_documents
  add column if not exists storage_deleted_at timestamptz;

-- --------------------------------------------------------------------
-- 2. Storage bucket — single, private, per the advisor's explicit
--    correction (PHASE 5 FINAL REVIEW): one candidate-private bucket
--    for every file (documents, certificates, profile photo — no
--    exceptions, no second bucket).
-- --------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'candidate-private', 'candidate-private', false, 20971520, -- 20 MB, per the PHASE 5 design report section 5
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do nothing;

-- No storage.objects RLS policies added: reachable only server-side
-- with the service role key (which bypasses Storage RLS by design),
-- matching this project's established pattern — the browser never
-- talks to Supabase Storage directly, always through a Next.js API
-- route that generates a short-lived signed URL after checking
-- authorization first.
