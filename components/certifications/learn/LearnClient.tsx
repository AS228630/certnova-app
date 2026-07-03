"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
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
import CertBadge from "@/components/certifications/CertBadge";
import ProgressRing from "@/components/certifications/journey/ProgressRing";
import { moduleSummary, type Module, type Lesson } from "@/lib/learnData";

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

function LessonRow({ lesson, number, active }: { lesson: Lesson; number: string; active: boolean }) {
  const Icon = LESSON_ICON[lesson.type];
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
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
    </div>
  );
}

function ModuleCard({ module: m, defaultOpen }: { module: Module; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const p = modulePct(m);
  const isDone = p === 100;
  const summary = moduleSummary(m);
  const actionLabel = isDone ? "Wiederholen" : p > 0 ? "Fortsetzen" : "Starten";

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
            Modul {m.number}: {m.title}
          </p>
          <p className="mb-2 truncate text-xs text-text-faint">{m.description}</p>
          {!m.locked && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-faint">
              <span className="flex items-center gap-1">
                <BookOpen size={11} /> {summary.lessonCount} Lektionen
              </span>
              <span className="flex items-center gap-1">
                <PlayCircle size={11} /> {summary.videos} Videos
              </span>
              <span className="flex items-center gap-1">
                <ClipboardList size={11} /> {summary.quizzes} Quizfragen
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
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LearnClient({
  companyName,
  companySlug,
  certId,
  certCode,
  certTitle,
  modules,
}: {
  companyName: string;
  companySlug: string;
  certId: string;
  certCode: string;
  certTitle: string;
  modules: Module[];
}) {
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<{ id: string; text: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [addingNote, setAddingNote] = useState(false);
  const stats = moduleStats(modules);
  const filtered = modules.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  const firstOpenIndex = modules.findIndex((m) => !m.locked && modulePct(m) < 100);

  function saveNote() {
    if (!draft.trim()) return;
    setNotes((prev) => [{ id: crypto.randomUUID(), text: draft.trim() }, ...prev]);
    setDraft("");
    setAddingNote(false);
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-text-muted">
        <Link href={`/certifications/${companySlug}/${certId}`} className="text-text-muted hover:text-text" aria-label="Zurück">
          <ChevronLeft size={18} />
        </Link>
        <Link href="/certifications" className="hover:text-primary">
          Zertifizierungen
        </Link>
        <span>/</span>
        <Link href={`/certifications/${companySlug}`} className="hover:text-primary">
          {companyName}
        </Link>
        <span>/</span>
        <Link href={`/certifications/${companySlug}/${certId}`} className="hover:text-primary">
          {certCode.toUpperCase()}
        </Link>
        <span>/</span>
        <span className="font-semibold text-primary">Lernen</span>
      </div>

      <div className="mb-6 flex items-start gap-3">
        <CertBadge code={certCode.toUpperCase()} size={48} />
        <div>
          <h1 className="text-xl font-extrabold text-text sm:text-2xl">{certTitle}</h1>
          <p className="text-sm text-text-muted">Wissen aufbauen — Module, Videos und Quizfragen</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          {/* Stats row */}
          <div className="mb-5 grid grid-cols-2 gap-3 rounded-2xl border border-border-soft bg-panel p-4 sm:grid-cols-4 sm:p-5">
            <div>
              <p className="text-xs text-text-faint">Module</p>
              <p className="text-lg font-extrabold text-text">
                {stats.modulesDone} / {stats.modulesTotal}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-faint">Videos gesehen</p>
              <p className="text-lg font-extrabold text-text">
                {stats.videosDone} / {stats.videosTotal}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-faint">Quiz bestanden</p>
              <p className="text-lg font-extrabold text-text">
                {stats.quizDone} / {stats.quizTotal}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-xs text-text-faint">
                <Clock3 size={11} /> Gesamtdauer
              </p>
              <p className="text-lg font-extrabold text-text">~{modules.length * 45} Min</p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="mb-4 flex gap-2">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="In diesem Abschnitt suchen..."
                className="w-full rounded-lg border border-border-soft bg-panel-alt py-2 pl-9 pr-3 text-sm text-text placeholder:text-text-faint outline-none focus:border-primary"
              />
            </div>
            <button className="flex items-center gap-1.5 rounded-lg border border-border-soft px-3 py-2 text-sm text-text-muted hover:text-text">
              <SlidersHorizontal size={14} /> Filter
            </button>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            {filtered.map((m, i) => (
              <ModuleCard key={m.id} module={m} defaultOpen={i === firstOpenIndex} />
            ))}
            {filtered.length === 0 && <p className="text-sm text-text-faint">Keine Module gefunden.</p>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border-soft bg-panel p-5 text-center">
            <p className="mb-3 text-xs font-semibold text-text-muted">Dein Fortschritt</p>
            <div className="flex justify-center">
              <ProgressRing value={(stats.modulesDone / Math.max(1, stats.modulesTotal)) * 100} size={88} stroke={7} />
            </div>
            <p className="mt-3 text-xs text-text-faint">
              {stats.modulesDone} / {stats.modulesTotal} Module abgeschlossen
            </p>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 text-xs font-semibold text-text-muted">Abschnittsübersicht</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2 font-semibold text-primary">
                <span>1. Lernen</span>
                <span>
                  {stats.modulesDone} / {stats.modulesTotal}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-text-muted">
                <span>2. Praxis-Labore</span>
                <span className="text-text-faint">bald</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 text-text-muted">
                <span>3. Prüfungs-Simulation</span>
                <span className="text-text-faint">bald</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 text-xs font-semibold text-text-muted">Empfohlene Ressourcen</p>
            <div className="space-y-2 text-sm">
              <a
                href={`https://learn.microsoft.com/de-de/credentials/certifications/${certId === "az-900" ? "azure-fundamentals" : "azure-administrator"}/`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-primary"
              >
                <BookOpen size={14} /> Microsoft Learn Pfad
                <ExternalLink size={11} className="ml-auto" />
              </a>
              <a
                href={`https://learn.microsoft.com/de-de/credentials/certifications/exams/${certId}/`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-text-muted hover:text-primary"
              >
                <FileText size={14} /> Offizielle Doku
                <ExternalLink size={11} className="ml-auto" />
              </a>
              {certId === "az-900" && (
                <Link
                  href={`/certifications/${companySlug}/${certId}/practice`}
                  className="flex items-center gap-2 text-text-muted hover:text-primary"
                >
                  <ClipboardList size={14} /> Übungsfragen
                </Link>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-text-muted">
                <StickyNote size={13} /> Deine Notizen
              </p>
            </div>

            {notes.length === 0 && !addingNote && (
              <p className="mb-3 text-sm text-text-faint">Noch keine Notizen für diesen Abschnitt.</p>
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
                  placeholder="Was möchtest du dir merken?"
                  className="w-full rounded-lg border border-border-soft bg-panel-alt p-2.5 text-xs text-text placeholder:text-text-faint outline-none focus:border-primary"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveNote}
                    className="flex-1 rounded-lg bg-primary py-1.5 text-xs font-bold text-white hover:bg-primary-dark"
                  >
                    Speichern
                  </button>
                  <button
                    onClick={() => {
                      setAddingNote(false);
                      setDraft("");
                    }}
                    className="rounded-lg border border-border-soft px-3 py-1.5 text-xs text-text-muted hover:text-text"
                  >
                    Abbrechen
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAddingNote(true)}
                className="w-full rounded-lg border border-primary/40 py-2 text-xs font-bold text-primary hover:bg-primary-light"
              >
                Neue Notiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
