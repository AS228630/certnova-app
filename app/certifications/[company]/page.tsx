import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import CertExplorer from "@/components/certifications/CertExplorer";
import LearningPathsStrip from "@/components/certifications/LearningPathsStrip";
import { getCompany, companies } from "@/lib/companiesData";
import { getCompanyIcon } from "@/lib/vendorIcons";

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
        <div className="mb-4 flex items-center gap-1 text-sm text-text-muted">
          <Link href="/certifications" className="hover:text-primary">
            Zertifizierungen
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary">{company.name}</span>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-panel-alt">
            {getCompanyIcon(company.slug, 30)}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">{company.name}</h1>
            <p className="text-sm text-text-muted">
              {company.totalCertCount} Zertifizierungen verfügbar
            </p>
          </div>
        </div>

        <CertExplorer company={company} />

        <LearningPathsStrip paths={company.learningPaths} />
      </main>
    </DashboardShell>
  );
}
