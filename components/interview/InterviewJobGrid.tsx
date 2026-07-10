"use client";

import { careerPaths } from "@/lib/careerPathsData";
import { interviewJobData } from "@/lib/interviewData";
import { renderCareerPathIcon } from "@/lib/careerPathIcons";
import { useLocale } from "@/components/LocaleProvider";

const availableSlugs = new Set(interviewJobData.map((j) => j.careerPathSlug));
const jobs = careerPaths.filter((p) => availableSlugs.has(p.slug));

export default function InterviewJobGrid({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {jobs.map((job) => {
        const topicCount = interviewJobData.find((j) => j.careerPathSlug === job.slug)?.topics.reduce(
          (sum, t) => sum + t.questionCount,
          0
        ) ?? 0;
        const active = job.slug === selectedSlug;
        return (
          <button
            key={job.slug}
            onClick={() => onSelect(job.slug)}
            className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors ${
              active ? "border-primary bg-primary-light" : "border-border-soft bg-panel hover:border-primary/40"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                active ? "bg-primary text-white" : "bg-panel-alt text-primary"
              }`}
            >
              {renderCareerPathIcon(job.icon, 20)}
            </div>
            <p className="text-xs font-bold leading-snug text-text">{job.title}</p>
            <p className="text-[10px] text-text-faint">
              {topicCount.toLocaleString("de-DE")} {t("interview.questionsSuffix")}
            </p>
          </button>
        );
      })}
    </div>
  );
}
