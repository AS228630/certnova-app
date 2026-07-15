"use client";

import JourneyHeader from "./JourneyHeader";
import JourneyTabs from "./JourneyTabs";
import JourneyPhases from "./JourneyPhases";
import ProgressChart from "./ProgressChart";
import JourneyActivity from "./JourneyActivity";
import { getCertJourney } from "@/lib/journeyData";
import { getExamInfo } from "@/lib/examInfoData";
import type { Company, Certification } from "@/lib/companiesData";
import { useLocale } from "@/components/LocaleProvider";

export default function JourneyPageClient({
  company,
  cert,
  companySlug,
  certId,
}: {
  company: Company;
  cert: Certification;
  companySlug: string;
  certId: string;
}) {
  const { locale } = useLocale();
  const journey = getCertJourney(companySlug, certId, locale);
  const examInfo = getExamInfo(certId);
  if (!journey) return null;

  return (
    <>
      <JourneyHeader company={company} journey={journey} />

      <JourneyTabs>
        <JourneyPhases
          phases={journey.phases}
          companySlug={companySlug}
          certId={certId}
          certTitle={cert.title}
          examInfo={examInfo}
        />
      </JourneyTabs>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        <ProgressChart points={journey.history} />
        <JourneyActivity items={journey.activity} />
      </div>
    </>
  );
}
