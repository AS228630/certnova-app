"use client";

import { Headset, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useInterviewStore } from "@/lib/store/interviewStore";
import { useLocale } from "@/components/LocaleProvider";
import type { InterviewTopic } from "@/lib/interviewData";

function formatDuration(seconds: number, t: (k: string) => string) {
  const m = Math.round(seconds / 60);
  return `${m} ${t("interview.minutesSuffix")}`;
}

function timeAgo(iso: string, locale: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.round(diffMs / 60000);
  if (diffMin < 60) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffMin, "minute");
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffHr, "hour");
  const diffDay = Math.round(diffHr / 24);
  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(-diffDay, "day");
}

export default function InterviewSidebar({ topics }: { topics: InterviewTopic[] }) {
  const { t, locale } = useLocale();
  const sessions = useInterviewStore((s) => s.sessions);
  const topicProgress = useInterviewStore((s) => s.topicProgress);

  const totalQuestions = topics.reduce((sum, t) => sum + t.questionCount, 0);
  const answeredTotal = topics.reduce((sum, t) => sum + (topicProgress[t.id]?.questionsAnswered ?? 0), 0);
  const overallPct = totalQuestions === 0 ? 0 : Math.round((answeredTotal / totalQuestions) * 100);

  const completedSessions = sessions.filter((s) => s.status === "completed");
  const totalDurationMin = Math.round(completedSessions.reduce((sum, s) => sum + (s.durationSeconds ?? 0), 0) / 60);
  const recent = sessions.slice(0, 3);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dash = (overallPct / 100) * circumference;

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h2 className="mb-4 text-sm font-bold text-text">{t("interview.yourProgress")}</h2>
        <div className="flex items-center justify-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--color-panel-alt)" strokeWidth="9" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#6d4cff"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${dash} ${circumference - dash}`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-extrabold text-text">{overallPct}%</span>
              <span className="text-[10px] text-text-faint">{t("interview.overallProgress")}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border-soft pt-4 text-center">
          <div>
            <p className="text-lg font-extrabold text-text">{completedSessions.length}</p>
            <p className="text-[10px] text-text-faint">{t("interview.statInterviews")}</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-text">{totalDurationMin}</p>
            <p className="text-[10px] text-text-faint">{t("interview.statMinutes")}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold text-text">{t("interview.recentSessions")}</h2>
        </div>
        {recent.length === 0 ? (
          <p className="text-xs text-text-faint">{t("interview.noSessionsYet")}</p>
        ) : (
          <ul className="space-y-3">
            {recent.map((s) => (
              <li key={s.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <Headset size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-text">{t(`interview.sessionType.${s.sessionType}`)}</p>
                  <p className="text-[11px] text-text-faint">{timeAgo(s.startedAt, locale)}</p>
                </div>
                {s.status === "completed" && s.durationSeconds != null && (
                  <span className="shrink-0 text-[11px] font-semibold text-text-faint">
                    {formatDuration(s.durationSeconds, t)}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Link
        href="/certifications"
        className="flex items-center justify-between rounded-2xl border border-border-soft bg-panel p-4 text-sm font-bold text-text hover:border-primary/40"
      >
        {t("interview.viewCertifications")}
        <ArrowRight size={15} className="text-primary" />
      </Link>
    </aside>
  );
}
