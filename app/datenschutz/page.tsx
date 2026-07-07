import ComingSoonPage from "@/components/ComingSoonPage";
import { ShieldCheck } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Datenschutz"
      description="Unsere Datenschutzerklärung wird aktuell rechtlich finalisiert."
      icon={ShieldCheck}
    />
  );
}
