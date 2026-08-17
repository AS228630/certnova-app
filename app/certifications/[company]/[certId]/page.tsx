import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import JourneyPageClient from "@/components/certifications/journey/JourneyPageClient";
import CertFaq from "@/components/certifications/journey/CertFaq";
import SampleQuiz, { type SampleQuestion } from "@/components/certifications/journey/SampleQuiz";
import { getCompany, companies } from "@/lib/companiesData";
import { getCertJourney } from "@/lib/journeyData";
import { VERIFIED_EXAM_INFO } from "@/lib/examInfoData";
import { AZ900_QUESTIONS } from "@/lib/az900Practice";
import { AB900_QUESTIONS } from "@/lib/ab900Practice";

// Public sample-question ids per cert — picked once, deliberately
// plain single-choice questions (no blankFill/matching/yesno special
// UI) so they render cleanly without login and map straightforwardly
// to Quiz/Question JSON-LD. Pulled from the real bank by id below, so
// the actual question/option/answer text can never drift out of sync
// with what's shown in the real (login-required) practice page.
const SAMPLE_QUESTION_IDS: Record<string, string[]> = {
  "az-900": ["real-az900-1", "real-az900-2", "real-az900-4"],
  "ab-900": ["real-ab900-3", "real-ab900-4", "real-ab900-5"],
};

function getSampleQuestions(certId: string): SampleQuestion[] {
  const ids = SAMPLE_QUESTION_IDS[certId];
  if (!ids) return [];
  const bank = certId === "az-900" ? AZ900_QUESTIONS : certId === "ab-900" ? AB900_QUESTIONS : [];
  return ids
    .map((id) => bank.find((q) => q.id === id))
    .filter((q): q is Extract<(typeof bank)[number], { options: unknown; correct: unknown }> => {
      if (!q) return false;
      const t = (q as { type?: string }).type;
      return (t === undefined || t === "single") && "options" in q && "correct" in q;
    })
    .map((q) => ({ prompt: q.prompt, options: q.options, correct: q.correct as string }));
}

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
  const sampleQuestions = getSampleQuestions(certId);

  return (
    <DashboardShell requireAuth={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              // Real gap found during a full-site SEO audit: every other
              // hierarchical page here (Course/FAQPage/Quiz) already had
              // structured data, but nothing told Google the real
              // Home -> Company -> Certification hierarchy this page
              // sits in - which is exactly the kind of page that
              // benefits from a breadcrumb trail in search results.
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "CertCoach", item: "https://www.certcoach.de" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: company.name,
                  item: `https://www.certcoach.de/certifications/${company.slug}`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: `${cert.title} (${cert.code})`,
                  item: `https://www.certcoach.de/certifications/${company.slug}/${certId}`,
                },
              ],
            },
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
            ...(sampleQuestions.length > 0
              ? [
                  {
                    "@context": "https://schema.org",
                    "@type": "Quiz",
                    name: `${cert.code} Beispiel-Fragen`,
                    description: `Kostenlose Beispielfragen zur Vorbereitung auf ${cert.title} (${cert.code}) bei CertCoach.`,
                    about: cert.title,
                    // isAccessibleForFree is genuinely true for exactly
                    // these questions (public sample) — the full bank
                    // behind /practice is what requires login, and that
                    // page is correctly excluded from indexing already.
                    isAccessibleForFree: true,
                    hasPart: sampleQuestions.map((q) => ({
                      "@type": "Question",
                      name: q.prompt,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: q.options.find((o) => o.id === q.correct)?.text ?? "",
                      },
                    })),
                  },
                ]
              : []),
          ]),
        }}
      />
      <main className="flex-1 p-4 md:p-8">
        <JourneyPageClient company={company} cert={cert} companySlug={company.slug} certId={certId} />
        <SampleQuiz questions={sampleQuestions} companySlug={company.slug} certId={cert.id} />
        <CertFaq items={faqItems} />
      </main>
    </DashboardShell>
  );
}
