import Link from "next/link";
import { notFound } from "next/navigation";
import { Wifi, ShieldCheck, RefreshCw, CheckCircle, ListChecks, Clock, DoorOpen } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import { getCompany, companies } from "@/lib/companiesData";
import { getLab } from "@/lib/labData";
import LabTimer from "@/components/certifications/journey/labs/LabTimer";
import LabInfoTabs from "@/components/certifications/journey/labs/LabInfoTabs";
import LabEnvironment from "@/components/certifications/journey/labs/LabEnvironment";
import LabSidePanels from "@/components/certifications/journey/labs/LabSidePanels";

const LEVEL_STYLES: Record<string, string> = {
  Beginner: "bg-success-light text-success",
  Intermediate: "bg-warning/10 text-warning",
  Advanced: "bg-danger/10 text-danger",
};

const FEATURE_CHIPS = [
  { icon: Wifi, label: "Online-Lab" },
  { icon: ShieldCheck, label: "Sichere Umgebung" },
  { icon: RefreshCw, label: "Reset möglich" },
  { icon: CheckCircle, label: "Auto-Validierung" },
  { icon: ListChecks, label: "Schritt-für-Schritt-Anleitung" },
];

export function generateStaticParams() {
  return companies.flatMap((c) =>
    c.certs
      .filter((cert) => getLab(c.slug, cert.id))
      .map((cert) => ({ company: c.slug, certId: cert.id }))
  );
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: companySlug, certId } = await params;
  const company = getCompany(companySlug);
  const lab = getLab(companySlug, certId);
  if (!company || !lab) notFound();

  const cert = company.certs.find((c) => c.id === certId);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-3 flex flex-wrap items-center gap-1 text-sm text-text-muted">
          <span>Labs</span>
          <span>/</span>
          <Link href={`/certifications/${company.slug}`} className="hover:text-primary">
            {company.name}
          </Link>
          <span>/</span>
          <Link href={`/certifications/${company.slug}/${certId}`} className="hover:text-primary">
            {cert?.code ?? certId.toUpperCase()}
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary">{lab.title}</span>
        </div>

        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-extrabold text-text sm:text-2xl">{lab.title}</h1>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[lab.level]}`}>
                {lab.level}
              </span>
              <span className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={13} /> {lab.duration}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm text-text-muted">{lab.goal}</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {FEATURE_CHIPS.map((f) => (
                <span key={f.label} className="flex items-center gap-1.5 text-xs text-text-faint">
                  <f.icon size={13} />
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <LabTimer totalMinutes={lab.totalMinutes} />
            <button className="flex items-center gap-1.5 rounded-lg border border-danger/40 px-4 py-2.5 text-sm font-bold text-danger hover:bg-danger/10">
              <DoorOpen size={15} />
              Lab beenden
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr_300px]">
          <LabInfoTabs lab={lab} />
          <LabEnvironment />
          <LabSidePanels lab={lab} />
        </div>
      </main>
    </DashboardShell>
  );
}
