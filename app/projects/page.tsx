"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { FolderKanban } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.projectsPage.title")}
      description={t("comingSoon.projectsPage.description")}
      icon={FolderKanban}
    />
  );
}
