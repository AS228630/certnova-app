import { CheckCircle2, XCircle, SkipForward, BadgeCheck } from "lucide-react";

export default function QuickStats({
  answered,
  correct,
  wrong,
  skipped,
  bestStreak,
}: {
  answered: number;
  correct: number;
  wrong: number;
  skipped: number;
  bestStreak: number;
}) {
  const avg = answered === 0 ? 0 : Math.round((correct / answered) * 100);

  return (
    <div className="rounded-xl border border-border-soft bg-panel p-5">
      <p className="mb-4 font-bold text-text">Schnellstatistik</p>

      <div className="grid grid-cols-2 gap-3">
        <StatBox icon={BadgeCheck} value={answered} label="Beantwortet" color="text-primary" />
        <StatBox icon={CheckCircle2} value={correct} label="Richtig" color="text-success" />
        <StatBox icon={XCircle} value={wrong} label="Falsch" color="text-danger" />
        <StatBox icon={SkipForward} value={skipped} label="Übersprungen" color="text-text-muted" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border-soft pt-4 text-sm">
        <div>
          <p className="text-xs text-text-muted">Beste Serie</p>
          <p className="font-bold text-text">{bestStreak}</p>
        </div>
        <div>
          <p className="text-xs text-text-muted">Durchschnitt</p>
          <p className="font-bold text-text">{avg}%</p>
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
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-panel-alt p-3">
      <Icon size={16} className={color} />
      <div>
        <p className={`text-sm font-extrabold ${color}`}>{value}</p>
        <p className="text-[11px] text-text-muted">{label}</p>
      </div>
    </div>
  );
}
