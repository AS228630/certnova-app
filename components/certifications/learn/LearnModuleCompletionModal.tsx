"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PartyPopper, X } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

/**
 * Shown once when a Learn module transitions from incomplete to fully
 * complete. Unlike PracticeCompletionState/ExamPreviewCompletion, this
 * NEVER shows a Premium gate — Learn is entirely free by product
 * decision, so pushing an upgrade here would contradict that. Just
 * congratulates and offers "next module" or "back to dashboard".
 */
export default function LearnModuleCompletionModal({
  moduleTitle,
  hasNextModule,
  onGoToNextModule,
  onClose,
}: {
  moduleTitle: string;
  hasNextModule: boolean;
  onGoToNextModule: () => void;
  onClose: () => void;
}) {
  const { t } = useLocale();

  // Accessibility (advisor spec item 17): Escape closes the modal, same
  // as the visible X button — this is the one genuine overlay/modal
  // among the three new completion components (Practice/Exam's are
  // inline page content, not floating over anything, so Escape isn't
  // applicable there the same way).
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-text-faint hover:text-text" aria-label={t("help.close")}>
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-success/30 to-success/10 shadow-[0_0_30px_rgba(34,197,94,0.25)]">
          <PartyPopper size={28} className="text-success" aria-hidden="true" />
        </div>

        <p className="text-lg font-extrabold text-text">🎉 {t("learn.moduleCompleteTitle")}</p>
        <p className="mt-1 text-sm text-text-muted">
          {t("learn.moduleCompleteDesc").replace("{module}", moduleTitle)}
        </p>

        <div className="mt-6 space-y-2.5">
          {hasNextModule && (
            <button
              onClick={onGoToNextModule}
              className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("learn.nextModuleCta")}
            </button>
          )}
          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center rounded-lg border border-border-soft px-4 py-3 text-sm font-bold text-text hover:bg-panel-alt"
          >
            {t("learn.toDashboardCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
