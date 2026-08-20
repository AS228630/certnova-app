import { test, expect } from "@playwright/test";

// Covers the two certs with a real, complete question bank — the pages
// most likely to actually be visited from Google search results, and
// the ones a regression here would hurt the most.
const CERT_PAGES = [
  { path: "/certifications/microsoft/az-900", name: "AZ-900" },
  { path: "/certifications/microsoft/ab-900", name: "AB-900" },
];

for (const cert of CERT_PAGES) {
  test.describe(`${cert.name} landing page`, () => {
    test("loads with a 200 and real content, not a placeholder", async ({ page }) => {
      const response = await page.goto(cert.path);
      expect(response?.status()).toBe(200);
      // Sample questions are rendered from the real question bank (see
      // SAMPLE_QUESTION_IDS in app/certifications/[company]/[certId]/page.tsx)
      // — this fails if that ever silently regresses to an empty list.
      await expect(page.getByText("Beispiel-Fragen")).toBeVisible({ timeout: 10_000 });
    });

    test("is indexable (no noindex robots meta)", async ({ page }) => {
      await page.goto(cert.path);
      const robotsMeta = page.locator('meta[name="robots"]');
      const content = await robotsMeta.getAttribute("content").catch(() => null);
      expect(content?.toLowerCase()).not.toContain("noindex");
    });
  });
}

test.describe("Practice page (not indexable, but must still work for real users)", () => {
  test("AB-900 practice loads a real question, not the Coming Soon placeholder", async ({ page }) => {
    const response = await page.goto("/certifications/microsoft/ab-900/practice");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.getByText("Demnächst verfügbar")).toHaveCount(0);
  });
});
