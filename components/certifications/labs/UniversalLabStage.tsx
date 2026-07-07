import type { Company, Certification } from "@/lib/companiesData";
import type { LabInfrastructureType } from "@/lib/labInfrastructure";
import type { Lab } from "@/lib/labsData";
import { generateAwsLab, generateM365Lab, generateLinuxLab, generateGcpLab, generateWindowsServerLab, generateCiscoLab, generateOracleLab, generateVmwareLab, generateDockerLab, generateKubernetesLab } from "@/lib/labsData";
import LabClient from "./LabClient";
import ComingSoonLab from "./ComingSoonLab";
import AwsConsoleEnvironment from "./aws/AwsConsoleEnvironment";
import M365AdminEnvironment from "./m365/M365AdminEnvironment";
import LinuxTerminalEnvironment from "./linux/LinuxTerminalEnvironment";
import GcpConsoleEnvironment from "./gcp/GcpConsoleEnvironment";
import ActiveDirectoryMockEnvironment from "./windows-server/ActiveDirectoryMockEnvironment";
import CiscoTerminalEnvironment from "./cisco/CiscoTerminalEnvironment";
import OracleSqlEnvironment from "./oracle/OracleSqlEnvironment";
import VSphereClientEnvironment from "./vmware/VSphereClientEnvironment";
import DockerCliEnvironment from "./docker/DockerCliEnvironment";
import KubernetesCliEnvironment from "./kubernetes/KubernetesCliEnvironment";

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

    // LINUX: real isolated terminal (filesystem navigation, mkdir/touch/chmod).
    case "LINUX":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateLinuxLab(cert.id, cert.title, cert.level)}
          environment={<LinuxTerminalEnvironment />}
        />
      );

    // GOOGLE_CLOUD: real Cloud Storage bucket lab, same chrome, GCP console mock.
    case "GOOGLE_CLOUD":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateGcpLab(cert.id, cert.title, cert.level)}
          environment={<GcpConsoleEnvironment />}
        />
      );

    // WINDOWS_SERVER: real Active Directory Users & Computers lab (browse OU + create user).
    case "WINDOWS_SERVER":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateWindowsServerLab(cert.id, cert.title, cert.level)}
          environment={<ActiveDirectoryMockEnvironment />}
        />
      );

    // CISCO: real IOS-style CLI (enable, configure terminal, hostname, interface, ip address, no shutdown).
    case "CISCO":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateCiscoLab(cert.id, cert.title, cert.level)}
          environment={<CiscoTerminalEnvironment />}
        />
      );

    // ORACLE_SQL: real SQL*Plus-style terminal (CREATE TABLE, INSERT, SELECT, SHOW TABLES).
    case "ORACLE_SQL":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateOracleLab(cert.id, cert.title, cert.level)}
          environment={<OracleSqlEnvironment />}
        />
      );

    // VSPHERE: real vSphere Client (create VM on an ESXi host, power on/off).
    case "VSPHERE":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateVmwareLab(cert.id, cert.title, cert.level)}
          environment={<VSphereClientEnvironment />}
        />
      );

    // DOCKER: real Docker CLI simulator (pull, run, ps, stop, rm, rmi).
    case "DOCKER":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateDockerLab(cert.id, cert.title, cert.level)}
          environment={<DockerCliEnvironment />}
        />
      );

    // KUBERNETES: real kubectl CLI simulator (create deployment, get, scale, delete).
    case "KUBERNETES":
      return (
        <LabClient
          companyName={company.name}
          companySlug={company.slug}
          certCode={cert.code}
          certId={cert.id}
          lab={generateKubernetesLab(cert.id, cert.title, cert.level)}
          environment={<KubernetesCliEnvironment />}
        />
      );

    // GENERIC:
    // no dedicated runtime yet — every one of them lands here for now.
    default:
      return <ComingSoonLab company={company} cert={cert} />;
  }
}
