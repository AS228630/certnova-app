import Link from "next/link";
import { Star, ArrowUpRight, TrendingUp } from "lucide-react";
import { getCompanyIcon } from "@/lib/vendorIcons";
import type { Company } from "@/lib/companiesData";
import { PROVIDER_HIGHLIGHTS } from "@/lib/providerHighlights";

export default function ProviderCardDetailed({ company }: { company: Company }) {
  const highlight = PROVIDER_HIGHLIGHTS[company.slug];
  const rating = highlight?.rating ?? company.rating;
  const trend = highlight?.trend ?? "5%";
  const description = highlight?.description ?? company.tagline;

  return (
    <Link
      href={`/certifications/${company.slug}`}
      className="group flex flex-col rounded-xl border border-border-soft bg-panel p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-panel-alt">
          {getCompanyIcon(company.slug, 22)}
        </div>
        <div className="min-w-0">
          <p className="truncate font-bold text-text">{company.name}</p>
          <p className="text-xs text-text-faint">{company.totalCertCount} Zertifizierungen</p>
        </div>
      </div>

      <p className="mb-4 flex-1 text-xs text-text-muted">{description}</p>

      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-text">
            <Star size={12} className="fill-warning text-warning" />
            {rating}
          </span>
          <span className="flex items-center gap-1 text-success">
            <TrendingUp size={12} />
            {trend}
          </span>
        </span>
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary-light text-primary transition group-hover:bg-primary group-hover:text-white">
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
