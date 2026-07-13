"use client";

import Link from "next/link";
import { Rocket, ArrowRight, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function FinalCta() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-br from-primary via-primary to-fuchsia-600 p-8 text-center sm:p-12">
        <Rocket size={32} className="text-white" />
        <div>
          <h2 className="text-xl font-extrabold text-white sm:text-2xl">{t("lpLanding.finalCtaTitle")}</h2>
          <p className="mt-2 text-sm text-white/85">{t("lpLanding.finalCtaDesc")}</p>
        </div>
        <Link
          href="/register"
          className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90"
        >
          {t("lpLanding.ctaStartFree")}
          <ArrowRight size={16} />
        </Link>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
          {["finalCtaPoint1", "finalCtaPoint2", "finalCtaPoint3"].map((k) => (
            <span key={k} className="flex items-center gap-1.5 text-xs font-medium text-white/85">
              <Check size={13} />
              {t(`lpLanding.${k}`)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
