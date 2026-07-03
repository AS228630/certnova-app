import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import LabClient from "@/components/certifications/labs/LabClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getLab } from "@/lib/labsData";

export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export default async function LabPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);

  if (!company || !cert) notFound();

  const lab = getLab(certId, cert.title, cert.level);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
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
