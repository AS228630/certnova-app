"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

// Replaced the full breadcrumb (Zertifizierungen / Company / Cert /
// Practice Exam) with a single compact "back" link. On a focused exam
// page, users rarely need the full hierarchy — they already know where
// they are — but SOME way back is still required, since the main
// question screen (unlike ExamCompleteScreen) had no other back link.
// This takes a fraction of the vertical space, letting the section
// menu / question grid / question panel start higher on the page.
export default function PracticeToolbar({
  companySlug,
  certCode,
}: {
  companySlug: string;
  certCode: string;
}) {
  const { t } = useLocale();

  return (
    <Link
      href={`/certifications/${companySlug}/${certCode.toLowerCase()}/learn`}
      className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-text-muted hover:text-primary"
    >
      <ChevronLeft size={13} />
      {t("practice.backToPractice")}
    </Link>
  );
}
