import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

type LanguageCourseState = {
  userId: string | null;
  progress: Record<string, number>; // courseSlug -> lessonsCompleted
  loaded: boolean;

  load: (userId: string) => Promise<void>;
  recordLessonComplete: (courseSlug: string) => Promise<void>;
  reset: () => void;
};

export const useLanguageCourseStore = create<LanguageCourseState>((set, get) => ({
  userId: null,
  progress: {},
  loaded: false,

  load: async (userId: string) => {
    const { data } = await supabase
      .from("language_course_progress")
      .select("course_slug, lessons_completed")
      .eq("user_id", userId);

    const progress: Record<string, number> = {};
    for (const row of data ?? []) {
      progress[row.course_slug] = row.lessons_completed;
    }
    set({ userId, progress, loaded: true });
  },

  recordLessonComplete: async (courseSlug: string) => {
    const userId = get().userId;
    if (!userId) return;
    const next = (get().progress[courseSlug] ?? 0) + 1;
    set((s) => ({ progress: { ...s.progress, [courseSlug]: next } }));
    await supabase.from("language_course_progress").upsert(
      { user_id: userId, course_slug: courseSlug, lessons_completed: next, updated_at: new Date().toISOString() },
      { onConflict: "user_id,course_slug" }
    );
  },

  reset: () => set({ userId: null, progress: {}, loaded: false }),
}));
