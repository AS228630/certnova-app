const activities = [
  { text: "Completed: Azure Storage Basics", xp: "+20 XP", time: "2h ago" },
  { text: "Passed a Practice Test (85% Score)", xp: "+50 XP", time: "5h ago" },
  { text: "Completed Lab: Deploy VM", xp: "+30 XP", time: "1d ago" },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="mb-4 font-bold text-navy">Recent Activity</h2>
      <ul className="space-y-4">
        {activities.map((a) => (
          <li key={a.text} className="flex items-start justify-between text-sm">
            <div>
              <p className="text-slate-700">{a.text}</p>
              <p className="text-xs text-slate-400">{a.time}</p>
            </div>
            <span className="text-xs font-bold text-emerald-600">{a.xp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
