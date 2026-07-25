import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import MockExamClient from "@/components/certifications/mockExam/MockExamClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getExamInfo } from "@/lib/examInfoData";
import { AZ900_QUESTIONS } from "@/lib/az900Practice";
import { AZ104_QUESTIONS } from "@/lib/az104Practice";
import { AB900_QUESTIONS } from "@/lib/ab900Practice";
import ComingSoonPractice from "@/components/certifications/practice/ComingSoonPractice";

// Same registry pattern as the practice page — any certId not listed here
// shows the ComingSoonPractice placeholder instead of a generic/fabricated
// question bank.
const QUESTION_BANKS: Record<string, typeof AZ900_QUESTIONS> = {
  "az-900": AZ900_QUESTIONS,
  "az-104": AZ104_QUESTIONS,
  "ab-900": AB900_QUESTIONS,
};

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

export default async function MockExamPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !cert) notFound();

  if (!(certId in QUESTION_BANKS)) {
    return (
      <DashboardShell>
        <main className="flex-1 p-4 md:p-8">
          <ComingSoonPractice company={company} cert={cert} />
        </main>
      </DashboardShell>
    );
  }

  const bank = QUESTION_BANKS[certId];
  const examInfo = getExamInfo(certId);

  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <MockExamClient
          companySlug={company.slug}
          companyName={company.name}
          certId={certId}
          certCode={cert.code}
          certTitle={cert.title}
          questions={bank}
          examInfo={examInfo}
        />
      </main>
    </DashboardShell>
  );
}
