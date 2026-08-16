"use client";

import Link from "next/link";
import { CheckCircle2, Lock, Circle } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import type { Lab } from "@/lib/labsData";

/**
 * Fixes the real Audit gap: previously there was no way to reach Lab 2/3
 * of a multi-lab certification (az-104 has 3) from within the product at
 * all — only a direct URL. Purely computed from real, already-available
 * data (the lab list + freeLabsCount + isPro) — no certId branching, no
 * new database read. Renders nothing for the (common) single-lab case,
 * so it never clutters az-900-style certs.
 *
 * Deliberately does NOT show a per-lab "✓ completed" checkmark: the only
 * real completion data available today (certProgressStore's
 * lab_completed) is a single per-certification boolean, not per-lab —
 * showing a checkmark on a specific lab the system doesn't actually know
 * is done would be exactly the fabricated-data problem this project
 * avoids everywhere else. currentLabIndex is highlighted instead, which
 * is real and unambiguous.
 */
export default function LabNavigationPanel({
  companySlug,
  certId,
  labs,
  freeLabsCount,
  isPro,
  currentLabIndex,
}: {
  companySlug: string;
  certId: string;
  labs: Lab[];
  freeLabsCount: number;
  isPro: boolean;
  currentLabIndex: number;
}) {
  const { t } = useLocale();

  if (labs.length <= 1) return null;

  return (
    <nav aria-label={t("labs.navLabel")} className="mb-4 flex flex-wrap gap-2">
      {labs.map((lab, i) => {
        const accessible = isPro || i < freeLabsCount;
        const isCurrent = i === currentLabIndex;
        const href = i === 0 ? `/certifications/${companySlug}/${certId}/labs` : `/certifications/${companySlug}/${certId}/labs/${lab.slug ?? lab.id}`;

        const content = (
          <>
            {accessible ? (
              isCurrent ? (
                <Circle size={13} className="shrink-0 fill-current" />
              ) : (
                <CheckCircle2 size={13} className="shrink-0 opacity-60" />
              )
            ) : (
              <Lock size={13} className="shrink-0" />
            )}
            <span className="truncate">
              {t("labs.labNumberLabel")} {i + 1}
            </span>
          </>
        );

        const baseClass = "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors";

        // Locked labs are still real links (per the audit rule: a
        // locked lab must never be reachable "for free" just because a
        // URL exists, but the URL itself staying reachable is fine and
        // expected — GatedLabStage re-checks isPro/labIndex server-side
        // regardless of how the visitor arrived, so clicking through
        // here always lands on the real Premium gate, never a bypass).
        return (
          <Link
            key={lab.id}
            href={href}
            aria-current={isCurrent ? "page" : undefined}
            className={`${baseClass} ${
              isCurrent
                ? "border-primary bg-primary-light text-primary"
                : accessible
                  ? "border-border-soft text-text-muted hover:border-primary/40 hover:text-text"
                  : "border-border-soft text-text-faint hover:border-warning/40"
            }`}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
