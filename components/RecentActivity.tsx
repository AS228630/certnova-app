const activities = [
  { text: "Azure Storage Grundlagen abgeschlossen", xp: "+20 XP", time: "vor 2 Std." },
  { text: "Übungstest bestanden (85%)", xp: "+50 XP", time: "vor 5 Std." },
  { text: "Lab abgeschlossen: VM bereitstellen", xp: "+30 XP", time: "vor 1 Tag" },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <h2 className="mb-4 font-bold text-text">Letzte Aktivität</h2>
      <ul className="space-y-4">
        {activities.map((a) => (
          <li key={a.text} className="flex items-start justify-between text-sm">
            <div>
              <p className="text-text-muted">{a.text}</p>
              <p className="text-xs text-text-faint">{a.time}</p>
            </div>
            <span className="text-xs font-bold text-success">{a.xp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
