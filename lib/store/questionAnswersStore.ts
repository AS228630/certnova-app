import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

// Stable reference for "no answers recorded yet" so getCorrectness never
// returns a fresh object identity on repeated calls — returning a new {}
// each time breaks Zustand's useSyncExternalStore equality check and causes
// an infinite render loop ("Maximum update depth exceeded" / React #185).
const EMPTY_CORRECTNESS: Record<string, boolean> = {};

type QuestionAnswersState = {
  /** certId -> questionId -> was the last submitted answer correct. */
  answersByCert: Record<string, Record<string, boolean>>;
  loadedCerts: Set<string>;
  userId: string | null;

  loadForCert: (userId: string, certId: string) => Promise<void>;
  recordAnswer: (userId: string, certId: string, questionId: string, correct: boolean) => Promise<void>;
  getCorrectness: (certId: string) => Record<string, boolean>;
  /** Deletes all recorded answers for this user+cert (Supabase + local
   * state), used by the practice exam's "start over" feature. */
  clearForCert: (userId: string, certId: string) => Promise<void>;
  /** Clears only the given question IDs for this cert (local + Supabase).
   * Used by the practice exam's per-section "try this section again",
   * so retaking just Abschnitt 1 doesn't leave its old green checkmarks
   * behind from persisted state that clearForCert (whole-cert) wouldn't
   * touch. */
  clearQuestions: (userId: string, certId: string, questionIds: string[]) => Promise<void>;
  reset: () => void;
};

export const useQuestionAnswersStore = create<QuestionAnswersState>((set, get) => ({
  answersByCert: {},
  loadedCerts: new Set(),
  userId: null,

  loadForCert: async (userId: string, certId: string) => {
    // Already loaded for this exact user+cert this session — no need to
    // refetch every time the practice page remounts during navigation.
    const cacheKey = `${userId}:${certId}`;
    if (get().loadedCerts.has(cacheKey)) return;

    const { data, error } = await supabase
      .from("user_question_answers")
      .select("question_id, correct")
      .eq("user_id", userId)
      .eq("cert_id", certId);

    if (error || !data) return;

    const certMap: Record<string, boolean> = {};
    for (const row of data) certMap[row.question_id] = row.correct;

    set((s) => ({
      answersByCert: { ...s.answersByCert, [certId]: certMap },
      loadedCerts: new Set(s.loadedCerts).add(cacheKey),
      userId,
    }));
  },

  recordAnswer: async (userId: string, certId: string, questionId: string, correct: boolean) => {
    // Update local state immediately so the UI (section unlock, question
    // navigator colors) reflects it without waiting on the network.
    set((s) => ({
      answersByCert: {
        ...s.answersByCert,
        [certId]: { ...(s.answersByCert[certId] ?? {}), [questionId]: correct },
      },
    }));

    await supabase.from("user_question_answers").upsert(
      { user_id: userId, cert_id: certId, question_id: questionId, correct, answered_at: new Date().toISOString() },
      { onConflict: "user_id,cert_id,question_id" }
    );
  },

  getCorrectness: (certId: string) => get().answersByCert[certId] ?? EMPTY_CORRECTNESS,

  clearForCert: async (userId: string, certId: string) => {
    // Clear local state first so the UI (section locks, colors) reflects
    // the reset immediately, even if the network call is still in flight.
    set((s) => {
      const cacheKey = `${userId}:${certId}`;
      const nextLoaded = new Set(s.loadedCerts);
      nextLoaded.delete(cacheKey);
      return {
        answersByCert: { ...s.answersByCert, [certId]: {} },
        loadedCerts: nextLoaded,
      };
    });

    await supabase.from("user_question_answers").delete().eq("user_id", userId).eq("cert_id", certId);
  },

  clearQuestions: async (userId: string, certId: string, questionIds: string[]) => {
    if (questionIds.length === 0) return;

    set((s) => {
      const certMap = { ...(s.answersByCert[certId] ?? {}) };
      for (const id of questionIds) delete certMap[id];
      return { answersByCert: { ...s.answersByCert, [certId]: certMap } };
    });

    await supabase
      .from("user_question_answers")
      .delete()
      .eq("user_id", userId)
      .eq("cert_id", certId)
      .in("question_id", questionIds);
  },

  reset: () => set({ answersByCert: {}, loadedCerts: new Set(), userId: null }),
}));
