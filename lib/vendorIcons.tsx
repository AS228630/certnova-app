import { FaAws, FaMicrosoft, FaLinux, FaGoogle, FaRedhat } from "react-icons/fa";
import { SiComptia, SiCisco } from "react-icons/si";
import { Cloud } from "lucide-react";

export function getVendorIcon(vendor: string, size = 18) {
  const key = vendor?.toLowerCase() ?? "";

  if (key.includes("aws") || key.includes("amazon"))
    return <FaAws size={size} className="text-[#FF9900]" />;
  if (key.includes("microsoft") || key.includes("azure"))
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
