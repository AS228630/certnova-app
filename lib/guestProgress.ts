import type { PracticeOptionId } from "@/lib/az900Practice";

const KEY_PREFIX = "certcoach-guest-progress-";

export type GuestAnswerRecord = {
  questionId: string;
  answer: PracticeOptionId | PracticeOptionId[] | Record<string, unknown>;
  isCorrect: boolean;
};

/**
 * Guest (not-logged-in) practice progress, stored client-side only,
 * scoped per certification. Deliberately NOT a Zustand store — this is
 * a small, short-lived bridge that only needs to survive the brief
 * window between answering as a guest and completing signup, not a
 * long-term state system like the real (Supabase-backed) answer store.
 */
export function loadGuestProgress(certId: string): GuestAnswerRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY_PREFIX + certId);
    return raw ? (JSON.parse(raw) as GuestAnswerRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveGuestAnswer(certId: string, record: GuestAnswerRecord) {
  if (typeof window === "undefined") return;
  try {
    const existing = loadGuestProgress(certId).filter((r) => r.questionId !== record.questionId);
    existing.push(record);
    window.localStorage.setItem(KEY_PREFIX + certId, JSON.stringify(existing));
  } catch {
    // Guest progress is a nice-to-have, not critical — silently ignore
    // storage failures (private browsing, quota, etc.) rather than
    // breaking the practice flow over it.
  }
}

export function clearGuestProgress(certId: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY_PREFIX + certId);
  } catch {
    // ignore
  }
}
