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
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useProfileStore } from "@/lib/store/profileStore";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { getLearnTrack } from "@/lib/learnData";
import AvatarUpload from "@/components/AvatarUpload";

const TABS = ["Übersicht", "Meine Lernpfade", "Lernen", "Meine Labs", "Practice Exams", "Erfolge", "Badges", "Meine Zertifikate"] as const;

export default function ProfileClient() {
  const { user } = useUser();
  const progress = useUserProgressStore((s) => s.progress);
  const profile = useProfileStore((s) => s.profile);
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const detailMap = useCertProgressStore((s) => s.detailMap);
  const lessonCompletions = useLessonCompletionStore((s) => s.completions);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Übersicht");

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
    { id: "first-steps", label: "Erste Schritte", icon: Star, unlocked: xp > 0, desc: "Erste Aktivität abgeschlossen" },
    { id: "lab-master", label: "Lab Master", icon: FlaskConical, unlocked: labsCompleted >= 5, desc: "5 Labs abgeschlossen" },
    { id: "practice-expert", label: "Practice Expert", icon: ClipboardCheck, unlocked: questionsAnswered >= 50, desc: "50 Übungsfragen beantwortet" },
    { id: "streak-7", label: "7-Tage-Streak", icon: Flame, unlocked: streak >= 7, desc: "7 Tage in Folge gelernt" },
    { id: "path-complete", label: "Zertifiziert", icon: BadgeCheck, unlocked: pathsCompleted >= 1, desc: "Einen Lernpfad zu 100% abgeschlossen" },
    { id: "high-achiever", label: "High Achiever", icon: Trophy, unlocked: avgScore >= 90 && questionsAnswered >= 20, desc: "Ø 90%+ bei mind. 20 Fragen" },
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
              <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-bold text-primary">Learner</span>
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
                Beigetreten: {joinedDate}
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
            Profil bearbeiten
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-5 sm:grid-cols-3 lg:grid-cols-6">
          <StatBlock value={studyHours} label="Stunden gelernt" />
          <StatBlock value={pathsInProgress} label="Lernpfade" />
          <StatBlock value={labsCompleted} label="Labs abgeschlossen" />
          <StatBlock value={`${avgScore}%`} label="Durchschnitts-Score" />
          <StatBlock value={pathsCompleted} label="Zertifikate" />
          <StatBlock value={unlockedBadges.length} label="Badges" />
        </div>
      </div>

      <div className="mb-6 flex gap-1 overflow-x-auto border-b border-border-soft">
        {TABS.map((t) => {
          const Icon = { "Übersicht": LayoutGrid, "Meine Lernpfade": GraduationCap, "Lernen": BookOpen, "Meine Labs": FlaskConical, "Practice Exams": ClipboardCheck, "Erfolge": Trophy, "Badges": Award, "Meine Zertifikate": BadgeCheck }[t];
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex flex-none items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-semibold ${
                tab === t ? "border-primary text-primary" : "border-transparent text-text-muted hover:text-text"
              }`}
            >
              <Icon size={15} />
              {t}
            </button>
          );
        })}
      </div>

      {tab === "Übersicht" && <OverviewTab progressMap={progressMap} avgScore={avgScore} questionsAnswered={questionsAnswered} labsCompleted={labsCompleted} />}
      {tab === "Meine Lernpfade" && <PathsTab progressMap={progressMap} />}
      {tab === "Lernen" && <LearnTab progressMap={progressMap} lessonCompletions={lessonCompletions} />}
      {tab === "Meine Labs" && <LabsTab detailMap={detailMap} />}
      {tab === "Practice Exams" && <ExamsTab detailMap={detailMap} />}
      {tab === "Erfolge" && <BadgesGrid badges={badges} />}
      {tab === "Badges" && <BadgesGrid badges={badges} />}
      {tab === "Meine Zertifikate" && (
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
          {entries.length === 0 ? "Starte deinen ersten Lernpfad!" : "Weiter so! Du bist auf dem richtigen Weg."}
        </p>
      </div>

      <div className="rounded-xl border border-border-soft bg-panel p-5">
        <p className="mb-4 font-bold text-text">Bereiche</p>
        {entries.length === 0 ? (
          <p className="text-sm text-text-faint">Noch keine Aktivität — starte mit einer Zertifizierung.</p>
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
            Fragen beantwortet
          </p>
          <p className="text-text-muted">
            <span className="block text-base font-bold text-text">{labsCompleted}</span>
            Labs abgeschlossen
          </p>
          <p className="text-text-muted">
            <span className="block text-base font-bold text-text">{avgScore}%</span>
            Ø Trefferquote
          </p>
        </div>
      </div>
    </div>
  );
}

function PathsTab({ progressMap }: { progressMap: Record<string, number> }) {
  const entries = Object.entries(progressMap);
  if (entries.length === 0) {
    return <EmptyState text="Noch keine Lernpfade gestartet." href="/certifications" cta="Zertifizierungen entdecken" />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([certId, pct]) => (
        <div key={certId} className="rounded-xl border border-border-soft bg-panel p-4">
          <p className="text-sm font-bold uppercase text-text">{certId}</p>
          <div className="mt-2 h-2 w-full rounded-full bg-panel-alt">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${Math.round(pct)}%` }} />
          </div>
          <p className="mt-1 text-xs text-text-faint">{Math.round(pct)}% abgeschlossen</p>
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
    return <EmptyState text="Noch keine Lektionen abgeschlossen." href="/certifications" cta="Mit dem Lernen beginnen" />;
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
            {r.done} / {r.total} Lektionen abgeschlossen ({r.pct}%)
          </p>
        </div>
      ))}
    </div>
  );
}

function LabsTab({ detailMap }: { detailMap: Record<string, { labCompleted: boolean }> }) {
  const done = Object.entries(detailMap).filter(([, d]) => d.labCompleted);
  if (done.length === 0) {
    return <EmptyState text="Noch keine Labs abgeschlossen." href="/certifications" cta="Ein Lab starten" />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {done.map(([certId]) => (
        <div key={certId} className="flex items-center gap-3 rounded-xl border border-border-soft bg-panel p-4">
          <FlaskConical size={18} className="text-success" />
          <p className="text-sm font-bold uppercase text-text">{certId} — Lab abgeschlossen</p>
        </div>
      ))}
    </div>
  );
}

function ExamsTab({ detailMap }: { detailMap: Record<string, { questionsAnswered: number; questionsCorrect: number }> }) {
  const entries = Object.entries(detailMap).filter(([, d]) => d.questionsAnswered > 0);
  if (entries.length === 0) {
    return <EmptyState text="Noch keine Übungsfragen beantwortet." href="/certifications" cta="Übungsfragen starten" />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {entries.map(([certId, d]) => {
        const pct = Math.round((d.questionsCorrect / d.questionsAnswered) * 100);
        return (
          <div key={certId} className="rounded-xl border border-border-soft bg-panel p-4">
            <p className="text-sm font-bold uppercase text-text">{certId}</p>
            <p className="mt-1 text-xs text-text-faint">
              {d.questionsAnswered} Fragen beantwortet • {pct}% richtig
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
        text="Noch kein Zertifikat verdient. Ein Zertifikat wird automatisch verfügbar, sobald du 100% des Lernpfads, 100% der Labs UND mindestens 90% bei den Übungsfragen erreicht hast."
        href="/certifications"
        cta="Weiter lernen"
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
                <p className="text-xs text-text-faint">Endergebnis: {r.finalScore}%</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(r.certId, meta, r)}
              disabled={generating === r.certId}
              className="flex-none rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {generating === r.certId ? "Erstelle..." : "PDF herunterladen"}
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
