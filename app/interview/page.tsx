"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import InterviewJobGrid from "@/components/interview/InterviewJobGrid";
import InterviewRecommendedCerts from "@/components/interview/InterviewRecommendedCerts";
import InterviewTopicGrid from "@/components/interview/InterviewTopicGrid";
import InterviewPrepActions from "@/components/interview/InterviewPrepActions";
import InterviewSidebar from "@/components/interview/InterviewSidebar";
import MockInterviewModal from "@/components/interview/MockInterviewModal";
import { getCareerPath } from "@/lib/careerPathsData";
import { getInterviewTopics } from "@/lib/interviewData";
import { useInterviewStore } from "@/lib/store/interviewStore";
import { useLocale } from "@/components/LocaleProvider";
import type { InterviewTopic } from "@/lib/interviewData";

function InterviewBody() {
  const { t } = useLocale();
  const storedCareerGoal = useInterviewStore((s) => s.careerGoalId);
  const setCareerGoal = useInterviewStore((s) => s.setCareerGoal);
  const loaded = useInterviewStore((s) => s.loaded);

  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [mockTopic, setMockTopic] = useState<InterviewTopic | undefined>(undefined);
  const [mockOpen, setMockOpen] = useState(false);

  const activeSlug = selectedSlug ?? storedCareerGoal ?? "it-support-specialist";
  const path = getCareerPath(activeSlug);
  const topics = getInterviewTopics(activeSlug);

  function handleSelectJob(slug: string) {
    setSelectedSlug(slug);
    setCareerGoal(slug);
  }

  function openMock(topic?: InterviewTopic) {
    setMockTopic(topic);
    setMockOpen(true);
  }

  if (!loaded || !path) {
    return (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-sm text-text-faint">{t("common.loading")}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-3 sm:p-4 md:p-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-bold text-primary">
              {t("interview.badge")}
            </span>
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("interview.title")}</h1>
            <p className="mt-1 text-sm text-text-muted">{t("interview.subtitle")}</p>
          </div>

          <section>
            <h2 className="mb-1 font-bold text-text">{t("interview.step1Title")}</h2>
            <p className="mb-4 text-sm text-text-muted">{t("interview.step1Subtitle")}</p>
            <InterviewJobGrid selectedSlug={activeSlug} onSelect={handleSelectJob} />
          </section>

          <InterviewRecommendedCerts path={path} />

          <InterviewTopicGrid topics={topics} onPractice={(topic) => openMock(topic)} />

          <InterviewPrepActions onStartMock={() => openMock(undefined)} />
        </div>

        <InterviewSidebar topics={topics} />
      </div>

      {mockOpen && (
        <MockInterviewModal
          path={path}
          sessionType={mockTopic ? "technical" : "mock"}
          topic={mockTopic}
          onClose={() => setMockOpen(false)}
        />
      )}
    </main>
  );
}

export default function InterviewPage() {
  return (
    <DashboardShell>
      <InterviewBody />
    </DashboardShell>
  );
}
