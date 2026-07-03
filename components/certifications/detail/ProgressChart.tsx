"use client";

import { useState } from "react";
import type { TrendPoint } from "@/lib/certJourney";

const WIDTH = 560;
const HEIGHT = 200;
const PAD_LEFT = 34;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 24;

export default function ProgressChart({ trend }: { trend: TrendPoint[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const innerW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const maxVal = 100;

  const points = trend.map((t, i) => {
    const x = PAD_LEFT + (trend.length === 1 ? 0 : (i / (trend.length - 1)) * innerW);
    const y = PAD_TOP + innerH * (1 - t.value / maxVal);
    return { x, y, ...t };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PAD_TOP + innerH} L ${points[0].x} ${PAD_TOP + innerH} Z`;

  const yTicks = [0, 25, 50, 75, 100];
  const activePoint = hoverIndex !== null ? points[hoverIndex] : points[points.length - 1];

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">Fortschrittsverlauf</h2>
      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" style={{ minWidth: 320 }}>
          <defs>
            <linearGradient id="progressFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((tick) => {
            const y = PAD_TOP + innerH * (1 - tick / maxVal);
            return (
              <g key={tick}>
                <line
                  x1={PAD_LEFT}
                  y1={y}
                  x2={WIDTH - PAD_RIGHT}
                  y2={y}
                  stroke="var(--color-border-soft)"
                  strokeDasharray="3 3"
                />
                <text x={0} y={y + 3} fontSize="9" fill="var(--color-text-faint)">
                  {tick}%
                </text>
              </g>
            );
          })}

          <path d={areaPath} fill="url(#progressFill)" />
          <path d={linePath} fill="none" stroke="var(--color-primary)" strokeWidth="2.5" />

          {points.map((p, i) => (
            <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              <circle cx={p.x} cy={p.y} r={hoverIndex === i ? 5 : 3} fill="var(--color-primary)" />
              <rect x={p.x - 14} y={PAD_TOP} width={28} height={innerH} fill="transparent" />
              <text x={p.x} y={HEIGHT - 6} fontSize="9" fill="var(--color-text-faint)" textAnchor="middle">
                {p.label}
              </text>
            </g>
          ))}

          <g>
            <rect
              x={activePoint.x - 16}
              y={activePoint.y - 26}
              width={32}
              height={18}
              rx={6}
              fill="var(--color-primary)"
            />
            <text
              x={activePoint.x}
              y={activePoint.y - 13}
              fontSize="10"
              fontWeight="bold"
              fill="white"
              textAnchor="middle"
            >
              {activePoint.value}%
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
