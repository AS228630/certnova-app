import { Bot, ArrowRight } from "lucide-react";

const focusAreas = ["Azure Storage", "Netzwerksicherheit", "NSG"];

export default function AICoach() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-3 flex items-center gap-2">
        <h2 className="font-bold text-text">KI Coach</h2>
        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold text-primary">
          BETA
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-panel-alt">
          <Bot size={24} className="text-primary" />
        </div>
        <p className="text-sm leading-relaxed text-text-muted">
          Hallo Arman! Ich habe einige Bereiche identifiziert, auf die du achten solltest.
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {focusAreas.map((area) => (
          <span
            key={area}
            className="rounded-full border border-border-soft bg-panel-alt px-3 py-1 text-xs font-medium text-text-muted"
          >
            {area}
          </span>
        ))}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
        Smart Practice starten
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
