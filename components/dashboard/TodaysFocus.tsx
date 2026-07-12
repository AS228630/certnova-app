"use client";

import { BookOpen, ListChecks, FlaskConical } from "lucide-react";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useActivityLogStore } from "@/lib/store/activityLogStore";
import { findCertByCertId } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

function FocusCard({
  icon: Icon,
  title,
  subtitle,
  percent,
}: {
  icon: typeof BookOpen;
  title: string;
  subtitle: string;
  percent: number;
}) {
  return (
    <div className="rounded-xl border border-border-soft bg-panel p-4">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
        <Icon size={16} />
      </div>
      <p className="mb-0.5 text-sm font-bold leading-snug text-text">{title}</p>
      <p className="mb-2 text-[11px] text-text-faint">{subtitle}</p>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-alt">
        <div className="h-1.5 rounded-full bg-primary" style={{ width: `${Math.min(100, percent)}%` }} />
      </div>
    </div>
  );
}

export default function TodaysFocus({ onEditGoals }: { onEditGoals: () => void }) {
  const progress = useUserProgressStore((s) => s.progress);
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const activityEntries = useActivityLogStore((s) => s.entries);
  const { t } = useLocale();

  const questionsToday = progress?.questions_answered_today ?? 0;
  const questionsGoal = progress?.daily_question_goal ?? 20;
  const questionsPercent = questionsGoal === 0 ? 0 : Math.round((questionsToday / questionsGoal) * 100);

  const topCert = Object.entries(progressMap)
    .filter(([, pct]) => pct > 0 && pct < 100)
    .sort((a, b) => b[1] - a[1])[0];
  const topCertMatch = topCert ? findCertByCertId(topCert[0]) : undefined;
  const lessonPercent = topCert ? Math.round(topCert[1]) : 0;

  const today = new Date().toDateString();
  const labDoneToday = activityEntries.some(
    (e) => e.type === "lab_completed" && new Date(e.createdAt).toDateString() === today
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">{t("todaysFocus.title")}</h2>
        <button onClick={onEditGoals} className="text-xs font-semibold text-primary hover:underline">
          {t("todaysFocus.editGoals")}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FocusCard
          icon={BookOpen}
          title={t("todaysFocus.continueLesson")}
          subtitle={topCertMatch ? topCertMatch.cert.title : t("dashboard2.noProgressYet")}
          percent={lessonPercent}
        />
        <FocusCard
          icon={ListChecks}
          title={t("todaysFocus.solveQuestions")}
          subtitle={`${questionsToday} / ${questionsGoal} ${t("todaysFocus.completed")}`}
          percent={questionsPercent}
        />
        <FocusCard
          icon={FlaskConical}
          title={t("todaysFocus.completeLab")}
          subtitle={labDoneToday ? `1 / 1 ${t("todaysFocus.completed")}` : `0 / 1 ${t("todaysFocus.completed")}`}
          percent={labDoneToday ? 100 : 0}
        />
      </div>
    </div>
  );
}
