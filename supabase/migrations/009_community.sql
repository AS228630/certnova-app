-- Run this once in the Supabase SQL Editor, in addition to the earlier
-- migrations. Backs the Community page: real posts, likes, and comments
-- created by actual users. A brand-new install genuinely has zero posts
-- until real users create them — no seeded/fake content.

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade, -- nullable: sample posts have no real user
  post_type text not null default 'discussion' check (post_type in ('discussion', 'question', 'achievement', 'resource')),
  title text not null,
  body text not null default '',
  tags text[] not null default '{}',
  resource_url text,
  resource_label text,
  is_resolved boolean not null default false, -- for 'question' type posts
  is_sample boolean not null default false, -- true only for seeded example posts, never for real user content
  sample_author_name text, -- display name for sample posts only (no real user_id to join against)
  sample_author_role text,
  sample_like_count integer not null default 0, -- display-only count for sample posts (real posts count from community_post_likes)
  sample_comment_count integer not null default 0, -- display-only count for sample posts (real posts count from community_comments)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists community_posts_created_at_idx on public.community_posts(created_at desc);
create index if not exists community_posts_user_id_idx on public.community_posts(user_id);

alter table public.community_posts enable row level security;

drop policy if exists "Anyone signed in can view community posts" on public.community_posts;
create policy "Anyone signed in can view community posts"
  on public.community_posts for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can create their own posts" on public.community_posts;
create policy "Users can create their own posts"
  on public.community_posts for insert
  with check (auth.uid() = user_id and is_sample = false);

drop policy if exists "Users can update their own posts" on public.community_posts;
create policy "Users can update their own posts"
  on public.community_posts for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own posts" on public.community_posts;
create policy "Users can delete their own posts"
  on public.community_posts for delete
  using (auth.uid() = user_id);

-- Likes: one row per (post, user). Presence of a row = liked.
create table if not exists public.community_post_likes (
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.community_post_likes enable row level security;

drop policy if exists "Anyone signed in can view likes" on public.community_post_likes;
create policy "Anyone signed in can view likes"
  on public.community_post_likes for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can like posts as themselves" on public.community_post_likes;
create policy "Users can like posts as themselves"
  on public.community_post_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can unlike their own likes" on public.community_post_likes;
create policy "Users can unlike their own likes"
  on public.community_post_likes for delete
  using (auth.uid() = user_id);

-- Comments (flat, one level — replies are not threaded for v1).
create table if not exists public.community_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.community_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists community_comments_post_id_idx on public.community_comments(post_id, created_at asc);

alter table public.community_comments enable row level security;

drop policy if exists "Anyone signed in can view comments" on public.community_comments;
create policy "Anyone signed in can view comments"
  on public.community_comments for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can create their own comments" on public.community_comments;
create policy "Users can create their own comments"
  on public.community_comments for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own comments" on public.community_comments;
create policy "Users can delete their own comments"
  on public.community_comments for delete
  using (auth.uid() = user_id);

-- Seed data: 3 example posts shown to give a brand-new community page a
-- starting point instead of looking empty. These are clearly marked
-- is_sample = true and use fictional author names — the UI must label
-- them as examples (e.g. a "Beispiel" badge), never presented as real
-- user activity. Safe to delete once real posts exist.
insert into public.community_posts
  (user_id, post_type, title, body, tags, is_sample, sample_author_name, sample_author_role, sample_like_count, sample_comment_count, created_at)
values
  (
    null, 'question',
    'Beste Strategie zum Lernen für die AWS SAA-C03?',
    'Hallo zusammen! Ich bereite mich gerade auf die AWS Solutions Architect Associate Prüfung vor (habe noch 6 Wochen Zeit). Habt ihr Tipps, wie ich am effektivsten vorgehen kann? Welche Themen haben euch am meisten geholfen?',
    array['aws', 'saa-c03', 'lernstrategie'],
    true, 'Sarah M.', 'AWS Solutions Architect', 24, 18, now() - interval '2 hours'
  ),
  (
    null, 'resource',
    'Azure AD vs. On-Prem AD – Hauptunterschiede',
    'Ich habe eine Übersicht der wichtigsten Unterschiede zwischen Azure Active Directory und On-Premises Active Directory erstellt. Hoffe, das hilft euch!',
    array['azure', 'active-directory'],
    true, 'David K.', 'Microsoft Azure Administrator', 36, 12, now() - interval '5 hours'
  ),
  (
    null, 'achievement',
    'Ich habe mein erstes Zertifikat bestanden! 🎉',
    'Nach 3 Monaten Lernen habe ich endlich mein erstes Zertifikat geschafft: CompTIA Network+! Vielen Dank an die Community für all die hilfreichen Tipps.',
    array['comptia', 'erfolg'],
    true, 'Lea_Dev', 'Lernende', 78, 32, now() - interval '1 day'
  );
