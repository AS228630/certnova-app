-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- RBAC foundation, per the senior advisor's Aug 11 2026 directive
-- (priority order: RBAC first, before audit log, teacher detail page,
-- refund handling, or payouts — a real permission system must exist
-- before any of the financial-mutation features that come later).
--
-- Replaces the flat ADMIN_EMAILS allow-list ("is this email an admin
-- at all, yes/no") with real roles. ADMIN_EMAILS itself is NOT
-- removed — lib/admin/requireAdmin.ts still checks it first as a
-- coarse "is this person an admin at all" gate, then additionally
-- looks up this table for the specific role, so nothing breaks for
-- anyone already relying on the email-only check during the
-- transition. Fully additive: no existing table touched.
--
-- Confirmed safe against the real, reconciled schema (same database
-- already verified for migration 030 — see
-- docs/REFERRAL_COMMISSION_MIGRATION_PLAN.md section 1a).

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('SUPER_ADMIN', 'ADMIN', 'FINANCE_ADMIN', 'SUPPORT', 'AUDITOR')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id),
  unique (user_id)
);

alter table public.admin_users enable row level security;
-- No public policies, intentionally — same pattern as every other
-- admin-only table in this project (teacher_coupons, teachers,
-- referrals, commission_ledger): reachable only server-side with the
-- service role key. There is no legitimate reason for a browser to
-- query this table directly, and RBAC enforcement itself must happen
-- server-side in the API routes, not via RLS policies alone (per the
-- advisor's explicit "not just hiding a button in the frontend" rule).

create index if not exists admin_users_email_idx on public.admin_users (lower(email));

-- Seed: the project owner becomes SUPER_ADMIN immediately, so the
-- very first admin_users row always exists and nobody is locked out
-- the moment this migration runs. Matches whichever email is
-- currently configured in ADMIN_EMAILS on Vercel — update the email
-- below before running if that has changed since this file was
-- written.
insert into public.admin_users (user_id, email, role)
select id, email, 'SUPER_ADMIN'
from auth.users
where lower(email) = lower('senmas2022@gmail.com')
on conflict (user_id) do nothing;
