"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, Bookmark, Star, Info } from "lucide-react";
import CertBadge from "../CertBadge";
import ProgressRing from "./ProgressRing";
import type { CertJourney } from "@/lib/journeyData";
import type { Company } from "@/lib/companiesData";
import { useUser } from "@/components/UserContext";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { getLearnTrack } from "@/lib/learnData";

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-danger/10 text-danger",
};

export default function JourneyHeader({ company, journey }: { company: Company; journey: CertJourney }) {
  const [showCalc, setShowCalc] = useState(false);
  const certId = journey.code.toLowerCase();
  const { user } = useUser();
  const realProgress = useCertProgressStore((s) => (user ? s.getProgress(certId) : null));
  const completionSet = useLessonCompletionStore((s) => s.completions[certId]);
  const loadForCert = useLessonCompletionStore((s) => s.loadForCert);

  useEffect(() => {
    if (user) loadForCert(user.id, certId);
  }, [user, certId, loadForCert]);

  const track = getLearnTrack(certId, journey.title);
  const totalLessons = track.modules.flatMap((m) => m.lessons).length;
  const doneLessons = user && completionSet ? completionSet.size : 0;

  const overallProgress = user ? Math.round(realProgress ?? 0) : journey.overallProgress;
  const themesDone = user ? doneLessons : journey.themesDone;
  const themesTotal = user ? totalLessons : journey.themesTotal;

  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm text-text-muted">
        <Link href={`/certifications/${company.slug}`} className="text-text-muted hover:text-text" aria-label="Zurück">
          <ChevronLeft size={18} />
        </Link>
        <Link href="/certifications" className="hover:text-primary">
          Zertifizierungen
        </Link>
        <span>/</span>
        <Link href={`/certifications/${company.slug}`} className="hover:text-primary">
          {company.name}
        </Link>
        <span>/</span>
        <span className="font-semibold text-primary">{journey.code}</span>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        {/* Info card */}
        <div className="flex flex-col gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <CertBadge code={journey.code} size={56} />
            <div>
              <h1 className="text-xl font-extrabold text-text sm:text-2xl">{journey.title}</h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
                <span className={`rounded-full px-2 py-0.5 font-semibold ${LEVEL_STYLES[journey.level]}`}>
                  {journey.level}
                </span>
                <span className="flex items-center gap-1 text-warning">
                  <Star size={12} className="fill-warning" /> {journey.rating.toFixed(1)} ({journey.reviewCount.toLocaleString("de-DE")})
                </span>
                <span>{journey.duration}</span>
              </div>
              <p className="mt-3 max-w-lg text-sm text-text-muted">{journey.longDescription}</p>
            </div>
          </div>
          <button aria-label="Merken" className="self-start text-text-faint hover:text-primary">
            <Bookmark size={18} />
          </button>
        </div>

        {/* Overall progress card */}
        <div className="relative rounded-2xl border border-border-soft bg-panel p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-text-muted">Gesamtfortschritt</p>
            <button
              aria-label="Wie wird der Gesamtfortschritt berechnet?"
              onClick={() => setShowCalc((v) => !v)}
              className="text-text-faint hover:text-primary"
            >
              <Info size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <ProgressRing value={overallProgress} size={64} stroke={6} />
            <div>
              <p className="text-2xl font-extrabold text-text">{overallProgress}%</p>
              <p className="text-[11px] text-text-faint">
                {themesDone} / {themesTotal} Themen abgeschlossen
              </p>
            </div>
          </div>

          <Link
            href="#phasen"
            className="mt-4 block rounded-lg bg-primary py-2 text-center text-sm font-bold text-white hover:bg-primary-dark"
          >
            Weiterlernen
          </Link>

          <Link
            href={`/certifications/${company.slug}/${journey.code.toLowerCase()}/practice`}
            className="mt-2 block rounded-lg border border-primary py-2 text-center text-sm font-bold text-primary hover:bg-primary-light"
          >
            Übungsfragen starten
          </Link>

          {showCalc && (
            <div className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-border-soft bg-panel-alt p-4 shadow-xl sm:left-0 sm:right-auto">
              <p className="mb-3 text-sm font-bold text-text">Wie wird der Gesamtfortschritt berechnet?</p>
              <p className="mb-3 text-xs text-text-muted">
                Der Gesamtfortschritt basiert auf einem gewichteten Durchschnitt der drei Phasen.
              </p>
              <div className="space-y-1.5 text-xs text-text-muted">
                {journey.phases.map((p) => (
                  <div key={p.key} className="flex items-center justify-between">
                    <span>
                      {p.step}. {p.title} ({p.weight}%)
                    </span>
                    <span className="font-mono text-text">
                      {p.completion}% × {p.weight}% = {((p.completion * p.weight) / 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border-soft pt-2 text-xs font-bold text-text">
                <span>Gesamtfortschritt</span>
                <span>{overallProgress}%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
