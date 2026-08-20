# E2E Tests (Playwright)

## Scope — deliberately public/unauthenticated pages only

These tests cover pages any visitor can reach without logging in:
homepage, certification landing pages, the AB-900 practice page, and
the contact form's structure (without actually sending an email).

**Login, checkout, and other authenticated flows are NOT covered
here.** Testing them for real would need either:
- a dedicated test user account (email + password) that exists
  specifically for CI to log in as, and
- a Stripe **test-mode** card number, run against Stripe test mode —
  not production, which is currently in Live mode (real charges).

Neither exists yet. Writing tests against production without them
would either be fake (mocking everything, testing nothing real) or
dangerous (creating real accounts / triggering real charges on every
CI run). Once a dedicated test account and a Stripe test-mode setup
exist (see the Stripe Preview-deployment approach discussed in
`docs/E2E_VERIFICATION_STATUS.md` for the admin-panel referral system —
the same idea applies here), extend this suite with `auth.spec.ts` and
`checkout.spec.ts`.

## Running locally

```bash
npx playwright install --with-deps   # one-time, downloads browsers
npm run test:e2e                     # runs against the live site
BASE_URL=http://localhost:3000 npm run test:e2e   # against local dev
npm run test:e2e:ui                  # interactive UI mode
```

## Running in CI

`.github/workflows/e2e.yml` runs this suite against the live site every
6 hours (not per-push — see that file's comments for why) and on
manual trigger from the Actions tab. `.github/workflows/ci.yml` runs
type-check + lint + build on every push/PR — that one blocks on every
commit.
