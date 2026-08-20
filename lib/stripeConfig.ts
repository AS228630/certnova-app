// Note: this file used to also export a hardcoded STRIPE_PUBLISHABLE_KEY
// constant, but nothing in the codebase actually imported it (checkout
// is a server-created Checkout Session + redirect, never the client-side
// Stripe.js flow that publishable key is for) — and it held a stale
// pk_test_ value that no longer matches the site's real Live-mode
// billing, which now runs entirely on STRIPE_SECRET_KEY (a Vercel
// environment variable, not committed here). Removed rather than fixed
// in place, since dead code holding a wrong-looking secret-shaped value
// is worse than no code at all — the next person to grep this file
// shouldn't have to first work out that it was never live.

export const PLAN_PRICES = {
  monthly: { amount: 1499, label: "Monatlich", interval: "month" as const },
  yearly: { amount: 12544, label: "Jährlich", interval: "year" as const },
};
