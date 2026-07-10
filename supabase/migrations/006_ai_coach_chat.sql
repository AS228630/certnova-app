-- Run this once in the Supabase SQL Editor, in addition to the earlier
-- migrations. Creates the tables backing the KI Coach chat: a
-- `ai_conversations` row per chat thread, and `ai_messages` rows for each
-- turn in that thread. Strictly private to the owning user — nobody else,
-- including other authenticated users, can read another person's chats.

create table if not exists public.ai_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Neuer Chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.ai_conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_conversations_user_id_idx on public.ai_conversations(user_id, updated_at desc);
create index if not exists ai_messages_conversation_id_idx on public.ai_messages(conversation_id, created_at asc);

alter table public.ai_conversations enable row level security;
alter table public.ai_messages enable row level security;

drop policy if exists "Users can view their own conversations" on public.ai_conversations;
create policy "Users can view their own conversations"
  on public.ai_conversations for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own conversations" on public.ai_conversations;
create policy "Users can create their own conversations"
  on public.ai_conversations for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own conversations" on public.ai_conversations;
create policy "Users can update their own conversations"
  on public.ai_conversations for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own conversations" on public.ai_conversations;
create policy "Users can delete their own conversations"
  on public.ai_conversations for delete
  using (auth.uid() = user_id);

drop policy if exists "Users can view their own messages" on public.ai_messages;
create policy "Users can view their own messages"
  on public.ai_messages for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own messages" on public.ai_messages;
create policy "Users can create their own messages"
  on public.ai_messages for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own messages" on public.ai_messages;
create policy "Users can delete their own messages"
  on public.ai_messages for delete
  using (auth.uid() = user_id);
