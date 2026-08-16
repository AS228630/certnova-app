"use client";

import { useState } from "react";
import Link from "next/link";
import { PartyPopper, CheckCircle2, XCircle, Lock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { getResultStatus } from "@/components/completion/PracticeCompletionState";
import FreeRegistrationGate from "@/components/registration/FreeRegistrationGate";

/**
 * Shown after a non-Premium user (Guest or Free) finishes the free
 * 10-question Exam Simulation preview. Deliberately distinct from
 * PracticeCompletionState (a different feature, different free limit,
 * different messaging) and — critically — never says "Prüfung
 * bestanden"/"passed": only 10 of the real exam's full question count
 * were shown, so a pass/fail verdict on that subset would be
 * misleading. Says "free preview completed" instead, always.
 *
 * Per the Stage 5 spec, the unlock CTA branches on isGuest: a true
 * Guest sees the shared FreeRegistrationGate first (they don't have an
 * account yet), a signed-in Free user goes straight to the real
 * Premium/Checkout flow.
 */
export default function ExamPreviewCompletion({
  freeQuestionLimit,
  correct,
  isGuest,
  upgradeHref,
  returnTo,
}: {
  freeQuestionLimit: number;
  correct: number;
  isGuest: boolean;
  upgradeHref: string;
  returnTo: string;
}) {
  const { t } = useLocale();
  const [showRegistrationGate, setShowRegistrationGate] = useState(false);
  const wrong = freeQuestionLimit - correct;
  const scorePercent = freeQuestionLimit === 0 ? 0 : Math.round((correct / freeQuestionLimit) * 100);
  const status = getResultStatus(scorePercent);
  const ringColorClass = status === "good" ? "text-success" : status === "medium" ? "text-warning" : "text-danger";

  return (
    <div className="mx-auto w-full max-w-[680px]">
      <div className="rounded-2xl border border-border-soft bg-panel p-6 sm:p-8">
        <div className="mx-auto mb-5 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-warning/30 to-warning/10 shadow-[0_0_50px_rgba(245,158,11,0.25)]">
          <PartyPopper size={64} className="text-warning" aria-hidden="true" />
        </div>

        <p className="text-center text-xl font-extrabold text-text">🎉 {t("mockExam.previewCompleteTitle")}</p>
        <p className="mx-auto mt-1 max-w-sm text-center text-sm text-text-muted">
          {t("mockExam.previewCompleteDesc").replace("{count}", String(freeQuestionLimit))}
        </p>

        <div className="mt-6 rounded-xl border border-border-soft bg-panel-alt p-5">
          <div className="flex items-center justify-center gap-6">
            <p className={`text-3xl font-extrabold ${ringColorClass}`}>{scorePercent}%</p>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-success">
                <CheckCircle2 size={15} />
                {correct}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-danger">
                <XCircle size={15} />
                {wrong}
              </span>
            </div>
          </div>
          <p className="mt-2 text-center text-xs text-text-faint">
            {correct} / {freeQuestionLimit} {t("mockExam.previewOfLabel")}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-5 text-center">
          <Lock size={20} className="mx-auto mb-2 text-warning" />
          <p className="text-sm font-bold text-text">{t("mockExam.unlockFullTitle")}</p>
          <ul className="mx-auto mt-2 max-w-xs space-y-1 text-left text-xs text-text-muted">
            <li>• {t("mockExam.unlockFeature1")}</li>
            <li>• {t("mockExam.unlockFeature2")}</li>
            <li>• {t("mockExam.unlockFeature3")}</li>
            <li>• {t("mockExam.unlockFeature4")}</li>
          </ul>
          {isGuest ? (
            <button
              onClick={() => setShowRegistrationGate(true)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("registrationGate.registerCta")}
              <ArrowRight size={14} />
            </button>
          ) : (
            <Link
              href={upgradeHref}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("premiumGate.cta")}
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </div>
      {showRegistrationGate && (
        <FreeRegistrationGate returnTo={returnTo} onClose={() => setShowRegistrationGate(false)} />
      )}
    </div>
  );
}
