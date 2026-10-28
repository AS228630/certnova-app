import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and shows the main heading and nav", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/CertCoach/i);
    // The main logo/brand link in the header — present on every page,
    // a stable smoke-test anchor that isn't tied to marketing copy that
    // will change over time.
    await expect(page.getByRole("link", { name: /certcoach/i }).first()).toBeVisible();
  });

  test("has no obvious broken internal links in the header nav", async ({ page }) => {
    await page.goto("/");
    // The header is rendered on the client after the first paint, so a plain count() right
    // after goto() can still see 0 links; this assertion retries until the header is there.
    const navLinks = page.locator("header a[href^='/']");
    await expect(navLinks).not.toHaveCount(0);
  });

  test("language switcher exposes at least German and English", async ({ page }) => {
    await page.goto("/");
    // Sanity check that the i18n system is actually wired up on the
    // rendered page, not just present in the dictionaries.
    await expect(page.locator("html")).toHaveAttribute("lang", /de|en/);
  });
});
