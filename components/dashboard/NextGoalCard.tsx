"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCertProgressStore } from "@/lib/store/certProgressStore";
import { findCertByCertId } from "@/lib/companiesData";
import { getVendorIcon } from "@/lib/vendorIcons";
import { useLocale } from "@/components/LocaleProvider";

// Real "next goal" derived from whichever certification the user has
// made the most progress on (0-99%). A brand-new user with no progress
// on anything sees an honest empty state — but the mountain illustration
// (this page's one deliberate visual flourish) still renders, dimmed to
// monochrome grey with no glowing path or flag, so the layout always
// looks intentional while the "the summit is lit" detail stays reserved
// for someone who has actually started climbing it. The illustration
// renders on every screen size: a short horizontal strip above the text
// on mobile, a taller side panel on larger screens (sm and up) — it must
// never be display:none, since that's what caused it to silently
// disappear on narrow viewports before.
export default function NextGoalCard() {
  const progressMap = useCertProgressStore((s) => s.progressMap);
  const detailMap = useCertProgressStore((s) => s.detailMap);
  const { t } = useLocale();

  const active = Object.entries(progressMap)
    .filter(([, pct]) => pct > 0 && pct < 100)
    .map(([certId, pct]) => {
      const match = findCertByCertId(certId);
      if (!match) return null;
      return { certId, pct, company: match.company, cert: match.cert, detail: detailMap[certId] };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => b.pct - a.pct)[0];

  if (!active) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border-soft bg-panel">
        <div className="h-28 w-full sm:hidden">
          <MountainIllustration dimmed />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto]">
          <div className="flex flex-col justify-center p-6 text-center sm:text-left">
            <h2 className="mb-2 font-bold text-text">{t("nextGoal.title")}</h2>
            <p className="mb-4 text-sm text-text-faint">{t("nextGoal.noCertYet")}</p>
            <Link
              href="/certifications"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark"
            >
              {t("nextGoal.chooseCert")}
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative hidden w-52 shrink-0 overflow-hidden sm:block">
            <MountainIllustration dimmed />
          </div>
        </div>
      </div>
    );
  }

  const { certId, pct, company, cert, detail } = active;
  // We deliberately show "questions answered" (a number we know for
  // certain) rather than "questions remaining", since the platform
  // doesn't have a single reliable total-question-count source across
  // every certification's question bank (some use dedicated files, some
  // a generic practice system) — showing an estimated remaining count
  // risks being simply wrong for some certs, which the project's no-
  // fabricated-data principle rules out.
  const questionsAnswered = detail?.questionsAnswered ?? 0;
  const labsRemaining = detail?.labCompleted ? 0 : 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-border-soft bg-panel">
      <div className="h-28 w-full sm:hidden">
        <MountainIllustration />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto]">
        <div className="p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-text">{t("nextGoal.title")}</h2>
            <span className="text-lg font-extrabold text-primary">{Math.round(pct)}%</span>
          </div>

          <div className="mb-4 flex items-center gap-3">
            <span className="text-2xl">{getVendorIcon(company.name, 28)}</span>
            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-text">
                {cert.code}: {cert.title}
              </p>
            </div>
          </div>

          <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-panel-alt">
            <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${Math.round(pct)}%` }} />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-3 text-center sm:mb-0">
            <div>
              <p className="text-lg font-extrabold text-text">{questionsAnswered}</p>
              <p className="text-[10px] text-text-faint">{t("dashboard.questionsAnswered")}</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-text">{labsRemaining}</p>
              <p className="text-[10px] text-text-faint">{t("nextGoal.labsRemaining")}</p>
            </div>
          </div>

          <Link
            href={`/certifications/${company.slug}/${certId}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark sm:hidden"
          >
            {t("nextGoal.continueLearning")}
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Decorative mountain-path illustration — a visual reward
            signalling "the summit ahead", matching the design brief. The
            mobile strip above handles small screens; this side panel
            takes over from sm upward. */}
        <div className="relative hidden w-52 shrink-0 overflow-hidden sm:block">
          <MountainIllustration />
        </div>
      </div>

      <div className="hidden border-t border-border-soft p-5 sm:block">
        <Link
          href={`/certifications/${company.slug}/${certId}`}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-dark"
        >
          {t("nextGoal.continueLearning")}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}

// `dimmed` renders a monochrome-grey version with no glowing path and no
// flag — those two details specifically represent "progress toward a
// goal", so they're reserved for someone with a real goal in progress.
// The mountain shapes themselves (the atmosphere/brand flourish) stay
// visible either way, so the card never looks broken or unfinished.
function MountainIllustration({ dimmed = false }: { dimmed?: boolean }) {
  const backFill = dimmed ? "url(#mtnBackGrey)" : "url(#mtnBack)";
  const frontFill = dimmed ? "url(#mtnFrontGrey)" : "url(#mtnFront)";

  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dimmed ? "#1b2033" : "#1b1440"} />
          <stop offset="100%" stopColor="#0a0d1a" />
        </linearGradient>
        <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d3466" />
          <stop offset="100%" stopColor="#241f47" />
        </linearGradient>
        <linearGradient id="mtnFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1b3a" />
          <stop offset="100%" stopColor="#12102a" />
        </linearGradient>
        <linearGradient id="mtnBackGrey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5170" />
          <stop offset="100%" stopColor="#2e3348" />
        </linearGradient>
        <linearGradient id="mtnFrontGrey" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#262a3c" />
          <stop offset="100%" stopColor="#181b28" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#skyGrad)" />
      {[...Array(14)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 37 + 13) % 200}
          cy={(i * 53 + 7) % 90}
          r={i % 3 === 0 ? 1.1 : 0.6}
          fill="#ffffff"
          opacity={dimmed ? 0.4 : 0.5}
        />
      ))}
      <polygon points="0,200 30,90 70,200" fill={backFill} opacity="0.85" />
      <polygon points="60,200 110,50 160,200" fill={backFill} />
      <polygon points="130,200 175,75 200,120 200,200" fill={frontFill} />
      {dimmed && (
        <>
          {/* A faint unlit trail hints at the path without claiming
              progress — clearly dimmer and without the flag, so it
              reads as "not started" rather than "in progress". */}
          <polyline
            points="35,190 55,150 45,120 75,95 65,70 100,55"
            fill="none"
            stroke="#5b6280"
            strokeWidth="1.5"
            strokeDasharray="3 5"
            strokeLinecap="round"
            opacity="0.5"
          />
        </>
      )}
      {!dimmed && (
        <>
          <polyline
            points="35,190 55,150 45,120 75,95 65,70 100,55"
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path d="M100,55 L100,38 L112,44 L100,50 Z" fill="#6d4cff" />
          <line x1="100" y1="38" x2="100" y2="55" stroke="#a78bfa" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}
