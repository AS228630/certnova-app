import Link from "next/link";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Play,
  Users,
  BookOpen,
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
  Apple,
  AlignLeft,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaYoutube, FaFacebook, FaInstagram, FaMicrosoft, FaAmazon } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiSiemens } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { getVendorIcon, getCompanyIcon } from "@/lib/vendorIcons";
import LandingHeader from "@/components/LandingHeader";

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
    icon: () => getVendorIcon("azure", 26),
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
    seed: "Lukas-Weber",
  },
  {
    name: "Sarah Müller",
    role: "Azure Administrator",
    quote: "Die Labs und Projekte sind einfach fantastisch. Sehr praxisnah und verständlich erklärt.",
    seed: "Sarah-Mueller",
  },
  {
    name: "David Krause",
    role: "Security Analyst",
    quote: "Die Lernpfade haben mir geholfen, meine Karriere im Bereich Cyber Security zu starten.",
    seed: "David-Krause",
  },
];

const trustedLogos = [
  { name: "Google", type: "icon" as const, Icon: FcGoogle, color: undefined },
  { name: "Microsoft", type: "icon" as const, Icon: FaMicrosoft, color: "#00A4EF" },
  { name: "Amazon", type: "icon" as const, Icon: FaAmazon, color: "#FF9900" },
  { name: "Deloitte.", type: "text" as const, color: "#86BC25" },
  { name: "SIEMENS", type: "icon" as const, Icon: SiSiemens, color: "#009999" },
  { name: "IBM", type: "text" as const, color: "#1F70C1" },
];

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
  { icon: Lock, label: "SSL Verschlüsselt", color: "#22c55e" },
  { icon: CreditCard, label: "Sichere Zahlung", color: "#6d4cff" },
  { icon: ShieldCheck, label: "GDPR Konform", color: "#0ea5e9" },
  { icon: Star, label: "Trusted by 100.000+ Lernende", color: "#f59e0b" },
  { icon: Globe2, label: "Server in Deutschland", color: "#ef4444" },
];

