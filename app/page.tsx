import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Play,
  Users,
  BookOpen,
  List,
  ShieldCheck,
  ThumbsUp,
  Star,
  Rocket,
  Code2,
  Cloud,
  Sparkles,
  Route,
  Laptop,
  TrendingUp,
  Lock,
  CreditCard,
  Globe2,
  BadgeCheck,
  Github,
  Youtube,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Apple,
  User,
} from "lucide-react";
import { getVendorIcon } from "@/lib/vendorIcons";

const navLinksBefore = [
  { label: "Kurse", href: "/courses" },
  { label: "Zertifizierungen", href: "/certifications" },
  { label: "Lernpfade", href: "/learning-paths" },
];

const navLinksAfter = [
  { label: "Für Unternehmen", href: "/business" },
  { label: "Preise", href: "/pricing" },
];

const heroStats = [
  { icon: Users, value: "120K+", label: "Aktive Lernende" },
  { icon: BookOpen, value: "500+", label: "Kurse & Labs" },
  { icon: ShieldCheck, value: "250+", label: "Zertifizierungen" },
  { icon: ThumbsUp, value: "98%", label: "Weiterempfehlung" },
  { icon: Star, value: "4.9/5", label: "Durchschnittsbewertung" },
];

const learningPaths = [
  {
    tag: "AWS",
    tagClass: "bg-warning/15 text-warning",
    icon: () => getVendorIcon("aws", 26),
    title: "AWS Cloud Practitioner",
    level: "Beginner",
    progress: 65,
  },
  {
    tag: "Security",
    tagClass: "bg-success-light text-success",
    icon: () => <ShieldCheck size={24} className="text-success" />,
    title: "Cyber Security Fundamentals",
    level: "Beginner",
    progress: 42,
  },
  {
    tag: "Microsoft",
    tagClass: "bg-primary-light text-primary",
    icon: () => getVendorIcon("microsoft", 26),
    title: "Azure Administrator Associate",
    level: "Intermediate",
    progress: 30,
  },
  {
    tag: "Development",
    tagClass: "bg-danger/15 text-danger",
    icon: () => <Code2 size={24} className="text-danger" />,
    title: "Full Stack Developer Bootcamp",
    level: "Beginner",
    progress: 20,
  },
];

const features = [
  { icon: Laptop, title: "Praxisnah lernen", desc: "Hands-on Labs und Projekte für echte Praxiserfahrung." },
  { icon: BadgeCheck, title: "Anerkannte Zertifikate", desc: "International anerkannte Zertifikate für deine Karriere." },
  { icon: Sparkles, title: "KI Coach", desc: "Dein persönlicher KI-Coach begleitet dich beim Lernen." },
  { icon: Route, title: "Lernpfade", desc: "Strukturierte Pfade für individuellen Erfolg." },
  { icon: Cloud, title: "Flexibel lernen", desc: "Lerne wann und wo du willst, auf allen Geräten." },
  { icon: TrendingUp, title: "Karriere boost", desc: "Bereite dich auf Interviews vor und finde deinen Traumjob." },
];

const testimonials = [
  {
    name: "Lukas Weber",
    role: "AWS Solutions Architect",
    quote: "Dank CertCoach habe ich mein AWS Zertifikat bestanden und meinen Traumjob bekommen!",
    gradient: "linear-gradient(135deg,#6d4cff,#a78bfa)",
  },
  {
    name: "Sarah Müller",
    role: "Azure Administrator",
    quote: "Die Labs und Projekte sind einfach fantastisch. Sehr praxisnah und verständlich erklärt.",
    gradient: "linear-gradient(135deg,#ec4899,#f472b6)",
  },
  {
    name: "David Krause",
    role: "Security Analyst",
    quote: "Die Lernpfade haben mir geholfen, meine Karriere im Bereich Cyber Security zu starten.",
    gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  },
];

const trustedLogos = ["Google", "Microsoft", "amazon", "Deloitte.", "SIEMENS", "IBM"];

