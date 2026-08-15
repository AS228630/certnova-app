import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import MockExamClient from "@/components/certifications/mockExam/MockExamClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getExamInfo } from "@/lib/examInfoData";
import { hasPracticeBank } from "@/lib/server/practiceBank";
import ComingSoonPractice from "@/components/certifications/practice/ComingSoonPractice";

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
    robots: { index: false }, // interactive exam simulation, not a content page worth indexing
  };
}

// Deliberately does NOT load or pass question content here anymore — see
// the practice/page.tsx comment for why. Content now comes from the
// gated /api/certifications/[certId]/mock-exam-questions route, which
// decides server-side (Guest/Free = first 10 questions, Premium = full
// bank) how much of the real exam-simulation content a given request is
// entitled to. requireAuth is now false so Guests can reach this page at
// all, matching stage 3 of the Free->Premium journey (Prüfung starten -
// Gastmodus applies to Exam Simulation too, not just Practice).
export default async function MockExamPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !cert) notFound();

  if (!hasPracticeBank(certId)) {
    return (
      <DashboardShell requireAuth={false}>
        <main className="flex-1 p-4 md:p-8">
          <ComingSoonPractice company={company} cert={cert} />
        </main>
      </DashboardShell>
    );
  }

  const examInfo = getExamInfo(certId);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <MockExamClient
          companySlug={company.slug}
          companyName={company.name}
          certId={certId}
          certCode={cert.code}
          certTitle={cert.title}
          examInfo={examInfo}
        />
      </main>
    </DashboardShell>
  );
}
