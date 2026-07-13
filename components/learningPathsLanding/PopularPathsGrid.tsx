"use client";

import Link from "next/link";
import { ArrowRight, Clock, Wallet } from "lucide-react";
import { careerPaths } from "@/lib/careerPathsData";
import { renderCareerPathIcon } from "@/lib/careerPathIcons";
import { useLocale } from "@/components/LocaleProvider";

const levelClass: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/15 text-warning",
  Advanced: "bg-danger/15 text-danger",
};

const levelLabelKey: Record<string, string> = {
  Beginner: "lpLanding.levelBeginner",
  Intermediate: "lpLanding.levelIntermediate",
  Advanced: "lpLanding.levelAdvanced",
};

// Shows real catalog entries from careerPathsData.ts (career-path
// duration/salary figures are the project's existing, already-approved
// presentation data — not fabricated on the spot here) so a guest
// visitor sees the platform's actual path catalog rather than a
// separate, disconnected marketing mockup.
export default function PopularPathsGrid() {
  const { t } = useLocale();
  const shown = careerPaths.slice(0, 10);

  return (
    <section id="popular-paths" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-text sm:text-2xl">{t("lpLanding.popularPathsTitle")}</h2>
        <Link href="/register" className="hidden text-sm font-semibold text-primary hover:underline sm:inline">
          {t("lpLanding.viewAllPaths")} →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {shown.map((path) => (
          <Link
            key={path.slug}
            href="/register"
            className="flex flex-col rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-panel-alt text-primary">
              {renderCareerPathIcon(path.icon, 18)}
            </div>
            <p className="text-sm font-bold leading-snug text-text">{path.title}</p>
            <span className={`mt-1.5 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-bold ${levelClass[path.level]}`}>
              {t(levelLabelKey[path.level])}
            </span>
            <div className="mt-3 space-y-1.5 text-xs text-text-faint">
              <p className="flex items-center gap-1.5">
                <Clock size={12} /> {path.duration}
              </p>
              <p className="flex items-center gap-1.5">
                <Wallet size={12} /> ~{path.salaryRange}
              </p>
            </div>
            <span className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">
              {t("lpLanding.viewDetails")}
              <ArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
