import { companies } from "@/lib/companiesData";
import { languageCourses } from "@/lib/languageCoursesData";

export type SearchResultKind = "certification" | "language" | "page";

export type SearchResult = {
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  href: string;
};

// Static, always-available pages worth surfacing from search — real
// destinations that exist right now, not a fabricated index.
const PAGE_RESULTS: SearchResult[] = [
  { kind: "page", title: "Community", subtitle: "Diskussionen & Live-Räume", href: "/community" },
  { kind: "page", title: "Coach Live", subtitle: "Video- & Sprachanrufe, Chat", href: "/coach-live" },
  { kind: "page", title: "KI Coach", subtitle: "Dein persönlicher Lerncoach", href: "/ai-coach" },
  { kind: "page", title: "Interview-Vorbereitung", subtitle: "Übe echte Interviewfragen", href: "/interview" },
  { kind: "page", title: "Projekte", subtitle: "Praxisprojekte", href: "/projects" },
  { kind: "page", title: "Lernpfade", subtitle: "Mehrstufige Lernpfade", href: "/learning-paths" },
];

let cachedIndex: SearchResult[] | null = null;

function buildIndex(): SearchResult[] {
  const certResults: SearchResult[] = companies.flatMap((company) =>
    company.certs.map((cert) => ({
      kind: "certification" as const,
      title: `${cert.code} — ${cert.title}`,
      subtitle: `${company.name} · ${cert.level}`,
      href: `/certifications/${company.slug}/${cert.id}`,
    }))
  );

  const langResults: SearchResult[] = languageCourses.map((course) => ({
    kind: "language" as const,
    title: course.name,
    subtitle: `Sprachkurs · ${course.levelRange}`,
    href: "/language-courses",
  }));

  return [...certResults, ...langResults, ...PAGE_RESULTS];
}

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Simple substring search across title + subtitle, case/accent-insensitive.
 * Good enough for a catalog of a few hundred real entries; results are
 * capped so the dropdown stays scannable. */
export function searchSite(query: string, limit = 8): SearchResult[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];

  if (!cachedIndex) cachedIndex = buildIndex();

  return cachedIndex
    .filter((r) => normalize(r.title).includes(q) || normalize(r.subtitle).includes(q))
    .slice(0, limit);
}
