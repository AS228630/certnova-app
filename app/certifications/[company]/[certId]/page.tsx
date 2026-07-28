import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import JourneyPageClient from "@/components/certifications/journey/JourneyPageClient";
import CertFaq from "@/components/certifications/journey/CertFaq";
import { getCompany, companies } from "@/lib/companiesData";
import { getCertJourney } from "@/lib/journeyData";
import { VERIFIED_EXAM_INFO } from "@/lib/examInfoData";
import { AZ900_QUESTIONS } from "@/lib/az900Practice";
import { AB900_QUESTIONS } from "@/lib/ab900Practice";

// Real practice-question counts, same registry pattern used for the
// practice/mock-exam gating - only certs listed here have a real bank,
// so only these get a FAQ mentioning question counts (no fabricated
// numbers for certs still showing ComingSoonPractice).
const REAL_QUESTION_COUNTS: Record<string, number> = {
  "az-900": AZ900_QUESTIONS.length,
  "ab-900": AB900_QUESTIONS.length,
};

function buildFaqItems(certId: string, certCode: string, certTitle: string) {
  const info = VERIFIED_EXAM_INFO[certId];
  const questionCount = REAL_QUESTION_COUNTS[certId];
  if (!info || !questionCount) return [];
  return [
    {
      q: `Wie viele Fragen hat die ${certCode}-Prüfung?`,
      a: `Die offizielle ${certCode}-Prüfung (${certTitle}) umfasst laut ${info.sourceNote} in der Regel ${info.questionRange} Fragen im Format ${info.format.join(", ")}.`,
    },
    {
      q: `Wie lange dauert die ${certCode}-Prüfung und was ist die Bestehensgrenze?`,
      a: `Die Prüfung dauert etwa ${info.durationMinutes} Minuten. Die Bestehensgrenze liegt bei ${info.passingScore} Punkten. Sie wird über ${info.deliveredBy} abgenommen.`,
    },
    {
      q: `Wie viele Übungsfragen bietet CertCoach für ${certCode}?`,
      a: `CertCoach bietet aktuell ${questionCount} echte Übungsfragen für ${certCode}, aufgeteilt in mehrere Lernabschnitte mit direktem Feedback und Erklärungen.`,
    },
    {
      q: `Was kostet die offizielle ${certCode}-Prüfung?`,
      a: `Die offizielle Prüfungsgebühr bei Microsoft/Pearson VUE liegt laut ${info.sourceNote} bei ${info.price}. Die Vorbereitung mit CertCoach kannst du kostenlos starten.`,
    },
  ];
}

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
    title: `${cert.title} (${cert.code}) Prüfungsvorbereitung`,
    description: `${cert.description} Mit Labs, Übungsfragen und KI Coach bei CertCoach auf ${cert.title} vorbereiten.`,
    alternates: { canonical: `https://www.certcoach.de/certifications/${company.slug}/${cert.id}` },
  };
}

export default async function CertJourneyPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const journey = getCertJourney(slug, certId);
  const cert = company?.certs.find((c) => c.id === certId);
  if (!company || !journey || !cert) notFound();

  const faqItems = buildFaqItems(certId, cert.code, cert.title);

  return (
    <DashboardShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Course",
              name: `${cert.title} (${cert.code})`,
              description: cert.description,
              provider: {
                "@type": "Organization",
                name: "CertCoach",
                url: "https://www.certcoach.de",
              },
              educationalLevel: cert.level,
              inLanguage: "de",
              url: `https://www.certcoach.de/certifications/${company.slug}/${cert.id}`,
              // hasCourseInstance/offers intentionally omitted for certs
              // without a real, live question bank yet (see
              // ComingSoonPractice) - a Course schema claiming graded
              // assessments exist when they don't would be inaccurate
              // structured data, same "no fake data" rule as everywhere
              // else in this project.
            },
            ...(faqItems.length > 0
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqItems.map((item) => ({
                      "@type": "Question",
                      name: item.q,
                      acceptedAnswer: { "@type": "Answer", text: item.a },
                    })),
                  },
                ]
              : []),
          ]),
        }}
      />
      <main className="flex-1 p-4 md:p-8">
        <JourneyPageClient company={company} cert={cert} companySlug={company.slug} certId={certId} />
        <CertFaq items={faqItems} />
      </main>
    </DashboardShell>
  );
}
