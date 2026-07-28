import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import JourneyPageClient from "@/components/certifications/journey/JourneyPageClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getCertJourney } from "@/lib/journeyData";

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

  return (
    <DashboardShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
      <main className="flex-1 p-4 md:p-8">
        <JourneyPageClient company={company} cert={cert} companySlug={company.slug} certId={certId} />
      </main>
    </DashboardShell>
  );
}
