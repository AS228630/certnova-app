"use client";

import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useLocale } from "@/components/LocaleProvider";

function ProgressRow({ label, done, goal }: { label: string; done: number; goal: number }) {
  const percent = goal === 0 ? 0 : Math.min(100, Math.round((done / goal) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-text-muted">{label}</span>
        <span className="font-semibold text-text">
          {done} / {goal}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-panel-alt">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

export default function DailyPlan() {
  const progress = useUserProgressStore((s) => s.progress);
  const { t } = useLocale();

  const minutesDone = progress?.study_minutes_today ?? 0;
  const minutesGoal = progress?.daily_goal_minutes ?? 20;
  const questionsToday = progress?.questions_answered_today ?? 0;
  const questionsGoal = progress?.daily_question_goal ?? 20;

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">{t("dashboard.dailyGoal")}</h2>
      <div className="space-y-4">
        <ProgressRow label={t("dashboard.processingTime")} done={minutesDone} goal={minutesGoal} />
        <ProgressRow label={t("dashboard.questionsSolved")} done={questionsToday} goal={questionsGoal} />
      </div>
    </div>
  );
}
