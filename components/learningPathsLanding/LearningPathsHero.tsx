"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Check } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

const highlights = ["highlightPractical", "highlightAiCoach", "highlightCertPrep", "highlightExpertMade"];

export default function LearningPathsHero() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight text-text sm:text-4xl lg:text-5xl">
            {t("lpLanding.heroTitleLine1")}
            <br />
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              {t("lpLanding.heroTitleLine2")}
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-text-muted">{t("lpLanding.heroDesc")}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
            >
              {t("lpLanding.ctaStartFree")}
              <ArrowRight size={16} />
            </Link>
            <a
              href="#popular-paths"
              className="flex items-center justify-center gap-2 rounded-lg border border-border-soft px-6 py-3 text-sm font-bold text-text hover:bg-panel-alt"
            >
              {t("lpLanding.ctaDiscover")}
              <PlayCircle size={16} />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((h) => (
              <span key={h} className="flex items-center gap-1.5 text-xs font-medium text-text-muted">
                <Check size={14} className="text-success" />
                {t(`lpLanding.${h}`)}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          <PathIllustration />
        </div>
      </div>
    </section>
  );
}

// Decorative winding-path illustration echoing the reference design's
// hero graphic (learn → labs → exam → cert → cert → job) — purely
// atmospheric, built with the same SVG-only approach used elsewhere on
// the site (e.g. the dashboard's mountain illustration) rather than a
// stock photo, keeping it license-free and on-brand.
function PathIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full">
      <defs>
        <linearGradient id="lpTrail" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#c4b5fd" />
        </linearGradient>
        <filter id="lpGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M60,340 C120,340 100,260 160,250 C220,240 200,170 260,160 C320,150 300,90 340,70"
        fill="none"
        stroke="url(#lpTrail)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#lpGlow)"
        opacity="0.85"
      />

      {[
        { cx: 60, cy: 340, icon: "book" },
        { cx: 160, cy: 250, icon: "flask" },
        { cx: 260, cy: 160, icon: "doc" },
        { cx: 300, cy: 100, icon: "shield" },
        { cx: 340, cy: 70, icon: "briefcase" },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.cx} cy={n.cy} r="22" fill="var(--color-panel)" stroke="#8b5cf6" strokeWidth="2" />
          <NodeIcon type={n.icon} cx={n.cx} cy={n.cy} />
        </g>
      ))}
    </svg>
  );
}

function NodeIcon({ type, cx, cy }: { type: string; cx: number; cy: number }) {
  const stroke = "#a78bfa";
  const common = { stroke, strokeWidth: 1.8, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const t = `translate(${cx - 8}, ${cy - 8})`;
  if (type === "book") {
    return (
      <g transform={t}>
        <path d="M2,2 h6 a2,2 0 0 1 2,2 v10 a2,2 0 0 0 -2,-2 h-6 z" {...common} />
        <path d="M14,2 h-6 a2,2 0 0 0 -2,2 v10 a2,2 0 0 1 2,-2 h6 z" {...common} />
      </g>
    );
  }
  if (type === "flask") {
    return (
      <g transform={t}>
        <path d="M6,1 h4 M7,1 v5 l-4,8 a1.5,1.5 0 0 0 1.3,2.2 h7.4 A1.5,1.5 0 0 0 13,14 L9,6 V1" {...common} />
      </g>
    );
  }
  if (type === "doc") {
    return (
      <g transform={t}>
        <rect x="3" y="1" width="10" height="14" rx="1.5" {...common} />
        <line x1="5.5" y1="5" x2="10.5" y2="5" {...common} />
        <line x1="5.5" y1="8" x2="10.5" y2="8" {...common} />
        <line x1="5.5" y1="11" x2="8.5" y2="11" {...common} />
      </g>
    );
  }
  if (type === "shield") {
    return (
      <g transform={t}>
        <path d="M8,1 L14,3 V8 C14,12 11,14.5 8,15.5 C5,14.5 2,12 2,8 V3 Z" {...common} />
        <path d="M5.5,8 L7,9.5 L10.5,6" {...common} />
      </g>
    );
  }
  return (
    <g transform={t}>
      <rect x="1" y="5" width="14" height="9" rx="1.5" {...common} />
      <path d="M5,5 V3 a1.5,1.5 0 0 1 1.5,-1.5 h3 A1.5,1.5 0 0 1 11,3 v2" {...common} />
    </g>
  );
}
