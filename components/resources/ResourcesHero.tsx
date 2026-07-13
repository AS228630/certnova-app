"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, Users } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";

export default function ResourcesHero() {
  const { t } = useLocale();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-panel px-3 py-1.5 text-xs font-semibold text-warning">
            🏆 {t("landing.badge")}
          </span>
          <h1 className="text-3xl font-extrabold leading-tight text-text sm:text-4xl">
            {t("resHome.heroLine1")}
            <br />
            <span className="text-primary">{t("resHome.heroLine2")}</span>
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text-muted">{t("resHome.heroDesc")}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("resHome.ctaStart")}
              <ArrowRight size={16} />
            </Link>
            <a
              href="#overview"
              className="flex items-center gap-2 rounded-lg border border-border-soft px-6 py-3 text-sm font-bold text-text hover:bg-panel-alt"
            >
              {t("resHome.ctaDiscover")}
              <PlayCircle size={14} />
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary">
              <Users size={18} />
            </div>
            <div className="text-sm">
              <p className="font-bold text-text">120K+</p>
              <p className="text-text-faint">{t("resHome.learnersBenefit")}</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto hidden h-72 w-full max-w-sm items-center justify-center lg:flex">
          <div className="absolute h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
          <BookIllustration />
        </div>
      </div>
    </section>
  );
}

function BookIllustration() {
  return (
    <svg viewBox="0 0 300 220" className="relative h-full w-full">
      <defs>
        <linearGradient id="bookLeft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="bookRight" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="190" rx="110" ry="14" fill="#000000" opacity="0.25" />
      <path d="M150,70 L40,95 L40,175 L150,155 Z" fill="url(#bookLeft)" />
      <path d="M150,70 L260,95 L260,175 L150,155 Z" fill="url(#bookRight)" />
      <path d="M40,95 L150,70 L260,95 L150,115 Z" fill="#ede9fe" opacity="0.9" />
      {[0, 1, 2].map((i) => (
        <line key={`l-${i}`} x1={55 + i * 4} y1={115 + i * 14} x2={140 - i * 2} y2={110 + i * 14} stroke="#f5f3ff" strokeWidth="1.5" opacity="0.6" />
      ))}
      {[0, 1, 2].map((i) => (
        <line key={`r-${i}`} x1={160 + i * 2} y1={110 + i * 14} x2={245 - i * 4} y2={115 + i * 14} stroke="#f5f3ff" strokeWidth="1.5" opacity="0.6" />
      ))}
    </svg>
  );
}
