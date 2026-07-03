import { GraduationCap, FlaskConical, ClipboardCheck, CheckCircle2 } from "lucide-react";
import type { ActivityItem } from "@/lib/certJourney";

const ICON = {
  learn: GraduationCap,
  labs: FlaskConical,
  exam: ClipboardCheck,
};

const ICON_BG = {
  learn: "bg-primary-light text-primary",
  labs: "bg-success-light text-success",
  exam: "bg-warning/10 text-warning",
};

export default function ActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Letzte Aktivitäten</h2>
        <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
      </div>
      <ul className="space-y-4">
        {activities.map((a, i) => {
          const Icon = ICON[a.icon];
          return (
            <li key={i} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${ICON_BG[a.icon]}`}>
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-text">{a.title}</p>
                <p className="truncate text-xs text-text-faint">{a.subtitle}</p>
                <p className="text-[11px] text-text-faint">{a.time}</p>
              </div>
              <CheckCircle2 size={16} className="shrink-0 text-success" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
