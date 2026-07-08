"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Route } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.learningPathsPage.title")}
      description={t("comingSoon.learningPathsPage.description")}
      icon={Route}
    />
  );
}
