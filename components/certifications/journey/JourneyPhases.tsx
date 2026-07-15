"use client";

import { ArrowRight, CheckCircle2, Lock, Clock3 } from "lucide-react";
import { Fragment, useEffect } from "react";
import Link from "next/link";
import type { JourneyPhase } from "@/lib/journeyData";
import ProgressRing from "./ProgressRing";
import PhaseIllustration from "./PhaseIllustration";
import { useUser } from "@/components/UserContext";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { getLearnTrack } from "@/lib/learnData";
import { useLocale } from "@/components/LocaleProvider";

const RING_COLORS: Record<JourneyPhase["key"], string> = {
  lernen: "#6d4cff",
  labore: "#22c55e",
  pruefung: "#a855f7",
};

function PhaseCard({ phase, href }: { phase: JourneyPhase; href?: string }) {
  const { t } = useLocale();
  const isReady = phase.unlocked && !!href;

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
          {phase.step}
        </span>
        <div>
          <p className="text-sm font-bold text-text">{phase.title}</p>
          <p className="text-[11px] text-text-faint">{phase.subtitle}</p>
        </div>
      </div>

      <PhaseIllustration phaseKey={phase.key} />

      <div className="my-4 flex justify-center">
        <ProgressRing value={phase.completion} size={72} stroke={6} color={RING_COLORS[phase.key]} label={t("journey.completed")} />
      </div>

      <div className="mb-4 space-y-2 text-xs text-text-muted">
        {phase.stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              {s.isTime ? (
                <Clock3 size={12} className="text-text-faint" />
              ) : s.done >= s.total ? (
                <CheckCircle2 size={12} className="text-success" />
              ) : (
                <span className="h-3 w-3 rounded-full border border-text-faint" />
              )}
              {s.label}
            </span>
            <span className="font-semibold text-text">{s.isTime ? `${s.done}h` : `${s.done} / ${s.total}`}</span>
          </div>
        ))}
      </div>

      {isReady ? (
        <Link
          href={href}
          className="mb-3 block w-full rounded-lg border border-primary/40 py-2 text-center text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          {phase.cta}
        </Link>
      ) : (
        <button
          disabled
          className="mb-3 w-full cursor-not-allowed rounded-lg border border-border-soft py-2 text-xs font-bold text-text-faint"
        >
          {phase.cta}
        </button>
      )}

      {isReady ? (
        <span className="flex items-center justify-center gap-1.5 rounded-lg bg-success-light py-1.5 text-[11px] font-semibold text-success">
          <CheckCircle2 size={12} /> {t("journey.available")}
        </span>
      ) : !phase.unlocked ? (
        <span className="flex items-center justify-center gap-1.5 rounded-lg bg-panel-alt py-1.5 text-center text-[11px] font-semibold text-text-faint">
          <Lock size={11} /> {phase.unlockHint}
        </span>
      ) : (
        <span className="flex items-center justify-center gap-1.5 rounded-lg bg-panel-alt py-1.5 text-center text-[11px] font-semibold text-text-faint">
          <Clock3 size={11} /> {t("journey.contentBeingPrepared")}
        </span>
      )}
    </div>
  );
}

export default function JourneyPhases({
  phases,
  companySlug,
  certId,
  certTitle,
}: {
  phases: JourneyPhase[];
  companySlug: string;
  certId: string;
  certTitle: string;
}) {
  const { t, locale } = useLocale();
  const { user } = useUser();
  const completionSet = useLessonCompletionStore((s) => s.completions[certId]);
  const loadForCert = useLessonCompletionStore((s) => s.loadForCert);
  const certDetail = useCertProgressStore((s) => s.getDetail(certId));

  useEffect(() => {
    if (user) loadForCert(user.id, certId);
  }, [user, certId, loadForCert]);

  const realPhases: JourneyPhase[] = phases.map((phase) => {
    if (phase.key === "lernen") {
      const track = getLearnTrack(certId, certTitle, locale);
      const allLessons = track.modules.flatMap((m) => m.lessons);
      const videos = allLessons.filter((l) => l.type === "video");
      const quizzes = allLessons.filter((l) => l.type === "quiz");
      const done = user && completionSet ? completionSet.size : 0;
      const total = allLessons.length;
      const completion = total === 0 ? 0 : Math.round((done / total) * 100);
      const doneVideos = user && completionSet ? videos.filter((v) => completionSet.has(v.id)).length : 0;
      const doneQuizzes = user && completionSet ? quizzes.filter((q) => completionSet.has(q.id)).length : 0;
      const doneModules = track.modules.filter((m) => m.lessons.every((l) => completionSet?.has(l.id))).length;

      return {
        ...phase,
        completion,
        stats: [
          { label: t("journey.modules"), done: doneModules, total: track.modules.length },
          { label: t("journey.videos"), done: doneVideos, total: videos.length },
          { label: t("journey.quiz"), done: doneQuizzes, total: quizzes.length },
        ],
      };
    }

    if (phase.key === "labore") {
      return {
        ...phase,
        completion: certDetail.labCompleted ? 100 : 0,
        stats: [{ label: t("journey.labStatus"), done: certDetail.labCompleted ? 1 : 0, total: 1 }],
      };
    }

    // pruefung
    const answered = certDetail.questionsAnswered;
    const correct = certDetail.questionsCorrect;
    const accuracy = answered === 0 ? 0 : Math.round((correct / answered) * 100);
    return {
      ...phase,
      completion: answered === 0 ? 0 : Math.min(100, Math.round((answered / 20) * 100)),
      stats: [
        { label: t("journey.questionsAnsweredJ"), done: answered, total: Math.max(answered, 1) },
        { label: t("journey.average"), done: accuracy, total: 100 },
      ],
    };
  });

  function destinationFor(phase: JourneyPhase): string | undefined {
    if (phase.key === "lernen") {
      return `/certifications/${companySlug}/${certId}/learn`;
    }
    if (phase.key === "labore") {
      return `/certifications/${companySlug}/${certId}/labs`;
    }
    if (phase.key === "pruefung") {
      return `/certifications/${companySlug}/${certId}/practice`;
    }
    return undefined;
  }

  return (
    <div id="phasen" className="flex flex-1 flex-col items-stretch gap-4 lg:flex-row lg:items-start">
      {realPhases.map((phase, i) => (
        <Fragment key={phase.key}>
          <PhaseCard phase={phase} href={destinationFor(phase)} />
          {i < realPhases.length - 1 && (
            <div className="flex items-center justify-center py-2 lg:py-0 lg:pt-24">
              <ArrowRight size={18} className="rotate-90 text-text-faint lg:rotate-0" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
