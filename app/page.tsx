"use client";

import Link from "next/link";
import {
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
  BadgeCheck,
  AlignLeft,
} from "lucide-react";
import { SiGoogle } from "react-icons/si";
import { getCompanyIcon } from "@/lib/vendorIcons";
import { careerPaths } from "@/lib/careerPathsData";
import { renderCareerPathIcon } from "@/lib/careerPathIcons";
import LandingHeader from "@/components/LandingHeader";
import Footer from "@/components/Footer";
import { useLocale } from "@/components/LocaleProvider";
import { useGuestOnlyRedirect } from "@/lib/useGuestOnlyRedirect";

const heroStats = [
  { icon: Users, value: "120K+", labelKey: "landing.statActiveLearners" },
  { icon: BookOpen, value: "500+", labelKey: "landing.statCoursesLabs" },
  { icon: ShieldCheck, value: "250+", labelKey: "landing.statCertifications" },
  { icon: ThumbsUp, value: "98%", labelKey: "landing.statRecommend" },
  { icon: Star, value: "4.9/5", labelKey: "landing.statAvgRating" },
];

const features = [
  { icon: Laptop, titleKey: "landing.featPracticalTitle", descKey: "landing.featPracticalDesc" },
  { icon: BadgeCheck, titleKey: "landing.featCertsTitle", descKey: "landing.featCertsDesc" },
  { icon: Sparkles, titleKey: "landing.featAiCoachTitle", descKey: "landing.featAiCoachDesc" },
  { icon: Route, titleKey: "landing.featPathsTitle", descKey: "landing.featPathsDesc" },
  { icon: Cloud, titleKey: "landing.featFlexTitle", descKey: "landing.featFlexDesc" },
  { icon: TrendingUp, titleKey: "landing.featCareerTitle", descKey: "landing.featCareerDesc" },
];

const testimonials = [
  {
    initials: "LW",
    roleKey: "landing.role1",
    quoteKey: "landing.quote1",
  },
  {
    initials: "SM",
    roleKey: "landing.role2",
    quoteKey: "landing.quote2",
  },
  {
    initials: "DK",
    roleKey: "landing.role3",
    quoteKey: "landing.quote3",
  },
];

const trustLogos = [
  { name: "Google", render: () => <SiGoogle size={22} /> },
  { name: "Microsoft", render: () => getCompanyIcon("microsoft", 22) },
  { name: "AWS", render: () => getCompanyIcon("aws", 22) },
  { name: "IBM", render: () => getCompanyIcon("ibm", 22) },
  { name: "Cisco", render: () => getCompanyIcon("cisco", 22) },
  { name: "Oracle", render: () => getCompanyIcon("oracle", 22) },
];

export default function LandingPage() {
  const { t } = useLocale();
  const { checking } = useGuestOnlyRedirect();

  if (checking) return null;
  return (
    <div className="min-h-screen bg-bg">
      {/* Nav */}
      <LandingHeader />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-panel px-3 py-1.5 text-xs font-semibold text-warning">
              🏆 {t("landing.badge")}
            </span>
            <h1 className="text-4xl font-extrabold leading-tight text-text sm:text-5xl">
              {t("landing.heroTitle1")}
              <br />
              <span className="text-primary">{t("landing.heroTitle2")}</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
              {t("landing.heroDesc")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
              >
                {t("landing.ctaFree")}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/certifications"
                className="flex items-center gap-2 rounded-lg border border-border-soft px-6 py-3 text-sm font-bold text-text hover:bg-panel-alt"
              >
                {t("landing.ctaDiscover")}
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
                <p className="text-text-faint">{t("landing.activeLearners")}</p>
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
            <div key={s.labelKey} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                <s.icon size={18} />
              </div>
              <div>
                <p className="font-bold text-text">{s.value}</p>
                <p className="text-xs text-text-faint">{t(s.labelKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted by / certification recognition */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-wide text-text-faint">
          {t("landing.trustedByTitle")}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70 grayscale">
          {trustLogos.map((l) => (
            <span key={l.name} className="flex items-center gap-2 text-text-muted">
              {l.render()}
              <span className="text-base font-semibold">{l.name}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Popular learning paths */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-text">{t("landing.popularPaths")}</h2>
          <Link href="/learning-paths" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {t("landing.viewAllPaths")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {careerPaths.slice(0, 4).map((p) => (
            <div key={p.slug} className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-primary-light px-2.5 py-1 text-[11px] font-bold text-primary">
                  {t(`learningPaths.level${p.level}`)}
                </span>
                <span className="text-primary">{renderCareerPathIcon(p.icon, 24)}</span>
              </div>
              <h3 className="mb-1 font-bold text-text">{p.title}</h3>
              <p className="text-xs text-text-faint">{p.duration}</p>
              <p className="mt-1 text-xs font-semibold text-text-muted">~{p.salaryRange}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why CertCoach */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-2xl font-extrabold text-text">{t("landing.whyCertCoach")}</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {features.map((f) => (
            <div key={f.titleKey} className="rounded-2xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light text-primary">
                <f.icon size={18} />
              </div>
              <h3 className="mb-1 text-sm font-bold text-text">{t(f.titleKey)}</h3>
              <p className="text-xs leading-relaxed text-text-faint">{t(f.descKey)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-text">{t("landing.testimonialsTitle")}</h2>
          <Link href="/reviews" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
            {t("landing.viewAllReviews")}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((tst) => (
            <div key={tst.initials} className="relative rounded-2xl border border-border-soft bg-panel p-5">
              <span className="absolute right-4 top-4 rounded-full bg-panel-alt px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-text-faint">
                {t("landing.beispielBadge")}
              </span>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-light text-sm font-bold text-primary">
                  {tst.initials}
                </div>
                <div>
                  <p className="text-xs text-text-faint">{t(tst.roleKey)}</p>
                </div>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-text-muted">&ldquo;{t(tst.quoteKey)}&rdquo;</p>
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-warning" />
                ))}
              </div>
            </div>
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
              <h2 className="text-xl font-extrabold text-white">{t("landing.ctaReadyTitle")}</h2>
              <p className="mt-1 max-w-md text-sm text-white/80">
                {t("landing.ctaReadyDesc")}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <input
              type="email"
              placeholder={t("landing.emailPlaceholder")}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none sm:w-64"
            />
            <Link
              href="/register"
              className="flex items-center justify-center gap-1 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-primary hover:bg-white/90"
            >
              {t("landing.ctaFree")}
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-text-faint">
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> {t("landing.ctaFree")}
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> {t("landing.noCreditCard")}
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={14} className="text-success" /> {t("landing.cancelAnytime")}
          </span>
        </div>
      </section>

      <Footer />
    </div>
  );
}
