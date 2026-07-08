"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Pencil,
  MapPin,
  Calendar,
  Linkedin,
  Github,
  Twitter,
  Link2,
  LayoutGrid,
  GraduationCap,
  BookOpen,
  FlaskConical,
  ClipboardCheck,
  Trophy,
  Award,
  BadgeCheck,
  Flame,
  Star,
} from "lucide-react";
import { useUser } from "@/components/UserContext";
import { getFullName } from "@/lib/supabase/useUser";
import { companies } from "@/lib/companiesData";
import { generateCertificatePdf } from "@/lib/generateCertificate";
import { useLocale } from "@/components/LocaleProvider";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { getLearnTrack } from "@/lib/learnData";
import AvatarUpload from "@/components/AvatarUpload";

const TAB_KEYS = ["overview", "paths", "learn", "labs", "exams", "achievements", "badges", "certificates"] as const;
type TabKey = (typeof TAB_KEYS)[number];

export default function ProfileClient() {
  const { user } = useUser();
  const { t } = useLocale();
  const progress = useUserProgressStore((s) => s.progress);
  const profile = useProfileStore((s) => s.profile);
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const detailMap = useCertProgressStore((s) => s.detailMap);
  const lessonCompletions = useLessonCompletionStore((s) => s.completions);
  const [tab, setTab] = useState<TabKey>("overview");

  useEffect(() => {
    if (!user) return;
    Object.keys(progressMap).forEach((certId) => {
      useLessonCompletionStore.getState().loadForCert(user.id, certId);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, Object.keys(progressMap).join(",")]);

  if (!user) return null;

  const displayName = profile?.full_name || getFullName(user);
  const initial = displayName.charAt(0).toUpperCase();
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("de-DE", { month: "long", year: "numeric" })
    : "-";

  const studyHours = Math.round((progress?.study_minutes_total ?? 0) / 60);
  const pathsInProgress = Object.values(progressMap).filter((p) => p > 0).length;
  const pathsCompleted = Object.values(progressMap).filter((p) => p >= 100).length;
  const labsCompleted = progress?.labs_completed ?? 0;
  const questionsAnswered = progress?.questions_answered ?? 0;
  const questionsCorrect = progress?.questions_correct ?? 0;
  const avgScore = questionsAnswered === 0 ? 0 : Math.round((questionsCorrect / questionsAnswered) * 100);
  const streak = progress?.streak_days ?? 0;
  const xp = progress?.xp ?? 0;

  // Real, milestone-based badges — each one only "unlocked" once the
  // underlying real stat actually crosses the threshold. No fake badges.
  const badges = [
    { id: "first-steps", label: t("profile.badgeFirstSteps"), icon: Star, unlocked: xp > 0, desc: t("profile.badgeFirstStepsDesc") },
    { id: "lab-master", label: t("profile.badgeLabMaster"), icon: FlaskConical, unlocked: labsCompleted >= 5, desc: t("profile.badgeLabMasterDesc") },
    { id: "practice-expert", label: t("profile.badgePracticeExpert"), icon: ClipboardCheck, unlocked: questionsAnswered >= 50, desc: t("profile.badgePracticeExpertDesc") },
    { id: "streak-7", label: t("profile.badgeStreak7"), icon: Flame, unlocked: streak >= 7, desc: t("profile.badgeStreak7Desc") },
    { id: "path-complete", label: t("profile.badgeCertified"), icon: BadgeCheck, unlocked: pathsCompleted >= 1, desc: t("profile.badgeCertifiedDesc") },
    { id: "high-achiever", label: t("profile.badgeHighAchiever"), icon: Trophy, unlocked: avgScore >= 90 && questionsAnswered >= 20, desc: t("profile.badgeHighAchieverDesc") },
  ];
  const unlockedBadges = badges.filter((b) => b.unlocked);

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-border-soft bg-panel p-5 sm:p-6">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <AvatarUpload userId={user.id} initial={initial} size={96} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-extrabold text-text">{displayName}</h1>
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-bold text-primary">{t("profile.learnerBadge")}</span>
            </div>
            {profile?.bio && <p className="mt-1 text-sm text-text-muted">{profile.bio}</p>}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-faint">
              {profile?.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {profile.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {t("profile.joined")}: {joinedDate}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3 text-text-faint">
              <Linkedin size={16} className="cursor-pointer hover:text-primary" />
              <Github size={16} className="cursor-pointer hover:text-primary" />
              <Twitter size={16} className="cursor-pointer hover:text-primary" />
              <Link2 size={16} className="cursor-pointer hover:text-primary" />
            </div>
          </div>

          <Link
            href="/settings"
            className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-1.5 text-xs font-semibold text-text hover:border-primary"
          >
            <Pencil size={13} />
            {t("profile.editProfile")}
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-5 sm:grid-cols-3 lg:grid-cols-6">
          <StatBlock value={studyHours} label={t("profile.statStudyHours")} />
          <StatBlock value={pathsInProgress} label={t("profile.statPaths")} />
          <StatBlock value={labsCompleted} label={t("profile.statLabsCompleted")} />
          <StatBlock value={`${avgScore}%`} label={t("profile.statAvgScore")} />
          <StatBlock value={pathsCompleted} label={t("profile.statCertificates")} />
          <StatBlock value={unlockedBadges.length} label={t("profile.statBadges")} />
        </div>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border-soft">
        {TAB_KEYS.map((key) => {
          const Icon = {
            overview: LayoutGrid,
            paths: GraduationCap,
            learn: BookOpen,
            labs: FlaskConical,
            exams: ClipboardCheck,
            achievements: Trophy,
            badges: Award,
            certificates: BadgeCheck,
          }[key];
          const labelKey = {
            overview: "profile.profileTabOverview",
            paths: "profile.profileTabPaths",
            learn: "profile.profileTabLearn",
            labs: "profile.profileTabLabs",
            exams: "profile.profileTabExams",
            achievements: "profile.profileTabAchievements",
            badges: "profile.profileTabBadges",
            certificates: "profile.profileTabCertificates",
          }[key];
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex flex-none items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold ${
                tab === key ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              <Icon size={15} />
              {t(labelKey)}
            </button>
          );
        })}
      </div>

      {tab === "overview" && <OverviewTab progressMap={progressMap} avgScore={avgScore} questionsAnswered={questionsAnswered} labsCompleted={labsCompleted} />}
      {tab === "paths" && <PathsTab progressMap={progressMap} />}
      {tab === "learn" && <LearnTab progressMap={progressMap} lessonCompletions={lessonCompletions} />}
      {tab === "labs" && <LabsTab detailMap={detailMap} />}
      {tab === "exams" && <ExamsTab detailMap={detailMap} />}
      {tab === "achievements" && <BadgesGrid badges={badges} />}
      {tab === "badges" && <BadgesGrid badges={badges} />}
      {tab === "certificates" && (
        <CertificatesTab
          progressMap={progressMap}
          detailMap={detailMap}
          lessonCompletions={lessonCompletions}
          displayName={displayName}
          studyHours={studyHours}
        />
      )}
    </div>
  );
}

function StatBlock({ value, label }: { value: number | string; label: string }) {
  return (
    <div>
      <p className="text-xl font-extrabold text-text">{value}</p>
      <p className="text-[11px] text-text-faint">{label}</p>
    </div>
  );
}

function OverviewTab({
  progressMap,
  avgScore,
  questionsAnswered,
  labsCompleted,
}: {
  progressMap: Record<string, number>;
  avgScore: number;
  questionsAnswered: number;
  labsCompleted: number;
}) {
  const { t } = useLocale();
  const entries = Object.entries(progressMap).filter(([, p]) => p > 0);
  const overall = entries.length === 0 ? 0 : Math.round(entries.reduce((sum, [, p]) => sum + p, 0) / entries.length);
  const r = 54;
  const c = 2 * Math.PI * r;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
      <div className="flex flex-col items-center justify-center rounded-xl border border-border-soft bg-panel p-6">
        <div className="relative flex h-32 w-32 items-center justify-center">
          <svg viewBox="0 0 128 128" className="h-32 w-32 -rotate-90">
            <circle cx="64" cy="64" r={r} fill="none" stroke="var(--color-panel-alt)" strokeWidth="9" />
            <circle
              cx="64"
              cy="64"
              r={r}
              fill="none"
              stroke="#6d4cff"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - overall / 100)}
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-extrabold text-text">{overall}%</span>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-text-faint">
          {entries.length === 0 ? t("profile.startFirstPath") : t("profile.keepGoing")}
        </p>
      </div>

      <div className="rounded-xl border border-border-soft bg-panel p-5">
        <p className="mb-4 font-bold text-text">{t("profile.areas")}</p>
        {entries.length === 0 ? (
          <p className="text-sm text-text-faint">{t("profile.noActivityYet")}</p>
        ) : (
          <div className="space-y-4">
            {entries.slice(0, 6).map(([certId, pct]) => (
              <div key={certId}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="uppercase text-text-muted">{certId}</span>
                  <span className="font-semibold text-text">{Math.round(pct)}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-panel-alt">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.round(pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border-soft pt-4 text-xs sm:grid-cols-3">
          <p className="text-text-muted">
            <span className="block text-base font-bold text-text">{questionsAnswered}</span>
            {t("profile.questionsAnsweredLabel")}
          </p>
          <p className="text-text-muted">
            <span className="block text-base font-bold text-text">{labsCompleted}</span>
            {t("profile.labsCompletedLabel")}
          </p>
          <p className="text-text-muted">
            <span className="block text-base font-bold text-text">{avgScore}%</span>
            {t("profile.avgAccuracyLabel")}
          </p>
        </div>
      </div>
    </div>
  );
}

function PathsTab({ progressMap }: { progressMap: Record<string, number> }) {
  const { t } = useLocale();
  const entries = Object.entries(progressMap);
  if (entries.length === 0) {
    return <EmptyState text={t("profile.noPathsStarted")} href="/certifications" cta={t("profile.discoverCerts")} />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([certId, pct]) => (
        <div key={certId} className="rounded-xl border border-border-soft bg-panel p-4">
          <p className="text-sm font-bold uppercase text-text">{certId}</p>
          <div className="mt-2 h-2 w-full rounded-full bg-panel-alt">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.round(pct)}%` }} />
          </div>
          <p className="mt-1 text-xs text-text-faint">{Math.round(pct)}% {t("profile.completedPct")}</p>
        </div>
      ))}
    </div>
  );
}

function LearnTab({
  progressMap,
  lessonCompletions,
}: {
  progressMap: Record<string, number>;
  lessonCompletions: Record<string, Set<string>>;
}) {
  const { t } = useLocale();
  const certIds = Object.keys(progressMap);
  const rows = certIds
    .map((certId) => {
      const track = getLearnTrack(certId, certId);
      const allLessons = track.modules.flatMap((m) => m.lessons);
      const done = lessonCompletions[certId]?.size ?? 0;
      const total = allLessons.length;
      return { certId, done, total, pct: total === 0 ? 0 : Math.round((done / total) * 100) };
    })
    .filter((r) => r.done > 0);

  if (rows.length === 0) {
    return <EmptyState text={t("profile.noLessonsCompleted")} href="/certifications" cta={t("profile.startLearning")} />;
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rows.map((r) => (
        <div key={r.certId} className="rounded-xl border border-border-soft bg-panel p-4">
          <p className="text-sm font-bold uppercase text-text">{r.certId}</p>
          <div className="mt-2 h-2 w-full rounded-full bg-panel-alt">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${r.pct}%` }} />
          </div>
          <p className="mt-1 text-xs text-text-faint">
            {r.done} / {r.total} {t("profile.lessonsCompletedSuffix")} ({r.pct}%)
          </p>
        </div>
      ))}
    </div>
  );
}

