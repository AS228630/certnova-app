"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Languages } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.languageCoursesPage.title")}
      description={t("comingSoon.languageCoursesPage.description")}
      icon={Languages}
    />
  );
}
