"use client";

import { useMemo } from "react";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";
import { Users, MessageSquare, CheckCircle2, Trophy, Calendar } from "lucide-react";

// Illustrative "who's online now" list — same marketing-catalog convention
// as the platform stat cards (lib/companiesData.ts pattern): shows what a
// live community looks like, not a claim about this specific account's
// real-time connections (which isn't built yet — presence tracking would
// need its own realtime infrastructure).
const onlineMembers = [
  { name: "Maximilian", activity: "Lernt: Python", status: "online" as const },
  { name: "Sophie_L", activity: "Lernt: Deutsch B1", status: "online" as const },
  { name: "All_R", activity: "Lernt: Azure", status: "online" as const },
  { name: "Thomas IT", activity: "Lernt: Linux", status: "away" as const },
  { name: "JuliaCode", activity: "Lernt: JavaScript", status: "online" as const },
];

const upcomingEvents = [
  { day: "02", month: "MAI", titleKey: "community.event1Title", time: "18:00 - 19:30 Uhr" },
  { day: "05", month: "MAI", titleKey: "community.event2Title", time: "17:00 - 20:00 Uhr" },
  { day: "09", month: "MAI", titleKey: "community.event3Title", time: "10:00 - 12:00 Uhr" },
];

export default function CommunitySidebar() {
  const { t } = useLocale();
  const posts = useCommunityStore((s) => s.posts);

  const realPosts = useMemo(() => posts.filter((p) => !p.isSample), [posts]);

  const stats = useMemo(
    () => [
      { icon: Users, value: 1, labelKey: "community.statMembers" }, // the signed-in user themself; grows as real people join
      { icon: MessageSquare, value: realPosts.length, labelKey: "community.statNewPosts" },
      { icon: CheckCircle2, value: realPosts.filter((p) => p.postType === "question" && p.isResolved).length, labelKey: "community.statResolved" },
      { icon: Trophy, value: realPosts.filter((p) => p.postType === "achievement").length, labelKey: "community.statAchievements" },
    ],
    [realPosts]
  );

  const trendingTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of realPosts) {
      for (const tag of p.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [realPosts]);

  return (
    <aside className="space-y-4">
      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h2 className="mb-4 text-sm font-bold text-text">{t("community.overviewTitle")}</h2>
        <div className="space-y-3">
          {stats.map((s) => (
            <div key={s.labelKey} className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-text-muted">
                <s.icon size={14} className="text-primary" />
                {t(s.labelKey)}
              </span>
              <span className="text-sm font-bold text-text">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h2 className="mb-3 text-sm font-bold text-text">{t("community.trendingTitle")}</h2>
        {trendingTags.length === 0 ? (
          <p className="text-xs text-text-faint">{t("community.noTrendingYet")}</p>
        ) : (
          <ul className="space-y-2.5">
            {trendingTags.map(([tag, count], i) => (
              <li key={tag} className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-panel-alt text-[10px] font-bold text-text-faint">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-text">#{tag}</p>
                  <p className="text-[10px] text-text-faint">
                    {count} {t("community.postsSuffix")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h2 className="mb-3 text-sm font-bold text-text">{t("community.onlineMembersTitle")}</h2>
        <ul className="space-y-3">
          {onlineMembers.map((m) => (
            <li key={m.name} className="flex items-center gap-2.5">
              <div className="relative">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-panel-alt text-xs font-bold text-text-muted">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-panel ${
                    m.status === "online" ? "bg-success" : "bg-warning"
                  }`}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-text">{m.name}</p>
                <p className="truncate text-[10px] text-text-faint">{m.activity}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border-soft bg-panel p-5">
        <h2 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-text">
          <Calendar size={14} className="text-primary" />
          {t("community.upcomingEventsTitle")}
        </h2>
        <ul className="space-y-3">
          {upcomingEvents.map((e) => (
            <li key={e.titleKey} className="flex items-start gap-3">
              <div className="flex w-10 shrink-0 flex-col items-center rounded-lg bg-panel-alt py-1 text-center">
                <span className="text-[9px] font-bold uppercase text-text-faint">{e.month}</span>
                <span className="text-sm font-extrabold text-text">{e.day}</span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-text">{t(e.titleKey)}</p>
                <p className="text-[10px] text-text-faint">{e.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
