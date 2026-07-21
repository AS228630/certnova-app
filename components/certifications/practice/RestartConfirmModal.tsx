"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function RestartConfirmModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const { t } = useLocale();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 text-danger">
          <TriangleAlert size={22} />
        </div>
        <h3 className="mt-4 text-center text-lg font-bold text-text">{t("practice.restartConfirmTitle")}</h3>
        <p className="mt-2 text-center text-sm leading-relaxed text-text-muted">{t("practice.restartConfirmBody")}</p>

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
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-danger py-2.5 text-sm font-bold text-white hover:opacity-90 disabled:opacity-60"
          >
            <RotateCcw size={15} className={loading ? "animate-spin" : ""} />
            {loading ? t("practice.restartInProgress") : t("practice.restartConfirmYes")}
          </button>
        </div>
      </div>
    </div>
  );
}
