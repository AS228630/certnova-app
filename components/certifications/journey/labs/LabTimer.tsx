"use client";

import { useEffect, useState } from "react";

export default function LabTimer({ totalMinutes }: { totalMinutes: number }) {
  const [secondsLeft, setSecondsLeft] = useState(totalMinutes * 60 - 27);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const h = Math.floor(secondsLeft / 3600);
  const m = Math.floor((secondsLeft % 3600) / 60);
  const s = secondsLeft % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="rounded-xl border border-border-soft bg-panel px-4 py-2.5 text-right">
      <p className="text-[11px] text-text-faint">Verbleibende Zeit</p>
      <p className="font-mono text-lg font-bold text-text">
        {h > 0 ? `${pad(h)}:` : ""}
        {pad(m)}:{pad(s)}
      </p>
    </div>
  );
}
