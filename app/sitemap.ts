import type { MetadataRoute } from "next";
import { companies } from "@/lib/companiesData";

// Lists every real, publicly crawlable page — static routes plus every
// individual certification page generated from the actual catalog data
// (not a fixed guess at what pages exist). This is what was completely
// missing before, which is why Google could only index the homepage.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.certcoach.de";
  const now = new Date();

  const staticRoutes = [
    "",
    "/zertifizierungen",
    "/learning-paths",
    "/resources",
    "/resources/guides",
    "/resources/cheatsheets",
    "/resources/tools",
    "/resources/templates",
    "/resources/webinars",
    "/resources/ebooks",
    "/language-courses",
    "/pricing",
    "/business",
    "/faq",
    "/blog",
    "/erfolgsgeschichten",
    "/ueber-uns",
    "/karriere",
    "/partner",
    "/presse",
    "/affiliate",
    "/kontakt",
    "/sicherheit",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/cookie-einstellungen",
    "/widerrufsrecht",
    "/kuendigen",
    "/barrierefreiheit",
    "/login",
    "/register",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const certRoutes = companies.flatMap((company) => [
    {
      url: `${base}/certifications/${company.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...company.certs.map((cert) => ({
      url: `${base}/certifications/${company.slug}/${cert.id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ]);

  return [...staticRoutes, ...certRoutes];
}
