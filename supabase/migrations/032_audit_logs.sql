-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Append-only audit log, per the senior advisor's priority order
-- (RBAC first, then Audit Log — a permission system and an actor
-- identity must exist before the audit trail can record "who did
-- this", which is exactly why this comes right after 031_rbac.sql
-- and not before it).
--
-- Fully additive. No existing table touched.

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id),
  actor_email text,
  action text not null,
  resource_type text,
  resource_id text,
  metadata jsonb,
  created_at timestamptz not null default now()
);

alter table public.audit_logs enable row level security;
-- No public policies, intentionally — same pattern as every other
-- admin table in this project. Written only server-side via the
-- service role key, through the single logAudit() helper
-- (lib/admin/audit.ts) — never directly from a component.

create index if not exists audit_logs_actor_id_idx on public.audit_logs (actor_id);
create index if not exists audit_logs_action_idx on public.audit_logs (action);
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at);

-- Append-only, enforced at the database level, not just by
-- convention: revoke UPDATE/DELETE from every role this project's
-- API ever uses. The service role itself bypasses RLS/GRANTs by
-- design in Supabase, so this is a deliberate safety net against a
-- future bug (an accidental .update()/.delete() call on this table
-- from application code), not the only line of defense — but it
-- costs nothing to have and matches the advisor's explicit
-- "Never UPDATE, Never DELETE" requirement being enforced by more
-- than just code review.
revoke update, delete on public.audit_logs from authenticated, anon;
