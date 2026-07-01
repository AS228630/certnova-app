
import { Flame } from "lucide-react";

export default function DailyPlan() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <h2 className="mb-4 font-bold text-slate-900">Daily Plan</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400">Study Time</p>
          <p className="text-sm font-semibold text-slate-900">32m / 60m</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Today&apos;s Goal</p>
          <p className="text-sm font-semibold text-slate-900">12 / 20 questions</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Current Streak</p>
          <p className="text-sm font-semibold text-slate-900">14 days</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Weekly Goal</p>
          <p className="text-sm font-semibold text-slate-900">3 / 5 days</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-500">
        <Flame size={16} />
        Current Streak: 14 days
      </div>
    </div>
  );
}
