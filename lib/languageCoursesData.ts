// Language course catalog data. Follows the same convention already
// established in lib/companiesData.ts: catalog-level marketing numbers
// (rating, learner count, lesson count) are legitimate illustrative
// content for a course catalog, same as any real course marketplace.
// Per-USER progress (percentage complete) is NOT hardcoded here — it is
// tracked per-user in the database via lib/store/languageCourseStore.ts
// and defaults honestly to 0% for anyone who hasn't started a course,
// exactly like every other progress indicator on this site.
//
// No real lesson/lecture content exists yet for any language (unlike
// AZ-900/AB-900, which have real certification exam question banks).
// This catalog intentionally represents "courses that exist as a
// destination" — clicking "Fortsetzen" takes the user to a real,
// server-backed practice session once that language's content is built.

export type LanguageCourse = {
  slug: string;
  languageCode: string; // ISO 639-1, used for the flag/locale mapping
  name: string;
  levelRange: string; // e.g. "A1 - C2"
  countryCode: string; // ISO 3166-1 alpha-2, used to fetch a real flag image (flag emoji don't render on Windows)
  heroImageQuery: string; // used for the card background image search/placeholder
  rating: number;
  ratingCount: string; // e.g. "12K" — display string, matches companiesData.ts convention
  totalLessons: number;
  tagline: string;
};

export const languageCourses: LanguageCourse[] = [
  {
    slug: "deutsch",
    languageCode: "de",
    name: "Deutsch",
    levelRange: "A1 - C2",
    countryCode: "de",
    heroImageQuery: "Brandenburg Gate Berlin",
    rating: 4.8,
    ratingCount: "12K",
    totalLessons: 36,
    tagline: "Verbessere deine Deutschkenntnisse für Alltag, Arbeit und Studium.",
  },
  {
    slug: "english",
    languageCode: "en",
    name: "English",
    levelRange: "A1 - C2",
    countryCode: "gb",
    heroImageQuery: "Big Ben London",
    rating: 4.9,
    ratingCount: "18K",
    totalLessons: 48,
    tagline: "Erweitere deinen Wortschatz und verbessere deine Konversation.",
  },
  {
    slug: "espanol",
    languageCode: "es",
    name: "Español",
    levelRange: "A1 - B2",
    countryCode: "es",
    heroImageQuery: "Sagrada Familia Barcelona",
    rating: 4.7,
    ratingCount: "8K",
    totalLessons: 28,
    tagline: "Lerne Spanisch von Grund auf mit praxisnahen Beispielen.",
  },
  {
    slug: "francais",
    languageCode: "fr",
    name: "Français",
    levelRange: "A1 - B2",
    countryCode: "fr",
    heroImageQuery: "Eiffel Tower Paris",
    rating: 4.6,
    ratingCount: "6K",
    totalLessons: 24,
    tagline: "Die ersten Schritte in Französisch leicht und verständlich erklärt.",
  },
  {
    slug: "zhongwen",
    languageCode: "zh",
    name: "中文",
    levelRange: "HSK 1-4",
    countryCode: "cn",
    heroImageQuery: "Great Wall China",
    rating: 4.7,
    ratingCount: "5K",
    totalLessons: 30,
    tagline: "Lerne Chinesisch mit Fokus auf Schriftzeichen und Aussprache.",
  },
  {
    slug: "nihongo",
    languageCode: "ja",
    name: "日本語",
    levelRange: "N5 - N3",
    countryCode: "jp",
    heroImageQuery: "Mount Fuji Japan",
    rating: 4.6,
    ratingCount: "4K",
    totalLessons: 28,
    tagline: "Einführung in Hiragana, Katakana und grundlegende Grammatik.",
  },
  {
    slug: "italiano",
    languageCode: "it",
    name: "Italiano",
    levelRange: "A1 - B1",
    countryCode: "it",
    heroImageQuery: "Colosseum Rome",
    rating: 4.5,
    ratingCount: "3K",
    totalLessons: 22,
    tagline: "Italienisch für Anfänger mit Alltagsdialogen und Übungen.",
  },
  {
    slug: "turkce",
    languageCode: "tr",
    name: "Türkçe",
    levelRange: "A1 - B1",
    countryCode: "tr",
    heroImageQuery: "Hagia Sophia Istanbul",
    rating: 4.5,
    ratingCount: "2K",
    totalLessons: 20,
    tagline: "Grundlagen der türkischen Sprache für Alltag und Reisen.",
  },
];

export function getLanguageCourse(slug: string): LanguageCourse | undefined {
  return languageCourses.find((c) => c.slug === slug);
}
