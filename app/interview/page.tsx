"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { MessagesSquare } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.interview.title")}
      description={t("comingSoon.interview.description")}
      icon={MessagesSquare}
    />
  );
}
