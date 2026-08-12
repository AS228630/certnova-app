-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Private Candidate Profile + Recruiter Share Links, per the senior
-- advisor's Aug 12 2026 executive spec. Fully additive — no existing
-- table touched. Confirmed via a repo-wide search that nothing named
-- candidate_*/share_link*/recruiter* already exists, so none of this
-- duplicates an existing entity.
--
-- Scope note: this migration covers the DATA MODEL only (sections
-- 5-30 of the spec). Storage buckets (section 12), signed-URL /
-- access-grant application logic (sections 23-24), the admin UI, and
-- the recruiter-facing UI are separate follow-up work, built only
-- after this schema is reviewed and (if approved) actually run.
--
-- This is a single-candidate system (the project owner's own
-- professional profile) — candidate_profiles is expected to hold
-- exactly one row, but is modeled as a real table (not a singleton
-- config blob) so the schema stays uniform with every other table
-- here and nothing has to change if that assumption is ever revisited.

-- --------------------------------------------------------------------
-- 1. candidate_profiles — the public-facing professional profile.
-- --------------------------------------------------------------------

create table if not exists public.candidate_profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  professional_title text,
  bio text,
  location text,
  availability text check (availability in ('available', 'open', 'unavailable')),
  work_mode text, -- e.g. 'Remote / Hybrid / Vor Ort' — free text, admin-edited
  email text,
  linkedin_url text,
  github_url text,
  profile_photo_path text, -- storage path in the candidate-public bucket
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_profiles enable row level security;
-- No public RLS policies, intentionally — same pattern as every other
-- table in this project. The public-facing profile page reads this
-- through a Next.js API route using the service-role key
-- (app/api/candidate/profile, a later step), never directly from the
-- browser via Supabase's client SDK.

-- --------------------------------------------------------------------
-- 2. candidate_skills
-- --------------------------------------------------------------------

