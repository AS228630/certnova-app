
import { Bot } from "lucide-react";

const weakAreas = ["Azure Storage", "Network Security", "NSG"];

export default function AICoach() {
  return (
    <div className="rounded-2xl border border-border bg-purple-light p-6">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple text-white">
          <Bot size={16} />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900">AI Coach</p>
          <span className="rounded-full bg-purple px-1.5 py-0.5 text-[9px] font-bold text-white">BETA</span>
        </div>
      </div>
      <p className="mb-3 text-sm text-slate-600">
        Hi Arman! I analyzed your performance. Focus on these weak areas:
      </p>
      <div className="mb-4 flex flex-wrap gap-2">
        {weakAreas.map((t) => (
          <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
            {t}
          </span>
        ))}
      </div>
      <button className="w-full rounded-lg bg-purple py-2 text-sm font-bold text-white">
        Start Smart Practice
      </button>
    </div>
  );
}
