"use client";

import { Award, Briefcase, HelpCircle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import { REAL_STATS } from "@/lib/realStats";

const stats = [
  // nur echte Zahlen aus dem Katalog (UWG)
  { icon: Award, value: REAL_STATS.certifications, labelKey: "certList.statCertifications2" },
  { icon: Briefcase, value: REAL_STATS.providers, labelKey: "certList.statProviders" },
  { icon: HelpCircle, value: REAL_STATS.questions, labelKey: "certList.statExamQuestions" },
];

export default function CertificationsStats() {
  const { t } = useLocale();
  return (
    <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:grid-cols-3">
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
