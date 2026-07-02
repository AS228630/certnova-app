const leaders = [
  { name: "Sarah J.", xp: 2450 },
  { name: "Mike R.", xp: 2150 },
  { name: "Arman (Du)", xp: 1850, isUser: true },
  { name: "Emma T.", xp: 1650 },
];

export default function Leaderboard() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Bestenliste</h2>
        <span className="text-xs text-text-muted">Dieser Monat</span>
      </div>
      <ul className="space-y-3">
        {leaders.map((l, i) => (
          <li
            key={l.name}
            className={`flex items-center justify-between text-sm ${
              l.isUser ? "font-bold text-primary" : "text-text-muted"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-4 text-text-faint">{i + 1}</span>
              {l.name}
            </span>
            <span className="text-primary">{l.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
