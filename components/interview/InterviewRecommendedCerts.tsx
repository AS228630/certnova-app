"use client";

import Link from "next/link";
import { Award } from "lucide-react";
import type { CareerPath } from "@/lib/careerPathsData";
import { useLocale } from "@/components/LocaleProvider";

export default function InterviewRecommendedCerts({ path }: { path: CareerPath }) {
  const { t } = useLocale();

  return (
    <section>
      <h2 className="mb-1 font-bold text-text">
        {t("interview.step2Title")} {path.title}
      </h2>
      <p className="mb-4 text-sm text-text-muted">{t("interview.step2Subtitle")}</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {path.recommendedCerts.map((cert) =>
          cert.link ? (
            <Link
              key={cert.code}
              href={`/certifications/${cert.link.companySlug}/${cert.link.certId}`}
              className="flex flex-col gap-2 rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
            >
              <Award size={18} className="text-primary" />
              <p className="text-sm font-bold leading-snug text-text">{cert.code}</p>
              <span className="text-xs font-semibold text-success">{t("interview.recommended")}</span>
            </Link>
          ) : (
            <div
              key={cert.code}
              className="flex flex-col gap-2 rounded-xl border border-dashed border-border-soft p-4"
            >
              <Award size={18} className="text-text-faint" />
              <p className="text-sm font-bold leading-snug text-text-muted">{cert.code}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
