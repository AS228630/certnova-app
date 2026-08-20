import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallow = [
    "/dashboard",
    "/profile",
    "/settings",
    "/api/",
    "/ataullah-senmas",
    "/admin-senmas",
    // Added during a full-site audit: these all correctly already had
    // their own per-page `robots: { index: false }` (a crawler that
    // fetches one of them won't index it either way), but robots.txt's
    // disallow is a separate, complementary signal — it tells a
    // well-behaved crawler not to even request the page at all, which
    // matters in particular for /portal (real financial/commission
    // data) rather than relying solely on the meta tag being read.
    "/portal",
    "/coach-live",
    "/ai-coach",
    "/license",
    "/kuendigen",
    "/kuendigen-bestaetigen",
    "/cookie-einstellungen",
    "/update-password",
    // Dynamic private feature routes under every certification -
    // already correctly noindex via their own metadata, same reasoning
    // as above (belt-and-suspenders: don't even let a crawler fetch
    // these).
    "/certifications/*/*/practice",
    "/certifications/*/*/labs",
    "/certifications/*/*/mock-exam",
  ];
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personal/authenticated areas aren't useful to index and
        // shouldn't show up in search results.
        disallow,
      },
      // Explicit rules for the major AI crawlers, even though the
      // wildcard rule above already covers them (there's no per-bot
      // block anywhere in this file or the rest of the codebase) -
      // listed by name so it's unmistakably clear none of them are
      // singled out or restricted in any way.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-Web", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
      { userAgent: "Bingbot", allow: "/", disallow },
    ],
    sitemap: "https://www.certcoach.de/sitemap.xml",
  };
}
