import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import { getCompany, companies } from "@/lib/companiesData";
import ComingSoonExam from "@/components/certifications/mockExam/ComingSoonExam";

// Exam Simulation is locked for every company/cert right now, including
// AZ-900/AB-900 which have a real practice-question bank - per the
// owner's explicit decision to keep Exam Simulation fully locked
// site-wide until it's ready to re-enable gradually, independent of
// which certs already have real Practice Questions content.
export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}): Promise<Metadata> {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !cert) return {};
  return {
    title: `${cert.title} (${cert.code}) Prüfungssimulation`,
    robots: { index: false },
  };
}

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !cert) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <ComingSoonExam company={company} cert={cert} />
      </main>
    </DashboardShell>
  );
}
