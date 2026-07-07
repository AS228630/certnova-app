import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type CertDetail = {
  labCompleted: boolean;
  questionsAnswered: number;
  questionsCorrect: number;
};

const EMPTY_DETAIL: CertDetail = { labCompleted: false, questionsAnswered: 0, questionsCorrect: 0 };

type CertProgressState = {
  /** certId -> progress percent (0-100). Missing key means 0 -- brand-new user. */
  progressMap: Record<string, number>;
  /** certId -> real per-cert lab/practice detail. */
  detailMap: Record<string, CertDetail>;
  loaded: boolean;
  userId: string | null;

  loadAll: (userId: string) => Promise<void>;
  getProgress: (certId: string) => number;
  getDetail: (certId: string) => CertDetail;
  recordModuleCompletion: (certId: string, incrementPercent: number) => Promise<void>;
  setProgress: (certId: string, percent: number) => Promise<void>;
  recordLabCompletionForCert: (certId: string) => Promise<void>;
  recordAnswerForCert: (certId: string, correct: boolean) => Promise<void>;
  reset: () => void;
};

export const useCertProgressStore = create<CertProgressState>((set, get) => ({
  progressMap: {},
  detailMap: {},
  loaded: false,
  userId: null,

  loadAll: async (userId: string) => {
    const { data, error } = await supabase
      .from("user_cert_progress")
      .select("cert_id, progress_percent, lab_completed, questions_answered, questions_correct")
      .eq("user_id", userId);

    if (error || !data) {
      set({ progressMap: {}, detailMap: {}, loaded: true, userId });
      return;
    }

    const progressMap: Record<string, number> = {};
    const detailMap: Record<string, CertDetail> = {};
    for (const row of data) {
      progressMap[row.cert_id] = row.progress_percent;
      detailMap[row.cert_id] = {
        labCompleted: row.lab_completed ?? false,
        questionsAnswered: row.questions_answered ?? 0,
        questionsCorrect: row.questions_correct ?? 0,
      };
    }
    set({ progressMap, detailMap, loaded: true, userId });
  },

  getProgress: (certId: string) => get().progressMap[certId] ?? 0,
  getDetail: (certId: string) => get().detailMap[certId] ?? EMPTY_DETAIL,

  setProgress: async (certId: string, percent: number) => {
    const userId = get().userId;
    if (!userId) return;
    const clamped = Math.max(0, Math.min(100, percent));

    set((s) => ({ progressMap: { ...s.progressMap, [certId]: clamped } }));
    await supabase
      .from("user_cert_progress")
      .upsert({ user_id: userId, cert_id: certId, progress_percent: clamped }, { onConflict: "user_id,cert_id" });
  },

  recordModuleCompletion: async (certId: string, incrementPercent: number) => {
    const userId = get().userId;
    if (!userId) return;
    const current = get().progressMap[certId] ?? 0;
    const next = Math.max(0, Math.min(100, current + incrementPercent));

    set((s) => ({ progressMap: { ...s.progressMap, [certId]: next } }));
    await supabase.from("user_cert_progress").upsert(
      {
        user_id: userId,
        cert_id: certId,
        progress_percent: next,
        modules_done: 1,
      },
      { onConflict: "user_id,cert_id" }
    );
  },

  recordLabCompletionForCert: async (certId: string) => {
    const userId = get().userId;
    if (!userId) return;

    set((s) => ({
      detailMap: {
        ...s.detailMap,
        [certId]: { ...(s.detailMap[certId] ?? EMPTY_DETAIL), labCompleted: true },
      },
    }));
    await supabase
      .from("user_cert_progress")
      .upsert({ user_id: userId, cert_id: certId, lab_completed: true }, { onConflict: "user_id,cert_id" });
  },

  recordAnswerForCert: async (certId: string, correct: boolean) => {
    const userId = get().userId;
    if (!userId) return;
    const current = get().detailMap[certId] ?? EMPTY_DETAIL;
    const next: CertDetail = {
      ...current,
      questionsAnswered: current.questionsAnswered + 1,
      questionsCorrect: current.questionsCorrect + (correct ? 1 : 0),
    };

    set((s) => ({ detailMap: { ...s.detailMap, [certId]: next } }));
    await supabase.from("user_cert_progress").upsert(
      {
        user_id: userId,
        cert_id: certId,
        questions_answered: next.questionsAnswered,
        questions_correct: next.questionsCorrect,
      },
      { onConflict: "user_id,cert_id" }
    );
  },

  reset: () => set({ progressMap: {}, detailMap: {}, loaded: false, userId: null }),
}));
