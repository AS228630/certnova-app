import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type ActivityType = "lab_completed" | "exam_passed" | "certificate_earned" | "course_milestone";

export type ActivityEntry = {
  id: string;
  type: ActivityType;
  title: string;
  xpAwarded: number;
  meta: Record<string, unknown> | null;
  createdAt: string;
  readAt: string | null;
};

type ActivityLogState = {
  entries: ActivityEntry[];
  loaded: boolean;
  userId: string | null;

  load: (userId: string) => Promise<void>;
  /** Records a milestone event. Only call this for meaningful moments
   * (lab completed, mock exam passed, certificate earned) — never for
   * individual question answers, which would make this table grow
   * unbounded. A database trigger also caps stored rows at 50 per user
   * as a safety net (see migration 011). */
  recordActivity: (type: ActivityType, title: string, xpAwarded?: number, meta?: Record<string, unknown>) => Promise<void>;
  /** Real unread count for the notification bell — every entry in this
   * table is a genuine event that happened for this user, so this never
   * needs a hardcoded fallback number. */
  unreadCount: () => number;
  markAllRead: () => Promise<void>;
  reset: () => void;
};

export const useActivityLogStore = create<ActivityLogState>((set, get) => ({
  entries: [],
  loaded: false,
  userId: null,

  load: async (userId: string) => {
    const { data, error } = await supabase
      .from("user_activity_log")
      .select("id, activity_type, title, xp_awarded, meta, created_at, read_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !data) {
      set({ entries: [], loaded: true, userId });
      return;
    }

    set({
      entries: data.map((row) => ({
        id: row.id,
        type: row.activity_type as ActivityType,
        title: row.title,
        xpAwarded: row.xp_awarded ?? 0,
        meta: row.meta,
        createdAt: row.created_at,
        readAt: row.read_at,
      })),
      loaded: true,
      userId,
    });
  },

  recordActivity: async (type, title, xpAwarded = 0, meta) => {
    const userId = get().userId;
    if (!userId) return;

    const { data, error } = await supabase
      .from("user_activity_log")
      .insert({ user_id: userId, activity_type: type, title, xp_awarded: xpAwarded, meta: meta ?? null })
      .select("id, activity_type, title, xp_awarded, meta, created_at, read_at")
      .single();

    if (error || !data) return;

    set((s) => ({
      entries: [
        {
          id: data.id,
          type: data.activity_type as ActivityType,
          title: data.title,
          xpAwarded: data.xp_awarded ?? 0,
          meta: data.meta,
          createdAt: data.created_at,
          readAt: data.read_at,
        },
        ...s.entries,
      ].slice(0, 20),
    }));
  },

  unreadCount: () => get().entries.filter((e) => !e.readAt).length,

  markAllRead: async () => {
    const userId = get().userId;
    if (!userId) return;
    const unreadIds = get().entries.filter((e) => !e.readAt).map((e) => e.id);
    if (unreadIds.length === 0) return;

    const now = new Date().toISOString();
    set((s) => ({
      entries: s.entries.map((e) => (e.readAt ? e : { ...e, readAt: now })),
    }));
    await supabase.from("user_activity_log").update({ read_at: now }).in("id", unreadIds);
  },

  reset: () => set({ entries: [], loaded: false, userId: null }),
}));
