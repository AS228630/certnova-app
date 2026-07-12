"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, FlaskConical, GraduationCap, Trophy, Sparkles } from "lucide-react";
import { useActivityLogStore, type ActivityType } from "@/lib/store/activityLogStore";
import { useLocale } from "@/components/LocaleProvider";

const ICONS: Record<ActivityType, typeof FlaskConical> = {
  lab_completed: FlaskConical,
  exam_passed: GraduationCap,
  certificate_earned: Trophy,
  course_milestone: Sparkles,
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

// Real notification bell: every item here is a genuine event from the
// user's own activity log (lab completed, mock exam passed, certificate
// earned) — the same source that powers the dashboard's Activity Feed.
// No fabricated "3" badge, no invented announcements.
export default function NotificationBell() {
  const entries = useActivityLogStore((s) => s.entries);
  const unreadCount = useActivityLogStore((s) => s.unreadCount());
  const markAllRead = useActivityLogStore((s) => s.markAllRead);
  const { t, locale } = useLocale();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next && unreadCount > 0) markAllRead();
  }

  return (
    <div ref={containerRef} className="relative">
      <button onClick={toggle} className="relative text-text-muted hover:text-text" aria-label={t("header.notifications")}>
        <Bell size={19} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-border-soft bg-panel shadow-2xl">
          <div className="border-b border-border-soft px-4 py-3">
            <p className="text-sm font-bold text-text">{t("header.notifications")}</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {entries.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-text-faint">{t("activity.empty")}</p>
            ) : (
              entries.map((entry) => {
                const Icon = ICONS[entry.type];
                return (
                  <div key={entry.id} className="flex items-start gap-3 border-b border-border-soft px-4 py-3 last:border-0">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <Icon size={14} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-text">{entry.title}</p>
                      <p className="text-[11px] text-text-faint">{formatRelativeTime(entry.createdAt, locale, t)}</p>
                    </div>
                    {!entry.readAt && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
