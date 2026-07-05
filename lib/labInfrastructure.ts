import type { Certification } from "./companiesData";

/**
 * The set of lab "runtimes" the simulator factory can route to. Only
 * 'AZURE' has a real implementation today; every other value is accepted
 * by the type system now so wiring in a real AWS/Linux/etc. simulator later
 * is purely additive (see components/certifications/labs/UniversalLabStage.tsx).
 */
export type LabInfrastructureType =
  | "AZURE"
  | "AWS"
  | "GOOGLE_CLOUD"
  | "M365"
  | "WINDOWS_SERVER"
  | "LINUX"
  | "CISCO"
  | "GENERIC";

const COMPANY_INFRASTRUCTURE: Record<string, LabInfrastructureType> = {
  aws: "AWS",
  "google-cloud": "GOOGLE_CLOUD",
  linux: "LINUX",
  cisco: "CISCO",
};

/**
 * Resolve which simulator runtime a given company/cert should use. Microsoft
 * certs are split further by categoryKey (its Azure track vs. M365/security/
 * ai/data), since only Azure has a real simulator so far.
 */
export function getLabInfrastructureType(companySlug: string, cert?: Certification): LabInfrastructureType {
  if (companySlug === "microsoft") {
    if (cert?.categoryKey === "azure") return "AZURE";
    if (cert?.categoryKey === "m365") return "M365";
    return "GENERIC";
  }
  return COMPANY_INFRASTRUCTURE[companySlug] ?? "GENERIC";
}
