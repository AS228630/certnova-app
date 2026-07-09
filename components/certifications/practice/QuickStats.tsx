"use client";

import { CheckCircle2, SkipForward, Bookmark, Clock3 } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export default function QuickStats({
  answered,
  skipped,
  marked,
  total,
  remainingSeconds,
  totalSeconds,
}: {
  answered: number;
  skipped: number;
  marked: number;
  total: number;
  remainingSeconds: number;
  totalSeconds: number;
}) {
  const { t } = useLocale();
  const remaining = Math.max(0, total - answered - skipped);
  const timePct = totalSeconds === 0 ? 0 : Math.max(0, Math.min(100, (remainingSeconds / totalSeconds) * 100));

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="mb-4 font-bold text-text">{t("practice.myProgress")}</p>

      <div className="grid grid-cols-2 gap-3">
        <StatBox icon={CheckCircle2} value={answered} label={t("practice.answeredQ")} color="text-success" bg="bg-success-light" />
        <StatBox icon={SkipForward} value={skipped} label={t("practice.skippedQ")} color="text-warning" bg="bg-warning/10" />
        <StatBox icon={Bookmark} value={marked} label={t("practice.markedQ")} color="text-primary" bg="bg-primary-light" />
        <StatBox icon={Clock3} value={remaining} label={t("practice.remainingQ")} color="text-text-muted" bg="bg-panel-alt" />
      </div>

      <div className="mt-5 border-t border-border-soft pt-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-text-muted">
            <Clock3 size={13} />
            {t("practice.remainingTime")}
          </span>
          <span className="font-mono font-bold text-text">{formatTime(remainingSeconds)}</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-panel-alt">
          <div
            className={`h-1.5 rounded-full transition-all ${timePct < 15 ? "bg-danger" : "bg-primary"}`}
            style={{ width: `${timePct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon: Icon,
  value,
  label,
  color,
  bg,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number;
  label: string;
  color: string;
  bg: string;
}) {
  return (
    <div className={`rounded-lg p-3 ${bg}`}>
      <Icon size={15} className={color} />
      <p className={`mt-1.5 text-lg font-extrabold ${color}`}>{value}</p>
      <p className="text-[11px] text-text-muted">{label}</p>
    </div>
  );
}
