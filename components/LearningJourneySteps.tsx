"use client";

import {
  GraduationCap,
  FlaskConical,
  ClipboardCheck,
  Trophy,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

type Step = {
  step: number;
  icon: LucideIcon;
  titleKey: string;
  subtitleKey: string;
  progress: number;
  colorClass: string;
  metaKey: string;
  hintKey: string;
  ctaKey: string;
};

const STEPS: Step[] = [
  {
    step: 1,
    icon: GraduationCap,
    titleKey: "learningPaths.stepLearnTitle",
    subtitleKey: "learningPaths.stepLearnSubtitle",
    progress: 0,
    colorClass: "text-primary bg-primary-light",
    metaKey: "learningPaths.stepLearnMeta",
    hintKey: "learningPaths.stepLearnHint",
    ctaKey: "learningPaths.stepLearnCta",
  },
  {
    step: 2,
    icon: FlaskConical,
    titleKey: "learningPaths.stepLabsTitle",
    subtitleKey: "learningPaths.stepLabsSubtitle",
    progress: 0,
    colorClass: "text-primary bg-primary-light",
    metaKey: "learningPaths.stepLabsMeta",
    hintKey: "learningPaths.stepLabsHint",
    ctaKey: "learningPaths.stepLabsCta",
  },
  {
    step: 3,
    icon: ClipboardCheck,
    titleKey: "learningPaths.stepExamTitle",
    subtitleKey: "learningPaths.stepExamSubtitle",
    progress: 0,
    colorClass: "text-success bg-success-light",
    metaKey: "learningPaths.stepExamMeta",
    hintKey: "learningPaths.stepExamHint",
    ctaKey: "learningPaths.stepExamCta",
  },
  {
    step: 4,
    icon: Trophy,
    titleKey: "learningPaths.stepCertTitle",
    subtitleKey: "learningPaths.stepCertSubtitle",
    progress: 0,
    colorClass: "text-warning bg-warning/15",
    metaKey: "learningPaths.stepCertMeta",
    hintKey: "learningPaths.stepCertHint",
    ctaKey: "learningPaths.stepCertCta",
  },
  {
    step: 5,
    icon: Users,
    titleKey: "learningPaths.stepInterviewTitle",
    subtitleKey: "learningPaths.stepInterviewSubtitle",
    progress: 0,
    colorClass: "text-primary bg-primary-light",
    metaKey: "learningPaths.stepInterviewMeta",
    hintKey: "learningPaths.stepInterviewHint",
    ctaKey: "learningPaths.stepInterviewCta",
  },
  {
    step: 6,
    icon: Briefcase,
    titleKey: "learningPaths.stepJobTitle",
    subtitleKey: "learningPaths.stepJobSubtitle",
    progress: 0,
    colorClass: "text-success bg-success-light",
    metaKey: "learningPaths.stepJobMeta",
    hintKey: "learningPaths.stepJobHint",
    ctaKey: "learningPaths.stepJobCta",
  },
];

export default function LearningJourneySteps() {
  const { t } = useLocale();

  return (
    <div>
      {/* Step tracker */}
      <div className="no-scrollbar mb-5 flex items-center gap-2 overflow-x-auto pb-1">
        {STEPS.map((s, i) => (
          <div key={s.step} className="flex shrink-0 items-center gap-2">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${s.colorClass}`}
              >
                {s.step}
              </div>
              <span className="max-w-[70px] text-center text-[10px] leading-tight text-text-faint">
                {t(s.titleKey)}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="h-px w-6 shrink-0 bg-border-soft sm:w-10" />}
          </div>
        ))}
      </div>

      {/* Step cards */}
      <div className="space-y-4">
        {STEPS.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.step}
              className="rounded-xl border border-border-soft bg-panel p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.colorClass}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text">
                      {s.step}. {t(s.titleKey)} — {t(s.subtitleKey)}
                    </p>
                    <p className="mt-0.5 text-xs text-text-faint">{t(s.metaKey)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:w-56 sm:shrink-0">
                  <div className="flex-1">
                    <div className="h-1.5 w-full rounded-full bg-panel-alt">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 text-[11px] text-text-faint">{s.progress}% {t("learningPaths.completed")}</p>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border-soft pt-3">
                <p className="text-xs text-text-faint">{t(s.hintKey)}</p>
                <button className="flex items-center gap-1 text-xs font-bold text-primary">
                  {t(s.ctaKey)}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
