"use client";

import { FlaskConical, GraduationCap, Trophy, Sparkles } from "lucide-react";
import { useActivityLogStore, type ActivityType } from "@/lib/store/activityLogStore";
import { useLocale } from "@/components/LocaleProvider";

const ICONS: Record<ActivityType, typeof FlaskConical> = {
  lab_completed: FlaskConical,
  exam_passed: GraduationCap,
  certificate_earned: Trophy,
  course_milestone: Sparkles,
};

const ICON_COLORS: Record<ActivityType, string> = {
  lab_completed: "bg-success-light text-success",
  exam_passed: "bg-primary-light text-primary",
  certificate_earned: "bg-warning/15 text-warning",
  course_milestone: "bg-blue-500/15 text-blue-500",
};

function formatRelativeTime(iso: string, locale: string, t: (key: string) => string) {
  const date = new Date(iso);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  if (isToday) return `${t("journeyGen.todayLabel")}, ${time}`;
  if (isYesterday) return `${t("journeyGen.yesterdayLabel")}, ${time}`;
  return date.toLocaleDateString(locale, { day: "2-digit", month: "short" });
}

export default function ActivityFeed() {
  const entries = useActivityLogStore((s) => s.entries);
  const { t, locale } = useLocale();

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-soft bg-panel p-6 text-center">
        <p className="text-sm text-text-faint">{t("activity.empty")}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-panel">
      {entries.map((entry) => {
        const Icon = ICONS[entry.type];
        return (
          <div key={entry.id} className="flex items-center gap-3 p-4">
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_COLORS[entry.type]}`}>
              <Icon size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-text">{entry.title}</p>
              <p className="text-[11px] text-text-faint">{formatRelativeTime(entry.createdAt, locale, t)}</p>
            </div>
            {entry.xpAwarded > 0 && (
              <span className="shrink-0 rounded-full bg-success-light px-2 py-0.5 text-[11px] font-bold text-success">
                +{entry.xpAwarded} {t("activity.xpSuffix")}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
