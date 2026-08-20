import { test, expect } from "@playwright/test";

// Deliberately does NOT click submit — that would fire a real EmailJS
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

  test("submit button becomes disabled once form is submitted with valid data", async ({ page }) => {
    await page.goto("/kontakt");
    const main = page.getByRole("main");
    await main.locator("form input").nth(0).fill("E2E Test");
    await main.locator('form input[type="email"]').fill("e2e-test@example.com");
    await main.locator("form textarea").fill("This is an automated E2E structural test — please disregard.");
    // Intercept the actual EmailJS call so this never sends a real email
    // in CI, while still exercising the real submit handler and its
    // loading-state UI.
    await page.route("https://api.emailjs.com/**", (route) =>
      route.fulfill({ status: 200, body: "OK" })
    );
    await main.locator('form button[type="submit"]').click();
    await expect(main.locator('form button[type="submit"]')).toBeDisabled();
  });
});
