import { create } from "zustand";
import { supabase } from "@/lib/supabase/client";
import { TOPIC_AREAS, topicAreaFor, type TopicAreaId } from "@/lib/topicMastery";

export type TopicMasteryDetail = {
  questionsAnswered: number;
  questionsCorrect: number;
};

type TopicMasteryState = {
  /** topicArea -> aggregate detail. Missing key means no data yet. */
  masteryMap: Partial<Record<TopicAreaId, TopicMasteryDetail>>;
  loaded: boolean;
  userId: string | null;

  load: (userId: string) => Promise<void>;
  /** Records one answered question against its broad topic area, if the
   * fine-grained topicId maps to a known area (see lib/topicMastery.ts).
   * Silently does nothing for unmapped topics rather than guessing. */
  recordAnswerForTopic: (topicId: string, correct: boolean) => Promise<void>;
  /** True once every area has at least this many answered questions —
   * used to decide whether the mastery chart has enough signal to be
   * meaningful yet, vs. showing an honest "keep practicing" empty state. */
  hasEnoughData: (minPerArea?: number) => boolean;
  reset: () => void;
};

const MIN_ANSWERS_PER_AREA_DEFAULT = 5;

export const useTopicMasteryStore = create<TopicMasteryState>((set, get) => ({
  masteryMap: {},
  loaded: false,
  userId: null,

  load: async (userId: string) => {
    const { data, error } = await supabase
      .from("user_topic_mastery")
      .select("topic_area, questions_answered, questions_correct")
      .eq("user_id", userId);

    if (error || !data) {
      set({ masteryMap: {}, loaded: true, userId });
      return;
    }

    const masteryMap: Partial<Record<TopicAreaId, TopicMasteryDetail>> = {};
    for (const row of data) {
      masteryMap[row.topic_area as TopicAreaId] = {
        questionsAnswered: row.questions_answered ?? 0,
        questionsCorrect: row.questions_correct ?? 0,
      };
    }
    set({ masteryMap, loaded: true, userId });
  },

  recordAnswerForTopic: async (topicId: string, correct: boolean) => {
    const area = topicAreaFor(topicId);
    if (!area) return;
    const userId = get().userId;
    if (!userId) return;

    const current = get().masteryMap[area] ?? { questionsAnswered: 0, questionsCorrect: 0 };
    const next: TopicMasteryDetail = {
      questionsAnswered: current.questionsAnswered + 1,
      questionsCorrect: current.questionsCorrect + (correct ? 1 : 0),
    };

    set((s) => ({ masteryMap: { ...s.masteryMap, [area]: next } }));
    await supabase.from("user_topic_mastery").upsert(
      {
        user_id: userId,
        topic_area: area,
        questions_answered: next.questionsAnswered,
        questions_correct: next.questionsCorrect,
      },
      { onConflict: "user_id,topic_area" }
    );
  },

  hasEnoughData: (minPerArea = MIN_ANSWERS_PER_AREA_DEFAULT) => {
    const map = get().masteryMap;
    const answeredAreas = TOPIC_AREAS.filter((a) => (map[a.id]?.questionsAnswered ?? 0) >= minPerArea);
    return answeredAreas.length >= 2; // need signal in at least a couple of areas to be worth a chart
  },

  reset: () => set({ masteryMap: {}, loaded: false, userId: null }),
}));
