import ComingSoonPage from "@/components/ComingSoonPage";
import { Settings } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Einstellungen"
      description="Konto-, Benachrichtigungs- und Datenschutzeinstellungen sind in Arbeit."
      icon={Settings}
    />
  );
}
