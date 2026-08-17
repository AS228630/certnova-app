"use client";

import { Briefcase } from "lucide-react";
import ComingSoonPage from "@/components/ComingSoonPage";
import { useLocale } from "@/components/LocaleProvider";

// Real material (structured interview questions per real role, real
// prep content) doesn't exist yet - locked with the same generic
// "coming soon" pattern as every other not-yet-real feature (Learn,
// Labs, Exam Simulation), per the owner's explicit decision. The
// comingSoon.interview i18n key already existed (used elsewhere as the
// canonical example for this exact page) - reused, not duplicated.
export default function InterviewPage() {
  const { t } = useLocale();
  return (
    <ComingSoonPage
      title={t("comingSoon.interview.title")}
      description={t("comingSoon.interview.description")}
      icon={Briefcase}
    />
  );
}
