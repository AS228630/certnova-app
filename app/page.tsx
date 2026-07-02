import Link from "next/link";
import { Check, ChevronRight, Menu } from "lucide-react";
import { FaAws, FaMicrosoft, FaLinux, FaGoogle, FaRedhat } from "react-icons/fa";
import { SiComptia } from "react-icons/si";

const navLinks = ["Kurse", "Zertifizierungen", "Labs", "Übungstests", "Für Teams", "Ressourcen"];

const certs = [
  { title: "AZ-900", vendor: "Microsoft Azure Fundamentals", q: 563, level: "Anfänger", Icon: FaMicrosoft, color: "#00A4EF" },
  { title: "AWS Cloud", vendor: "Practitioner", q: 416, level: "Anfänger", Icon: FaAws, color: "#FF9900" },
  { title: "Linux Essentials", vendor: "LPI-010", q: 261, level: "Anfänger", Icon: FaLinux, color: "#FCC624" },
  { title: "Security+", vendor: "CompTIA", q: 601, level: "Mittelstufe", Icon: SiComptia, color: "#C8202F" },
];

const steps = [
  { n: 1, title: "Lernen", desc: "Lerne mit strukturierten Lernpfaden" },
  { n: 2, title: "Üben", desc: "Praktische Labs und echte Fragen" },
  { n: 3, title: "Analysieren", desc: "KI-gestützte Leistungsanalyse" },
  { n: 4, title: "Meistern", desc: "Erreiche 90%+ und bestehe sicher" },
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <header className="flex items-center justify-between border-b border-border-soft px-4 py-4 sm:px-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
            C
          </div>
          <span className="text-lg font-bold text-text">CertCoach</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm font-medium text-text-muted lg:flex">
          {navLinks.map((l) => (
            <span key={l} className="cursor-pointer hover:text-text">
              {l}
            </span>
          ))}
        </nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="hidden text-sm text-text-muted md:inline">DE</span>
          <Link
            href="/dashboard"
            className="rounded-lg border border-border-soft px-4 py-2 text-sm font-semibold text-text hover:bg-panel-alt"
          >
            Login
          </Link>
          <button className="text-text-muted hover:text-text lg:hidden" aria-label="Menü öffnen">
            <Menu size={22} />
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 sm:px-6 md:px-12 md:py-16 lg:grid-cols-2">
        <div>
          <div className="mb-4 inline-flex items-center gap-1 rounded-full bg-success-light px-3 py-1 text-xs font-semibold text-success">
            <Check size={14} />
            563+ verifizierte Fragen
          </div>
          <h1 className="text-3xl font-extrabold leading-tight text-text sm:text-4xl md:text-5xl">
            Echte Fragen.
            <br />
            Vertrauenswürdige Antworten.
            <br />
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              Weltweiter Erfolg.
            </span>
          </h1>
          <p className="mt-4 max-w-md text-text-muted">
            Top IT-Zertifizierungen. Echte Prüfungserfahrung. Lerne smarter, erreiche mehr.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Jetzt kostenlos starten
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/certifications"
              className="rounded-lg border border-border-soft px-6 py-3 text-sm font-bold text-text hover:bg-panel-alt"
            >
              Zertifizierungen entdecken
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center py-8 md:py-10">
          <div className="h-56 w-56 rounded-full bg-gradient-to-br from-primary to-fuchsia-500 sm:h-64 sm:w-64 md:h-80 md:w-80" />
          <div className="absolute left-0 top-2 rounded-xl bg-panel p-3 shadow-lg sm:top-4">
            <FaAws size={20} className="text-[#FF9900]" />
          </div>
          <div className="absolute right-2 top-0 rounded-xl bg-panel p-3 shadow-lg sm:right-4">
            <FaGoogle size={20} className="text-[#4285F4]" />
          </div>
          <div className="absolute left-6 top-1/2 rounded-xl bg-panel p-3 shadow-lg sm:left-10">
            <FaMicrosoft size={20} className="text-[#00A4EF]" />
          </div>
          <div className="absolute right-0 top-1/2 rounded-xl bg-panel p-3 shadow-lg">
            <FaLinux size={20} className="text-[#FCC624]" />
          </div>
          <div className="absolute bottom-4 left-4 rounded-xl bg-panel p-3 shadow-lg sm:bottom-6 sm:left-8">
            <FaRedhat size={20} className="text-[#EE0000]" />
          </div>
          <div className="absolute bottom-0 right-0 rounded-xl bg-panel px-4 py-3 shadow-lg sm:right-2">
            <p className="text-xl font-extrabold text-text">90%</p>
            <p className="text-xs text-text-faint">Mastery System</p>
            <div className="mt-1 h-1 w-16 rounded-full bg-success" />
          </div>
        </div>
      </section>

      <section className="border-y border-border-soft py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 text-text-faint sm:gap-10 sm:px-6 md:px-12">
          <span className="text-sm font-semibold">Microsoft</span>
          <span className="text-sm font-semibold">aws</span>
          <span className="text-sm font-semibold">Google Cloud</span>
          <span className="text-sm font-semibold">CompTIA</span>
          <span className="text-sm font-semibold">Linux</span>
          <span className="text-sm font-semibold">RedHat</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-text sm:text-2xl">Beliebte Zertifizierungen</h2>
          <span className="cursor-pointer text-sm font-semibold text-primary">Alle anzeigen</span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border-soft bg-panel p-5 transition-colors hover:border-primary/40"
            >
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-panel-alt">
                <c.Icon size={18} style={{ color: c.color }} />
              </div>
              <h3 className="font-bold text-text">{c.title}</h3>
              <p className="text-sm text-text-muted">{c.vendor}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-text-faint">{c.q} Fragen</span>
                <span className="font-semibold text-success">{c.level}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 md:px-12 md:pb-16">
        <div className="rounded-2xl border border-border-soft bg-panel-alt p-6 md:p-10">
          <h2 className="text-lg font-bold text-text sm:text-xl">Unser Mastery-System</h2>
          <p className="mt-1 text-sm text-text-muted">
            Unser bewährtes 4-Schritte-System hilft dir, jede Zertifizierung zu meistern
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {s.n}
                </div>
                <h3 className="font-bold text-text">{s.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
