"use client";

import { useMemo } from "react";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";
import { Users, MessageSquare, CheckCircle2, Trophy } from "lucide-react";

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
    </aside>
  );
}
