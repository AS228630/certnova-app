import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import PracticeClient from "@/components/certifications/practice/PracticeClient";
import { getCompany, companies } from "@/lib/companiesData";
import { AZ900_TOPICS, AZ900_QUESTIONS } from "@/lib/az900Practice";
import { AZ104_TOPICS, AZ104_QUESTIONS } from "@/lib/az104Practice";
import { generatePracticeBank } from "@/lib/genericPractice";

// Registry of hand-authored practice-question banks by certId. Any certId
// not listed here automatically gets a generic-but-real placeholder bank
// via generatePracticeBank (see lib/genericPractice.ts), so this page works
// for every company/cert. Add more entries here as real content is written.
const PRACTICE_BANKS: Record<string, { topics: typeof AZ900_TOPICS; questions: typeof AZ900_QUESTIONS }> = {
  "az-900": { topics: AZ900_TOPICS, questions: AZ900_QUESTIONS },
  "az-104": { topics: AZ104_TOPICS, questions: AZ104_QUESTIONS },
};

export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export default async function PracticePage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);

  if (!company || !cert) notFound();

  const bank = PRACTICE_BANKS[certId] ?? generatePracticeBank(certId, cert.title);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <PracticeClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certTitle={cert.title}
          level={cert.level}
          rating={company.rating}
          ratingCount={1245}
          topics={bank.topics}
          questions={bank.questions}
        />
      </main>
    </DashboardShell>
  );
}
