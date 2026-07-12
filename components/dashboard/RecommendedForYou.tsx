"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { companies } from "@/lib/companiesData";
import { getVendorIcon } from "@/lib/vendorIcons";

// "Recommended" here means real catalog content the user hasn't started
// yet (progress is 0 or missing) — not a personalization algorithm we
// don't have, and not fabricated stats. This matches the project's
// "catalog-level stats are the one honest exception" rule: cert ratings
// and levels shown here are real catalog metadata, clearly about the
// content rather than the user's own progress.
export default function RecommendedForYou() {
  const progressMap = useCertProgressStore((s) => s.progressMap);

  const notStarted = companies
    .flatMap((company) => company.certs.map((cert) => ({ company, cert })))
    .filter(({ cert }) => !cert.locked && (progressMap[cert.id] ?? 0) === 0)
    .slice(0, 4);

  if (notStarted.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {notStarted.map(({ company, cert }) => (
        <Link
          key={cert.id}
          href={`/certifications/${company.slug}/${cert.id}`}
          className="rounded-xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-lg">{getVendorIcon(company.name, 20)}</span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-text-faint">
              <Star size={11} className="fill-warning text-warning" />
              {company.rating.toFixed(1)}
            </span>
          </div>
          <p className="mb-1 text-sm font-bold leading-snug text-text">{cert.title}</p>
          <p className="text-[11px] text-text-faint">{cert.level}</p>
        </Link>
      ))}
    </div>
  );
}
