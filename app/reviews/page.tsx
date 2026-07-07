import ComingSoonPage from "@/components/ComingSoonPage";
import { Star } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Alle Bewertungen"
      description="Eine vollständige, durchsuchbare Übersicht aller Bewertungen unserer Lernenden ist in Arbeit."
      icon={Star}
    />
  );
}
