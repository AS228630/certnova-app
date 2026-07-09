"use client";

import Link from "next/link";
import { Briefcase, TrendingUp, MapPin, CheckCircle2, Award } from "lucide-react";
import type { CareerPath } from "@/lib/careerPathsData";
import { renderCareerPathIcon } from "@/lib/careerPathIcons";
import { useLocale } from "@/components/LocaleProvider";

export default function CareerPathDetail({ path }: { path: CareerPath }) {
  const { t } = useLocale();

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
            {renderCareerPathIcon(path.icon, 26)}
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-bold text-warning">
                {t("learningPaths.highDemand")}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-text sm:text-xl">{path.title}</h2>
            <p className="text-sm text-text-muted">
              {t("learningPaths.detailIntro").replace("{title}", path.title)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-5 sm:grid-cols-4">
        <Stat icon={TrendingUp} label={t("learningPaths.entrySalary")} value={path.entrySalary} />
        <Stat icon={Briefcase} label={t("learningPaths.openJobs")} value={path.openJobs} />
        <Stat icon={MapPin} label={t("learningPaths.topCity")} value={path.topCity} />
        <Stat icon={Award} label={t("learningPaths.level")} value={t(`learningPaths.level${path.level}`)} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-bold text-text">{t("learningPaths.keySkills")}</h3>
          <ul className="space-y-2">
            {path.skills.map((skill) => (
              <li key={skill} className="flex items-start gap-2 text-sm text-text-muted">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-success" />
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-bold text-text">{t("learningPaths.recommendedCerts")}</h3>
          <ul className="space-y-2">
            {path.recommendedCerts.map((cert) =>
              cert.link ? (
                <li key={cert.code}>
                  <Link
                    href={`/certifications/${cert.link.companySlug}/${cert.link.certId}`}
                    className="flex items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-sm font-medium text-text transition-colors hover:border-primary/40 hover:bg-panel-alt"
                  >
                    <Award size={14} className="shrink-0 text-primary" />
                    {cert.code}
                  </Link>
                </li>
              ) : (
                <li
                  key={cert.code}
                  className="flex items-center gap-2 rounded-lg border border-dashed border-border-soft px-3 py-2 text-sm font-medium text-text-muted"
                >
                  <Award size={14} className="shrink-0 text-text-faint" />
                  {cert.code}
                </li>
              )
            )}
          </ul>

          <h3 className="mb-3 mt-5 text-sm font-bold text-text">{t("learningPaths.careerRoadmap")}</h3>
          <ol className="space-y-3">
            {path.roadmap.map((step, i) => (
              <li key={step.phase} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-[10px] font-bold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-text">{step.phase}</p>
                  <p className="text-xs text-text-faint">{step.duration}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-border-soft pt-5">
        <button className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
          {t("learningPaths.selectThisPath")}
        </button>
        <button className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-bold text-text hover:bg-panel-alt">
          {t("learningPaths.previewPath")}
        </button>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof TrendingUp; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-panel-alt text-primary">
        <Icon size={15} />
      </div>
      <div>
        <p className="text-sm font-bold text-text">{value}</p>
        <p className="text-[10px] text-text-faint">{label}</p>
      </div>
    </div>
  );
}