function LabsTab({ detailMap }: { detailMap: Record<string, { labCompleted: boolean }> }) {
  const { t } = useLocale();
  const done = Object.entries(detailMap).filter(([, d]) => d.labCompleted);
  if (done.length === 0) {
    return <EmptyState text={t("profile.noLabsCompleted")} href="/certifications" cta={t("profile.startALab")} />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {done.map(([certId]) => (
        <div key={certId} className="flex items-center gap-3 rounded-xl border border-border-soft bg-panel p-4">
          <FlaskConical size={18} className="text-success" />
          <p className="text-sm font-bold uppercase text-text">{certId} — {t("profile.labCompletedSuffix")}</p>
        </div>
      ))}
    </div>
  );
}

function ExamsTab({ detailMap }: { detailMap: Record<string, { questionsAnswered: number; questionsCorrect: number }> }) {
  const { t } = useLocale();
  const entries = Object.entries(detailMap).filter(([, d]) => d.questionsAnswered > 0);
  if (entries.length === 0) {
    return <EmptyState text={t("profile.noQuestionsAnswered")} href="/certifications" cta={t("profile.startPracticeQuestions")} />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([certId, d]) => {
        const pct = Math.round((d.questionsCorrect / d.questionsAnswered) * 100);
        return (
          <div key={certId} className="rounded-xl border border-border-soft bg-panel p-4">
            <p className="text-sm font-bold uppercase text-text">{certId}</p>
            <p className="mt-1 text-xs text-text-faint">
              {d.questionsAnswered} {t("profile.questionsAnsweredCorrect")} • {pct}% {t("profile.correctPct")}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function BadgesGrid({ badges }: { badges: { id: string; label: string; icon: React.ComponentType<{ size?: number }>; unlocked: boolean; desc: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {badges.map((b) => (
        <div
          key={b.id}
          className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center ${
            b.unlocked ? "border-primary/30 bg-primary-light" : "border-border-soft bg-panel opacity-50"
          }`}
        >
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${b.unlocked ? "bg-primary text-white" : "bg-panel-alt text-text-faint"}`}>
            <b.icon size={22} />
          </div>
          <p className="text-xs font-bold text-text">{b.label}</p>
          <p className="text-[10px] text-text-faint">{b.desc}</p>
        </div>
      ))}
    </div>
  );
}

function CertificatesTab({
  progressMap,
  detailMap,
  lessonCompletions,
  displayName,
  studyHours,
}: {
  progressMap: Record<string, number>;
  detailMap: Record<string, { labCompleted: boolean; questionsAnswered: number; questionsCorrect: number }>;
  lessonCompletions: Record<string, Set<string>>;
  displayName: string;
  studyHours: number;
}) {
  const { t } = useLocale();
  const [generating, setGenerating] = useState<string | null>(null);

  function findCert(certId: string) {
    for (const company of companies) {
      const cert = company.certs.find((c) => c.id === certId);
      if (cert) return { code: cert.code, title: cert.title };
    }
    return { code: certId.toUpperCase(), title: certId.toUpperCase() };
  }

  const eligible = Object.keys(progressMap)
    .map((certId) => {
      const track = getLearnTrack(certId, certId);
      const totalLessons = track.modules.flatMap((m) => m.lessons).length;
      const doneLessons = lessonCompletions[certId]?.size ?? 0;
      const lessonsPct = totalLessons === 0 ? 0 : Math.round((doneLessons / totalLessons) * 100);

      const detail = detailMap[certId];
      const labsPct = detail?.labCompleted ? 100 : 0;
      const finalScore = detail && detail.questionsAnswered > 0 ? Math.round((detail.questionsCorrect / detail.questionsAnswered) * 100) : 0;

      const isEligible = lessonsPct >= 100 && labsPct >= 100 && finalScore >= 90 && (detail?.questionsAnswered ?? 0) >= 5;
      return { certId, lessonsPct, labsPct, finalScore, isEligible, questionsAnswered: detail?.questionsAnswered ?? 0 };
    })
    .filter((r) => r.isEligible);

  if (eligible.length === 0) {
    return (
      <EmptyState
        text={t("profile.noCertificatesYet")}
        href="/certifications"
        cta={t("profile.keepLearning")}
      />
    );
  }

  async function handleDownload(certId: string, meta: { code: string; title: string }, r: (typeof eligible)[number]) {
    setGenerating(certId);
    try {
      const certificateId = `CC-${meta.code.toUpperCase()}-${new Date().getFullYear()}-${certId.slice(0, 6).toUpperCase()}`;
      const blob = await generateCertificatePdf({
        userName: displayName,
        certCode: meta.code,
        certTitle: meta.title,
        finalScore: r.finalScore,
        labsPct: r.labsPct,
        lessonsPct: r.lessonsPct,
        certificateId,
        issueDate: new Date(),
        questionsAnswered: r.questionsAnswered,
        studyHours: studyHours,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certcoach-zertifikat-${certId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setGenerating(null);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {eligible.map((r) => {
        const meta = findCert(r.certId);
        return (
          <div key={r.certId} className="flex items-center justify-between gap-3 rounded-xl border border-border-soft bg-panel p-4">
            <div className="flex items-center gap-3">
              <BadgeCheck size={20} className="text-success" />
              <div>
                <p className="text-sm font-bold text-text">
                  {meta.code}: {meta.title}
                </p>
                <p className="text-xs text-text-faint">{t("profile.finalResult")}: {r.finalScore}%</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(r.certId, meta, r)}
              disabled={generating === r.certId}
              className="flex-none rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {generating === r.certId ? t("profile.generating") : t("profile.downloadPdf")}
            </button>
          </div>
        );
      })}
    </div>
  );
}

function EmptyState({ text, href, cta }: { text: string; href: string; cta: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border-soft p-10 text-center">
      <p className="mb-4 text-sm text-text-faint">{text}</p>
      <Link href={href} className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark">
        {cta}
      </Link>
    </div>
  );
}
