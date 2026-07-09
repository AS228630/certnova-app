"use client";

import Link from "next/link";
import { ChevronLeft, Clock3, Power, Monitor, ShieldCheck, RotateCcw, CheckCircle2, ListChecks } from "lucide-react";
import type { Lab } from "@/lib/labsData";
import { useLocale } from "@/components/LocaleProvider";

const TAG_ICON: Record<string, typeof Monitor> = {
  "Online-Lab": Monitor,
  "Sichere Umgebung": ShieldCheck,
  "Reset möglich": RotateCcw,
  "Auto-Validierung": CheckCircle2,
  "Schritt-für-Schritt-Anleitung": ListChecks,
};

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-danger/10 text-danger",
};

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function LabHeader({
  companyName,
  companySlug,
  certCode,
  certId,
  lab,
  remainingSeconds,
  onEnd,
  compact = false,
}: {
  companyName: string;
  companySlug: string;
  certCode: string;
  certId: string;
  lab: Lab;
  remainingSeconds: number;
  onEnd: () => void;
  compact?: boolean;
}) {
  const { t } = useLocale();
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-soft bg-panel px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2 text-sm">
          <Link
            href={`/certifications/${companySlug}/${certId}`}
            className="text-text-muted hover:text-text"
            aria-label={t("journey.back")}
          >
            <ChevronLeft size={16} />
          </Link>
          <span className="truncate font-bold text-text">{lab.title}</span>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${LEVEL_STYLES[lab.level]}`}>
            {lab.level}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-sm font-bold text-text">
            <Clock3 size={13} className="text-text-muted" />
            {formatTime(remainingSeconds)}
          </span>
          <button
            onClick={onEnd}
            className="flex items-center gap-1.5 rounded-lg border border-danger/40 px-2.5 py-1.5 text-xs font-bold text-danger hover:bg-danger/10"
          >
            <Power size={13} />
            {t("labs.endLab")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
        <Link href={`/certifications/${companySlug}/${certId}`} className="text-text-muted hover:text-text" aria-label={t("journey.back")}>
          <ChevronLeft size={16} />
        </Link>
        <span>{t("labs.labsBreadcrumb")}</span>
        <span>/</span>
        <Link href={`/certifications/${companySlug}`} className="hover:text-primary">
          {companyName}
        </Link>
        <span>/</span>
        <Link href={`/certifications/${companySlug}/${certId}`} className="hover:text-primary">
          {certCode}
        </Link>
        <span>/</span>
        <span className="text-text">{lab.title}</span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">{lab.title}</h1>
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${LEVEL_STYLES[lab.level]}`}>{lab.level}</span>
            <span className="flex items-center gap-1 text-xs text-text-muted">
              <Clock3 size={13} />
              {lab.durationLabel}
            </span>
          </div>
          <p className="mt-1.5 max-w-2xl text-sm text-text-muted">{lab.description}</p>

          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-text-faint">
            {lab.tags.map((tag) => {
              const Icon = TAG_ICON[tag] ?? CheckCircle2;
              return (
                <span key={tag} className="flex items-center gap-1.5">
                  <Icon size={12} />
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        <div className="flex flex-none items-center gap-3 rounded-xl border border-border-soft bg-panel p-3">
          <div>
            <p className="text-[11px] text-text-muted">{t("labs.remainingTimeL")}</p>
            <p className="font-mono text-lg font-bold text-text">{formatTime(remainingSeconds)}</p>
          </div>
          <button
            onClick={onEnd}
            className="flex items-center gap-1.5 rounded-lg border border-danger/40 px-3 py-2 text-xs font-bold text-danger hover:bg-danger/10"
          >
            <Power size={13} />
            {t("labs.endLab")}
          </button>
        </div>
      </div>
    </div>
  );
}
