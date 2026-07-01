const leaders = [
  { name: "Sarah J.", xp: 2450 },
  { name: "Mike R.", xp: 2150 },
  { name: "Arman (You)", xp: 1850, isUser: true },
  { name: "Emma T.", xp: 1650 },
];

export default function Leaderboard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-navy">Leaderboard</h2>
        <span className="text-xs text-slate-400">This Month</span>
      </div>
      <ul className="space-y-3">
        {leaders.map((l, i) => (
          <li
            key={l.name}
            className={`flex items-center justify-between text-sm ${
              l.isUser ? "font-bold text-navy" : "text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-4 text-slate-400">{i + 1}</span>
              {l.name}
            </span>
            <span className="text-gold">{l.xp} XP</span>
          </li>
        ))}
      </ul>
    </div>
  );
}