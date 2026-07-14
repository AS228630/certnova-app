import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Personal/authenticated areas aren't useful to index and
        // shouldn't show up in search results.
        disallow: ["/dashboard", "/profile", "/settings", "/analytics", "/api/"],
      },
    ],
    sitemap: "https://www.certcoach.de/sitemap.xml",
  };
}
