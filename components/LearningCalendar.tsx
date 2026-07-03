"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekdays = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const monthNames = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];

export default function LearningCalendar() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayIndex).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Lernkalender</h2>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>
            {monthNames[month]} {year}
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            aria-label="Vorheriger Monat"
            className="rounded p-0.5 hover:bg-panel-alt hover:text-text"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            aria-label="Nächster Monat"
            className="rounded p-0.5 hover:bg-panel-alt hover:text-text"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-text-faint">
        {weekdays.map((d) => (
          <span key={d} className="py-1 font-medium">
            {d}
          </span>
        ))}
        {cells.map((day, i) =>
          day === null ? (
            <span key={`empty-${i}`} />
          ) : (
            <span
              key={day}
              className={`flex h-7 w-7 items-center justify-center justify-self-center rounded-full text-xs ${
                isToday(day)
                  ? "bg-primary font-bold text-white"
                  : "text-text-muted hover:bg-panel-alt"
              }`}
            >
              {day}
            </span>
          )
        )}
      </div>
    </div>
  );
}
