import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import LearnClient from "@/components/certifications/learn/LearnClient";
import { getCompany, getAzureLearnRolloutParams, isAzureLearnRolloutCert } from "@/lib/companiesData";
import { getLearnTrack } from "@/lib/learnData";
import { getCertJourney } from "@/lib/journeyData";

export function generateStaticParams() {
  return getAzureLearnRolloutParams();
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  if (!isAzureLearnRolloutCert(slug, certId)) notFound();

  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  const journey = getCertJourney(slug, certId);

  if (!company || !cert || !journey) notFound();

  const track = getLearnTrack(certId, cert.title);

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <LearnClient company={company} journey={journey} modules={track.modules} />
      </main>
    </DashboardShell>
  );
}
