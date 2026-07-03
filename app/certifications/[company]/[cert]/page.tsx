import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bookmark, Star, Clock } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import CertBadge from "@/components/certifications/CertBadge";
import CertDetailTabs, { ProgressInfoPopover } from "@/components/certifications/detail/CertDetailTabs";
import ProgressChart from "@/components/certifications/detail/ProgressChart";
import ActivityFeed from "@/components/certifications/detail/ActivityFeed";
import { companies, getCompany } from "@/lib/companiesData";
import { getCertJourney } from "@/lib/certJourney";

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-danger/10 text-danger",
};

export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, cert: cert.id })));
}

export default async function CertDetailPage({
  params,
}: {
  params: Promise<{ company: string; cert: string }>;
}) {
  const { company: companySlug, cert: certId } = await params;
  const company = getCompany(companySlug);
  if (!company) notFound();

  const cert = company.certs.find((c) => c.id === certId);
  if (!cert) notFound();

  const journey = getCertJourney(cert);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <Link
            href={`/certifications/${company.slug}`}
            aria-label="Zurück"
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted hover:bg-panel-alt hover:text-text"
          >
            <ArrowLeft size={16} />
          </Link>
          <div className="flex flex-wrap items-center gap-1 text-sm text-text-muted">
            <Link href="/certifications" className="hover:text-primary">
              Zertifizierungen
            </Link>
            <span>/</span>
            <Link href={`/certifications/${company.slug}`} className="hover:text-primary">
              {company.name}
            </Link>
            <span>/</span>
            <span className="font-semibold text-primary">{cert.code}</span>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-4">
                <CertBadge code={cert.code} size="lg" />
                <div>
                  <h1 className="text-xl font-extrabold text-text sm:text-2xl">{cert.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[cert.level]}`}
                    >
                      {cert.level}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-text-muted">
                      <Star size={14} className="fill-warning text-warning" />
                      4.8 ({journey.reviewCount.toLocaleString("de-DE")})
                    </span>
                    <span className="flex items-center gap-1 text-sm text-text-muted">
                      <Clock size={14} />
                      {journey.duration}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm text-text-muted">{cert.description}</p>
                </div>
              </div>
              <button aria-label="Merken" className="shrink-0 text-text-faint hover:text-primary">
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-text">Gesamtfortschritt</p>
              <ProgressInfoPopover journey={journey} />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-extrabold text-primary">{Math.round(journey.overallPercent)}%</p>
              <div className="relative h-14 w-14 shrink-0">
                <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
                  <circle cx="28" cy="28" r="24" fill="none" strokeWidth="6" className="stroke-panel-alt" />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="stroke-primary"
                    strokeDasharray={2 * Math.PI * 24}
                    strokeDashoffset={2 * Math.PI * 24 * (1 - journey.overallPercent / 100)}
                  />
                </svg>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-panel-alt">
              <div className="h-1.5 rounded-full bg-primary" style={{ width: `${journey.overallPercent}%` }} />
            </div>
            <p className="mt-2 text-xs text-text-faint">
              {journey.themesDone} / {journey.themesTotal} Themen abgeschlossen
            </p>
            <button className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
              Weiterlernen
            </button>
          </div>
        </div>

        <CertDetailTabs journey={journey} />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ProgressChart trend={journey.trend} />
          <ActivityFeed activities={journey.activities} />
        </div>
      </main>
    </DashboardShell>
  );
}
