"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { BarChart3 } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.analytics.title")}
      description={t("comingSoon.analytics.description")}
      icon={BarChart3}
    />
  );
}
