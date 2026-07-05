import type { Company, Certification } from "@/lib/companiesData";
import type { LabInfrastructureType } from "@/lib/labInfrastructure";
import type { Lab } from "@/lib/labsData";
import { generateAwsLab, generateM365Lab } from "@/lib/labsData";
import LabClient from "./LabClient";
import ComingSoonLab from "./ComingSoonLab";
import AwsConsoleEnvironment from "./aws/AwsConsoleEnvironment";
import M365AdminEnvironment from "./m365/M365AdminEnvironment";

type UniversalLabStageProps = {
  infrastructureType: LabInfrastructureType;
  company: Company;
  cert: Certification;
  /** Only required when infrastructureType === "AZURE" (the only wired-up runtime today). */
  lab?: Lab;
};

/**
 * Factory that routes to the correct lab runtime for a given cert. Only
 * 'AZURE' has a real simulator today; every other case falls through to
 * ComingSoonLab. Add a new case (e.g. 'AWS' -> <AwsPortalSimulator />) here,
 * and nowhere else, once a new runtime is built.
 */
export default function UniversalLabStage({ infrastructureType, company, cert, lab }: UniversalLabStageProps) {
  switch (infrastructureType) {
    case "AZURE":
      if (!lab) return <ComingSoonLab company={company} cert={cert} />;
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={lab}
        />
      );

    // AWS: real S3-bucket lab, reusing the same chrome as Azure with its own console mock.
    case "AWS":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateAwsLab(cert.id, cert.title, cert.level)}
          environment={<AwsConsoleEnvironment />}
        />
      );

    // M365: real Admin Center lab (create user + assign license).
    case "M365":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateM365Lab(cert.id, cert.title, cert.level)}
          environment={<M365AdminEnvironment />}
        />
      );

    // GOOGLE_CLOUD / WINDOWS_SERVER / LINUX / CISCO / GENERIC:
    // no dedicated runtime yet — every one of them lands here for now.
    default:
      return <ComingSoonLab company={company} cert={cert} />;
  }
}
