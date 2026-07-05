import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { companies, getCompany } from "@/lib/companiesData";
import { getLab, getLabsForCert } from "@/lib/labsData";
import { getLabInfrastructureType } from "@/lib/labInfrastructure";
import UniversalLabStage from "@/components/certifications/labs/UniversalLabStage";

// Same extensible-foundation approach as the parent /labs route, but scoped
// to a specific hand-authored lab within a cert (e.g. az-104 has both
// "vm-creation" and "b2c-identitaeten"). Only certs with more than one
// hand-authored lab need this route; generateStaticParams reflects that.
export function generateStaticParams() {
  return companies.flatMap((c) =>
    c.certs.flatMap((cert) =>
      getLabsForCert(cert.id).map((lab) => ({
        company: c.slug,
        certId: cert.id,
        labSlug: lab.slug ?? lab.id,
      }))
    )
  );
}

export default async function LabSlugPage({
  params,
}: {
  params: Promise<{ company: string; certId: string; labSlug: string }>;
}) {
  const { company: companySlug, certId, labSlug } = await params;

  const company = getCompany(companySlug);
  if (!company) notFound();

  const cert = company.certs.find((c) => c.id === certId);
  if (!cert) notFound();

  const infrastructureType = getLabInfrastructureType(companySlug, cert);
  const lab = infrastructureType === "AZURE" ? getLab(certId, cert.title, cert.level, labSlug) : undefined;

  // Guard against an unknown labSlug landing on the wrong (fallback) lab.
  if (infrastructureType === "AZURE" && lab?.slug && lab.slug !== labSlug) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <UniversalLabStage infrastructureType={infrastructureType} company={company} cert={cert} lab={lab} />
      </main>
    </DashboardShell>
  );
}
