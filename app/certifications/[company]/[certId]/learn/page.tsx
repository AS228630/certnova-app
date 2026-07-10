import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import LearnClient from "@/components/certifications/learn/LearnClient";
import { getCompany, companies } from "@/lib/companiesData";
import { getLearnTrack } from "@/lib/learnData";
import { getCertJourney } from "@/lib/journeyData";

// Learn content is provider-agnostic (modules/videos/quizzes, not a live
// cloud simulator), so it's generic for every company/cert from the start —
// see lib/learnData.ts's generateLearnTrack fallback for certs without
// hand-authored modules yet.
export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);
  const journey = getCertJourney(slug, certId);

  if (!company || !cert || !journey) notFound();

  const track = getLearnTrack(certId, cert.title);

  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <LearnClient company={company} journey={journey} modules={track.modules} />
      </main>
    </DashboardShell>
  );
}
