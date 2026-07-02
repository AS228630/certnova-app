import Link from "next/link";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Company } from "@/lib/companiesData";

export default function CompanyCard({ company, active = false }: { company: Company; active?: boolean }) {
  return (
    <Link
      href={`/certifications/${company.slug}`}
      className={`group relative flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-colors ${
        active
          ? "border-primary bg-primary-light"
          : "border-border-soft bg-panel hover:border-primary/40 hover:bg-panel-alt"
      }`}
    >
      {active && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">
          ✓
        </span>
      )}
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-panel-alt">
        {getCompanyIcon(company.slug, 26)}
      </div>
      <p className="text-sm font-semibold text-text">{company.name}</p>
      <p className="text-xs text-text-faint">{company.certCount} Zertifizierungen</p>
    </Link>
  );
}
