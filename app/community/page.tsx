"use client";

import { useState } from "react";
import { Plus, Users, MessageSquare, CheckCircle2, Trophy, Video } from "lucide-react";
import DashboardShell from "@/components/DashboardShell";
import ComposePost from "@/components/community/ComposePost";
import CommunityPostCard from "@/components/community/CommunityPostCard";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import LiveStudyModal from "@/components/community/LiveStudyModal";
import { useCommunityStore } from "@/lib/store/communityStore";
import { useLocale } from "@/components/LocaleProvider";

const tabs = ["tabForYou", "tabDiscussions", "tabQA", "tabGroups", "tabAchievements", "tabEvents"] as const;

// Catalog-level marketing numbers for the platform-wide stat cards — same
// convention already established in lib/companiesData.ts (illustrative
// platform scale, not per-user data). Distinct from the sidebar's
// "Community-Überblick", which reflects this account's real activity.
const platformStats = [
  { icon: Users, value: "128.420+", labelKey: "community.statActiveMembers", changeKey: "+2,5%" },
  { icon: MessageSquare, value: "34.680", labelKey: "community.statTotalPosts", changeKey: "+8,1%" },
  { icon: CheckCircle2, value: "12.540", labelKey: "community.statSolvedQuestions", changeKey: "+5,2%" },
  { icon: Trophy, value: "4.280", labelKey: "community.statCelebratedAchievements", changeKey: "+3,7%" },
];

const recommendedTopics = ["AWS Solutions Architect", "Azure Administrator", "Deutsch B1", "Linux Basics", "KI & AI", "Netzwerke"];

function CommunityBody() {
  const { t } = useLocale();
  const posts = useCommunityStore((s) => s.posts);
  const loaded = useCommunityStore((s) => s.loaded);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("tabForYou");
  const [visibleCount, setVisibleCount] = useState(10);
  const [showLiveStudy, setShowLiveStudy] = useState(false);

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

      <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {platformStats.map((s) => (
          <div key={s.labelKey} className="rounded-xl border border-border-soft bg-panel p-4">
            <s.icon size={18} className="mb-2 text-primary" />
            <p className="text-lg font-extrabold text-text sm:text-xl">{s.value}</p>
            <p className="text-xs text-text-faint">{t(s.labelKey)}</p>
            <p className="mt-1 text-[11px] font-semibold text-success">{s.changeKey} {t("community.thisWeek")}</p>
          </div>
        ))}
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

          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-bold text-text">{t("community.recommendedTopicsTitle")}</p>
              <button className="text-xs font-semibold text-primary hover:underline">{t("community.viewAll")}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendedTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-border-soft px-3 py-1.5 text-xs font-semibold text-text-muted hover:border-primary/40"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-panel to-fuchsia-500/10 p-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">{t("community.newBadge")}</span>
              <p className="font-bold text-text">{t("community.liveStudyTitle")}</p>
              <span className="rounded-full bg-panel-alt px-2 py-0.5 text-[10px] font-bold text-text-faint">BETA</span>
            </div>
            <p className="mt-1.5 max-w-md text-sm text-text-muted">{t("community.liveStudyDesc")}</p>
            <button
              onClick={() => setShowLiveStudy(true)}
              className="mt-3 flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary-dark"
            >
              <Video size={13} />
              {t("community.liveStudyOpenCta")}
            </button>
          </div>

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

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-6 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="font-extrabold text-white">{t("community.bottomCtaTitle")}</h2>
          <p className="mt-1 text-sm text-white/80">{t("community.bottomCtaDesc")}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button className="rounded-lg border border-white/40 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/10">
            {t("community.discoverGroupsCta")}
          </button>
          <button className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-primary hover:bg-white/90">
            {t("community.createPostCta")}
          </button>
        </div>
      </div>

      {showLiveStudy && <LiveStudyModal onClose={() => setShowLiveStudy(false)} />}
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