create table if not exists public.candidate_skills (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  category text not null, -- 'Development', 'IT & Cloud', 'Microsoft', 'DevOps', 'Database', 'Tools'
  name text not null,
  level text, -- optional, free text (e.g. 'Fortgeschritten') — not required by the design reference
  sort_order int not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.candidate_skills enable row level security;
create index if not exists candidate_skills_candidate_id_idx on public.candidate_skills (candidate_id);

-- --------------------------------------------------------------------
-- 3. candidate_certifications — distinct from candidate_documents
--    (spec section 38: a certification RECORD is not the same thing
--    as its certificate FILE). certificate_file_id/badge_file_id are
--    nullable FKs to candidate_documents, added after that table
--    exists below.
-- --------------------------------------------------------------------

create table if not exists public.candidate_certifications (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  issuer text not null,
  name text not null,
  credential_id text, -- nullable on purpose: if there is no real credential ID, the UI must show
                       -- "Verification unavailable", never fabricate one (spec section 7)
  issue_date date,
  expiry_date date,
  verification_url text,
  certificate_file_id uuid, -- FK added below, after candidate_documents exists
  badge_file_id uuid,       -- FK added below, after candidate_documents exists
  is_public boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_certifications enable row level security;
create index if not exists candidate_certifications_candidate_id_idx on public.candidate_certifications (candidate_id);

-- --------------------------------------------------------------------
-- 4. candidate_experiences
-- --------------------------------------------------------------------

create table if not exists public.candidate_experiences (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  role_title text not null,
  company_name text not null,
  location text,
  start_date date,
  end_date date, -- null = "heute" / present
  description text, -- free text; UI renders as bullet points if the admin writes it with line breaks
  sort_order int not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_experiences enable row level security;
create index if not exists candidate_experiences_candidate_id_idx on public.candidate_experiences (candidate_id);

-- --------------------------------------------------------------------
-- 5. candidate_projects
-- --------------------------------------------------------------------

create table if not exists public.candidate_projects (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  title text not null,
  description text,
  technologies text[], -- simple array of tech tags, matches the chip-style UI in the design reference
  project_url text,
  repo_url text,
  sort_order int not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_projects enable row level security;
create index if not exists candidate_projects_candidate_id_idx on public.candidate_projects (candidate_id);

-- --------------------------------------------------------------------
-- 6. candidate_documents — metadata only (spec section 1: "Database
--    fields metadata + permissions + relationships; the real file
--    lives in private Storage, never in the database").
-- --------------------------------------------------------------------

create table if not exists public.candidate_documents (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  title text not null,
  description text,
  document_type text, -- 'CV', 'Certificate', 'Employment Certificate', 'Reference', 'Project Document',
                       -- 'Portfolio', 'Diploma', 'Other' — free text, validated in the application layer,
                       -- not a DB check constraint, so new types don't require a migration
  storage_path text not null, -- UUID-based path (spec section 35), e.g.
                               -- candidate/{candidateId}/documents/{documentId}/{uuid}.pdf —
                               -- never the original filename, in either public or private bucket
  file_name text not null, -- the ORIGINAL filename, shown in the UI — kept separate from storage_path
  mime_type text not null,
  file_size_bytes int not null,
  visibility text not null default 'private' check (visibility in ('public', 'private')),
  allow_download boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz -- soft delete (spec section 68) — actual Storage cleanup is a separate,
                         -- deliberately manual/reviewed step, not an automatic cascade
);

alter table public.candidate_documents enable row level security;
create index if not exists candidate_documents_candidate_id_idx on public.candidate_documents (candidate_id);
create index if not exists candidate_documents_visibility_idx on public.candidate_documents (visibility) where deleted_at is null;

-- Now that candidate_documents exists, add the two FKs deferred from
-- candidate_certifications above.
alter table public.candidate_certifications
  add constraint candidate_certifications_certificate_file_id_fkey
  foreign key (certificate_file_id) references public.candidate_documents(id),
  add constraint candidate_certifications_badge_file_id_fkey
  foreign key (badge_file_id) references public.candidate_documents(id);

-- --------------------------------------------------------------------
-- 7. share_links — one per company/recruiter (spec section 17).
-- --------------------------------------------------------------------

create table if not exists public.share_links (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references public.candidate_profiles(id) on delete cascade,
  company_name text not null,
  recruiter_name text,
  recruiter_email text,
  -- Per spec sections 14-15: NEVER store the raw token. Only its
  -- SHA-256 hash. The raw token exists only in the URL the recruiter
  -- receives and briefly in application memory when verifying it.
  token_hash text not null unique,
  expires_at timestamptz,
  revoked_at timestamptz,
  require_access_code boolean not null default true,
  max_views int, -- null = unlimited
  access_count int not null default 0,
  allow_download boolean not null default false,
  created_at timestamptz not null default now(),
  last_accessed_at timestamptz
);

alter table public.share_links enable row level security;
create index if not exists share_links_token_hash_idx on public.share_links (token_hash);
create index if not exists share_links_candidate_id_idx on public.share_links (candidate_id);

-- --------------------------------------------------------------------
-- 8. share_link_documents — per-link document permission (spec
--    sections 26-27): Company A and Company B can be granted access
--    to different, independently-chosen sets of private documents.
-- --------------------------------------------------------------------

create table if not exists public.share_link_documents (
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  document_id uuid not null references public.candidate_documents(id) on delete cascade,
  primary key (share_link_id, document_id)
);

alter table public.share_link_documents enable row level security;

-- --------------------------------------------------------------------
-- 9. document_access_codes — the code a recruiter enters to unlock
--    confidential documents on a share link. Hashed, per spec
--    section 21 (never plaintext).
-- --------------------------------------------------------------------

create table if not exists public.document_access_codes (
  id uuid primary key default gen_random_uuid(),
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  code_hash text not null, -- application layer hashes with a strong KDF (Argon2id preferred,
                            -- bcrypt as fallback) before this is ever written — see the future
                            -- app/api/share/[token]/access-code route, not implemented in this migration
  failed_attempts int not null default 0,
  locked_until timestamptz, -- brute-force protection (spec section 49): 5 failed attempts -> temporary lock
  created_at timestamptz not null default now()
);

alter table public.document_access_codes enable row level security;
create index if not exists document_access_codes_share_link_id_idx on public.document_access_codes (share_link_id);

-- --------------------------------------------------------------------
-- 10. document_access_grants — created after a successful code
--     verification; what a recruiter session is actually allowed to
--     see (spec section 25).
-- --------------------------------------------------------------------

create table if not exists public.document_access_grants (
  id uuid primary key default gen_random_uuid(),
  share_link_id uuid not null references public.share_links(id) on delete cascade,
  document_id uuid not null references public.candidate_documents(id) on delete cascade,
  granted_at timestamptz not null default now(),
  expires_at timestamptz, -- session-scoped grant expiry, independent of the share link's own expiry
  revoked_at timestamptz,
  created_ip_hash text -- hashed, never raw IP, per spec's own logging discipline (section 32,
                        -- applied consistently here too even though that section named audit logs specifically)
);

alter table public.document_access_grants enable row level security;
create index if not exists document_access_grants_share_link_id_idx on public.document_access_grants (share_link_id);

-- --------------------------------------------------------------------
-- 11. candidate_access_logs — append-only, mirrors the enforcement
--     already used for audit_logs (migration 032): UPDATE/DELETE
--     revoked at the database level, not just by convention.
-- --------------------------------------------------------------------

create table if not exists public.candidate_access_logs (
  id uuid primary key default gen_random_uuid(),
  share_link_id uuid references public.share_links(id) on delete set null,
  document_id uuid references public.candidate_documents(id) on delete set null,
  event_type text not null check (event_type in (
    'PROFILE_VIEWED', 'DOCUMENT_ACCESS_GRANTED', 'DOCUMENT_VIEWED', 'DOCUMENT_DOWNLOADED',
    'ACCESS_CODE_FAILED', 'ACCESS_CODE_SUCCESS', 'SHARE_LINK_CREATED', 'SHARE_LINK_REVOKED',
    'DOCUMENT_UPLOADED', 'DOCUMENT_DELETED'
  )),
  actor_ip_hash text, -- hashed, per spec section 32 — never a raw IP
  metadata jsonb, -- never raw access codes, raw share tokens, or document content (spec section 32)
  created_at timestamptz not null default now()
);

alter table public.candidate_access_logs enable row level security;
create index if not exists candidate_access_logs_share_link_id_idx on public.candidate_access_logs (share_link_id);
create index if not exists candidate_access_logs_created_at_idx on public.candidate_access_logs (created_at);

revoke update, delete on public.candidate_access_logs from authenticated, anon;
