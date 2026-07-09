"use client";

import { careerPaths, type CareerPath } from "@/lib/careerPathsData";
import { renderCareerPathIcon } from "@/lib/careerPathIcons";
import { useLocale } from "@/components/LocaleProvider";

const levelClass: Record<CareerPath["level"], string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/15 text-warning",
  Advanced: "bg-danger/15 text-danger",
};

export default function CareerPathGrid({
  selectedSlug,
  onSelect,
}: {
  selectedSlug: string;
  onSelect: (slug: string) => void;
}) {
  const { t } = useLocale();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {careerPaths.map((path) => {
        const active = path.slug === selectedSlug;
        return (
          <button
            key={path.slug}
            onClick={() => onSelect(path.slug)}
            className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${
              active
                ? "border-primary bg-primary-light"
                : "border-border-soft bg-panel hover:border-primary/40"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                active ? "bg-primary text-white" : "bg-panel-alt text-primary"
              }`}
            >
              {renderCareerPathIcon(path.icon, 20)}
            </div>
            <p className="text-sm font-bold leading-snug text-text">{path.title}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${levelClass[path.level]}`}>
              {t(`learningPaths.level${path.level}`)}
            </span>
            <p className="text-[11px] text-text-faint">
              {path.duration} · {path.salaryRange}
            </p>
          </button>
        );
      })}
    </div>
  );
}
