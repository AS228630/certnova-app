"use client";

import { useState } from "react";
import Link from "next/link";
import { CreditCard, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { supabase } from "@/lib/supabase/client";
import type { PlanId } from "@/components/upgrade/PlanSelectionStep";

// Redirects to a real Stripe Checkout session — Stripe's own hosted
// payment page (which dynamically shows card, PayPal, or Klarna based
// on what's enabled in the account) rather than a custom card form
// collecting sensitive card data ourselves.
export default function PaymentStep({
  planId,
  planName,
  planPrice,
  onBack,
}: {
  planId: PlanId;
  planName: string;
  planPrice: string;
  onBack: () => void;
}) {
  const { t } = useLocale();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [widerrufConsent, setWiderrufConsent] = useState(false);

  async function handleCheckout() {
    if (planId !== "monthly" && planId !== "yearly") return;
    if (!widerrufConsent) return;
    setLoading(true);
    setError(null);

    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;
    if (!accessToken) {
      setError(t("upgrade.notLoggedIn"));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planId, accessToken, widerrufConsent: true }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        setError(t("upgrade.checkoutError"));
        setLoading(false);
      }
    } catch {
      setError(t("upgrade.checkoutError"));
      setLoading(false);
    }
  }

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

      <h2 className="mb-2 text-lg font-bold text-text">{t("upgrade.readyToPayTitle")}</h2>
      <p className="mb-2 text-sm leading-relaxed text-text-muted">{t("upgrade.readyToPayDesc")}</p>
      <p className="mb-4 flex items-center justify-center gap-1.5 text-xs text-text-faint">
        <ShieldCheck size={13} />
        {t("upgrade.securePaymentNote")}
      </p>

      <label className="mb-6 flex items-start gap-2.5 rounded-xl border border-border-soft bg-panel-alt p-3.5 text-left text-xs leading-relaxed text-text-muted">
        <input
          type="checkbox"
          checked={widerrufConsent}
          onChange={(e) => setWiderrufConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-primary"
        />
        <span>
          {t("upgrade.widerrufConsentText")}{" "}
          <Link href="/widerrufsrecht" target="_blank" className="text-primary hover:underline">
            {t("footer.withdrawal")}
          </Link>
        </span>
      </label>

      {error && <p className="mb-4 text-xs font-medium text-danger">{error}</p>}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-lg border border-border-soft px-4 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt disabled:opacity-60"
        >
          <ArrowLeft size={15} />
          {t("upgrade.backToPlans")}
        </button>
        <button
          onClick={handleCheckout}
          disabled={loading || !widerrufConsent}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60"
        >
          {loading && <Loader2 size={15} className="animate-spin" />}
          {t("upgrade.proceedToPayment")}
        </button>
      </div>
    </div>
  );
}
