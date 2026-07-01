
"use client";

import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const trend = [
  { day: "May 1", score: 62 },
  { day: "May 8", score: 68 },
  { day: "May 15", score: 71 },
  { day: "May 22", score: 75 },
  { day: "May 29", score: 78 },
];

const topics = [
  { name: "Networking", value: 85, color: "#2F6FED" },
  { name: "Security", value: 76, color: "#7C6FF0" },
  { name: "Identity", value: 72, color: "#16A34A" },
  { name: "Storage", value: 68, color: "#F5A524" },
  { name: "Compute", value: 90, color: "#0EA5E9" },
];

export default function ProgressPanel() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Your Progress</h2>
        <span className="text-xs text-slate-400">This Month</span>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3 text-center">
        <div>
          <p className="text-lg font-extrabold text-slate-900">18h 45m</p>
          <p className="text-xs text-slate-400">Study Time</p>
          <p className="text-[10px] font-semibold text-success">+12% from last month</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-slate-900">1,248</p>
          <p className="text-xs text-slate-400">Questions Solved</p>
          <p className="text-[10px] font-semibold text-success">+18% from last month</p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-slate-900">78%</p>
          <p className="text-xs text-slate-400">Avg. Score</p>
          <p className="text-[10px] font-semibold text-success">+25% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">Score Trend</p>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#2F6FED"
                  strokeWidth={2}
                  dot={{ r: 3, fill: "#2F6FED" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold text-slate-500">Performance by Topic</p>
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topics}
                    dataKey="value"
                    innerRadius={26}
                    outerRadius={38}
                    startAngle={90}
                    endAngle={450}
                  >
                    {topics.map((t) => (
                      <Cell key={t.name} fill={t.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-sm font-extrabold text-slate-900">78%</span>
              </div>
            </div>
            <ul className="space-y-1">
              {topics.map((t) => (
                <li key={t.name} className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }} />
                  {t.name} {t.value}%
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
