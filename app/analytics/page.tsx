import ComingSoonPage from "@/components/ComingSoonPage";
import { BarChart3 } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Analysen"
      description="Detaillierte Auswertungen deines Lernfortschritts über alle Zertifizierungen hinweg."
      icon={BarChart3}
    />
  );
}
