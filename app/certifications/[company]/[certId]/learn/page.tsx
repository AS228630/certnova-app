import { notFound } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import LearnClient from "@/components/certifications/learn/LearnClient";
import { getCompany } from "@/lib/companiesData";
import { getLearnTrack } from "@/lib/learnData";

export function generateStaticParams() {
  return [
    { company: "microsoft", certId: "az-900" },
    { company: "microsoft", certId: "az-104" },
  ];
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const track = getLearnTrack(certId);
  const cert = company?.certs.find((c) => c.id === certId);

  if (!company || !track) notFound();

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <LearnClient
          companyName={company.name}
          companySlug={company.slug}
          certId={certId}
          certCode={cert?.code ?? certId.toUpperCase()}
          certTitle={cert?.title ?? "Lernpfad"}
          modules={track.modules}
        />
      </main>
    </DashboardShell>
  );
}
