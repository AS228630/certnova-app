"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { LifeBuoy } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.help.title")}
      description={t("comingSoon.help.description")}
      icon={LifeBuoy}
    />
  );
}
