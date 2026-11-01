// Echte Plattform-Zahlen (UWG: keine erfundenen Zahlen). Berechnet aus dem Katalog,
// abgerundet auf Zehner mit „+" – nie höher als die Wirklichkeit.
import { companies } from "@/lib/companiesData";

/** Selbst erstellte Prüfungsfragen (AZ-900 + AB-900), gezählt 01.11.2026 – siehe app/pricing/page.tsx. */
export const REAL_QUESTION_BANK = 669;

const floor10 = (n: number) => `${Math.floor(n / 10) * 10}+`;

export const realCertCount = companies.reduce((s, c) => s + (c.certs.length), 0);
export const realProviderCount = companies.length;

export const REAL_STATS = {
  certifications: floor10(realCertCount),
  providers: floor10(realProviderCount),
  questions: floor10(REAL_QUESTION_BANK),
};
