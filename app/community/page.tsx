import ComingSoonPage from "@/components/ComingSoonPage";
import { Users } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Community"
      description="Tausche dich mit anderen Lernenden aus, stelle Fragen und teile dein Wissen."
      icon={Users}
    />
  );
}
