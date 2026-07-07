import ComingSoonPage from "@/components/ComingSoonPage";
import { FolderKanban } from "lucide-react";

export default function Page() {
  return (
    <ComingSoonPage
      title="Projekte"
      description="Praxisprojekte, mit denen du dein Wissen in realistischen Szenarien anwendest."
      icon={FolderKanban}
    />
  );
}
