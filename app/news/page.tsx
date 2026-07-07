import ComingSoonPage from "@/components/ComingSoonPage";
import { Newspaper } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Aktuelles"
      description="Neuigkeiten, Produkt-Updates und Ankündigungen rund um CertCoach."
      icon={Newspaper}
    />
  );
}
