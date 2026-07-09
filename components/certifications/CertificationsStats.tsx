"use client";

import { Award, Briefcase, HelpCircle, ShieldCheck, Star } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const stats = [
  { icon: Award, value: "150+", labelKey: "certList.statCertifications2" },
  { icon: Briefcase, value: "25+", labelKey: "certList.statProviders" },
  { icon: HelpCircle, value: "4.000+", labelKey: "certList.statExamQuestions" },
  { icon: ShieldCheck, value: "98%", labelKey: "certList.statPassRate" },
  { icon: Star, value: "4.9/5", labelKey: "certList.statRating" },
];

export default function CertificationsStats() {
  const { t } = useLocale();
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:grid-cols-5">
      {stats.map((s) => (
        <div key={s.labelKey} className="flex items-center gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-primary-light">
            <s.icon size={17} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-text">{s.value}</p>
            <p className="text-[11px] text-text-muted">{t(s.labelKey)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
