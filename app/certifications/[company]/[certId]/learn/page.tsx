import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { getCompany, companies } from "@/lib/companiesData";
import ComingSoonLearn from "@/components/certifications/learn/ComingSoonLearn";

// Learn is locked for every company/cert right now — unlike Labs and
// Practice Questions (which have some real content for a few certs),
// there is no real hand-authored Learn content anywhere yet (see
// lib/learnData.ts's generated fallback), so this is unconditional per
// the owner's explicit decision, not per-cert like the others.
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

  if (!company || !cert) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <ComingSoonLearn company={company} cert={cert} />
      </main>
    </DashboardShell>
  );
}
