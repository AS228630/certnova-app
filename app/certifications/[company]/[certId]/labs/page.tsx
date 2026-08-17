import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import { companies, getCompany } from "@/lib/companiesData";
import ComingSoonLab from "@/components/certifications/labs/ComingSoonLab";

// Labs is locked for every company/cert right now, including the
// Azure-track certs that previously had a real interactive simulator -
// per the owner's explicit decision to keep Labs fully locked site-wide
// until real content is ready to re-enable gradually, rather than
// leaving some certs "real" and others placeholder at the same time.
export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export const metadata: Metadata = {
  robots: { index: false },
};

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

  return (
    <DashboardShell requireAuth={false}>
      <main className="min-w-0 flex-1 overflow-x-hidden">
        <ComingSoonLab company={company} cert={cert} />
      </main>
    </DashboardShell>
  );
}
