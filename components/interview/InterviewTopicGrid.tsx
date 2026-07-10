"use client";

import { useState } from "react";
import type { InterviewTopic, InterviewCategory } from "@/lib/interviewData";
import { useInterviewStore } from "@/lib/store/interviewStore";
import { useLocale } from "@/components/LocaleProvider";

const categories: InterviewCategory[] = ["technical", "hr", "practical", "systems"];

export default function InterviewTopicGrid({
  topics,
  onPractice,
}: {
  topics: InterviewTopic[];
  onPractice: (topic: InterviewTopic) => void;
}) {
  const { t } = useLocale();
  const topicProgress = useInterviewStore((s) => s.topicProgress);
  const presentCategories = categories.filter((c) => topics.some((t) => t.category === c));
  const [activeCategory, setActiveCategory] = useState<InterviewCategory>(presentCategories[0] ?? "technical");

  const filtered = topics.filter((t) => t.category === activeCategory);

  return (
    <section>
      <h2 className="mb-4 font-bold text-text">{t("interview.step3Title")}</h2>

      <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto">
        {presentCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === cat ? "bg-primary text-white" : "bg-panel text-text-muted hover:bg-panel-alt"
            }`}
          >
            {t(`interview.category.${cat}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((topic) => {
          const progress = topicProgress[topic.id];
          const answered = progress?.questionsAnswered ?? 0;
          const pct = topic.questionCount === 0 ? 0 : Math.min(100, Math.round((answered / topic.questionCount) * 100));
          return (
            <div key={topic.id} className="rounded-xl border border-border-soft bg-panel p-4">
              <p className="mb-1 text-sm font-bold text-text">{topic.title}</p>
              <p className="mb-3 text-xs text-text-faint">
                {topic.questionCount.toLocaleString("de-DE")} {t("interview.questionsSuffix")}
              </p>
              <div className="mb-1 h-1.5 w-full rounded-full bg-panel-alt">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${pct}%` }} />
              </div>
              <p className="mb-3 text-[11px] text-text-faint">{pct}%</p>
              <button
                onClick={() => onPractice(topic)}
                className="w-full rounded-lg bg-primary-light py-2 text-xs font-bold text-primary hover:bg-primary hover:text-white"
              >
                {t("interview.practiceCta")}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
