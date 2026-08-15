"use client";

import Link from "next/link";
import { X, Lock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type PremiumGateVariant = "labs" | "practice" | "examSimulation";

/**
 * Shown to a signed-in, non-Premium user when they hit a real paywall
 * (Teil 2+ of the question bank, a locked Lab, or the full exam
 * simulation). Deliberately context-aware per the advisor's spec — the
 * copy names the exact feature the person was just trying to use — but
 * always leads to the single existing Premium checkout (/upgrade), never
 * a separate payment flow per feature. Distinct from GuestSignupModal,
 * which is for logged-out visitors and offers to create a free account
 * instead of a purchase.
 */
export default function PremiumGateModal({
  variant,
  onClose,
}: {
  variant: PremiumGateVariant;
  onClose: () => void;
}) {
  const { t } = useLocale();

  const titleKey =
    variant === "labs" ? "premiumGate.labsTitle" : variant === "practice" ? "premiumGate.practiceTitle" : "premiumGate.examTitle";
  const descKey =
    variant === "labs" ? "premiumGate.labsDesc" : variant === "practice" ? "premiumGate.practiceDesc" : "premiumGate.examDesc";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-sm rounded-2xl border border-border-soft bg-panel p-6 text-center">
        <button onClick={onClose} className="absolute right-4 top-4 text-text-faint hover:text-text" aria-label={t("help.close")}>
          <X size={18} />
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
          <Lock size={22} />
        </div>

        <h3 className="mb-2 text-lg font-extrabold text-text">{t(titleKey)}</h3>
        <p className="mb-6 text-sm leading-relaxed text-text-muted">{t(descKey)}</p>

        <Link
          href="/upgrade"
          className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark"
        >
          {t("premiumGate.cta")}
          <ArrowRight size={14} />
        </Link>

        <button onClick={onClose} className="w-full text-sm font-medium text-text-faint hover:text-text">
          {t("premiumGate.laterCta")}
        </button>
      </div>
    </div>
  );
}
