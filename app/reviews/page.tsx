"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { Star } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.reviewsPage.title")}
      description={t("comingSoon.reviewsPage.description")}
      icon={Star}
    />
  );
}
