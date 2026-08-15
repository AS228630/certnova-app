"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Lock, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type PremiumGateVariant = "labs" | "practice" | "examSimulation";

/**
 * Shown to a signed-in, non-Premium user when they hit a real paywall
 * (Teil 2+ of the question bank, a locked Lab, or the full exam
 * simulation). Per the advisor's explicit Option B decision: Labs,
 * Practice, and Exam Simulation are NOT separate paid add-ons — they are
 * all already included in the one €19/month Premium plan, so this modal
 * always frames it that way ("X ist in Premium enthalten") and links to
 * the single existing Premium checkout, never a separate payment flow
 * per feature. Passes the current page as ?returnTo= so a successful
 * purchase can resume exactly here afterward instead of dropping the
 * person on the Dashboard.
 */
export default function PremiumGateModal({
  variant,
  onClose,
}: {
  variant: PremiumGateVariant;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const pathname = usePathname();

  const titleKey =
    variant === "labs" ? "premiumGate.labsTitle" : variant === "practice" ? "premiumGate.practiceTitle" : "premiumGate.examTitle";
  const descKey =
    variant === "labs" ? "premiumGate.labsDesc" : variant === "practice" ? "premiumGate.practiceDesc" : "premiumGate.examDesc";

  const upgradeHref = `/upgrade?returnTo=${encodeURIComponent(pathname ?? "/dashboard")}`;

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
        <p className="mb-1 text-sm leading-relaxed text-text-muted">{t(descKey)}</p>
        <p className="mb-6 text-sm font-semibold text-primary">{t("premiumGate.includedInPremium")}</p>

        <Link
          href={upgradeHref}
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
