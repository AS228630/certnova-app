import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import JourneyHeader from "@/components/certifications/journey/JourneyHeader";
import JourneyTabs from "@/components/certifications/journey/JourneyTabs";
import JourneyPhases from "@/components/certifications/journey/JourneyPhases";
import ProgressChart from "@/components/certifications/journey/ProgressChart";
import JourneyActivity from "@/components/certifications/journey/JourneyActivity";
import { getCompany, companies } from "@/lib/companiesData";
import { getCertJourney } from "@/lib/journeyData";

export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export default async function CertJourneyPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const journey = getCertJourney(slug, certId);
  if (!company || !journey) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <JourneyHeader company={company} journey={journey} />

        <JourneyTabs>
          <JourneyPhases phases={journey.phases} />
        </JourneyTabs>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
          <ProgressChart points={journey.history} />
          <JourneyActivity items={journey.activity} />
        </div>
      </main>
    </DashboardShell>
  );
}
