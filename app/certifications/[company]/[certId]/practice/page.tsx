import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import PracticeClient from "@/components/certifications/practice/PracticeClient";
import { getCompany, companies } from "@/lib/companiesData";
import { hasPracticeBank } from "@/lib/server/practiceBank";
import { getPremiumBenefits } from "@/lib/server/premiumBenefits";
import ComingSoonPractice from "@/components/certifications/practice/ComingSoonPractice";

export function generateStaticParams() {
  return companies.flatMap((c) => c.certs.map((cert) => ({ company: c.slug, certId: cert.id })));
}

// Interactive Free/Gastmodus question session (not a content page worth
// indexing) — same convention already used by the sibling mock-exam
// route. The public, indexable page for a certification is
// /certifications/[company]/[certId] (the journey/landing page), which
// already carries its own real title/description and a handful of
// hand-picked public sample questions for Google. This route is where
// Google should send a searcher to click through to, never something
// Google renders and indexes itself — noindex here keeps that boundary
// real even though Google is capable of executing the client-side fetch
// that loads the actual question content.
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
    title: `${cert.title} (${cert.code}) Übungsfragen`,
    robots: { index: false },
  };
}

// Deliberately does NOT load or pass question content here anymore — the
// full bank (with correct answers) used to be bundled into this page's
// server-rendered props and shipped to every visitor regardless of
// subscription, which made the section lock a UI-only affordance. Content
// now comes from the gated /api/certifications/[certId]/practice-questions
// route instead, which decides server-side how much of the bank a given
// request is actually entitled to.
export default async function PracticePage({
  params,
}: {
  params: Promise<{ company: string; certId: string }>;
}) {
  const { company: slug, certId } = await params;
  const company = getCompany(slug);
  const cert = company?.certs.find((c) => c.id === certId);

  if (!company || !cert) notFound();

  if (!hasPracticeBank(certId)) {
    return (
      <DashboardShell requireAuth={false}>
        <main className="flex-1 pb-4 pt-0 md:pb-8">
          <ComingSoonPractice company={company} cert={cert} />
        </main>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 pb-4 pt-0 md:pb-8">
        <Suspense fallback={null}>
          <PracticeClient
            companyName={company.name}
            companySlug={company.slug}
            certId={certId}
            certCode={cert.code}
            certTitle={cert.title}
            level={cert.level}
            rating={company.rating}
            ratingCount={1245}
            premiumBenefits={getPremiumBenefits(certId)}
          />
        </Suspense>
      </main>
    </DashboardShell>
  );
}
