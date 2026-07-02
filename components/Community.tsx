import { MessageCircle, Users } from "lucide-react";

const posts = [
  { author: "Sarah J.", text: "Hat jemand Tipps für die AZ-104 Prüfung?", replies: 12 },
  { author: "Mike R.", text: "Habe gerade die Security+ bestanden! 🎉", replies: 8 },
];

export default function Community() {
  return (
    <div className="rounded-2xl border border-border-soft bg-panel p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold text-text">Community</h2>
        <Users size={16} className="text-text-muted" />
      </div>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.text} className="border-t border-border-soft pt-3 first:border-t-0 first:pt-0">
            <p className="text-sm font-semibold text-text">{p.author}</p>
            <p className="mb-2 text-sm text-text-muted">{p.text}</p>
            <span className="flex items-center gap-1 text-xs text-text-faint">
              <MessageCircle size={12} />
              {p.replies} Antworten
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
