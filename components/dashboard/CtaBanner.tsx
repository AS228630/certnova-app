"use client";

import { Users, Award, Globe2, Star, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

// Platform-level marketing stats (not personal user progress) — the one
// honest exception under the project's no-fabricated-data rule, same
// category as the numbers already shown on the public landing page.
const stats = [
  { icon: Users, value: "128.420+", labelKey: "ctaBanner.activeLearners" },
  { icon: Award, value: "54.000+", labelKey: "ctaBanner.certsEarned" },
  { icon: Globe2, value: "92", labelKey: "ctaBanner.countries" },
  { icon: Star, value: "4,9/5", labelKey: "ctaBanner.avgRating" },
  { icon: Sparkles, value: "2,4 Mio.", labelKey: "ctaBanner.aiSessions" },
];

export default function CtaBanner() {
  const { t } = useLocale();
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

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-6 sm:grid-cols-5">
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
