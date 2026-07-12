"use client";

import { useState } from "react";
import { Wallet, CalendarDays, Crown, Gift, ChevronDown, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export type PlanId = "free" | "monthly" | "yearly" | "enterprise";

function usePlans() {
  const { t } = useLocale();
  return [
    {
      id: "free" as PlanId,
      icon: Wallet,
      iconClass: "bg-white/10 text-text",
      name: t("upgrade.planFreeName"),
      tag: t("upgrade.planFreeTag"),
      price: "€0",
      period: "",
      features: [
        t("upgrade.planFreeFeature1"),
        t("upgrade.planFreeFeature2"),
        t("upgrade.planFreeFeature3"),
        t("upgrade.planFreeFeature4"),
        t("upgrade.planFreeFeature5"),
      ],
      cta: t("upgrade.currentPlan"),
      disabled: true,
      featured: false,
    },
    {
      id: "monthly" as PlanId,
      icon: CalendarDays,
      iconClass: "bg-primary-light text-primary",
      name: t("upgrade.planMonthlyName"),
      tag: t("upgrade.planMonthlyTag"),
      price: "€19",
      period: "Monat",
      features: [
        t("upgrade.planMonthlyFeature1"),
        t("upgrade.planMonthlyFeature2"),
        t("upgrade.planMonthlyFeature3"),
        t("upgrade.planMonthlyFeature4"),
        t("upgrade.planMonthlyFeature5"),
      ],
      cta: t("upgrade.selectPlan"),
      disabled: false,
      featured: false,
    },
    {
      id: "yearly" as PlanId,
      icon: Crown,
      iconClass: "bg-primary text-white",
      name: t("upgrade.planYearlyName"),
      tag: t("upgrade.planYearlyTag"),
      badge: t("upgrade.save40"),
      price: "€159",
      strikePrice: "€228",
      period: "Jahr",
      features: [
        t("upgrade.planYearlyFeature1"),
        t("upgrade.planYearlyFeature2"),
        t("upgrade.planYearlyFeature3"),
        t("upgrade.planYearlyFeature4"),
        t("upgrade.planYearlyFeature5"),
      ],
      cta: t("upgrade.selectPlan"),
      disabled: false,
      featured: true,
    },
    {
      id: "enterprise" as PlanId,
      icon: Gift,
      iconClass: "bg-warning/15 text-warning",
      name: t("upgrade.enterpriseTitle"),
      tag: "Enterprise Plan",
      price: t("upgrade.customPricing"),
      period: "",
      features: [
        t("upgrade.enterpriseFeature1"),
        t("upgrade.enterpriseFeature2"),
        t("upgrade.enterpriseFeature3"),
        t("upgrade.enterpriseFeature4"),
        t("upgrade.enterpriseFeature5"),
      ],
      cta: t("upgrade.learnMore"),
      disabled: false,
      featured: false,
      href: "/business",
    },
  ];
}

export default function PlanSelectionStep({
  onSelectPlan,
}: {
  onSelectPlan: (planId: PlanId, planName: string, planPrice: string) => void;
}) {
  const { t } = useLocale();
  const plans = usePlans();
  const [audience, setAudience] = useState<"private" | "business">("private");
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currencyToast, setCurrencyToast] = useState(false);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-lg border border-border-soft bg-panel p-1">
          <button
            onClick={() => setAudience("private")}
            className={`rounded-md px-4 py-1.5 text-xs font-bold transition-colors ${
              audience === "private" ? "bg-primary text-white" : "text-text-muted"
            }`}
          >
            {t("upgrade.privateUser")}
          </button>
          <button
            onClick={() => setAudience("business")}
            className={`rounded-md px-4 py-1.5 text-xs font-bold transition-colors ${
              audience === "business" ? "bg-primary text-white" : "text-text-muted"
            }`}
          >
            {t("upgrade.business")}
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setCurrencyOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-border-soft bg-panel px-3 py-1.5 text-xs font-semibold text-text"
          >
            {t("upgrade.currency")}: EUR (€)
            <ChevronDown size={13} className={`transition-transform ${currencyOpen ? "rotate-180" : ""}`} />
          </button>
          {currencyOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border border-border-soft bg-panel p-1 shadow-xl">
              <button
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs font-semibold text-text hover:bg-panel-alt"
                onClick={() => setCurrencyOpen(false)}
              >
                EUR (€) <Check size={13} className="text-primary" />
              </button>
              {["USD ($)", "GBP (£)"].map((c) => (
                <button
                  key={c}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-xs text-text-muted hover:bg-panel-alt"
                  onClick={() => {
                    setCurrencyOpen(false);
                    setCurrencyToast(true);
                    setTimeout(() => setCurrencyToast(false), 3500);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {currencyToast && (
        <p className="mb-4 rounded-lg border border-border-soft bg-panel-alt px-3 py-2 text-xs text-text-muted">
          {t("upgrade.currencyComingSoon")}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-2xl border p-5 ${
              plan.featured ? "border-primary bg-primary/5" : "border-border-soft bg-panel"
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-white">
                {t("upgrade.mostPopular")}
              </span>
            )}
            {"badge" in plan && plan.badge && (
              <span className="absolute right-4 top-4 rounded-full bg-success-light px-2 py-0.5 text-[10px] font-bold text-success">
                {plan.badge}
              </span>
            )}

            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${plan.iconClass}`}>
              <plan.icon size={18} />
            </div>
            <p className="text-sm font-bold text-text">{plan.name}</p>
            <p className="text-[11px] text-text-faint">{plan.tag}</p>

            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold text-text">{plan.price}</span>
              {plan.period && <span className="text-xs text-text-faint">/ {plan.period}</span>}
            </div>
            {"strikePrice" in plan && plan.strikePrice && (
              <span className="text-[11px] text-text-faint line-through">statt {plan.strikePrice}</span>
            )}

            <ul className="mt-4 flex-1 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-text-muted">
                  <Check size={13} className="mt-0.5 shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>

            {plan.disabled ? (
              <button
                disabled
                className="mt-5 cursor-not-allowed rounded-lg border border-border-soft px-4 py-2.5 text-center text-sm font-bold text-text-faint"
              >
                {plan.cta}
              </button>
            ) : "href" in plan && plan.href ? (
              <a
                href={plan.href}
                className="mt-5 rounded-lg border border-primary/40 px-4 py-2.5 text-center text-sm font-bold text-primary hover:bg-primary-light"
              >
                {plan.cta}
              </a>
            ) : (
              <button
                onClick={() => onSelectPlan(plan.id, plan.name, plan.period ? `${plan.price} / ${plan.period}` : plan.price)}
                className="mt-5 rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {plan.cta}
              </button>
            )}
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-text-faint">
        {t("upgrade.allPricesInclVat")} · {t("upgrade.cancelAnytime")}
      </p>
    </div>
  );
}
