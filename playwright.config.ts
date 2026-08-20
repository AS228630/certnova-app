import { defineConfig, devices } from "@playwright/test";

// E2E test config. Runs against BASE_URL (defaults to the live site) so
// these tests work both locally against `npm run dev` and in CI against
// the real deployed site — see .github/workflows/e2e.yml.
//
// Deliberately scoped to public, unauthenticated pages only (see
// e2e/README.md for why): no test user or Stripe test card exists yet,
// and scripting real login/checkout against production without one
// risks creating real accounts or charges rather than testing anything.
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["html", { open: "never" }]] : "list",
  use: {
    baseURL: process.env.BASE_URL || "https://www.certcoach.de",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
});
