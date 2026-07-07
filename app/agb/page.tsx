import ComingSoonPage from "@/components/ComingSoonPage";
import { FileText } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="AGB"
      description="Unsere allgemeinen Geschäftsbedingungen werden aktuell rechtlich finalisiert."
      icon={FileText}
    />
  );
}
