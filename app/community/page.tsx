"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import ComposePost from "@/components/community/ComposePost";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";

const tabs = ["tabForYou", "tabDiscussions", "tabQA", "tabGroups", "tabAchievements", "tabEvents"] as const;

function CommunityBody() {
  const { t } = useLocale();
  const posts = useCommunityStore((s) => s.posts);
  const loaded = useCommunityStore((s) => s.loaded);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("tabForYou");
  const [visibleCount, setVisibleCount] = useState(10);

  const filtered = posts.filter((p) => {
    if (activeTab === "tabQA") return p.postType === "question";
    if (activeTab === "tabAchievements") return p.postType === "achievement";
    if (activeTab === "tabDiscussions") return p.postType === "discussion" || p.postType === "resource";
    return true; // "for you" and groups/events (not yet built) show everything for now
  });
  const visible = filtered.slice(0, visibleCount);

  return (
    <main className="mx-auto max-w-7xl p-3 sm:p-4 md:p-8">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("community.title")}</h1>
          <p className="mt-1 text-sm text-text-muted">{t("community.subtitle")}</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
          <Plus size={16} />
          {t("community.createPostCta")}
        </button>
      </div>

      <div className="no-scrollbar mb-5 flex gap-1 overflow-x-auto border-b border-border-soft">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`shrink-0 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === tab ? "border-primary text-primary" : "border-transparent text-text-faint hover:text-text"
            }`}
          >
            {t(`community.${tab}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <ComposePost />

          {!loaded ? (
            <p className="text-center text-sm text-text-faint">{t("common.loading")}</p>
          ) : visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-soft p-8 text-center">
              <p className="text-sm text-text-faint">{t("community.noPostsYet")}</p>
            </div>
          ) : (
            visible.map((post) => <CommunityPostCard key={post.id} post={post} />)
          )}

          {visibleCount < filtered.length && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => setVisibleCount((c) => c + 10)}
                className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-semibold text-text hover:bg-panel-alt"
              >
                {t("community.loadMore")}
              </button>
            </div>
          )}
        </div>

        <CommunitySidebar />
      </div>
    </main>
  );
}

export default function CommunityPage() {
  return (
    <DashboardShell>
      <CommunityBody />
    </DashboardShell>
  );
}
