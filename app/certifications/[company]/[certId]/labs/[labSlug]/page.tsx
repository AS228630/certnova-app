import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import { companies, getCompany } from "@/lib/companiesData";
import { getLabsForCert } from "@/lib/labsData";
import ComingSoonLab from "@/components/certifications/labs/ComingSoonLab";

export const metadata: Metadata = {
  robots: { index: false },
};

// Labs is locked for every company/cert right now, including specific
// authored labs like az-104's "vm-creation"/"b2c-identitaeten" - same
// site-wide lockdown as the parent /labs route. generateStaticParams
// still reflects the real authored lab list so these specific URLs stay
// reachable (and correctly 404 for an unknown slug) rather than
// disappearing outright.
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

  const knownSlugs = getLabsForCert(certId).map((l) => l.slug ?? l.id);
  if (knownSlugs.length > 0 && !knownSlugs.includes(labSlug)) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <ComingSoonLab company={company} cert={cert} />
      </main>
    </DashboardShell>
  );
}
