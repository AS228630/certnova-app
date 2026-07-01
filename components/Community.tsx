
const posts = [
  { name: "Sarah J.", text: "Just passed AZ-900! 🎉", time: "2h ago", likes: 24, comments: 15 },
  { name: "Mike R.", text: "How to connect Azure VPN", time: "5h ago", likes: 12, comments: 7 },
  { name: "David L.", text: "Shared a helpful resource", time: "1d ago", likes: 18, comments: 3 },
];

export default function Community() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Community</h2>
        <span className="text-xs font-semibold text-primary">See All</span>
      </div>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.name} className="flex items-start gap-3">
            <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-primary to-purple" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{p.name}</p>
              <p className="text-sm text-slate-600">{p.text}</p>
              <p className="mt-1 text-xs text-slate-400">
                {p.time} · {p.likes} likes · {p.comments} comments
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
