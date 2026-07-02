"use client";

import { ChevronDown } from "lucide-react";

const monthStats = [
  { label: "Lernzeit", value: "22h 45m", delta: "+16% vs. letzter Monat" },
  { label: "Fragen gelöst", value: "2.340", delta: "+22% vs. letzter Monat" },
  { label: "Durchschnittswert", value: "82%", delta: "+18% vs. letzter Monat" },
];

const skills = [
  { label: "Cloud", value: 90, color: "#6d4cff" },
  { label: "Sicherheit", value: 76, color: "#3b82f6" },
  { label: "Netzwerke", value: 72, color: "#14b8a6" },
  { label: "Linux", value: 65, color: "#f59e0b" },
  { label: "DevOps", value: 60, color: "#ef4444" },
];

const total = skills.reduce((sum, s) => sum + s.value, 0);
const average = Math.round(skills.reduce((sum, s) => sum + s.value, 0) / skills.length);

const radius = 40;
const circumference = 2 * Math.PI * radius;

const skillsWithOffset = skills.reduce<
  { label: string; value: number; color: string; pct: number; offset: number }[]
>((acc, s) => {
  const pct = (s.value / total) * 100;
  const prevOffset = acc.length > 0 ? acc[acc.length - 1].offset + acc[acc.length - 1].pct : 0;
  acc.push({ ...s, pct, offset: prevOffset });
  return acc;
}, []);

function Donut() {
  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        {skillsWithOffset.map((s) => {
          const dash = (s.pct / 100) * circumference;
          return (
            <circle
              key={s.label}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={s.color}
              strokeWidth="10"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-((s.offset / 100) * circumference)}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-xl font-extrabold text-text">{average}%</span>
        <span className="text-[10px] text-text-faint">Durchschnitt</span>
      </div>
    </div>
  );
}

export default function ProgressPanel() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Fortschrittsübersicht</h2>
        <button className="flex items-center gap-1 text-xs font-medium text-text-muted hover:text-text">
          Diesen Monat
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {monthStats.map((s) => (
          <div key={s.label}>
            <p className="text-[11px] text-text-faint">{s.label}</p>
            <p className="mt-1 text-lg font-extrabold text-text">{s.value}</p>
            <p className="mt-0.5 text-[10px] font-medium text-success">{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 border-t border-border-soft pt-5 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-semibold text-text-muted">Fähigkeiten</p>
          <div className="space-y-3">
            {skills.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-text-muted">{s.label}</span>
                  <span className="font-semibold text-text">{s.value}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-panel-alt">
                  <div
                    className="h-1.5 rounded-full"
                    style={{ width: `${s.value}%`, backgroundColor: s.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold text-text-muted">Leistung nach Thema</p>
          <div className="flex flex-col items-center gap-4">
            <Donut />
            <ul className="w-full space-y-1.5">
              {skills.map((s) => (
                <li key={s.label} className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-text-muted">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                  </span>
                  <span className="font-semibold text-text">{s.value}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
