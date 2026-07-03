export default function ProgressRing({
  value,
  size = 80,
  stroke = 8,
  color = "#6d4cff",
  trackColor = "#232840",
  label,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  trackColor?: string;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center leading-none">
        <span className="font-extrabold text-text" style={{ fontSize: size * 0.22 }}>
          {Math.round(value)}%
        </span>
        {label && <span className="mt-1 text-[9px] text-text-faint">{label}</span>}
      </div>
    </div>
  );
}
