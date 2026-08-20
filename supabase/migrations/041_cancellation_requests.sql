-- Fixes a real security gap: previously, the anonymous (not-logged-in)
-- cancellation path in app/api/cancel-subscription/route.ts cancelled
-- any active subscription found for a given email address immediately,
-- with no proof the caller actually owns that inbox — anyone who knew
-- (or guessed) a customer's account email could cancel their paid
-- subscription. This table backs a two-step flow instead: requesting
-- cancellation by email creates a pending row here and emails a
-- confirmation link; only clicking that link (proving inbox access)
-- actually cancels the Stripe subscription.
create table if not exists cancellation_requests (
  id bigint generated always as identity primary key,
  email text not null,
  stripe_subscription_id text not null,
  token_hash text not null,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '30 minutes'),
  confirmed_at timestamptz
);

create index if not exists idx_cancellation_requests_token_hash
  on cancellation_requests (token_hash);

alter table cancellation_requests enable row level security;
-- No policies: only ever read/written by the service-role client in
-- the two API routes involved, never directly from the browser.
