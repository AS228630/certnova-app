"use client";

import { Gift, ArrowRight } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function ReadyForMoreCard({ onInvite }: { onInvite: () => void }) {
  const { t } = useLocale();
  return (
    <div className="rounded-2xl border border-border-soft bg-gradient-to-br from-primary/15 via-panel to-panel p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
        <Gift size={18} />
      </div>
      <p className="mb-1 text-sm font-bold text-text">{t("readyForMore.title")}</p>
      <p className="mb-4 text-xs leading-relaxed text-text-muted">{t("readyForMore.desc")}</p>
      <button
        onClick={onInvite}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
      >
        {t("readyForMore.inviteBtn")}
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
