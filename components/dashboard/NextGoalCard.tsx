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
// cool blue-grey with no glowing path or flag, so the layout always
// looks intentional while the "the summit is lit" detail stays reserved
// for someone who has actually started climbing it. The illustration
// renders on every screen size: a short strip above the text on mobile,
// a taller side panel on larger screens — never display:none, since
// that's what caused it to silently disappear on narrow viewports.
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
        <div className="h-32 w-full sm:hidden">
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
          <div className="relative hidden w-64 shrink-0 overflow-hidden sm:block">
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
      <div className="h-32 w-full sm:hidden">
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
        <div className="relative hidden w-64 shrink-0 overflow-hidden sm:block">
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

// `dimmed` renders a cool blue-grey version with no glowing path and no
// flag — those two details specifically represent "progress toward a
// goal", so they're reserved for someone with a real goal in progress.
// The mountain atmosphere (sky, peaks, stars) stays visible either way,
// so the card never looks broken or unfinished.
function MountainIllustration({ dimmed = false }: { dimmed?: boolean }) {
  return (
    <svg viewBox="0 0 320 240" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="sunGlow" cx="72%" cy="58%" r="55%">
          <stop offset="0%" stopColor={dimmed ? "#3a4160" : "#ffb877"} stopOpacity={dimmed ? 0.35 : 0.9} />
          <stop offset="35%" stopColor={dimmed ? "#2b3350" : "#e8794f"} stopOpacity={dimmed ? 0.25 : 0.55} />
          <stop offset="100%" stopColor={dimmed ? "#161a2c" : "#2a1840"} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dimmed ? "#1a1f33" : "#241333"} />
          <stop offset="55%" stopColor={dimmed ? "#151a2c" : "#1c1240"} />
          <stop offset="100%" stopColor="#0a0d1a" />
        </linearGradient>
        <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dimmed ? "#3d4560" : "#4a3a72"} />
          <stop offset="100%" stopColor={dimmed ? "#242a42" : "#291f4a"} />
        </linearGradient>
        <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dimmed ? "#2c3249" : "#332a5c"} />
          <stop offset="100%" stopColor={dimmed ? "#1c2135" : "#1e1838"} />
        </linearGradient>
        <linearGradient id="mtnFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={dimmed ? "#1e2336" : "#221a3a"} />
          <stop offset="100%" stopColor={dimmed ? "#121522" : "#120e24"} />
        </linearGradient>
        <linearGradient id="trailGlow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f5f3ff" stopOpacity="1" />
        </linearGradient>
        <filter id="softGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="320" height="240" fill="url(#skyGrad)" />
      <rect width="320" height="240" fill="url(#sunGlow)" />

      {[...Array(20)].map((_, i) => (
        <circle
          key={i}
          cx={(i * 41 + 17) % 320}
          cy={(i * 31 + 9) % 110}
          r={i % 4 === 0 ? 1.2 : 0.7}
          fill="#ffffff"
          opacity={dimmed ? 0.35 : 0.55}
        />
      ))}

      {/* Far ridge */}
      <polygon points="0,240 20,150 55,190 90,120 130,200 150,150 175,240" fill="url(#mtnBack)" opacity="0.7" />
      {/* Mid ridge */}
      <polygon points="60,240 100,110 145,175 190,80 230,170 260,130 290,240" fill="url(#mtnMid)" opacity="0.9" />
      {/* Near peak (the summit the trail climbs) */}
      <polygon points="140,240 205,60 240,130 280,95 320,150 320,240" fill="url(#mtnFront)" />

      {/* Trail up the near peak, with genuine glow via the blur filter —
          only lit up once the user has real progress on a goal. */}
      {dimmed ? (
        <polyline
          points="165,230 185,195 175,165 205,145 195,120 215,95 208,70"
          fill="none"
          stroke="#4b5270"
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
          opacity="0.55"
        />
      ) : (
        <>
          <polyline
            points="165,230 185,195 175,165 205,145 195,120 215,95 208,70"
            fill="none"
            stroke="url(#trailGlow)"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#softGlow)"
          />
          {[
            [165, 230],
            [185, 195],
            [175, 165],
            [205, 145],
            [195, 120],
            [215, 95],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r={1.6} fill="#f5f3ff" filter="url(#softGlow)" />
          ))}
          {/* Flag at the summit */}
          <line x1="208" y1="70" x2="208" y2="46" stroke="#e9e4ff" strokeWidth="1.8" />
          <path d="M208,46 L208,54 L224,50 Z" fill="#8b5cf6" />
          <circle cx="208" cy="46" r="2.4" fill="#f5f3ff" filter="url(#softGlow)" />
        </>
      )}
    </svg>
  );
}
