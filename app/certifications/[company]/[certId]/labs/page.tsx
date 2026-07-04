import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { getCompany, companies } from "@/lib/companiesData";
import { getLab } from "@/lib/labsData";
import LabClient from "@/components/certifications/labs/LabClient";

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

  const lab = getLab(certId, cert.title, cert.level);

  return (
    <DashboardShell requireAuth={false}>
      <main className="min-w-0 flex-1 overflow-x-hidden p-4 md:p-8">
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={certId}
          lab={lab}
        />
      </main>
    </DashboardShell>
  );
}
