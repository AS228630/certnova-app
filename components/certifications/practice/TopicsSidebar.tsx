"use client";

import { ChevronDown, Lock, Shuffle } from "lucide-react";
import type { PracticeTopic } from "@/lib/az900Practice";

export default function TopicsSidebar({
  topics,
  loadedCounts,
  activeTopicId,
  onSelectTopic,
  progressByTopic,
  onShuffle,
}: {
  topics: PracticeTopic[];
  loadedCounts: Record<string, number>;
  activeTopicId: string;
  onSelectTopic: (id: string) => void;
  progressByTopic: Record<string, number>;
  onShuffle: () => void;
}) {
  const totalLoaded = Object.values(loadedCounts).reduce((a, b) => a + b, 0);

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="font-bold text-text">Fragen nach Themen</p>
      <p className="mb-4 text-xs text-text-muted">{totalLoaded} Fragen verfügbar</p>

      <div className="space-y-2">
        {topics.map((t) => {
          const loaded = loadedCounts[t.id] ?? 0;
          const locked = loaded === 0;
          const active = activeTopicId === t.id;
          const progress = progressByTopic[t.id] ?? 0;

          return (
            <button
              key={t.id}
              disabled={locked}
              onClick={() => onSelectTopic(t.id)}
              className={`w-full rounded-lg border p-3 text-left transition ${
                active
                  ? "border-primary bg-primary-light"
                  : locked
                    ? "border-border-soft opacity-60"
                    : "border-border-soft hover:border-primary/40"
              }`}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className={`text-sm font-semibold ${active ? "text-primary" : "text-text"}`}>{t.title}</span>
                {locked ? (
                  <Lock size={13} className="text-text-faint" />
                ) : active ? (
                  <ChevronDown size={14} className="text-primary" />
                ) : null}
              </div>
              <p className="mb-2 text-xs text-text-faint">
                {loaded > 0 ? `${loaded} Fragen geladen · ${t.totalQuestions} gesamt` : `${t.totalQuestions} Fragen · bald verfügbar`}
              </p>
              <div className="h-1.5 w-full rounded-full bg-panel-alt">
                <div
                  className={`h-1.5 rounded-full ${locked ? "bg-text-faint/30" : "bg-primary"}`}
                  style={{ width: `${locked ? 0 : progress}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onShuffle}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border-soft py-3 text-sm font-semibold text-text-muted hover:border-primary hover:text-primary"
      >
        <Shuffle size={15} />
        Zufällige Fragen mischen
      </button>
    </div>
  );
}
