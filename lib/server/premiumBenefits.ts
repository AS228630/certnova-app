import { hasPracticeBank, getPracticeQuestions } from "@/lib/server/practiceBank";

/**
 * Real, per-certification Premium benefits — never a hardcoded "500+"
 * that could be wrong for a cert with a different (or no) real question
 * bank. Server-only (imports practiceBank, which pulls in the actual
 * question content) — call this from a Server Component or an API
 * route, never directly from a "use client" file, then pass the
 * resulting string array down as a prop. The question count itself is
 * locale-independent (translations don't add or remove questions), so
 * this always reads the German bank purely to get an accurate length.
 */
export function getPremiumBenefits(certId: string): string[] {
  const benefits: string[] = [];

  if (hasPracticeBank(certId)) {
    const count = getPracticeQuestions(certId, "de").length;
    benefits.push(`${count}+ echte Prüfungsfragen`);
  }

  benefits.push("Alle Lernmodule", "Alle Labs", "Vollständige Prüfungssimulation", "Detaillierte Analysen", "Zertifikat-Tracking");

  return benefits;
}
