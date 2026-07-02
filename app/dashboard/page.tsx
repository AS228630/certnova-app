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
  BookOpenCheck,
  Dumbbell,
  ShieldCheck,
  UserCheck,
  Flag,
  ChevronRight,
} from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";

const stats = [
  { icon: Users, label: "Aktive Lernende", value: "120K+" },
  { icon: BookOpen, label: "Übungsfragen", value: "35.000+" },
  { icon: FlaskConical, label: "Labs genutzt", value: "2.500+" },
  { icon: CheckCircle2, label: "Bestehensrate", value: "98%" },
  { icon: Star, label: "Bewertung", value: "4,9/5" },
];

const pathSteps = [
  { icon: BookOpenCheck, label: "Lernen" },
  { icon: Dumbbell, label: "Üben" },
  { icon: ShieldCheck, label: "Zertifizierung" },
  { icon: UserCheck, label: "Interview" },
  { icon: Flag, label: "Ziel erreichen" },
];

const certs = [
  { title: "AZ-900", subtitle: "Microsoft Azure Fundamentals", level: "Anfänger", rating: "4,8", vendor: "Microsoft" },
  { title: "SAA-C03", subtitle: "AWS Solutions Architect", level: "Mittelstufe", rating: "4,7", vendor: "AWS" },
  { title: "GCP", subtitle: "Cloud Digital Leader", level: "Anfänger", rating: "4,6", vendor: "Google" },
  { title: "CCNA 200-301", subtitle: "Cisco Certified Network Associate", level: "Mittelstufe", rating: "4,6", vendor: "Cisco" },
  { title: "CompTIA", subtitle: "Security+", level: "Anfänger", rating: "4,7", vendor: "CompTIA" },
];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <main className="grid grid-cols-1 gap-5 p-3 sm:gap-6 sm:p-4 md:p-8 lg:grid-cols-3">
          <div className="space-y-5 sm:space-y-6 lg:col-span-2">
            {/* Hero */}
            <div className="rounded-2xl border border-border-soft bg-panel p-4 sm:p-6 md:p-8">
              <p className="mb-2 text-sm text-text-muted">Guten Morgen, Arman! 👋</p>
              <h1 className="text-xl font-extrabold leading-snug text-text sm:text-2xl md:text-3xl">
                Lerne. Übe. Zertifiziere dich.
                <br />
                <span className="text-primary">Werde eingestellt.</span>
              </h1>
              <p className="mt-3 max-w-lg text-sm text-text-muted">
                Deine All-in-One-Plattform, um IT-Skills aufzubauen, Zertifikate zu erhalten und
                deinen Traumjob zu bekommen.
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
              <div className="mt-8 hidden items-center justify-between md:flex">
                {pathSteps.map((step, i) => (
                  <div key={step.label} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                          i === 0
                            ? "bg-primary text-white"
                            : "border border-border-soft bg-panel-alt text-text-muted"
                        }`}
                      >
                        <step.icon size={18} />
                      </div>
                      <span className="text-[11px] font-medium text-text-muted">{step.label}</span>
                    </div>
                    {i < pathSteps.length - 1 && (
                      <div className="mx-2 mb-5 h-px flex-1 border-t border-dashed border-border-soft" />
                    )}
                  </div>
                ))}
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

            {/* Weiterlernen */}
            <div className="rounded-2xl border border-border-soft bg-panel p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Weiterlernen</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  {getVendorIcon("Microsoft", 28)}
                  <div>
                    <p className="font-bold text-text">AZ-104: Microsoft Azure Administrator</p>
                    <div className="mt-2 h-2 w-48 rounded-full bg-panel-alt">
                      <div className="h-2 w-2/3 rounded-full bg-primary" />
                    </div>
                    <p className="mt-1 text-xs text-text-faint">65% abgeschlossen</p>
                  </div>
                </div>

                <div className="text-xs text-text-muted">
                  <p className="text-text-faint">Nächste Lektion</p>
                  <p className="font-medium text-text">Identitäten in Azure verwalten</p>
                  <p className="mt-2 text-text-faint">Als Nächstes</p>
                  <p className="font-medium text-text">Azure Storage implementieren</p>
                </div>

                <div className="flex items-center gap-3">
                  <p className="max-w-[9rem] text-xs text-text-muted">
                    Du machst das Größte! 🔥 Bleib dran und erreiche deine Ziele.
                  </p>
                  <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-success/30">
                    <span className="text-xs font-bold text-success">65%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Beliebte Zertifizierungen */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-text">Beliebte Zertifizierungen</h2>
                <span className="cursor-pointer text-xs font-semibold text-primary">Alle anzeigen</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {certs.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-xl border border-border-soft bg-panel p-5 transition-colors hover:border-primary/40"
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt">
                      {getVendorIcon(c.vendor)}
                    </div>
                    <h3 className="font-bold text-text">{c.title}</h3>
                    <p className="text-sm text-text-muted">{c.subtitle}</p>
                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="rounded-full bg-primary-light px-2 py-1 font-semibold text-primary">
                        {c.level}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-text">
                        <Star size={12} className="fill-warning text-warning" />
                        {c.rating}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <DailyPlan />
            <AICoach />
            <ProgressPanel />
          </div>
      </main>
    </DashboardShell>
  );
}
