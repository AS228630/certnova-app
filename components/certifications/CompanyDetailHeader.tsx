"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { getCompanyIcon } from "@/lib/vendorIcons";

export default function CompanyDetailHeader({
  companySlug,
  companyName,
  certCount,
}: {
  companySlug: string;
  companyName: string;
  certCount: number;
}) {
  const { t } = useLocale();
  return (
    <>
      <div className="mb-4 flex items-center gap-1 text-sm text-text-muted">
        <Link href="/certifications" className="hover:text-primary">
          {t("nav.certifications")}
        </Link>
        <span>/</span>
        <span className="font-semibold text-primary">{companyName}</span>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-panel-alt">
          {getCompanyIcon(companySlug, 30)}
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-text sm:text-2xl">{companyName}</h1>
          <p className="text-sm text-text-muted">
            {certCount} {t("certList.certsAvailable")}
          </p>
        </div>
      </div>
    </>
  );
}
