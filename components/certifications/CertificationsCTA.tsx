"use client";

import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const stats = [
  { value: "128.420+", labelKey: "certList.ctaActiveLearners" },
  { value: "54.000+", labelKey: "certList.ctaCertsEarned" },
  { value: "92", labelKey: "certList.ctaCountries" },
  { value: "4,9/5", labelKey: "certList.ctaAvgRating" },
  { value: "2,4 Mio.", labelKey: "certList.ctaAiSessions" },
];

export default function CertificationsCTA() {
  const { t } = useLocale();
  return (
    <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-white/15">
          <Gift size={20} className="text-white" />
        </div>
        <div>
          <p className="text-lg font-extrabold text-white">{t("certList.ctaTitle")}</p>
          <p className="text-sm text-white/70">
            {t("certList.ctaDesc")}
          </p>
        </div>
      </div>

      <Link
        href="/register"
        className="flex flex-none items-center justify-center gap-1.5 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary-dark hover:bg-white/90"
      >
        {t("certList.ctaButton")} <ArrowRight size={15} />
      </Link>

      <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-4 text-center sm:grid-cols-5 md:border-t-0 md:border-l md:pl-6 md:pt-0">
        {stats.map((s) => (
          <div key={s.labelKey}>
            <p className="text-sm font-extrabold text-white">{s.value}</p>
            <p className="text-[11px] text-white/70">{t(s.labelKey)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
