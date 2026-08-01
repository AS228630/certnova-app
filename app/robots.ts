import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/dashboard", "/profile", "/settings", "/analytics", "/api/", "/ataullah-senmas", "/admin-senmas"];
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
