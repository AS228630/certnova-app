"use client";

import { useState } from "react";
import Link from "next/link";
import { Bookmark, Lock } from "lucide-react";
import type { Certification } from "@/lib/companiesData";
import { useUser } from "@/components/UserContext";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useLocale } from "@/components/LocaleProvider";
import CertBadge from "./CertBadge";

const LEVEL_STYLES: Record<Certification["level"], string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-danger/10 text-danger",
};

const LEVEL_LABEL_KEYS: Record<Certification["level"], string> = {
  Beginner: "certList.levelBeginnerShort",
  Intermediate: "certList.levelIntermediateShort",
  Advanced: "certList.levelAdvancedShort",
};

export default function CertCard({ cert, companySlug }: { cert: Certification; companySlug: string }) {
  const { t } = useLocale();
  const [saved, setSaved] = useState(false);
  const { user } = useUser();
  const gated = cert.locked && !user;
  const progress = useCertProgressStore((s) => s.getProgress(cert.id));

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border-soft bg-panel p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between">
        <CertBadge code={cert.code} />
        <button
          onClick={() => setSaved((v) => !v)}
          aria-label={saved ? t("certList.removeFromFavorites") : t("certList.addToFavorites")}
          className="text-text-faint transition-colors hover:text-primary"
        >
          <Bookmark size={18} className={saved ? "fill-primary text-primary" : ""} />
        </button>
      </div>

      <Link href={gated ? "#" : `/certifications/${companySlug}/${cert.id}`} className={gated ? "pointer-events-none" : ""}>
        <h3 className="font-bold leading-snug text-text hover:text-primary">{cert.title}</h3>
        <span
          className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${LEVEL_STYLES[cert.level]}`}
        >
          {t(LEVEL_LABEL_KEYS[cert.level])}
        </span>
        <p className="mt-2 line-clamp-2 text-sm text-text-muted">{cert.description}</p>
      </Link>

      {gated ? (
        <Link
          href="/register"
          className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary-light py-2 text-xs font-bold text-primary transition-colors hover:bg-primary hover:text-white"
        >
          <Lock size={12} />
          Registrieren zum Freischalten
        </Link>
      ) : (
        <Link href={`/certifications/${companySlug}/${cert.id}`}>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-alt">
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-text-faint">
            {progress}% <span className="text-text-faint/80">{t("certList.progressLabel")}</span>
          </p>
        </Link>
      )}
    </div>
  );
}
