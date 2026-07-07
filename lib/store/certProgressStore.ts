import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

type CertProgressState = {
  /** certId -> progress percent (0-100). Missing key means 0 -- brand-new user. */
  progressMap: Record<string, number>;
  loaded: boolean;
  userId: string | null;

  loadAll: (userId: string) => Promise<void>;
  getProgress: (certId: string) => number;
  recordModuleCompletion: (certId: string, incrementPercent: number) => Promise<void>;
  setProgress: (certId: string, percent: number) => Promise<void>;
  reset: () => void;
};

export const useCertProgressStore = create<CertProgressState>((set, get) => ({
  progressMap: {},
  loaded: false,
  userId: null,

  loadAll: async (userId: string) => {
    const { data, error } = await supabase
      .from("user_cert_progress")
      .select("cert_id, progress_percent")
      .eq("user_id", userId);

    if (error || !data) {
      set({ progressMap: {}, loaded: true, userId });
      return;
    }

    const map: Record<string, number> = {};
    for (const row of data) map[row.cert_id] = row.progress_percent;
    set({ progressMap: map, loaded: true, userId });
  },

  getProgress: (certId: string) => get().progressMap[certId] ?? 0,

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

  reset: () => set({ progressMap: {}, loaded: false, userId: null }),
}));
