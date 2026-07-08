import Link from "next/link";
import { Linkedin, Youtube, Twitter, Instagram, Facebook, ShieldCheck, Lock, BadgeCheck, Users, Server } from "lucide-react";

const columns = [
  {
    title: "Plattform",
    links: ["Dashboard", "Lernpfade", "Zertifizierungen", "Sprachkurse", "Projekte", "Community", "Analysen", "KI Coach", "Interview-Vorbereitung"],
  },
  {
    title: "Ressourcen",
    links: ["Blog", "Lern-Guides", "Erfolgsgeschichten", "Übungsfragen", "Practice Exams", "FAQ", "Hilfe-Center"],
  },
  {
    title: "Rechtliches",
    links: ["Impressum", "Datenschutz (DSGVO)", "Cookie-Einstellungen", "AGB", "Widerrufsrecht", "Barrierefreiheit", "Sicherheit"],
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "GDPR Konform" },
  { icon: Lock, label: "SSL Verschlüsselt" },
  { icon: BadgeCheck, label: "ISO 27001 Zertifiziert" },
  { icon: Users, label: "Community-Support" },
  { icon: Server, label: "Server in Deutschland" },
];

export default function Footer() {
  return (
    <footer className="mt-10 rounded-2xl border border-border-soft bg-panel p-6 md:p-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-white" />
            </span>
            <span className="text-base font-bold text-text">CertCoach</span>
          </div>
          <p className="mb-4 text-sm text-text-muted">
            Deine All-in-One-Plattform für IT-Skills, Sprachen und Karriereentwicklung.
          </p>
          <div className="flex items-center gap-3 text-text-faint">
            <Linkedin size={17} />
            <Youtube size={17} />
            <Twitter size={17} />
            <Instagram size={17} />
            <Facebook size={17} />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-bold text-text">{col.title}</p>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-text-muted hover:text-primary">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border-soft pt-6 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-sm font-bold text-text">Bleibe auf dem Laufenden</p>
          <p className="mb-3 text-sm text-text-muted">
            Erhalte die neuesten Kurse, Zertifizierungen und Lerntipps in deinem Postfach.
          </p>
          <div className="flex max-w-sm gap-2">
            <input
              placeholder="Deine E-Mail-Adresse"
              className="w-full rounded-lg border border-border-soft bg-panel-alt px-3 py-2.5 text-sm text-text placeholder:text-text-faint focus:border-primary focus:outline-none"
            />
            <button className="flex-none rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark">
              Abonnieren
            </button>
          </div>
        </div>

        <div className="sm:justify-self-end">
          <p className="mb-2 text-sm font-bold text-text">App herunterladen</p>
          <div className="flex gap-2">
            <span className="rounded-lg border border-border-soft px-4 py-2 text-xs text-text-muted">
              📱 App Store
            </span>
            <span className="rounded-lg border border-border-soft px-4 py-2 text-xs text-text-muted">
              ▶ Google Play
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-border-soft pt-6 text-xs text-text-faint sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4">
          {trustItems.map((t) => (
            <span key={t.label} className="flex items-center gap-1.5">
              <t.icon size={13} />
              {t.label}
            </span>
          ))}
        </div>
        <p>© 2026 CertCoach · Made with ❤️ in Germany</p>
      </div>
    </footer>
  );
}
