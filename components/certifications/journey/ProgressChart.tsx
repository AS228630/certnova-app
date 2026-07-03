import type { ProgressPoint } from "@/lib/journeyData";

export default function ProgressChart({ points }: { points: ProgressPoint[] }) {
  const w = 560;
  const h = 200;
  const padL = 36;
  const padB = 24;
  const padT = 16;
  const max = 100;

  const stepX = (w - padL - 16) / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: padL + i * stepX,
    y: padT + (1 - p.value / max) * (h - padT - padB),
    ...p,
  }));

  const path = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`).join(" ");
  const areaPath = `${path} L${coords[coords.length - 1].x},${h - padB} L${coords[0].x},${h - padB} Z`;
  const last = coords[coords.length - 1];
  const gridValues = [0, 25, 50, 75, 100];

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <p className="mb-4 font-bold text-text">Fortschrittsverlauf</p>
      <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full">
        <defs>
          <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6d4cff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6d4cff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridValues.map((v) => {
          const y = padT + (1 - v / max) * (h - padT - padB);
          return (
            <g key={v}>
              <line x1={padL} x2={w} y1={y} y2={y} stroke="#232840" strokeWidth={1} />
              <text x={0} y={y + 4} fontSize={11} fill="#8b8fa8">
                {v}%
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="url(#progressFill)" />
        <path d={path} fill="none" stroke="#6d4cff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {coords.map((c) => (
          <circle key={c.label} cx={c.x} cy={c.y} r={3} fill="#0a0d1a" stroke="#6d4cff" strokeWidth={2} />
        ))}

        {/* highlight last point like the approved design */}
        <g>
          <circle cx={last.x} cy={last.y} r={5} fill="#6d4cff" />
          <rect x={last.x - 18} y={last.y - 28} width={38} height={20} rx={6} fill="#6d4cff" />
          <text x={last.x} y={last.y - 14} fontSize={11} fontWeight={700} fill="#ffffff" textAnchor="middle">
            {last.value}%
          </text>
        </g>

        {coords.map((c, i) =>
          i % Math.ceil(coords.length / 6) === 0 || i === coords.length - 1 ? (
            <text key={`x-${c.label}`} x={c.x} y={h + 8} fontSize={10} fill="#8b8fa8" textAnchor="middle">
              {c.label}
            </text>
          ) : null
        )}
      </svg>
    </div>
  );
}
