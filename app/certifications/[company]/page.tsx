import Link from "next/link";
import { notFound } from "next/navigation";
import { Users, BookOpen, Star, Award } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import CategoryTabs from "@/components/certifications/CategoryTabs";
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

  const stats = [
    { icon: Award, label: "Zertifizierungen", value: String(company.certCount) },
    { icon: BookOpen, label: "Lernpfade", value: String(company.learningPathCount) },
    { icon: Users, label: "Lernende", value: company.students },
    { icon: Star, label: "Bewertung", value: company.rating.toFixed(1) },
  ];

  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-4 flex items-center gap-1 text-sm text-text-muted">
          <Link href="/certifications" className="hover:text-primary">
            Alle Unternehmen
          </Link>
          <span>/</span>
          <span className="font-semibold text-primary">{company.name}</span>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-border-soft bg-panel p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-panel-alt">
              {getCompanyIcon(company.slug, 30)}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-text sm:text-2xl">{company.name} Zertifizierungen</h1>
              <p className="mt-1 max-w-lg text-sm text-text-muted">{company.tagline}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-border-soft pt-4 sm:grid-cols-4 sm:border-t-0 sm:pt-0 sm:pl-6 sm:border-l">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center gap-1 text-text-faint">
                  <s.icon size={12} />
                  <span className="text-[11px]">{s.label}</span>
                </div>
                <p className="text-lg font-bold text-text">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        <CategoryTabs certs={company.certs} companySlug={company.slug} />

        <LearningPathsStrip paths={company.learningPaths} />
      </main>
    </DashboardShell>
  );
}
