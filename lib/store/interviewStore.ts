import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";

export type InterviewSession = {
  id: string;
  careerGoalId: string;
  sessionType: "technical" | "hr" | "practical" | "mock";
  topicId: string | null;
  scorePercent: number | null;
  durationSeconds: number | null;
  status: "in_progress" | "completed" | "abandoned";
  startedAt: string;
  completedAt: string | null;
};

export type TopicProgress = {
  questionsAnswered: number;
  questionsCorrect: number;
};

type InterviewStoreState = {
  userId: string | null;
  careerGoalId: string | null;
  sessions: InterviewSession[];
  topicProgress: Record<string, TopicProgress>;
  loaded: boolean;

  load: (userId: string) => Promise<void>;
  setCareerGoal: (careerGoalId: string) => Promise<void>;
  startSession: (params: {
    careerGoalId: string;
    sessionType: InterviewSession["sessionType"];
    topicId?: string;
  }) => Promise<string | null>;
  completeSession: (sessionId: string, scorePercent: number, durationSeconds: number) => Promise<void>;
  recordTopicAnswer: (topicId: string, correct: boolean) => Promise<void>;
  reset: () => void;
};

export const useInterviewStore = create<InterviewStoreState>((set, get) => ({
  userId: null,
  careerGoalId: null,
  sessions: [],
  topicProgress: {},
  loaded: false,

  load: async (userId: string) => {
    const [{ data: prefs }, { data: sessions }, { data: topics }] = await Promise.all([
      supabase.from("interview_prefs").select("career_goal_id").eq("user_id", userId).maybeSingle(),
      supabase
        .from("interview_sessions")
        .select("id, career_goal_id, session_type, topic_id, score_percent, duration_seconds, status, started_at, completed_at")
        .eq("user_id", userId)
        .order("started_at", { ascending: false })
        .limit(50),
      supabase.from("interview_topic_progress").select("topic_id, questions_answered, questions_correct").eq("user_id", userId),
    ]);

    const topicProgress: Record<string, TopicProgress> = {};
    for (const row of topics ?? []) {
      topicProgress[row.topic_id] = {
        questionsAnswered: row.questions_answered,
        questionsCorrect: row.questions_correct,
      };
    }

    set({
      userId,
      careerGoalId: prefs?.career_goal_id ?? null,
      sessions: (sessions ?? []).map((s) => ({
        id: s.id,
        careerGoalId: s.career_goal_id,
        sessionType: s.session_type,
        topicId: s.topic_id,
        scorePercent: s.score_percent,
        durationSeconds: s.duration_seconds,
        status: s.status,
        startedAt: s.started_at,
        completedAt: s.completed_at,
      })),
      topicProgress,
      loaded: true,
    });
  },

  setCareerGoal: async (careerGoalId: string) => {
    const userId = get().userId;
    if (!userId) return;
    set({ careerGoalId });
    await supabase
      .from("interview_prefs")
      .upsert({ user_id: userId, career_goal_id: careerGoalId, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  },

  startSession: async ({ careerGoalId, sessionType, topicId }) => {
    const userId = get().userId;
    if (!userId) return null;

    const { data, error } = await supabase
      .from("interview_sessions")
      .insert({
        user_id: userId,
        career_goal_id: careerGoalId,
        session_type: sessionType,
        topic_id: topicId ?? null,
        status: "in_progress",
      })
      .select("id, career_goal_id, session_type, topic_id, score_percent, duration_seconds, status, started_at, completed_at")
      .single();

    if (error || !data) return null;

    set((s) => ({
      sessions: [
        {
          id: data.id,
          careerGoalId: data.career_goal_id,
          sessionType: data.session_type,
          topicId: data.topic_id,
          scorePercent: data.score_percent,
          durationSeconds: data.duration_seconds,
          status: data.status,
          startedAt: data.started_at,
          completedAt: data.completed_at,
        },
        ...s.sessions,
      ],
    }));

    return data.id as string;
  },

  completeSession: async (sessionId: string, scorePercent: number, durationSeconds: number) => {
    const completedAt = new Date().toISOString();
    set((s) => ({
      sessions: s.sessions.map((sess) =>
        sess.id === sessionId
          ? { ...sess, status: "completed" as const, scorePercent, durationSeconds, completedAt }
          : sess
      ),
    }));
    await supabase
      .from("interview_sessions")
      .update({ status: "completed", score_percent: scorePercent, duration_seconds: durationSeconds, completed_at: completedAt })
      .eq("id", sessionId);
  },

  recordTopicAnswer: async (topicId: string, correct: boolean) => {
    const userId = get().userId;
    if (!userId) return;
    const current = get().topicProgress[topicId] ?? { questionsAnswered: 0, questionsCorrect: 0 };
    const next: TopicProgress = {
      questionsAnswered: current.questionsAnswered + 1,
      questionsCorrect: current.questionsCorrect + (correct ? 1 : 0),
    };

    set((s) => ({ topicProgress: { ...s.topicProgress, [topicId]: next } }));
    await supabase.from("interview_topic_progress").upsert(
      {
        user_id: userId,
        topic_id: topicId,
        questions_answered: next.questionsAnswered,
        questions_correct: next.questionsCorrect,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,topic_id" }
    );
  },

  reset: () => set({ userId: null, careerGoalId: null, sessions: [], topicProgress: {}, loaded: false }),
}));
