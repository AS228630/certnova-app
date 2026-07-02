import { Flame, Target } from "lucide-react";

const minutesDone = 48;
const minutesGoal = 60;
const percent = Math.round((minutesDone / minutesGoal) * 100);
const circumference = 2 * Math.PI * 40;
const dashOffset = circumference * (1 - percent / 100);

export default function DailyPlan() {
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
            <p className="text-text-faint">Fragen gelöst</p>
            <p className="font-semibold text-text">18 / 20</p>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-warning" />
            <div>
              <p className="font-semibold text-text">14 Tage</p>
              <p className="text-[10px] text-text-faint">Lernserie</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Target size={16} className="text-primary" />
            <div>
              <p className="font-semibold text-text">4 / 5 Tage</p>
              <p className="text-[10px] text-text-faint">Wochenziel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
