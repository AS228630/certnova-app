import type { PracticeQuestion, PracticeTopic } from "@/lib/az900Practice";
import { AZ900_TOPICS, getAz900Questions } from "@/lib/az900Practice";
import { AZ104_TOPICS, AZ104_QUESTIONS } from "@/lib/az104Practice";
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
const PRACTICE_CERT_IDS = ["az-900", "az-104", "ab-900"] as const;
export type PracticeCertId = (typeof PRACTICE_CERT_IDS)[number];

export function hasPracticeBank(certId: string): certId is PracticeCertId {
  return (PRACTICE_CERT_IDS as readonly string[]).includes(certId);
}

export function getPracticeTopics(certId: PracticeCertId): PracticeTopic[] {
  if (certId === "az-900") return AZ900_TOPICS;
  if (certId === "az-104") return AZ104_TOPICS;
  return AB900_TOPICS;
}

// az-104 has no real translations yet (see lib/az104Practice.ts), so it
// always returns the authored (German) questions regardless of locale —
// matches the exact fallback behavior PracticeClient used to implement
// client-side before this route existed.
export function getPracticeQuestions(certId: PracticeCertId, locale: string): PracticeQuestion[] {
  if (certId === "az-900") return getAz900Questions(locale);
  if (certId === "az-104") return AZ104_QUESTIONS;
  return getAb900Questions(locale);
}
