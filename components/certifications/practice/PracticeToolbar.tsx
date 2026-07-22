"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";

// Just the breadcrumb now. Mischen/Notizen (and the section stats card)
// moved to the bottom of the page, below the AI coach panel, to declutter
// the top of the page — it was colliding visually with the floating stats
// card and the Abschnitt/progress row right below it.
export default function PracticeToolbar({
  companyName,
  companySlug,
  certCode,
  certTitle,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certTitle: string;
}) {
  const { t } = useLocale();

  return (
    <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
      <Link href="/certifications" className="hover:text-primary">
        {t("nav.certifications")}
      </Link>
      <span>/</span>
      <Link href={`/certifications/${companySlug}`} className="hover:text-primary">
        {companyName}
      </Link>
      <span>/</span>
      <Link href={`/certifications/${companySlug}/${certCode.toLowerCase()}`} className="hover:text-primary">
        {certCode}: {certTitle}
      </Link>
      <span>/</span>
      <span className="text-text">{t("practice.practiceExam")}</span>
    </div>
  );
}
