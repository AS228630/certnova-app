"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/components/UserContext";
import { getLeaderboard, type LeaderboardRow } from "@/lib/store/userProgressStore";

export default function Leaderboard() {
  const { user } = useUser();
  const [leaders, setLeaders] = useState<LeaderboardRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!user) return;
    getLeaderboard(user.id).then((rows) => {
      setLeaders(rows);
      setLoaded(true);
    });
  }, [user]);

  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Bestenliste</h2>
        <span className="text-xs text-text-muted">Alle Zeit</span>
      </div>

      {!loaded ? (
        <p className="text-sm text-text-faint">Lädt...</p>
      ) : leaders.length === 0 ? (
        <p className="text-sm text-text-faint">Noch keine Einträge — sei der/die Erste!</p>
      ) : (
        <ul className="space-y-3">
          {leaders.map((l, i) => (
            <li
              key={`${l.display_name}-${i}`}
              className={`flex items-center justify-between text-sm ${
                l.isUser ? "font-bold text-primary" : "text-text-muted"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="w-4 text-text-faint">{i + 1}</span>
                {l.display_name}
                {l.isUser && " (Du)"}
              </span>
              <span className="text-primary">{l.xp} XP</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
