"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Bot } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.aiCoach.title")}
      description={t("comingSoon.aiCoach.description")}
      icon={Bot}
    />
  );
}
