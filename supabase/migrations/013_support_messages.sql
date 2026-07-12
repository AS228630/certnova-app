-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query).
-- Adds a lightweight support_messages table so the "Email Support" form
-- on the Help page can genuinely deliver messages to the site owner
-- without exposing a personal email address anywhere in the frontend
-- code. Users submit a message; it lands here. The owner checks this
-- table directly in Supabase (Table Editor → support_messages) rather
-- than an email inbox — this avoids needing a third-party email-sending
-- service (which would require its own signup and API key) while still
-- being a real, working way for messages to reach the owner.

create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  message text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists support_messages_created_idx on public.support_messages (created_at desc);

alter table public.support_messages enable row level security;

-- Any signed-in user can submit a message (insert), but can only see
-- their own past messages — not other users' messages. The site owner
-- reads all messages directly via the Supabase dashboard, which bypasses
-- RLS by default when using the table editor with the project owner
-- account.
drop policy if exists "Users can submit support messages" on public.support_messages;
create policy "Users can submit support messages"
  on public.support_messages for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can view their own support messages" on public.support_messages;
create policy "Users can view their own support messages"
  on public.support_messages for select
  using (auth.uid() = user_id);
