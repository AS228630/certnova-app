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

// Only the 20 most recent attempts per section are kept in the visible
// history table (section_attempts) — enforced by a DB trigger, see the
// migration. Best score and the real attempt count never get trimmed
// (section_best_scores), so neither is affected by this cap.
type BestScoreEntry = { bestScorePercent: number; totalAttempts: number };

type SectionAttemptsState = {
  attemptsByCert: Record<string, SectionAttempt[]>;
  unlockedByCert: Record<string, Set<number>>;
  bestScoresByCert: Record<string, Record<number, BestScoreEntry>>;
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
  /** False until we've successfully talked to the new tables at least
   * once. If the SQL migration hasn't been run yet, those tables don't
   * exist — Supabase returns a query error (not a thrown exception) in
   * that case, but callers should still know to fall back to the old
   * live-computed unlock logic instead of trusting an empty result set
   * as "nothing is unlocked". */
  migrationReady: boolean;
};

export const useSectionAttemptsStore = create<SectionAttemptsState>((set, get) => ({
  attemptsByCert: {},
  unlockedByCert: {},
  bestScoresByCert: {},
  loadedCerts: new Set(),
  migrationReady: true,

  loadForCert: async (userId: string, certId: string) => {
    const cacheKey = `${userId}:${certId}`;
    if (get().loadedCerts.has(cacheKey)) return;

    let attemptsRes, unlockedRes, bestRes;
    try {
      [attemptsRes, unlockedRes, bestRes] = await Promise.all([
        supabase
          .from("section_attempts")
          .select("id, cert_id, section_index, attempt_number, score_percent, correct_count, total_count, passed, completed_at")
          .eq("user_id", userId)
          .eq("cert_id", certId)
          .order("completed_at", { ascending: false }),
        supabase.from("unlocked_sections").select("section_index").eq("user_id", userId).eq("cert_id", certId),
        supabase
          .from("section_best_scores")
          .select("section_index, best_score_percent, total_attempts")
          .eq("user_id", userId)
          .eq("cert_id", certId),
      ]);
    } catch (err) {
      // Network failure or (most likely) the migration hasn't been run
      // yet, so these tables don't exist. Either way, don't crash the
      // practice page over it — just flag that this data source isn't
      // ready so callers fall back to the old logic.
      console.error("Section-progress tables not available yet:", err);
      set({ migrationReady: false });
      return;
    }

    if (attemptsRes.error || unlockedRes.error || bestRes.error) {
      console.error(
        "Section-progress query error (migration likely not run yet):",
        attemptsRes.error ?? unlockedRes.error ?? bestRes.error
      );
      set({ migrationReady: false });
      return;
    }

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

    const bestScores: Record<number, BestScoreEntry> = {};
    for (const r of bestRes.data ?? []) {
      bestScores[r.section_index as number] = {
        bestScorePercent: r.best_score_percent as number,
        totalAttempts: r.total_attempts as number,
      };
    }

    set((s) => ({
      attemptsByCert: { ...s.attemptsByCert, [certId]: attempts },
      unlockedByCert: { ...s.unlockedByCert, [certId]: unlocked },
      bestScoresByCert: { ...s.bestScoresByCert, [certId]: bestScores },
      loadedCerts: new Set(s.loadedCerts).add(cacheKey),
      migrationReady: true,
    }));
  },

  recordAttempt: async (userId, certId, sectionIndex, correctCount, totalCount) => {
    const scorePercent = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);
    const passed = scorePercent >= SECTION_PASS_THRESHOLD;

    // The real, never-trimmed attempt count/best score for this section,
    // read before this attempt so we can compute the correct next
    // attempt number and whether this is a new best.
    const priorBest = get().bestScoresByCert[certId]?.[sectionIndex];
    const attemptNumber = (priorBest?.totalAttempts ?? 0) + 1;
    const newBest = Math.max(priorBest?.bestScorePercent ?? 0, scorePercent);

    let data: { id: string; completed_at: string } | null = null;
    let error: { code?: string } | null = null;
    try {
      const res = await supabase
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
      data = res.data;
      error = res.error;
    } catch (err) {
      console.error("Failed to save section attempt (table may not exist yet):", err);
      set({ migrationReady: false });
      return { scorePercent, passed, justUnlockedNext: false };
    }

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

    // Keep only the 20 newest attempts client-side too, mirroring the
    // DB trigger, so the in-memory list never grows past what's shown.
    set((s) => {
      const withoutOld = (s.attemptsByCert[certId] ?? []).filter((a) => a.sectionIndex !== sectionIndex);
      const forSection = [newAttempt, ...(s.attemptsByCert[certId] ?? []).filter((a) => a.sectionIndex === sectionIndex)].slice(0, 20);
      return { attemptsByCert: { ...s.attemptsByCert, [certId]: [...forSection, ...withoutOld] } };
    });

    // Permanent, never-trimmed best score + attempt counter — a single
    // upserted row, so this never contributes to unbounded growth no
    // matter how many attempts happen.
    try {
      await supabase.from("section_best_scores").upsert(
        {
          user_id: userId,
          cert_id: certId,
          section_index: sectionIndex,
          best_score_percent: newBest,
          total_attempts: attemptNumber,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,cert_id,section_index" }
      );
    } catch (err) {
      console.error("Failed to update best score (table may not exist yet):", err);
    }

    set((s) => ({
      bestScoresByCert: {
        ...s.bestScoresByCert,
        [certId]: { ...s.bestScoresByCert[certId], [sectionIndex]: { bestScorePercent: newBest, totalAttempts: attemptNumber } },
      },
    }));

    // One-way ratchet: once this section clears the mastery bar even
    // ONE time, the next section unlocks permanently — a later, lower
    // score on a retry never re-locks it (spec section 6).
    let justUnlockedNext = false;
    const alreadyUnlocked = get().unlockedByCert[certId]?.has(sectionIndex + 1) ?? false;
    if (passed && !alreadyUnlocked) {
      try {
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
      } catch (err) {
        console.error("Failed to save unlock (table may not exist yet):", err);
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
    return get().bestScoresByCert[certId]?.[sectionIndex]?.bestScorePercent ?? null;
  },

  reset: () =>
    set({
      attemptsByCert: {},
      unlockedByCert: {},
      bestScoresByCert: {},
      loadedCerts: new Set(),
      migrationReady: true,
    }),
}));
