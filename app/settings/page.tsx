"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Settings } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.settingsPage.title")}
      description={t("comingSoon.settingsPage.description")}
      icon={Settings}
    />
  );
}
