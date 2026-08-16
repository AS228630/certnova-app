"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Briefcase, ArrowRight, Lock } from "lucide-react";
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
import { supabase } from "@/lib/supabase/client";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
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

// "Karriere" nav link real destination: previously forced every visitor
// through login (DashboardShell defaulted to requireAuth=true with no
// guest branch at all), so clicking it as a guest silently redirected
// straight to /login — the exact bug being fixed here. Guests now get a
// real, independent page: they can browse real job roles and their
// recommended certifications (InterviewJobGrid/InterviewRecommendedCerts
// are pure data, no user dependency), with the interactive AI mock
// interview session gated behind registration instead of the whole page
// being gated.
function GuestInterviewBody() {
  const { t } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState("it-support-specialist");
  const path = getCareerPath(selectedSlug);

  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <main className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Briefcase size={22} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("interview.title")}</h1>
            <p className="mt-1 text-sm text-text-muted">{t("interview.subtitle")}</p>
          </div>
        </div>

        <section>
          <h2 className="mb-1 font-bold text-text">{t("interview.step1Title")}</h2>
          <p className="mb-4 text-sm text-text-muted">{t("interview.step1Subtitle")}</p>
          <InterviewJobGrid selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
        </section>

        {path && <InterviewRecommendedCerts path={path} />}

        <section className="flex flex-col items-center gap-4 rounded-2xl border border-primary/30 bg-primary/10 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
            <Lock size={22} />
          </div>
          <div>
            <p className="text-base font-bold text-text">KI-gestützte Mock-Interviews</p>
            <p className="mt-1 max-w-md text-sm text-text-muted">
              Registriere dich kostenlos, um echte Interview-Themen zu üben und deinen Fortschritt zu speichern.
            </p>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark"
          >
            Kostenlos registrieren
            <ArrowRight size={14} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function InterviewPage() {
  // Same session-check pattern as /learning-paths: signed-in users get
  // the full interactive tool (mock interviews, saved progress) via
  // DashboardShell; guests get the real-but-simpler page above instead
  // of being redirected away.
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setSignedIn(!!data.session);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(!!session);
    });
    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (signedIn === null) return null;
  if (!signedIn) return <GuestInterviewBody />;

  return (
    <DashboardShell>
      <InterviewBody />
    </DashboardShell>
  );
}
