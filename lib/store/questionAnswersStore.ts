import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

type QuestionAnswersState = {
  /** certId -> questionId -> was the last submitted answer correct. */
  answersByCert: Record<string, Record<string, boolean>>;
  loadedCerts: Set<string>;
  userId: string | null;

  loadForCert: (userId: string, certId: string) => Promise<void>;
  recordAnswer: (userId: string, certId: string, questionId: string, correct: boolean) => Promise<void>;
  getCorrectness: (certId: string) => Record<string, boolean>;
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

  getCorrectness: (certId: string) => get().answersByCert[certId] ?? {},

  reset: () => set({ answersByCert: {}, loadedCerts: new Set(), userId: null }),
}));
