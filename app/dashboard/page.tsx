"use client";

import DashboardShell from "@/components/DashboardShell";
import DailyPlan from "@/components/DailyPlan";
import AICoach from "@/components/AICoach";
import ProgressPanel from "@/components/ProgressPanel";
import {
  Users,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  Star,
  ChevronRight,
} from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";
import HeroPath from "@/components/HeroPath";
import CertsScroller from "@/components/CertsScroller";
import LanguageCoursesScroller from "@/components/LanguageCoursesScroller";
import LearningCalendar from "@/components/LearningCalendar";
import { useUser } from "@/components/UserContext";
import { getFirstName } from "@/lib/supabase/useUser";

const stats = [
  { icon: Users, label: "Aktive Lernende", value: "120K+" },
  { icon: BookOpen, label: "Übungsfragen", value: "35.000+" },
  { icon: FlaskConical, label: "Labs genutzt", value: "2.500+" },
  { icon: CheckCircle2, label: "Bestehensrate", value: "98%" },
  { icon: Star, label: "Bewertung", value: "4,9/5" },
];

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", level: "Anfänger", rating: "4,8", vendor: "Microsoft" },
  { title: "SAA-C03", subtitle: "AWS Solutions Architect", level: "Mittelstufe", rating: "4,7", vendor: "AWS" },
  { title: "GCP", subtitle: "Cloud Digital Leader", level: "Anfänger", rating: "4,6", vendor: "Google" },
  { title: "CCNA 200-301", subtitle: "Cisco Certified Network Associate", level: "Mittelstufe", rating: "4,6", vendor: "Cisco" },
  { title: "CompTIA", subtitle: "Security+", level: "Anfänger", rating: "4,7", vendor: "CompTIA" },
];

const continueItems: {
  tag: "IT" | "Sprachen";
  vendor?: string;
  flag?: string;
  title: string;
  progress: number;
}[] = [
  { tag: "IT", vendor: "Microsoft", title: "AZ-104: Microsoft Azure Administrator", progress: 65 },
  { tag: "Sprachen", flag: "🇩🇪", title: "Deutsch B1 Intensivkurs", progress: 42 },
  { tag: "Sprachen", flag: "🇬🇧", title: "English B2 Upper Intermediate", progress: 30 },
  { tag: "IT", vendor: "AWS", title: "AWS Solutions Architect SAA-C03", progress: 20 },
];

const newsItems = [
  {
    tag: "NEU",
    tagClass: "bg-success-light text-success",
    title: "Version 2.6 ist da!",
    desc: "Neues Design, bessere Performance und viele neue Funktionen.",
    date: "Heute",
  },
  {
    tag: "Sprachkurs",
    tagClass: "bg-success-light text-success",
    title: "Neuer Kurs: Deutsch B2",
    desc: "Ab sofort verfügbar inkl. neuen Übungen und Prüfungen.",
    date: "2. Mai 2024",
  },
  {
    tag: "Zertifizierung",
    tagClass: "bg-warning/15 text-warning",
    title: "Neue AWS KI-Zertifikate",
    desc: "Bereite dich auf die neuen AI-Prüfungen vor.",
    date: "30. Apr 2024",
  },
  {
    tag: "Feature",
    tagClass: "bg-primary-light text-primary",
    title: "KI Coach verbessert",
    desc: "Jetzt noch präzisere Antworten und neue Lernempfehlungen.",
    date: "28. Apr 2024",
  },
];

const languageCourses = [
  { flag: "🇩🇪", language: "Deutsch", level: "A1 - C2", rating: "4,8" },
  { flag: "🇬🇧", language: "English", level: "A1 - C2", rating: "4,8" },
  { flag: "🇫🇷", language: "Français", level: "A1 - B2", rating: "4,7" },
  { flag: "🇪🇸", language: "Español", level: "A1 - B2", rating: "4,7" },
];

// Rendered *inside* DashboardShell so it sits below UserContext.Provider in the tree.
function Greeting() {
  const { user } = useUser();
  return <p className="mb-2 text-sm text-text-muted">Guten Morgen, {getFirstName(user)}! 👋</p>;
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <main className="grid grid-cols-1 gap-5 p-3 sm:gap-6 sm:p-4 md:p-8 lg:grid-cols-3">
          <div className="space-y-5 sm:space-y-6 lg:col-span-2">
            {/* Hero */}
            <div className="rounded-2xl border border-border-soft bg-panel p-4 sm:p-6 md:p-8">
              <Greeting />
              <h1 className="text-xl font-extrabold leading-snug text-text sm:text-2xl md:text-3xl">
                Deine Reise. Deine Skills.
                <br />
                <span className="text-primary">IT & Sprachen meistern.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm text-text-muted">
                Lerne, übe, werde zertifiziert und erreiche deine Ziele mit KI-Unterstützung.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark">
                  Weiterlernen
                  <ChevronRight size={16} />
                </button>
                <button className="rounded-lg border border-border-soft px-5 py-2.5 text-sm font-bold text-text hover:bg-panel-alt">
                  Lernpfade entdecken
                </button>
              </div>

              {/* Path illustration */}
              <div className="mt-8">
                <HeroPath />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border-soft pt-6 sm:grid-cols-5">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-bold text-text">{s.value}</p>
                      <p className="text-[10px] text-text-faint">{s.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weitermachen */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Weitermachen</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {continueItems.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border-soft bg-panel p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          item.tag === "IT"
                            ? "bg-primary-light text-primary"
                            : "bg-success-light text-success"
                        }`}
                      >
                        {item.tag}
                      </span>
                      <span className="text-lg">
                        {item.flag ? item.flag : getVendorIcon(item.vendor!, 22)}
                      </span>
                    </div>
                    <p className="mb-3 text-sm font-bold leading-snug text-text">{item.title}</p>
                    <div className="h-1.5 w-full rounded-full bg-panel-alt">
                      <div
                        className="h-1.5 rounded-full bg-primary"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-xs text-text-faint">{item.progress}% abgeschlossen</p>
                    <button className="mt-3 flex items-center gap-1 text-xs font-bold text-primary">
                      Fortsetzen
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktuelles & Neuigkeiten */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Aktuelles & Neuigkeiten</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {newsItems.map((n) => (
                  <div key={n.title} className="rounded-xl border border-border-soft bg-panel p-4">
                    <span
                      className={`mb-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${n.tagClass}`}
                    >
                      {n.tag}
                    </span>
                    <p className="mb-1 text-sm font-bold leading-snug text-text">{n.title}</p>
                    <p className="mb-3 text-xs leading-relaxed text-text-faint">{n.desc}</p>
                    <p className="text-[11px] font-medium text-text-faint">{n.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Beliebte Zertifizierungen */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Beliebte Zertifizierungen</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <CertsScroller certs={certs} />
            </div>

            {/* Beliebte Sprachkurse */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Beliebte Sprachkurse</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <LanguageCoursesScroller courses={languageCourses} />
            </div>
          </div>

          <div className="space-y-6">
            <DailyPlan />
            <AICoach />
            <ProgressPanel />
            <LearningCalendar />
          </div>
      </main>
    </DashboardShell>
  );
}
