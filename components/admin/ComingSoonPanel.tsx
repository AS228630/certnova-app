import type { LucideIcon } from 'lucide-react';
import { Construction } from 'lucide-react';

export default function ComingSoonPanel({
  icon: Icon,
  label,
  description,
}: {
  icon: LucideIcon;
  label: string;
  description: string;
}) {
  return (
    <div
      className="rounded-2xl p-10 flex flex-col items-center text-center gap-4 max-w-xl mx-auto mt-10"
      style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
        <Icon size={26} color="var(--color-primary-hover)" />
      </div>
      <div className="flex items-center gap-2 text-xs px-3 py-1 rounded-full" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-warning)' }}>
        <Construction size={13} />
        In Entwicklung
      </div>
      <h2 className="text-lg font-bold">{label}</h2>
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{description}</p>
      <p className="text-sm" style={{ color: 'var(--color-text-faint)' }}>
        Dieser Bereich wird bald verfügbar sein — wir arbeiten bereits daran.
      </p>
    </div>
  );
}
