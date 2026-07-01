import { Flame, Target } from "lucide-react";

export default function DailyPlan() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">Mein Tagesziel</h2>

      <div className="mb-4">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-text-muted">Bearbeitungszeit</span>
          <span className="font-semibold text-text">48 / 60 Min.</span>
        </div>
        <div className="h-2 w-full rounded-full bg-panel-alt">
          <div className="h-2 w-4/5 rounded-full bg-primary" />
        </div>
      </div>

      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-text-muted">Fragen gelöst</span>
          <span className="font-semibold text-text">18 / 20</span>
        </div>
        <div className="h-2 w-full rounded-full bg-panel-alt">
          <div className="h-2 w-[90%] rounded-full bg-success" />
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-soft pt-4">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-warning" />
          <div>
            <p className="text-sm font-bold text-text">14 Tage</p>
            <p className="text-[11px] text-text-faint">Lernserie</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Target size={18} className="text-primary" />
          <div>
            <p className="text-sm font-bold text-text">4 / 5 Tage</p>
            <p className="text-[11px] text-text-faint">Wochenziel</p>
          </div>
        </div>
      </div>
    </div>
  );
}
