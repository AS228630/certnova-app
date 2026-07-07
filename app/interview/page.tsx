import ComingSoonPage from "@/components/ComingSoonPage";
import { MessagesSquare } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Interview-Vorbereitung"
      description="Übe echte Interviewfragen und bereite dich gezielt auf dein nächstes Vorstellungsgespräch vor."
      icon={MessagesSquare}
    />
  );
}
