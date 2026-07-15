import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import MockExamClient from "@/components/certifications/mockExam/MockExamClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getExamInfo } from "@/lib/examInfoData";
import { AZ900_QUESTIONS } from "@/lib/az900Practice";
import { AZ104_QUESTIONS } from "@/lib/az104Practice";
import { AB900_QUESTIONS } from "@/lib/ab900Practice";
import { generatePracticeBank } from "@/lib/genericPractice";

// Same registry pattern as the practice page — any certId not listed here
// automatically gets the generic-but-real question bank.
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

  const bank = QUESTION_BANKS[certId] ?? generatePracticeBank(certId, cert.title, cert, company).questions;
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
