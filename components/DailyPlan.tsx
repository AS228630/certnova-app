"use client";

import { Flame, Target } from "lucide-react";
import { useUserProgressStore } from "@/lib/store/userProgressStore";

export default function DailyPlan() {
  const progress = useUserProgressStore((s) => s.progress);

  const minutesDone = progress?.study_minutes_today ?? 0;
  const minutesGoal = progress?.daily_goal_minutes ?? 20;
  const questionsAnswered = progress?.questions_answered ?? 0;
  const streakDays = progress?.streak_days ?? 0;

  const percent = minutesGoal === 0 ? 0 : Math.min(100, Math.round((minutesDone / minutesGoal) * 100));
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference * (1 - percent / 100);
  const weeklyGoalDays = 5;
  const weeklyDaysActive = Math.min(weeklyGoalDays, streakDays);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">Mein Tagesziel</h2>

      <div className="flex items-center gap-5">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
            <circle cx="50" cy="50" r="40" fill="none" strokeWidth="8" className="stroke-panel-alt" />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className="stroke-primary"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-lg font-extrabold text-text">{minutesDone}</span>
            <span className="text-[10px] text-text-faint">/ {minutesGoal} Min.</span>
          </div>
        </div>

        <div className="flex-1 space-y-3 text-sm">
          <div>
            <p className="text-text-faint">Fragen heute beantwortet</p>
            <p className="font-semibold text-text">{questionsAnswered}</p>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-warning" />
            <div>
              <p className="font-semibold text-text">{streakDays} {streakDays === 1 ? "Tag" : "Tage"}</p>
              <p className="text-[10px] text-text-faint">Lernserie</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-primary" />
            <div>
              <p className="font-semibold text-text">{weeklyDaysActive} / {weeklyGoalDays} Tage</p>
              <p className="text-[10px] text-text-faint">Wochenziel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
