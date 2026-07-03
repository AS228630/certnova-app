"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Search,
  SlidersHorizontal,
  ChevronDown,
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
import type { Module, Lesson } from "@/lib/learnData";

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

function LessonRow({ lesson, active }: { lesson: Lesson; active: boolean }) {
  const Icon = LESSON_ICON[lesson.type];
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
        active ? "bg-primary/10" : "hover:bg-panel-alt"
      }`}
    >
      <span className="flex items-center gap-2.5 text-text-muted">
        <Icon size={14} className="text-text-faint" />
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

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-panel">
      <button
        onClick={() => !m.locked && setOpen((v) => !v)}
        disabled={m.locked}
        className={`flex w-full items-center gap-4 p-4 text-left sm:p-5 ${m.locked ? "cursor-not-allowed opacity-60" : ""}`}
      >
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            isDone ? "bg-success-light text-success" : m.locked ? "bg-panel-alt text-text-faint" : "bg-primary/15 text-primary"
          }`}
        >
          {m.locked ? <Lock size={14} /> : m.number}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-text">
            Modul {m.number}: {m.title}
          </p>
          <p className="truncate text-xs text-text-faint">{m.description}</p>
        </div>

        {m.locked ? (
          <span className="hidden shrink-0 text-right text-xs text-text-faint sm:block">{m.lockedHint}</span>
        ) : (
          <div className="hidden shrink-0 sm:block">
            <ProgressRing value={p} size={44} stroke={4} color={isDone ? "#22c55e" : "#6d4cff"} />
          </div>
        )}

        {!m.locked && (
          <ChevronDown size={18} className={`shrink-0 text-text-faint transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && !m.locked && (
        <div className="space-y-1 border-t border-border-soft px-3 pb-4 pt-2 sm:px-4">
          {m.lessons.map((l) => (
            <LessonRow key={l.id} lesson={l} active={!l.completed && m.lessons.find((x) => !x.completed)?.id === l.id} />
          ))}
          <button className="mt-2 w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primary-dark">
            {isDone ? "Wiederholen" : p > 0 ? "Fortsetzen" : "Starten"}
          </button>
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
  const stats = moduleStats(modules);
  const filtered = modules.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));
  const firstOpenIndex = modules.findIndex((m) => !m.locked && modulePct(m) < 100);

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
            </div>
          </div>

          <div className="rounded-2xl border border-border-soft bg-panel p-5">
            <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold text-text-muted">
              <StickyNote size={13} /> Deine Notizen
            </p>
            <p className="text-sm text-text-faint">Noch keine Notizen für diesen Abschnitt.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
