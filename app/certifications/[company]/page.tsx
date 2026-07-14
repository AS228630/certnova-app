import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import CertExplorer from "@/components/certifications/CertExplorer";
import LearningPathsStrip from "@/components/certifications/LearningPathsStrip";
import CompanyDetailHeader from "@/components/certifications/CompanyDetailHeader";
import { getCompany, companies } from "@/lib/companiesData";

export function generateStaticParams() {
  return companies.map((c) => ({ company: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string }>;
}): Promise<Metadata> {
  const { company: slug } = await params;
  const company = getCompany(slug);
  if (!company) return {};
  return {
    title: `${company.name} Zertifizierungen`,
    description: `Bereite dich mit CertCoach auf ${company.name}-Zertifizierungen vor: ${company.totalCertCount} Prüfungen, Labs, Übungsfragen und KI Coach.`,
    alternates: { canonical: `https://www.certcoach.de/certifications/${company.slug}` },
  };
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
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <CompanyDetailHeader companySlug={company.slug} companyName={company.name} certCount={company.totalCertCount} />

        <CertExplorer company={company} />

        <LearningPathsStrip paths={company.learningPaths} />
      </main>
    </DashboardShell>
  );
}
