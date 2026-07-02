"use client";

import { BookOpen, ShieldCheck, Trophy } from "lucide-react";

// Deterministic pseudo-random stars so server/client markup matches (no hydration mismatch)
function seededStars(count: number) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: rand() * 640,
    cy: rand() * 520,
    r: rand() * 1.2 + 0.3,
    o: rand() * 0.6 + 0.25,
  }));
}

const stars = seededStars(90);

const features = [
  { icon: BookOpen, title: "Kurse & Labs", subtitle: "Praxisnah lernen" },
  { icon: ShieldCheck, title: "Zertifizierungen", subtitle: "International anerkannt" },
  { icon: Trophy, title: "Dein Erfolg", subtitle: "Karriere vorantreiben" },
];

export default function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden bg-[#05060f] lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
      {/* Illustration layer */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 640 820"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="glow" cx="72%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#6d4cff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#6d4cff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="planetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="55%" stopColor="#6d4cff" />
            <stop offset="100%" stopColor="#2c1b6e" />
          </linearGradient>
          <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1b1440" />
            <stop offset="100%" stopColor="#0a0716" />
          </linearGradient>
          <linearGradient id="mountainGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6d4cff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6d4cff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="640" height="820" fill="url(#glow)" />

        {/* Stars */}
        {stars.map((s) => (
          <circle key={s.id} cx={s.cx} cy={s.cy} r={s.r} fill="#ffffff" opacity={s.o} />
        ))}
        {/* A couple of larger sparkle stars */}
        <path d="M452 92 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4Z" fill="#ffffff" opacity="0.9" />
        <path d="M118 210 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3Z" fill="#ffffff" opacity="0.7" />

        {/* Ringed planet */}
        <g transform="translate(468 210)">
          <ellipse cx="0" cy="0" rx="118" ry="30" fill="none" stroke="#a78bfa" strokeOpacity="0.45" strokeWidth="2" transform="rotate(-18)" />
          <circle cx="0" cy="0" r="72" fill="url(#planetGrad)" />
          <ellipse cx="-20" cy="-25" rx="30" ry="16" fill="#c4b5fd" opacity="0.25" />
          <ellipse cx="0" cy="0" rx="118" ry="30" fill="none" stroke="#c4b5fd" strokeOpacity="0.6" strokeWidth="2.5" strokeDasharray="2 6" transform="rotate(-18)" />
        </g>

        {/* Distant mountain silhouettes */}
        <path d="M0 560 L110 460 L190 540 L260 470 L340 560 Z" fill="url(#mountainGrad)" opacity="0.55" />

        {/* Foreground mountain with ridge glow */}
        <path
          d="M-20 700 L140 430 L230 540 L300 460 L420 620 L520 500 L680 700 Z"
          fill="url(#mountainGrad)"
        />
        <path
          d="M-20 700 L140 430 L230 540 L300 460 L420 620 L520 500 L680 700"
          fill="none"
          stroke="url(#mountainGlow)"
          strokeWidth="3"
        />

        {/* Astronaut with flag, standing on the peak */}
        <g transform="translate(295 415)">
          {/* flag pole */}
          <line x1="0" y1="-64" x2="0" y2="10" stroke="#c9c3f2" strokeWidth="2" />
          {/* flag */}
          <path d="M0 -64 L34 -56 L0 -46 Z" fill="#f2f3f9" opacity="0.92" />
          {/* body */}
          <g transform="translate(-14 -6)">
            <rect x="0" y="10" width="26" height="30" rx="10" fill="#e7e5ff" />
            <circle cx="13" cy="2" r="12" fill="#e7e5ff" />
            <circle cx="13" cy="2" r="7" fill="#2c1b6e" />
            <rect x="-4" y="14" width="10" height="20" rx="5" fill="#c9c3f2" />
            <rect x="24" y="14" width="10" height="20" rx="5" fill="#c9c3f2" />
            <rect x="2" y="38" width="9" height="16" rx="4" fill="#c9c3f2" />
            <rect x="15" y="38" width="9" height="16" rx="4" fill="#c9c3f2" />
          </g>
        </g>
      </svg>

      {/* Content layer */}
      <div className="relative z-10 flex h-full flex-col justify-between p-10 xl:p-14">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7">
              <path d="M12 0 L24 12 L12 24 L0 12 Z" fill="#6d4cff" />
              <path d="M12 4 L20 12 L12 20 L4 12 Z" fill="#a78bfa" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">CertCoach</span>
        </div>

        <div>
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            #1 IT Learning Platform
          </span>
          <h1 className="max-w-md text-4xl font-extrabold leading-[1.15] text-white xl:text-[2.75rem]">
            Learn. Practice.
            <br />
            Get Certified.
            <br />
            <span className="bg-gradient-to-r from-[#a78bfa] to-[#6d4cff] bg-clip-text text-transparent">
              Build Your Future.
            </span>
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Die All-in-One-Plattform für IT-Profis und Zukunftsgestalter. Lerne von Experten, übe
            praktisch und erreiche international anerkannte Zertifizierungen.
          </p>

          <div className="mt-10 flex flex-wrap gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                  <f.icon size={17} className="text-[#a78bfa]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-xs text-white/50">{f.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-[#05060f] bg-gradient-to-br from-primary to-primary-dark"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-white">120K+</p>
              <p className="text-xs text-white/50">Aktive Lernende</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
