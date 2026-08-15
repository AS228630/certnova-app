import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { companies, getCompany } from "@/lib/companiesData";
import { getLab } from "@/lib/labsData";
import { getLabInfrastructureType } from "@/lib/labInfrastructure";
import GatedLabStage from "@/components/certifications/labs/GatedLabStage";

// Every company/cert gets a real, reachable Labs page — this is the
// extensible foundation for future multi-cloud simulators (AWS, Google
// Cloud, Linux, ...). UniversalLabStage routes each one to its runtime;
// only 'AZURE' has a real simulator wired up today.
export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: companySlug, certId } = await params;

  const company = getCompany(companySlug);
  if (!company) notFound();

  const cert = company.certs.find((c) => c.id === certId);
  if (!cert) notFound();

  const infrastructureType = getLabInfrastructureType(companySlug, cert);
  const lab = infrastructureType === "AZURE" ? getLab(certId, cert.title, cert.level) : undefined;

  return (
    <DashboardShell>
      <main className="min-w-0 flex-1 overflow-x-hidden">
        {/* This route always lands on the first lab (index 0) — always
            within the free allotment (freeLabsCount defaults to 1), so
            no user ever lands here already locked out. */}
        <GatedLabStage infrastructureType={infrastructureType} company={company} cert={cert} lab={lab} labIndex={0} />
      </main>
    </DashboardShell>
  );
}
