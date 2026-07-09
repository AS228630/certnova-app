"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Circle,
  Lock,
  Clock3,
  PlayCircle,
  FileText,
  ClipboardList,
  BookOpen,
  ExternalLink,
  StickyNote,
} from "lucide-react";
import JourneyHeader from "@/components/certifications/journey/JourneyHeader";
import ProgressRing from "@/components/certifications/journey/ProgressRing";
import { moduleSummary, getLearnTrack, type Module, type Lesson } from "@/lib/learnData";
import type { Company } from "@/lib/companiesData";
import type { CertJourney } from "@/lib/journeyData";
import { useUserProgressStore } from "@/lib/store/userProgressStore";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { useLessonCompletionStore } from "@/lib/store/lessonCompletionStore";
import { useUser } from "@/components/UserContext";
import { useLocale } from "@/components/LocaleProvider";

const TAB_KEYS = ["path", "overview", "resources", "discussions"] as const;

const LESSON_ICON: Record<Lesson["type"], typeof PlayCircle> = {
  video: PlayCircle,
  quiz: ClipboardList,
  reading: FileText,
};

function moduleStats(modules: Module[]) {
  const videos = modules.flatMap((m) => m.lessons).filter((l) => l.type === "video");
  const quizzes = modules.flatMap((m) => m.lessons).filter((l) => l.type === "quiz");
  const completedModules = modules.filter((m) => m.lessons.every((l) => l.completed)).length;
  return {
    modulesDone: completedModules,
    modulesTotal: modules.length,
    videosDone: videos.filter((l) => l.completed).length,
    videosTotal: videos.length,
    quizDone: quizzes.filter((l) => l.completed).length,
    quizTotal: quizzes.length,
  };
}

function modulePct(m: Module): number {
  if (m.lessons.length === 0) return 0;
  return Math.round((m.lessons.filter((l) => l.completed).length / m.lessons.length) * 100);
}

