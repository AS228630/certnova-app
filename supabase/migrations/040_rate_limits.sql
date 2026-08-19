-- Generic, reusable rate-limit tracking table. Any API route can record
-- a hit under an arbitrary string key (e.g. "cv-access:<ip>",
-- "redeem-license:<userId>") and ask "how many hits under this key in
-- the last N minutes?" — see lib/rateLimit.ts for the helper that reads
-- and writes this table. Only ever touched by the service-role client
-- (server-side route handlers), never exposed to the browser, so RLS is
-- enabled with no policies (default-deny) rather than left open.
create table if not exists rate_limit_hits (
  id bigint generated always as identity primary key,
  key text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limit_hits_key_created
  on rate_limit_hits (key, created_at desc);

alter table rate_limit_hits enable row level security;
-- No policies: service-role key bypasses RLS entirely (this table is
-- never queried with the anon/user key), so this blocks browser access
-- outright while leaving server-side route handlers unaffected.
