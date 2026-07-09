import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import CertExplorer from "@/components/certifications/CertExplorer";
import LearningPathsStrip from "@/components/certifications/LearningPathsStrip";
import CompanyDetailHeader from "@/components/certifications/CompanyDetailHeader";
import { getCompany, companies } from "@/lib/companiesData";

export function generateStaticParams() {
  return companies.map((c) => ({ company: c.slug }));
}

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company: slug } = await params;
  const company = getCompany(slug);
  if (!company) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <CompanyDetailHeader companySlug={company.slug} companyName={company.name} certCount={company.totalCertCount} />

        <CertExplorer company={company} />

        <LearningPathsStrip paths={company.learningPaths} />
      </main>
    </DashboardShell>
  );
}