const footerColumns = [
  {
    title: "Plattform",
    links: ["Kurse", "Lernpfade", "Zertifizierungen", "Labs", "KI Coach", "Community"],
  },
  {
    title: "Ressourcen",
    links: ["Blog", "Success Stories", "Learning Guides", "Interview Fragen", "Practice Exams", "FAQ"],
  },
  {
    title: "Unternehmen",
    links: ["Über uns", "Karriere", "Partner", "Presse", "Affiliate Program"],
  },
  {
    title: "Rechtliches",
    links: ["Impressum", "Datenschutz (GDPR)", "Nutzungsbedingungen", "AGB", "Widerrufsrecht"],
  },
];

const trustBadges = [
  { icon: Lock, label: "SSL Verschlüsselt" },
  { icon: CreditCard, label: "Sichere Zahlung" },
  { icon: ShieldCheck, label: "GDPR Konform" },
  { icon: Star, label: "Trusted by 100.000+ Lernende" },
  { icon: Globe2, label: "Server in Deutschland" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border-soft bg-panel/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              C
            </div>
            <span className="text-lg font-bold tracking-tight text-text">CertCoach</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinksBefore.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
            <button className="flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-text">
              Ressourcen
              <ChevronDown size={14} />
            </button>
            {navLinksAfter.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <button
              aria-label="Suchen"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border-soft text-text-muted hover:text-text sm:flex"
            >
              <Search size={16} />
            </button>
            <Link
              href="/login"
              className="hidden rounded-lg border border-border-soft px-4 py-2 text-sm font-semibold text-text hover:bg-panel-alt sm:inline-block"
            >
              Anmelden
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Jetzt starten
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-panel px-3 py-1.5 text-xs font-semibold text-warning">
              🏆 #1 IT Learning Platform in DACH
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-text sm:text-5xl">
              Deine Zukunft beginnt
              <br />
              <span className="text-primary">mit neuen Skills</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              Lerne von Experten, erhalte anerkannte Zertifikate und baue die Karriere auf, die du dir wünschst.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                Kostenlos starten
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/courses"
                className="flex items-center gap-2 rounded-lg border border-border-soft px-6 py-3 text-sm font-bold text-text hover:bg-panel-alt"
              >
                Kurse entdecken
                <Play size={14} />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-bg text-white"
                    style={{
                      background: [
                        "linear-gradient(135deg,#6d4cff,#a78bfa)",
                        "linear-gradient(135deg,#f59e0b,#fbbf24)",
                        "linear-gradient(135deg,#22c55e,#4ade80)",
                        "linear-gradient(135deg,#ef4444,#f87171)",
                      ][i],
                    }}
                  >
                    <User size={16} className="fill-white/25" />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-text">120K+</p>
                <p className="text-text-faint">Aktive Lernende weltweit</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96">
            <div className="absolute h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative flex h-40 w-40 rotate-45 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-fuchsia-500 shadow-2xl shadow-primary/40">
              <div className="h-16 w-16 -rotate-45 rounded-xl bg-white/20 backdrop-blur" />
            </div>

            <div className="absolute left-2 top-6 flex items-center gap-2 rounded-xl border border-border-soft bg-panel px-3 py-2 shadow-lg sm:left-6">
              <Code2 size={16} className="text-primary" />
            </div>
            <div className="absolute right-0 top-2 flex items-center gap-2 rounded-xl border border-border-soft bg-panel px-3 py-2 shadow-lg sm:right-4">
              <List size={16} className="text-primary" />
            </div>
            <div className="absolute left-0 bottom-16 flex items-center gap-2 rounded-xl border border-border-soft bg-panel px-3 py-2 shadow-lg">
              <Cloud size={16} className="text-primary" />
            </div>
            <div className="absolute bottom-4 right-2 rounded-xl border border-border-soft bg-panel px-3 py-2 text-xs font-bold text-text shadow-lg sm:right-6">
              AWS <span className="text-primary">Certified</span>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-border-soft bg-panel p-6 sm:grid-cols-3 lg:grid-cols-5">
          {heroStats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <s.icon size={18} />
              </div>
              <div>
                <p className="font-bold text-text">{s.value}</p>
                <p className="text-xs text-text-faint">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular learning paths */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-text">Beliebte Lernpfade</h2>
          <Link href="/learning-paths" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Alle Lernpfade anzeigen
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {learningPaths.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${p.tagClass}`}>{p.tag}</span>
                {p.icon()}
              </div>
              <h3 className="mb-1 font-bold text-text">{p.title}</h3>
              <p className="mb-4 text-xs text-text-faint">{p.level}</p>
              <div className="h-1.5 w-full rounded-full bg-panel-alt">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: `${p.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-text-faint">{p.progress}% abgeschlossen</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why CertCoach */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-extrabold text-text">Warum CertCoach?</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <f.icon size={18} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-text">{f.title}</h3>
              <p className="text-xs leading-relaxed text-text-faint">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-text">Was unsere Lernenden sagen</h2>
          <Link href="/reviews" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            Alle Bewertungen anzeigen
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: t.gradient }}
                >
                  <User size={18} className="fill-white/25" />
                </div>
                <div>
                  <p className="text-sm font-bold text-text">{t.name}</p>
                  <p className="text-xs text-text-faint">{t.role}</p>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-text-muted">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-warning" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted by */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm text-text-faint">
          Vertrauenswürdig von führenden Unternehmen weltweit
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60 grayscale">
          {trustedLogos.map((l) => (
            <span key={l} className="text-xl font-bold text-text">
              {l}
            </span>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 rounded-2xl bg-gradient-to-br from-primary to-fuchsia-600 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
              <Rocket size={22} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">Bereit, deine Zukunft zu gestalten?</h2>
              <p className="mt-1 max-w-md text-sm text-white/80">
                Starte noch heute mit IT-Zertifizierungen, Sprachen, KI-Coach und Karriere-Tools.
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none sm:w-64"
            />
            <Link
              href="/register"
              className="flex items-center justify-center gap-1 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary hover:bg-white/90"
            >
              Kostenlos starten
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-faint">
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> Kostenlos starten
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> Keine Kreditkarte erforderlich
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> Jederzeit kündbar
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-border-soft bg-panel">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-2">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
                  C
                </div>
                <span className="text-lg font-bold text-text">CertCoach</span>
              </div>
              <p className="mb-4 max-w-xs text-sm text-text-faint">
                Deine All-in-One-Plattform für IT-Skills, Sprachen und Karriereentwicklung.
              </p>
              <div className="flex items-center gap-3 text-text-faint">
                <Linkedin size={16} className="hover:text-text" />
                <Github size={16} className="hover:text-text" />
                <Youtube size={16} className="hover:text-text" />
                <Twitter size={16} className="hover:text-text" />
                <Facebook size={16} className="hover:text-text" />
                <Instagram size={16} className="hover:text-text" />
              </div>
            </div>

            {footerColumns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 text-sm font-bold text-text">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-text-faint hover:text-text">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border-soft p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-text">Stay updated</p>
                <p className="text-xs text-text-faint">
                  Erhalte die neuesten Kurse, Zertifizierungen und Lerntipps in deinem Postfach.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  placeholder="Deine E-Mail-Adresse"
                  className="rounded-lg border border-border-soft bg-panel-alt px-4 py-2 text-sm text-text placeholder:text-text-faint focus:outline-none sm:w-56"
                />
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark">
                  Abonnieren
                </button>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <span className="flex items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-xs text-text-faint">
                <Apple size={14} /> App Store
              </span>
              <span className="flex items-center gap-2 rounded-lg border border-border-soft px-3 py-2 text-xs text-text-faint">
                <Play size={14} /> Google Play
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-border-soft pt-6 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {trustBadges.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 text-[11px] text-text-faint">
                  <b.icon size={13} />
                  {b.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-text-faint">
              <span>© 2026 CertCoach GmbH. Made with ❤️ in Germany</span>
              <button className="flex items-center gap-1">
                🇩🇪 Sprache
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
