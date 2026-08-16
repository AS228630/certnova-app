import type { PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { AZ900_TOPICS, getAz900Questions } from "@/lib/az900Practice";
import { AB900_TOPICS, getAb900Questions } from "@/lib/ab900Practice";

// Registry of hand-authored practice-question banks by certId. Any certId
// not listed here has no real question bank yet (shows ComingSoonPractice
// instead) — per the project's "never show fake data" rule, we never
// fabricate a generic bank for it.
//
// Deliberately server-only: importing the (very large, 9k+ line) az900/
// ab900 question modules here — instead of in a "use client" component —
// keeps their full content, including correct answers, out of the browser
// bundle entirely. The client only ever receives the slice a route
// explicitly decides to send it.
//
// az-104 deliberately removed (Aug 2026): despite having a small amount of
// real content (topic 1 only, out of 7), the owner's explicit decision was
// to keep exactly three certs open — az-900, ab-900, and md-102 (the
// latter's real question bank still to come) — and lock everything else,
// az-104 included, until each is genuinely ready to re-enable.
const PRACTICE_CERT_IDS = ["az-900", "ab-900"] as const;
export type PracticeCertId = (typeof PRACTICE_CERT_IDS)[number];

export function hasPracticeBank(certId: string): certId is PracticeCertId {
  return (PRACTICE_CERT_IDS as readonly string[]).includes(certId);
}

export function getPracticeTopics(certId: PracticeCertId): PracticeTopic[] {
  if (certId === "az-900") return AZ900_TOPICS;
  return AB900_TOPICS;
}

export function getPracticeQuestions(certId: PracticeCertId, locale: string): PracticeQuestion[] {
  if (certId === "az-900") return getAz900Questions(locale);
  return getAb900Questions(locale);
}
