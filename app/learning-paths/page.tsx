import ComingSoonPage from "@/components/ComingSoonPage";
import { Route } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Lernpfade"
      description="Strukturierte, mehrstufige Lernpfade über mehrere Zertifizierungen hinweg."
      icon={Route}
    />
  );
}
