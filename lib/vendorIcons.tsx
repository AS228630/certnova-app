import { FaAws, FaMicrosoft, FaLinux, FaGoogle, FaRedhat } from "react-icons/fa";
import {
  SiComptia,
  SiCisco,
  SiVmware,
  SiFortinet,
  SiHuawei,
  SiSplunk,
  SiPaloaltonetworks,
  SiGooglecloud,
  SiSap,
} from "react-icons/si";
import { Cloud, Building2 } from "lucide-react";

export function getVendorIcon(vendor: string, size = 18) {
  const key = vendor?.toLowerCase() ?? "";

  if (key.includes("azure"))
    return <Cloud size={size} className="text-[#0078D4]" />;
  if (key.includes("aws") || key.includes("amazon"))
    return <FaAws size={size} className="text-[#FF9900]" />;
  if (key.includes("microsoft"))
    return <FaMicrosoft size={size} className="text-[#00A4EF]" />;
  if (key.includes("linux"))
    return <FaLinux size={size} className="text-[#FCC624]" />;
  if (key.includes("google"))
    return <FaGoogle size={size} className="text-[#4285F4]" />;
  if (key.includes("red hat") || key.includes("redhat"))
    return <FaRedhat size={size} className="text-[#EE0000]" />;
  if (key.includes("comptia"))
    return <SiComptia size={size} className="text-[#C8202F]" />;
  if (key.includes("cisco"))
    return <SiCisco size={size} className="text-[#1BA0D7]" />;

  return <Cloud size={size} className="text-navy" />;
}

// Larger brand marks used on the /certifications company grid and detail
// header. Falls back to a generic building icon when no simple-icons brand
// mark is bundled (e.g. Oracle, IBM, Adobe, Salesforce, EC-Council, ITIL).
const COMPANY_ICONS: Record<
  string,
  { Icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color: string }
> = {
  microsoft: { Icon: FaMicrosoft, color: "#00A4EF" },
  aws: { Icon: FaAws, color: "#FF9900" },
  "google-cloud": { Icon: SiGooglecloud, color: "#4285F4" },
  cisco: { Icon: SiCisco, color: "#1BA0D7" },
  comptia: { Icon: SiComptia, color: "#C8202F" },
  linux: { Icon: FaLinux, color: "#FCC624" },
  redhat: { Icon: FaRedhat, color: "#EE0000" },
  vmware: { Icon: SiVmware, color: "#607078" },
  fortinet: { Icon: SiFortinet, color: "#EE3124" },
  huawei: { Icon: SiHuawei, color: "#FF0000" },
  splunk: { Icon: SiSplunk, color: "#000000" },
  paloalto: { Icon: SiPaloaltonetworks, color: "#FA582D" },
  sap: { Icon: SiSap, color: "#0FAAFF" },
};

export function getCompanyIcon(slug: string, size = 28) {
  const entry = COMPANY_ICONS[slug];
  if (entry) {
    const { Icon, color } = entry;
    return <Icon size={size} style={{ color }} />;
  }
  return <Building2 size={size} className="text-text-faint" />;
}
