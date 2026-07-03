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

// Simple-icons doesn't ship brand marks for these four, so we draw small
// inline badges that read clearly at 24-32px without claiming to be the
// official logo.
function OracleMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="1" y="7" width="22" height="10" rx="5" fill="none" stroke="#F80000" strokeWidth="2" />
      <text x="12" y="15" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="7" fill="#F80000">
        ORCL
      </text>
    </svg>
  );
}

function IbmMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <text x="12" y="16" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="11" fill="#1F70C1" letterSpacing="-0.5">
        IBM
      </text>
    </svg>
  );
}

function ItilMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#5C2D91" />
      <text x="12" y="15.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="7.5" fill="#fff">
        ITIL
      </text>
    </svg>
  );
}

function AdobeMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#FA0F00" />
      <path d="M9 6h2.2l4.3 12h-2.3l-.9-2.7h-4.1L7.3 18H5L9 6zm1.1 2.6-1.5 4.6h3l-1.5-4.6z" fill="#fff" />
    </svg>
  );
}

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
  oracle: { Icon: OracleMark, color: "#F80000" },
  ibm: { Icon: IbmMark, color: "#1F70C1" },
  itil: { Icon: ItilMark, color: "#5C2D91" },
  adobe: { Icon: AdobeMark, color: "#FA0F00" },
};

export function getCompanyIcon(slug: string, size = 28) {
  const entry = COMPANY_ICONS[slug];
  if (entry) {
    const { Icon, color } = entry;
    return <Icon size={size} style={{ color }} />;
  }
  return <Building2 size={size} className="text-text-faint" />;
}
