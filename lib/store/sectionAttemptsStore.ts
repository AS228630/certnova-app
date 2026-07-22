import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export interface SectionAttempt {
  id: string;
  certId: string;
  sectionIndex: number;
  attemptNumber: number;
  scorePercent: number;
  correctCount: number;
  totalCount: number;
  passed: boolean;
  completedAt: string;
}

/** 5-star rating per the spec: >=90 -> 5, 80-89 -> 4, 70-79 -> 3, 60-69 -> 2, <60 -> 1. */
export function starsForScore(scorePercent: number): number {
  if (scorePercent >= 90) return 5;
  if (scorePercent >= 80) return 4;
  if (scorePercent >= 70) return 3;
  if (scorePercent >= 60) return 2;
  return 1;
}

// The same 90% mastery bar used to unlock the next section (see
// lib/practiceSections.ts) also defines "Passed" for a single section
// attempt in the history panel — distinct from the overall mock-exam
// PASS_THRESHOLD (70%) used in ExamCompleteScreen, which is about a
// full end-to-end exam, not a single section.
const SECTION_PASS_THRESHOLD = 90;

type SectionAttemptsState = {
  attemptsByCert: Record<string, SectionAttempt[]>;
  unlockedByCert: Record<string, Set<number>>;
  loadedCerts: Set<string>;

  loadForCert: (userId: string, certId: string) => Promise<void>;
  recordAttempt: (
    userId: string,
    certId: string,
    sectionIndex: number,
    correctCount: number,
    totalCount: number
  ) => Promise<{ scorePercent: number; passed: boolean; justUnlockedNext: boolean }>;
  isSectionPermanentlyUnlocked: (certId: string, sectionIndex: number) => boolean;
  getAttempts: (certId: string) => SectionAttempt[];
  getBestScore: (certId: string, sectionIndex: number) => number | null;
  reset: () => void;
};

export const useSectionAttemptsStore = create<SectionAttemptsState>((set, get) => ({
  attemptsByCert: {},
  unlockedByCert: {},
  loadedCerts: new Set(),

  loadForCert: async (userId: string, certId: string) => {
    const cacheKey = `${userId}:${certId}`;
    if (get().loadedCerts.has(cacheKey)) return;

    const [attemptsRes, unlockedRes] = await Promise.all([
      supabase
        .from("section_attempts")
        .select("id, cert_id, section_index, attempt_number, score_percent, correct_count, total_count, passed, completed_at")
        .eq("user_id", userId)
        .eq("cert_id", certId)
        .order("completed_at", { ascending: false }),
      supabase.from("unlocked_sections").select("section_index").eq("user_id", userId).eq("cert_id", certId),
    ]);

    const attempts: SectionAttempt[] = (attemptsRes.data ?? []).map((r) => ({
      id: r.id,
      certId: r.cert_id,
      sectionIndex: r.section_index,
      attemptNumber: r.attempt_number,
      scorePercent: r.score_percent,
      correctCount: r.correct_count,
      totalCount: r.total_count,
      passed: r.passed,
      completedAt: r.completed_at,
    }));

    const unlocked = new Set<number>((unlockedRes.data ?? []).map((r) => r.section_index as number));

    set((s) => ({
      attemptsByCert: { ...s.attemptsByCert, [certId]: attempts },
      unlockedByCert: { ...s.unlockedByCert, [certId]: unlocked },
      loadedCerts: new Set(s.loadedCerts).add(cacheKey),
    }));
  },

  recordAttempt: async (userId, certId, sectionIndex, correctCount, totalCount) => {
    const scorePercent = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
    const passed = scorePercent >= SECTION_PASS_THRESHOLD;
    const existing = get().attemptsByCert[certId] ?? [];
    const priorForSection = existing.filter((a) => a.sectionIndex === sectionIndex);
    const attemptNumber = priorForSection.length + 1;

    const { data, error } = await supabase
      .from("section_attempts")
      .insert({
        user_id: userId,
        cert_id: certId,
        section_index: sectionIndex,
        attempt_number: attemptNumber,
        score_percent: scorePercent,
        correct_count: correctCount,
        total_count: totalCount,
        passed,
      })
      .select("id, completed_at")
      .single();

    const newAttempt: SectionAttempt = {
      id: data?.id ?? `local-${Date.now()}`,
      certId,
      sectionIndex,
      attemptNumber,
      scorePercent,
      correctCount,
      totalCount,
      passed,
      completedAt: data?.completed_at ?? new Date().toISOString(),
    };
    if (error) {
      // Network hiccup shouldn't block the UI — the attempt still shows
      // locally for this session even if it didn't reach the DB.
      console.error("Failed to save section attempt:", error);
    }

    set((s) => ({
      attemptsByCert: { ...s.attemptsByCert, [certId]: [newAttempt, ...(s.attemptsByCert[certId] ?? [])] },
    }));

    // One-way ratchet: once this section clears the mastery bar even
    // ONE time, the next section unlocks permanently — a later, lower
    // score on a retry never re-locks it (spec section 6).
    let justUnlockedNext = false;
    const alreadyUnlocked = get().unlockedByCert[certId]?.has(sectionIndex + 1) ?? false;
    if (passed && !alreadyUnlocked) {
      const { error: unlockError } = await supabase
        .from("unlocked_sections")
        .insert({ user_id: userId, cert_id: certId, section_index: sectionIndex + 1 })
        .select()
        .maybeSingle();
      // Ignore unique-constraint conflicts (already unlocked by a
      // concurrent request) — the outcome is the same either way.
      if (!unlockError || unlockError.code === "23505") {
        justUnlockedNext = true;
        set((s) => {
          const next = new Set(s.unlockedByCert[certId] ?? []);
          next.add(sectionIndex + 1);
          return { unlockedByCert: { ...s.unlockedByCert, [certId]: next } };
        });
      }
    }

    return { scorePercent, passed, justUnlockedNext };
  },

  isSectionPermanentlyUnlocked: (certId: string, sectionIndex: number) => {
    if (sectionIndex <= 0) return true; // Section 1 is always open.
    return get().unlockedByCert[certId]?.has(sectionIndex) ?? false;
  },

  getAttempts: (certId: string) => get().attemptsByCert[certId] ?? [],

  getBestScore: (certId: string, sectionIndex: number) => {
    const attempts = (get().attemptsByCert[certId] ?? []).filter((a) => a.sectionIndex === sectionIndex);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map((a) => a.scorePercent));
  },

  reset: () => set({ attemptsByCert: {}, unlockedByCert: {}, loadedCerts: new Set() }),
}));
