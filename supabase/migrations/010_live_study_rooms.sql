-- Run this once in the Supabase SQL Editor, in addition to the earlier
-- migrations. Backs the "Live Study & Collaboration" feature: real rooms
-- users create/join, with real-time text chat. Video/voice calling
-- (LiveKit) uses these same rooms as its room identifier but doesn't
-- store any media here — LiveKit handles that separately.

create table if not exists public.community_rooms (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references auth.users(id) on delete cascade,
  name text not null,
  topic text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists community_rooms_active_idx on public.community_rooms(is_active, created_at desc);

alter table public.community_rooms enable row level security;

drop policy if exists "Anyone signed in can view rooms" on public.community_rooms;
create policy "Anyone signed in can view rooms"
  on public.community_rooms for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can create rooms" on public.community_rooms;
create policy "Users can create rooms"
  on public.community_rooms for insert
  with check (auth.uid() = created_by);

drop policy if exists "Room creators can update their rooms" on public.community_rooms;
create policy "Room creators can update their rooms"
  on public.community_rooms for update
  using (auth.uid() = created_by);

drop policy if exists "Room creators can delete their rooms" on public.community_rooms;
create policy "Room creators can delete their rooms"
  on public.community_rooms for delete
  using (auth.uid() = created_by);

-- Real-time chat messages within a room. Enabling Supabase Realtime's
-- postgres_changes on this table (done via the publication below) makes
-- new messages push to connected clients instantly.
create table if not exists public.community_room_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.community_rooms(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_room_messages_room_id_idx on public.community_room_messages(room_id, created_at asc);

alter table public.community_room_messages enable row level security;

drop policy if exists "Anyone signed in can view room messages" on public.community_room_messages;
create policy "Anyone signed in can view room messages"
  on public.community_room_messages for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can send messages as themselves" on public.community_room_messages;
create policy "Users can send messages as themselves"
  on public.community_room_messages for insert
  with check (auth.uid() = user_id);

-- Enable Supabase Realtime broadcasts for new chat messages.
alter publication supabase_realtime add table public.community_room_messages;
