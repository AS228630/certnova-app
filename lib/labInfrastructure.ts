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
  | "ORACLE_SQL"
  | "VSPHERE"
  | "DOCKER"
  | "KUBERNETES"
  | "GENERIC";

const COMPANY_INFRASTRUCTURE: Record<string, LabInfrastructureType> = {
  aws: "AWS",
  "google-cloud": "GOOGLE_CLOUD",
  linux: "LINUX",
  redhat: "LINUX", // RHCSA/RHCE etc. are Linux system-administration exams
  cisco: "CISCO",
  oracle: "ORACLE_SQL",
  vmware: "VSPHERE",
  docker: "DOCKER",
  kubernetes: "KUBERNETES",
};

/**
 * Resolve which simulator runtime a given company/cert should use. Microsoft
 * certs are split further by categoryKey (its Azure track vs. M365/security/
 * ai/data), since only Azure has a real simulator so far.
 */
const WINDOWS_SERVER_CERT_IDS = new Set(["az-800", "az-801"]);

export function getLabInfrastructureType(companySlug: string, cert?: Certification): LabInfrastructureType {
  if (companySlug === "microsoft") {
    if (cert && WINDOWS_SERVER_CERT_IDS.has(cert.id)) return "WINDOWS_SERVER";
    if (cert?.categoryKey === "m365") return "M365";
    // "azure", "security" (Entra ID/Purview), "ai" (Azure AI) and "data"
    // (Azure Data) certs are all fundamentally Azure services, so they all
    // get the real Azure Portal simulator.
    if (cert?.categoryKey === "azure" || cert?.categoryKey === "security" || cert?.categoryKey === "ai" || cert?.categoryKey === "data") {
      return "AZURE";
    }
    return "GENERIC";
  }
  return COMPANY_INFRASTRUCTURE[companySlug] ?? "GENERIC";
}
