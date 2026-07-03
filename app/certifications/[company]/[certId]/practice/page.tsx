import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import PracticeClient from "@/components/certifications/practice/PracticeClient";
import { getCompany } from "@/lib/companiesData";
import { AZ900_TOPICS, AZ900_QUESTIONS } from "@/lib/az900Practice";

// Registry of practice-question banks by certId. Currently only AZ-900 is
// wired up — add more entries here (each with its own topics/questions file,
// following the same shape as lib/az900Practice.ts) to enable this page for
// other certifications.
const PRACTICE_BANKS: Record<string, { topics: typeof AZ900_TOPICS; questions: typeof AZ900_QUESTIONS }> = {
  "az-900": { topics: AZ900_TOPICS, questions: AZ900_QUESTIONS },
};

export function generateStaticParams() {
  return Object.keys(PRACTICE_BANKS).map((certId) => ({ company: "microsoft", certId }));
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const bank = PRACTICE_BANKS[certId];
  const cert = company?.certs.find((c) => c.id === certId);

  if (!company || !bank) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <PracticeClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert?.code ?? certId.toUpperCase()}
          certTitle={cert?.title ?? "Übungsfragen"}
          level={cert?.level ?? "Beginner"}
          rating={company.rating}
          ratingCount={1245}
          topics={bank.topics}
          questions={bank.questions}
        />
      </main>
    </DashboardShell>
  );
}
