"use client";

import Link from "next/link";
import { GraduationCap, FlaskConical, ClipboardList, CheckCircle2, ArrowRight } from "lucide-react";
import type { ActivityItem } from "@/lib/journeyData";
import { useLocale } from "@/components/LocaleProvider";

const ICONS = {
  book: GraduationCap,
  flask: FlaskConical,
  clipboard: ClipboardList,
  graduation: GraduationCap,
};

export default function JourneyActivity({ items }: { items: ActivityItem[] }) {
  const { t } = useLocale();
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-bold text-text">{t("journey.recentActivity")}</p>
        <Link href="/dashboard" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          {t("journey.viewAllJ")} <ArrowRight size={12} />
        </Link>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-text">{item.title}</p>
                <p className="truncate text-xs text-text-faint">{item.subtitle}</p>
                <p className="text-[11px] text-text-faint">{item.timestamp}</p>
              </div>
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-success" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