function GermanFlag({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={(size * 3) / 5} viewBox="0 0 5 3" aria-hidden="true" className="rounded-[2px]">
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <LandingHeader />

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
                {["Alex", "Bella", "Chris", "Dana"].map((seed) => (
                  <img
                    key={seed}
                    src={`https://api.dicebear.com/9.x/personas/svg?seed=${seed}&backgroundColor=6d4cff,f59e0b,22c55e,ef4444`}
                    alt=""
                    className="h-9 w-9 rounded-full border-2 border-bg bg-panel-alt object-cover"
                  />
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-text">120K+</p>
                <p className="text-text-faint">Aktive Lernende weltweit</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center sm:h-96">
            <div className="absolute h-64 w-64 rounded-full bg-primary/25 blur-3xl" />

            <svg viewBox="0 0 400 400" className="relative h-full w-full max-w-sm drop-shadow-2xl">
              <defs>
                <linearGradient id="crystalLeft" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
                <linearGradient id="crystalRight" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a78bfa" />
                  <stop offset="100%" stopColor="#c026d3" />
                </linearGradient>
                <linearGradient id="tierTop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2d2760" />
                  <stop offset="100%" stopColor="#211c47" />
                </linearGradient>
              </defs>

              {/* Isometric platform, 3 stacked tiers */}
              {[
                { cy: 262, half: 100, depth: 26, shade: "#171334" },
                { cy: 222, half: 72, depth: 22, shade: "#1c1840" },
                { cy: 185, half: 42, depth: 16, shade: "#221c4d" },
              ].map((t, i) => (
                <g key={i}>
                  <polygon
                    points={`200,${t.cy - t.half * 0.55} ${200 + t.half},${t.cy} 200,${t.cy + t.half * 0.55} ${200 - t.half},${t.cy}`}
                    fill="url(#tierTop)"
                  />
                  <polygon
                    points={`${200 - t.half},${t.cy} 200,${t.cy + t.half * 0.55} 200,${t.cy + t.half * 0.55 + t.depth} ${200 - t.half},${t.cy + t.depth}`}
                    fill={t.shade}
                  />
                  <polygon
                    points={`${200 + t.half},${t.cy} 200,${t.cy + t.half * 0.55} 200,${t.cy + t.half * 0.55 + t.depth} ${200 + t.half},${t.cy + t.depth}`}
                    fill={t.shade}
                    opacity={0.7}
                  />
                </g>
              ))}

              {/* Faceted crystal */}
              <g>
                <polygon points="200,60 245,135 200,178 200,60" fill="url(#crystalRight)" />
                <polygon points="200,60 155,135 200,178 200,60" fill="url(#crystalLeft)" />
                <polygon points="200,60 222,100 200,116 178,100" fill="#ede9fe" opacity="0.85" />
                <line x1="200" y1="60" x2="200" y2="178" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="155" y1="135" x2="245" y2="135" stroke="#ffffff" strokeOpacity="0.15" strokeWidth="1" />
              </g>

              {/* Sparkles */}
              {[
                [90, 100, 3], [320, 90, 2.5], [70, 220, 2], [340, 240, 3],
                [110, 320, 2], [300, 320, 2.5], [200, 40, 2],
              ].map(([cx, cy, r], i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#c4b5fd" opacity={0.7} />
              ))}
              <path d="M60 150 h14 M67 143 v14" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
              <path d="M330 170 h14 M337 163 v14" stroke="#a78bfa" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
            </svg>

            <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-panel shadow-lg sm:left-8">
              {getCompanyIcon("aws", 18)}
            </div>
            <div className="absolute right-6 top-8 flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-panel/80 shadow-lg backdrop-blur">
              <Code2 size={18} className="text-primary" />
            </div>
            <div className="absolute left-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-border-soft bg-panel/80 shadow-lg backdrop-blur sm:left-2">
              <Cloud size={18} className="text-sky-400" />
            </div>
            <div className="absolute right-0 top-[58%] flex h-10 w-10 items-center justify-center rounded-xl border border-border-soft bg-panel/80 shadow-lg backdrop-blur sm:right-4">
              <AlignLeft size={18} className="text-text-muted" />
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
                <img
                  src={`https://api.dicebear.com/9.x/personas/svg?seed=${t.seed}`}
                  alt=""
                  className="h-11 w-11 shrink-0 rounded-full bg-panel-alt object-cover"
                />
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
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {trustedLogos.map((l) =>
            l.type === "icon" ? (
              <l.Icon key={l.name} size={26} style={{ color: l.color }} aria-label={l.name} />
            ) : (
              <span key={l.name} className="text-xl font-black tracking-tight" style={{ color: l.color }}>
                {l.name}
              </span>
            )
          )}
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
              <div className="flex items-center gap-2.5">
                {[
                  { Icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com", color: "#0A66C2" },
                  { Icon: FaGithub, label: "GitHub", href: "https://github.com", color: "#f2f3f9" },
                  { Icon: FaYoutube, label: "YouTube", href: "https://youtube.com", color: "#FF0000" },
                  { Icon: FaXTwitter, label: "X", href: "https://x.com", color: "#f2f3f9" },
                  { Icon: FaFacebook, label: "Facebook", href: "https://facebook.com", color: "#1877F2" },
                  { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com", color: "#E1306C" },
                ].map(({ Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-panel-alt transition-transform hover:-translate-y-0.5"
                    style={{ color }}
                  >
                    <Icon size={17} />
                  </a>
                ))}
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
              <a
                href="#"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-black px-3.5 py-2 transition-opacity hover:opacity-80"
              >
                <Apple size={22} className="text-white" />
                <div className="text-left leading-none">
                  <p className="text-[9px] text-gray-300">Download on the</p>
                  <p className="text-sm font-semibold text-white">App Store</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-black px-3.5 py-2 transition-opacity hover:opacity-80"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <defs>
                    <linearGradient id="googlePlayGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#00C2FF" />
                      <stop offset="35%" stopColor="#00E676" />
                      <stop offset="65%" stopColor="#FFD600" />
                      <stop offset="100%" stopColor="#FF3D57" />
                    </linearGradient>
                  </defs>
                  <path d="M5 3l14 9-14 9V3z" fill="url(#googlePlayGradient)" />
                </svg>
                <div className="text-left leading-none">
                  <p className="text-[9px] text-gray-300">GET IT ON</p>
                  <p className="text-sm font-semibold text-white">Google Play</p>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4 border-t border-border-soft pt-6 sm:flex-row sm:justify-between">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {trustBadges.map((b) => (
                <span key={b.label} className="flex items-center gap-1.5 text-[11px] text-text-muted">
                  <b.icon size={13} style={{ color: b.color }} />
                  {b.label}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-text-faint">
              <span>© 2026 CertCoach GmbH. Made with ❤️ in Germany</span>
              <button className="flex items-center gap-1.5">
                <GermanFlag size={16} />
                Sprache
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
