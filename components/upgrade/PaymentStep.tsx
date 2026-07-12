"use client";

import { CreditCard, LifeBuoy, ArrowLeft } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Deliberately does NOT render a fake credit-card form. Collecting card
// details in a form with no real payment processor behind it would be
// actively misleading (and unsafe — people could type in a real card
// number thinking it's being charged). Instead this is an honest
// "not built yet" screen: the chosen plan is shown for context, nothing
// is charged, and the only actions are going back or contacting support.
export default function PaymentStep({
  planName,
  planPrice,
  onBack,
}: {
  planName: string;
  planPrice: string;
  onBack: () => void;
}) {
  const { t } = useLocale();

  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-border-soft bg-panel p-6 text-center sm:p-8">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary">
        <CreditCard size={24} />
      </div>

      <div className="mb-5 rounded-xl border border-border-soft bg-panel-alt px-4 py-3">
        <p className="text-[11px] text-text-faint">{t("upgrade.selectedPlan")}</p>
        <p className="text-sm font-bold text-text">
          {planName} · {planPrice}
        </p>
      </div>

      <h2 className="mb-2 text-lg font-bold text-text">{t("upgrade.paymentNotAvailableTitle")}</h2>
      <p className="mb-6 text-sm leading-relaxed text-text-muted">{t("upgrade.paymentNotAvailableDesc")}</p>

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
        >
          <ArrowLeft size={15} />
          {t("upgrade.backToPlans")}
        </button>
        <a
          href="/help"
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
        >
          <LifeBuoy size={15} />
          {t("upgrade.contactSupport")}
        </a>
      </div>
    </div>
  );
}
