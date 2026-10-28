import { test, expect } from "@playwright/test";

// Deliberately does NOT fill or submit the form — that would fire a real EmailJS
// send on every CI run. This only verifies the form itself renders
// correctly (name/email/message fields all present, required, and the
// submit button visible) — exactly the kind of regression the project's
// own history shows actually happened once before (CSS corruption that
// broke this page's layout).
//
// Scoped to `main form` throughout, not just `form` — the footer (on
// every page, including this one) has its own separate newsletter
// signup form with its own email input, so an unscoped `form
// input[type="email"]` matches two elements and fails in strict mode.
// Found via a real CI run (see workflow run 32398148317) rather than
// assumed — a genuine gap in this test's own precision, not a site bug.
test.describe("Contact page", () => {
  test("renders all three required fields and a submit button", async ({ page }) => {
    await page.goto("/kontakt");

    const inputs = page.getByRole("main").locator("form input");
    await expect(inputs.nth(0)).toBeVisible(); // name
    await expect(inputs.nth(0)).toHaveAttribute("required", "");

    const emailInput = page.getByRole("main").locator('form input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute("required", "");

    const textarea = page.getByRole("main").locator("form textarea");
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute("required", "");

    const submitButton = page.getByRole("main").locator('form button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  // No submit test: the scheduled run against the live site still delivered a real
  // "E2E Test" email to the owner on every run (despite the EmailJS route stub), so this
  // suite never fills or submits the contact form (owner request, 2026-10-28).
});