function LessonRow({
  lesson,
  number,
  active,
  onToggle,
}: {
  lesson: Lesson;
  number: string;
  active: boolean;
  onToggle: () => void;
}) {
  const Icon = LESSON_ICON[lesson.type];
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
        active ? "bg-primary/10" : "hover:bg-panel-alt"
      }`}
    >
      <span className="flex items-center gap-2.5 text-text-muted">
        <span className="w-8 shrink-0 text-[11px] text-text-faint">{number}</span>
        <Icon size={14} className="shrink-0 text-text-faint" />
        {lesson.title}
      </span>
      <span className="flex items-center gap-3 text-xs text-text-faint">
        {lesson.duration}
        {lesson.completed ? (
          <CheckCircle2 size={15} className="text-success" />
        ) : (
          <Circle size={15} className="text-text-faint" />
        )}
      </span>
    </button>
  );
}

function ModuleCard({
  module: m,
  defaultOpen,
  onToggleLesson,
}: {
  module: Module;
  defaultOpen: boolean;
  onToggleLesson: (moduleId: string, lessonId: string) => void;
}) {
  const { t } = useLocale();
  const [open, setOpen] = useState(defaultOpen);
  const p = modulePct(m);
  const isDone = p === 100;
  const summary = moduleSummary(m);
  const actionLabel = isDone ? t("learn.actionRepeat") : p > 0 ? t("learn.actionContinue") : t("learn.actionStart");

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-panel">
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isDone ? "bg-success-light text-success" : m.locked ? "bg-panel-alt text-text-faint" : "bg-primary/15 text-primary"
          }`}
        >
          {m.locked ? <Lock size={14} /> : m.number}
        </span>

        <button
          onClick={() => !m.locked && setOpen((v) => !v)}
          disabled={m.locked}
          className={`min-w-0 flex-1 text-left ${m.locked ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <p className="truncate text-sm font-bold text-text">
            {t("learn.moduleWord")} {m.number}: {m.title}
          </p>
          <p className="mb-2 truncate text-xs text-text-faint">{m.description}</p>
          {!m.locked && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-faint">
              <span className="flex items-center gap-1">
                <BookOpen size={11} /> {summary.lessonCount} {t("learn.lessonsCountL")}
              </span>
              <span className="flex items-center gap-1">
                <PlayCircle size={11} /> {summary.videos} {t("learn.videosCountL")}
              </span>
              <span className="flex items-center gap-1">
                <ClipboardList size={11} /> {summary.quizzes} {t("learn.quizQuestionsCountL")}
              </span>
              <span className="flex items-center gap-1">
                <Clock3 size={11} /> {m.duration}
              </span>
            </div>
          )}
        </button>

        <div className="flex shrink-0 flex-col items-end gap-2">
          {m.locked ? (
            <span className="text-right text-[11px] text-text-faint">{m.lockedHint}</span>
          ) : (
            <>
              <ProgressRing value={p} size={40} stroke={4} color={isDone ? "#22c55e" : "#6d4cff"} />
              <button
                onClick={() => setOpen((v) => !v)}
                className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                  isDone
                    ? "border border-success/40 text-success hover:bg-success-light"
                    : "bg-primary text-white hover:bg-primary-dark"
                }`}
              >
                {actionLabel}
              </button>
            </>
          )}
        </div>
      </div>

      {open && !m.locked && (
        <div className="space-y-1 border-t border-border-soft px-3 pb-4 pt-2 sm:px-4">
          {m.lessons.map((l, i) => (
            <LessonRow
              key={l.id}
              lesson={l}
              number={`${m.number}.${i + 1}`}
              active={!l.completed && m.lessons.find((x) => !x.completed)?.id === l.id}
              onToggle={() => onToggleLesson(m.id, l.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LearnClient({
  company,
  journey,
  modules: _modulesFromServer,
}: {
  company: Company;
  journey: CertJourney;
  modules: Module[];
}) {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const { t, locale } = useLocale();
  const [tab, setTab] = useState<(typeof TAB_KEYS)[number]>("path");
  const certId = journey.code.toLowerCase();
  const companySlug = company.slug;
  const { user } = useUser();
  const completionSet = useLessonCompletionStore((s) => s.completions[certId]);
  const loadForCert = useLessonCompletionStore((s) => s.loadForCert);

  useEffect(() => {
    if (user) loadForCert(user.id, certId);
  }, [user, certId, loadForCert]);

  // The Learn page is server-rendered in German (no client locale available
  // there yet), so re-derive the module list on the client using the active
  // locale for certs that fall back to the generic generator. Hand-authored
  // LEARN_TRACKS entries aren't locale-aware yet, so this only changes
  // anything for certs using the generic fallback.
  const modules = useMemo(() => getLearnTrack(certId, journey.title, locale).modules, [certId, journey.title, locale]);

  // Merge the static module/lesson structure with each lesson's *real*,
  // persisted completion state. Falls back to the static demo flags only
  // while logged out (nothing to persist) or before the real data has
  // loaded, so the page never looks empty during the brief loading window.
  const localModules: Module[] = useMemo(() => {
    if (!user || !completionSet) return modules;
    return modules.map((m) => ({
      ...m,
      lessons: m.lessons.map((l) => ({ ...l, completed: completionSet.has(l.id) })),
    }));
  }, [modules, user, completionSet]);

  const stats = moduleStats(localModules);
  const filtered = localModules.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  const firstOpenIndex = localModules.findIndex((m) => !m.locked && modulePct(m) < 100);
  const totalLessons = localModules.flatMap((m) => m.lessons).length;

  async function toggleLesson(_moduleId: string, lessonId: string) {
    if (!user) return;
    const nowCompleted = await useLessonCompletionStore.getState().toggle(user.id, certId, lessonId);

    // Only award progress/XP on the incomplete -> complete transition, not
    // when unchecking, so undoing a mis-click can't be used to farm XP.
    if (nowCompleted) {
      const increment = totalLessons > 0 ? 100 / totalLessons : 0;
      useCertProgressStore.getState().recordModuleCompletion(certId, increment);
      useUserProgressStore.getState().recordLessonCompletion();
    }
  }

  function saveNote() {
    if (!draft.trim()) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text: draft.trim() }, ...prev]);
    setDraft("");
    setAddingNote(false);
  }

  return (
    <div>
      <JourneyHeader company={company} journey={journey} />

      <div className="mb-6 mt-6 flex gap-6 overflow-x-auto border-b border-border-soft">
        {TAB_KEYS.map((key) => {
          const labelKey = {
            path: "learn.tabLearningPath2",
            overview: "learn.tabOverview2",
            resources: "learn.tabResources2",
            discussions: "learn.tabDiscussions",
          }[key];
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative shrink-0 pb-3 text-sm font-semibold transition-colors ${
                tab === key ? "text-primary" : "text-text-muted hover:text-text"
              }`}
            >
              {t(labelKey)}
              {tab === key && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
            </button>
          );
        })}
      </div>

      {tab === "overview" && (
        <p className="text-sm text-text-muted">{t("learn.overviewComingSoon2")}</p>
      )}
      {tab === "discussions" && (
        <p className="text-sm text-text-muted">{t("learn.discussionsComingSoon")}</p>
      )}
      {tab === "resources" && (
        <p className="text-sm text-text-muted">{t("learn.resourcesInSidebar")}</p>
      )}

      {tab === "path" && (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          {/* Stats row */}
          <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl border border-border-soft bg-panel p-4 sm:grid-cols-4 sm:p-5">
            <div>
              <p className="text-xs text-text-faint">{t("learn.modulesL")}</p>
              <p className="text-lg font-extrabold text-text">
                {stats.modulesDone} / {stats.modulesTotal}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-faint">{t("learn.videosWatched")}</p>
              <p className="text-lg font-extrabold text-text">
                {stats.videosDone} / {stats.videosTotal}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-faint">{t("learn.quizPassed")}</p>
              <p className="text-lg font-extrabold text-text">
                {stats.quizDone} / {stats.quizTotal}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-xs text-text-faint">
                <Clock3 size={11} /> {t("learn.totalDuration")}
              </p>
              <p className="text-lg font-extrabold text-text">~{localModules.length * 45} Min</p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("learn.searchInSection")}
                className="w-full rounded-lg border border-border-soft bg-panel-alt py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-faint outline-none focus:border-primary"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-2 text-sm text-text-muted hover:text-text">
              <SlidersHorizontal size={14} /> {t("learn.filterL")}
            </button>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            {filtered.map((m, i) => (
              <ModuleCard key={m.id} module={m} defaultOpen={i === firstOpenIndex} onToggleLesson={toggleLesson} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-text-faint">{t("learn.noModulesFound")}</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border-soft bg-panel p-5 text-center">
            <p className="mb-3 text-xs font-semibold text-text-muted">{t("learn.yourProgressL")}</p>
            <div className="flex justify-center">
              <ProgressRing value={(stats.modulesDone / Math.max(1, stats.modulesTotal)) * 100} size={88} stroke={7} />
            </div>
            <p className="mt-3 text-xs text-text-faint">
              {stats.modulesDone} / {stats.modulesTotal} {t("learn.modulesCompletedL")}
            </p>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 text-xs font-semibold text-text-muted">{t("learn.sectionOverviewL")}</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 font-semibold text-primary">
                <span>{t("learn.step1Learn")}</span>
                <span>
                  {stats.modulesDone} / {stats.modulesTotal}
                </span>
              </div>
              <Link
                href={`/certifications/${companySlug}/${certId}/labs`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-text-muted hover:bg-panel-alt hover:text-text"
              >
                <span>{t("learn.step2Labs")}</span>
                <span className="text-text-faint">{t("learn.openArrow")}</span>
              </Link>
              <Link
                href={`/certifications/${companySlug}/${certId}/practice`}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-text-muted hover:bg-panel-alt hover:text-text"
              >
                <span>{t("learn.step3Exam")}</span>
                <span className="text-text-faint">{t("learn.openArrow")}</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 text-xs font-semibold text-text-muted">{t("learn.recommendedResources")}</p>
            <div className="space-y-2 text-sm">
              <a
                href={`https://learn.microsoft.com/de-de/credentials/certifications/${certId === "az-900" ? "azure-fundamentals" : "azure-administrator"}/`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-primary"
              >
                <BookOpen size={14} /> {t("learn.msLearnPath")}
                <ExternalLink size={11} className="ml-auto" />
              </a>
              <a
                href={`https://learn.microsoft.com/de-de/credentials/certifications/exams/${certId}/`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-primary"
              >
                <FileText size={14} /> {t("learn.officialDocs")}
                <ExternalLink size={11} className="ml-auto" />
              </a>
              <Link
                href={`/certifications/${companySlug}/${certId}/practice`}
                className="flex items-center gap-2 text-text-muted hover:text-primary"
              >
                <ClipboardList size={14} /> {t("learn.practiceQuestionsL")}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <StickyNote size={13} /> {t("learn.yourNotes")}
              </p>
            </div>

            {notes.length === 0 && !addingNote && (
              <p className="mb-3 text-sm text-text-faint">{t("learn.noNotesForSection")}</p>
            )}

            <div className="mb-3 space-y-2">
              {notes.map((n) => (
                <p key={n.id} className="rounded-lg bg-panel-alt p-3 text-xs text-text-muted">
                  {n.text}
                </p>
              ))}
            </div>

            {addingNote ? (
              <div className="space-y-2">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  autoFocus
                  rows={3}
                  placeholder={t("learn.whatToRemember")}
                  className="w-full rounded-lg border border-border-soft bg-panel-alt p-2.5 text-xs text-text placeholder:text-text-faint outline-none focus:border-primary"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveNote}
                    className="flex-1 rounded-lg bg-primary py-1.5 text-xs font-bold text-white hover:bg-primary-dark"
                  >
                    {t("learn.saveL")}
                  </button>
                  <button
                    onClick={() => {
                      setAddingNote(false);
                      setDraft("");
                    }}
                    className="rounded-lg border border-border-soft px-3 py-1.5 text-xs text-text-muted hover:text-text"
                  >
                    {t("learn.cancelL")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAddingNote(true)}
                className="w-full rounded-lg border border-primary/40 py-2 text-xs font-bold text-primary hover:bg-primary-light"
              >
                {t("learn.newNote")}
              </button>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
