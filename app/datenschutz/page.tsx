"use client";

import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";
import { ShieldCheck } from "lucide-react";

export default function Page() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.datenschutz.title")}
      description={t("comingSoon.datenschutz.description")}
      icon={ShieldCheck}
    />
  );
}
