"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import CareerPathGrid from "@/components/CareerPathGrid";
import CareerPathDetail from "@/components/CareerPathDetail";
import LearningJourneySteps from "@/components/LearningJourneySteps";
import { getCareerPath } from "@/lib/careerPathsData";
import { useLocale } from "@/components/LocaleProvider";
import { supabase } from "@/lib/supabase/client";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import LearningPathsHero from "@/components/learningPathsLanding/LearningPathsHero";
import PopularPathsGrid from "@/components/learningPathsLanding/PopularPathsGrid";
import HowItWorksSteps from "@/components/learningPathsLanding/HowItWorksSteps";
import WhyCertCoach from "@/components/learningPathsLanding/WhyCertCoach";
import SuccessStories from "@/components/learningPathsLanding/SuccessStories";
import FinalCta from "@/components/learningPathsLanding/FinalCta";
import SectionErrorBoundary from "@/components/SectionErrorBoundary";

function DashboardLearningPathsBody() {
  const { t } = useLocale();
  const [selectedSlug, setSelectedSlug] = useState("it-support-specialist");
  const selectedPath = getCareerPath(selectedSlug);

  return (
    <DashboardShell>
      <main className="mx-auto max-w-6xl space-y-6 p-3 sm:p-4 md:p-8">
        <div>
          <h1 className="text-xl font-extrabold text-text sm:text-2xl">{t("learningPaths.title")}</h1>
          <p className="mt-1 text-sm text-text-muted">{t("learningPaths.subtitle")}</p>
        </div>

        <section>
          <h2 className="mb-3 font-bold text-text">{t("learningPaths.step1Title")}</h2>
          <CareerPathGrid selectedSlug={selectedSlug} onSelect={setSelectedSlug} />
        </section>

        {selectedPath && (
          <section>
            <CareerPathDetail path={selectedPath} />
          </section>
        )}

        <section>
          <h2 className="mb-1 font-bold text-text">{t("learningPaths.step2Title")}</h2>
          <p className="mb-4 text-sm text-text-muted">{t("learningPaths.step2Subtitle")}</p>
          <LearningJourneySteps />
        </section>
      </main>
    </DashboardShell>
  );
}

// Public marketing version shown to visitors who aren't signed in —
// matches the reference design (hero, popular paths, how-it-works,
// why CertCoach, example success stories, final CTA).
function GuestLearningPathsBody() {
  return (
    <div className="min-h-screen bg-bg">
      <LandingHeader />
      <SectionErrorBoundary>
        <LearningPathsHero />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <PopularPathsGrid />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <HowItWorksSteps />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <WhyCertCoach />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <SuccessStories />
      </SectionErrorBoundary>
      <SectionErrorBoundary>
        <FinalCta />
      </SectionErrorBoundary>
      <Footer />
    </div>
  );
}

export default function LearningPathsPage() {
  // Same session-check pattern as LandingHeader: signed-in users get the
  // full interactive dashboard tool they already use via the sidebar;
  // guests get the marketing page. `checking === null` renders nothing
  // briefly rather than flashing the wrong version first.
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
  return signedIn ? <DashboardLearningPathsBody /> : <GuestLearningPathsBody />;
}
