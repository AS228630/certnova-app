import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

type LessonCompletionState = {
  /** certId -> Set of completed lessonIds. */
  completions: Record<string, Set<string>>;
  loadedCerts: Set<string>;
  userId: string | null;

  loadForCert: (userId: string, certId: string) => Promise<void>;
  isCompleted: (certId: string, lessonId: string) => boolean;
  toggle: (userId: string, certId: string, lessonId: string) => Promise<boolean>;
  reset: () => void;
};

export const useLessonCompletionStore = create<LessonCompletionState>((set, get) => ({
  completions: {},
  loadedCerts: new Set(),
  userId: null,

  loadForCert: async (userId: string, certId: string) => {
    if (get().loadedCerts.has(`${userId}:${certId}`)) return;

    const { data, error } = await supabase
      .from("user_lesson_completions")
      .select("lesson_id")
      .eq("user_id", userId)
      .eq("cert_id", certId);

    const set_ = new Set(error || !data ? [] : data.map((r) => r.lesson_id));
    set((s) => ({
      userId,
      completions: { ...s.completions, [certId]: set_ },
      loadedCerts: new Set(s.loadedCerts).add(`${userId}:${certId}`),
    }));
  },

  isCompleted: (certId: string, lessonId: string) => {
    return get().completions[certId]?.has(lessonId) ?? false;
  },

  /** Toggles completion and persists it; returns the new completed state. */
  toggle: async (userId: string, certId: string, lessonId: string) => {
    const current = get().completions[certId] ?? new Set<string>();
    const nowCompleted = !current.has(lessonId);
    const next = new Set(current);
    if (nowCompleted) next.add(lessonId);
    else next.delete(lessonId);

    set((s) => ({ completions: { ...s.completions, [certId]: next } }));

    if (nowCompleted) {
      await supabase.from("user_lesson_completions").insert({ user_id: userId, cert_id: certId, lesson_id: lessonId });
    } else {
      await supabase
        .from("user_lesson_completions")
        .delete()
        .eq("user_id", userId)
        .eq("cert_id", certId)
        .eq("lesson_id", lessonId);
    }

    return nowCompleted;
  },

  reset: () => set({ completions: {}, loadedCerts: new Set(), userId: null }),
}));
