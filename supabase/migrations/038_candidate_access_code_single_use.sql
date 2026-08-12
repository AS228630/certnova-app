-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- STATUS: DRAFT — review before running. Migrations 034-037 already
-- live; this is a new, separately reviewable file.
--
-- One column, needed for a real requirement: an access code must be
-- usable only ONCE. Without this, "one-time use" can only be
-- approximated (e.g. via failed_attempts), not actually enforced —
-- this column is the difference between "the code worked" and "the
-- code can never work again after that".

alter table public.document_access_codes
  add column if not exists used_at timestamptz;
