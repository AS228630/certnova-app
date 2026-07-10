import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type UserProgress = {
  user_id: string;
  xp: number;
  streak_days: number;
  last_active_date: string | null;
  study_minutes_today: number;
  study_minutes_total: number;
  questions_answered: number;
  questions_correct: number;
  labs_completed: number;
  daily_goal_minutes: number;
};

const ZERO_PROGRESS: Omit<UserProgress, "user_id"> = {
  xp: 0,
  streak_days: 0,
  last_active_date: null,
  study_minutes_today: 0,
  study_minutes_total: 0,
  questions_answered: 0,
  questions_correct: 0,
  labs_completed: 0,
  daily_goal_minutes: 20,
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function isYesterday(dateStr: string) {
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10);
}

/** Applies the "new day" rollover rules (streak +1 / reset, minutes-today reset). */
function rollForNewDay(p: UserProgress): UserProgress {
  const today = todayStr();
  if (p.last_active_date === today) return p;

  const continuesStreak = p.last_active_date ? isYesterday(p.last_active_date) : false;
  return {
    ...p,
    streak_days: continuesStreak ? p.streak_days + 1 : p.last_active_date ? 1 : 0,
    study_minutes_today: 0,
    last_active_date: today,
  };
}

type UserProgressState = {
  progress: UserProgress | null;
  loading: boolean;
  displayName: string;
  load: (userId: string, displayName: string) => Promise<void>;
  recordAnswer: (correct: boolean) => Promise<void>;
  recordLabCompletion: () => Promise<void>;
  recordLessonCompletion: () => Promise<void>;
  reset: () => void;
};

async function persist(userId: string, patch: Partial<UserProgress>) {
  await supabase.from("user_progress").update(patch).eq("user_id", userId);
}

async function syncLeaderboard(userId: string, displayName: string, xp: number) {
  await supabase.from("leaderboard_entries").upsert({ user_id: userId, display_name: displayName, xp });
}

export type LeaderboardRow = { display_name: string; xp: number; isUser?: boolean };

/** Top-N leaderboard rows, with the current user's own row guaranteed to be included. */
export async function getLeaderboard(currentUserId: string, limit = 10): Promise<LeaderboardRow[]> {
  const { data: top } = await supabase
    .from("leaderboard_entries")
    .select("user_id, display_name, xp")
    .order("xp", { ascending: false })
    .limit(limit);

  const rows = (top ?? []).map((r) => ({ display_name: r.display_name, xp: r.xp, isUser: r.user_id === currentUserId }));

  if (!rows.some((r) => r.isUser)) {
    const { data: mine } = await supabase
      .from("leaderboard_entries")
      .select("display_name, xp")
      .eq("user_id", currentUserId)
      .maybeSingle();
    if (mine) rows.push({ display_name: mine.display_name, xp: mine.xp, isUser: true });
  }

  return rows;
}

/** Real percentile rank (1-100, higher is better) for a user's XP among all
 * leaderboard entries. Returns null if there's no data to compare against
 * (e.g. brand-new leaderboard) rather than guessing. */
export async function getXpPercentile(userXp: number): Promise<number | null> {
  const { count: total } = await supabase
    .from("leaderboard_entries")
    .select("*", { count: "exact", head: true });

  if (!total || total < 5) return null; // too few users for a meaningful percentile

  const { count: below } = await supabase
    .from("leaderboard_entries")
    .select("*", { count: "exact", head: true })
    .lt("xp", userXp);

  if (below == null) return null;
  return Math.max(1, Math.round(100 - (below / total) * 100));
}

export const useUserProgressStore = create<UserProgressState>((set, get) => ({
  progress: null,
  loading: true,
  displayName: "Lernender",

  load: async (userId: string, displayName: string) => {
    set({ loading: true, displayName });
    const { data, error } = await supabase.from("user_progress").select("*").eq("user_id", userId).maybeSingle();

    if (error || !data) {
      // Brand-new user: create a real, all-zero row.
      const fresh: UserProgress = { user_id: userId, ...ZERO_PROGRESS };
      await supabase.from("user_progress").insert(fresh);
      await syncLeaderboard(userId, displayName, fresh.xp);
      set({ progress: fresh, loading: false });
      return;
    }

    const rolled = rollForNewDay(data as UserProgress);
    if (rolled.last_active_date !== data.last_active_date || rolled.streak_days !== data.streak_days) {
      await persist(userId, {
        streak_days: rolled.streak_days,
        study_minutes_today: rolled.study_minutes_today,
        last_active_date: rolled.last_active_date,
      });
    }
    await syncLeaderboard(userId, displayName, rolled.xp);
    set({ progress: rolled, loading: false });
  },

  recordAnswer: async (correct: boolean) => {
    const current = get().progress;
    if (!current) return;
    const rolled = rollForNewDay(current);

    const updated: UserProgress = {
      ...rolled,
      questions_answered: rolled.questions_answered + 1,
      questions_correct: rolled.questions_correct + (correct ? 1 : 0),
      xp: rolled.xp + (correct ? 15 : 5),
      study_minutes_today: rolled.study_minutes_today + 2,
      study_minutes_total: rolled.study_minutes_total + 2,
      streak_days: rolled.streak_days === 0 ? 1 : rolled.streak_days,
      last_active_date: todayStr(),
    };

    set({ progress: updated });
    await persist(current.user_id, updated);
    await syncLeaderboard(current.user_id, get().displayName, updated.xp);
  },

  recordLabCompletion: async () => {
    const current = get().progress;
    if (!current) return;
    const rolled = rollForNewDay(current);

    const updated: UserProgress = {
      ...rolled,
      labs_completed: rolled.labs_completed + 1,
      xp: rolled.xp + 40,
      study_minutes_today: rolled.study_minutes_today + 5,
      study_minutes_total: rolled.study_minutes_total + 5,
      streak_days: rolled.streak_days === 0 ? 1 : rolled.streak_days,
      last_active_date: todayStr(),
    };

    set({ progress: updated });
    await persist(current.user_id, updated);
    await syncLeaderboard(current.user_id, get().displayName, updated.xp);
  },

  recordLessonCompletion: async () => {
    const current = get().progress;
    if (!current) return;
    const rolled = rollForNewDay(current);

    const updated: UserProgress = {
      ...rolled,
      xp: rolled.xp + 8,
      study_minutes_today: rolled.study_minutes_today + 3,
      study_minutes_total: rolled.study_minutes_total + 3,
      streak_days: rolled.streak_days === 0 ? 1 : rolled.streak_days,
      last_active_date: todayStr(),
    };

    set({ progress: updated });
    await persist(current.user_id, updated);
    await syncLeaderboard(current.user_id, get().displayName, updated.xp);
  },

  reset: () => set({ progress: null, loading: true, displayName: "Lernender" }),
}));
