"use client";

import { Users, Award, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { REAL_STATS } from "@/lib/realStats";
import { useSubscriptionStore } from "@/lib/store/subscriptionStore";

// Nur echte Plattform-Zahlen aus dem Katalog (UWG) – keine erfundenen Nutzer-/Bewertungszahlen.
const stats = [
  { icon: Award, value: REAL_STATS.certifications, labelKey: "certList.statCertifications2" },
  { icon: Users, value: REAL_STATS.providers, labelKey: "certList.statProviders" },
  { icon: Sparkles, value: REAL_STATS.questions, labelKey: "certList.statExamQuestions" },
];

export default function CtaBanner() {
  const { t } = useLocale();
  // A "become Pro" pitch makes no sense to show someone who already
  // is — same real subscription check as the Sidebar prompt.
  const isPro = useSubscriptionStore((s) => s.isPro);
  if (isPro) return null;

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-border-soft bg-gradient-to-br from-primary/20 via-panel to-fuchsia-500/10 p-6 sm:p-8">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-xl font-extrabold text-text sm:text-2xl">{t("ctaBanner.title")}</h2>
          <p className="mt-2 max-w-md text-sm text-text-muted">{t("ctaBanner.desc")}</p>
        </div>
        <Link
          href="/upgrade"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          {t("ctaBanner.upgradeBtn")}
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-6 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.labelKey} className="flex items-center gap-2">
            <s.icon size={16} className="text-primary" />
            <div>
              <p className="text-sm font-bold text-text">{s.value}</p>
              <p className="text-[10px] text-text-faint">{t(s.labelKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
