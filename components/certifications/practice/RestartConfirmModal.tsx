"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function RestartConfirmModal({
  onConfirm,
  onCancel,
  loading,
  title,
  body,
  confirmLabel,
  danger = true,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
  /** Overrides the default "restart whole exam" copy — used when this
   * modal is reused for a single-section Wiederholen/Gemischt wiederholen
   * confirmation instead. */
  title?: string;
  body?: string;
  confirmLabel?: string;
  /** The whole-exam restart is a bigger, more destructive action than a
   * single-section retry, so it keeps the red/danger styling by default;
   * section-level retries use the neutral primary color instead. */
  danger?: boolean;
}) {
  const { t } = useLocale();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="restart-confirm-title"
      >
        <div
          className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
            danger ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
          }`}
        >
          {danger ? <TriangleAlert size={22} /> : <RotateCcw size={22} />}
        </div>
        <h3 id="restart-confirm-title" className="mt-4 text-center text-lg font-bold text-text">{title ?? t("practice.restartConfirmTitle")}</h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-text-muted">{body ?? t("practice.restartConfirmBody")}</p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-lg border border-border-soft py-2.5 text-sm font-semibold text-text hover:bg-panel-alt disabled:opacity-50"
          >
            {t("practice.restartCancel")}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60 ${
              danger ? "bg-danger" : "bg-primary"
            }`}
          >
            <RotateCcw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? t("practice.restartInProgress") : (confirmLabel ?? t("practice.restartConfirmYes"))}
          </button>
        </div>
      </div>
    </div>
  );
}
