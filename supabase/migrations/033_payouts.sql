-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
--
-- Payout system — the LAST phase of the senior advisor's priority
-- order (RBAC → Audit Log → Teacher Detail Page → Refund/Reversal →
-- Payout System → Reports/Export), built only now that a real
-- permission system, an append-only audit trail, and refund handling
-- all already exist, per the advisor's explicit reasoning: building
-- this first would have created real financial operations with no
-- access control or history around them.
--
-- Fully additive. commission_ledger.payout_id already existed as a
-- plain nullable uuid since migration 030 (deliberately left without
-- a foreign key back then, because payouts didn't exist yet) — this
-- migration is what finally gives it something real to point at.

create table if not exists public.payouts (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.teachers(id),
  amount_cents int not null check (amount_cents > 0),
  currency text not null default 'eur',
  method text not null default 'bank_transfer' check (method in ('bank_transfer', 'paypal', 'other')),
  reference text,
  status text not null default 'PENDING' check (status in ('PENDING', 'PAID', 'CANCELLED')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  paid_at timestamptz,
  cancelled_at timestamptz
);

alter table public.payouts enable row level security;
-- No public policies, intentionally — same pattern as every other
-- financial table in this project (commission_ledger, teacher_coupons):
-- service-role only, server-side.

create index if not exists payouts_teacher_id_idx on public.payouts (teacher_id);
create index if not exists payouts_status_idx on public.payouts (status);

-- Now that payouts exists, give commission_ledger.payout_id the real
-- foreign key it was always meant to have.
alter table public.commission_ledger
  add constraint commission_ledger_payout_id_fkey
  foreign key (payout_id) references public.payouts(id);
