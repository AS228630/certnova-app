"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Newspaper } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.newsPage.title")}
      description={t("comingSoon.newsPage.description")}
      icon={Newspaper}
    />
  );
}
