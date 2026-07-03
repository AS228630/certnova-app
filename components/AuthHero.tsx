"use client";

import { ShieldCheck, Award, Laptop, Bot, Users, Star } from "lucide-react";

type Mode = "register" | "login";

const registerFeatures = [
  { icon: ShieldCheck, text: "Zugang zu über 500+ Kursen und praktischen Labs" },
  { icon: Award, text: "Erhalte anerkannte Zertifikate und verbessere deine Karriere" },
  { icon: Laptop, text: "Lerne überall und jederzeit auf allen Geräten" },
  { icon: Bot, text: "KI Coach unterstützt dich bei deinen Zielen" },
  { icon: Users, text: "Werde Teil einer aktiven Lern-Community" },
];

const loginFeatures = [
  { icon: ShieldCheck, text: "Setze dort fort, wo du aufgehört hast" },
  { icon: Award, text: "Verfolge deinen Fortschritt bei allen Zertifizierungen" },
  { icon: Laptop, text: "Synchronisiert auf allen deinen Geräten" },
  { icon: Bot, text: "Dein KI Coach erinnert sich an deine Ziele" },
  { icon: Users, text: "Bleib Teil der Lern-Community" },
];

export default function AuthHero({ mode }: { mode: Mode }) {
  const features = mode === "register" ? registerFeatures : loginFeatures;

  return (
    <div className="hidden flex-col justify-center lg:flex">
      <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/30 bg-primary-light px-3.5 py-1.5 text-xs font-semibold text-primary">
        {mode === "register" ? "Werde Teil von CertCoach" : "Willkommen zurück"}
      </span>

      <h1 className="max-w-md text-4xl font-extrabold leading-[1.2] text-text xl:text-[2.6rem]">
        {mode === "register" ? (
          <>
            Erstelle dein Konto und starte deine{" "}
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              Lernreise
            </span>
          </>
        ) : (
          <>
            Melde dich an und setze deine{" "}
            <span className="bg-gradient-to-r from-primary to-fuchsia-400 bg-clip-text text-transparent">
              Lernreise
            </span>{" "}
            fort
          </>
        )}
      </h1>

      <ul className="mt-8 space-y-4">
        {features.map((f) => (
          <li key={f.text} className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <f.icon size={17} className="text-primary" />
            </div>
            <p className="pt-1.5 text-sm text-text-muted">{f.text}</p>
          </li>
        ))}
      </ul>

      {/* Ringed planet illustration */}
      <div className="relative mt-10 h-48 w-48">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl" />
        <svg viewBox="0 0 200 200" className="relative h-full w-full">
          <defs>
            <linearGradient id="authPlanet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="55%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#2c1b6e" />
            </linearGradient>
          </defs>
          <ellipse
            cx="100"
            cy="115"
            rx="92"
            ry="24"
            fill="none"
            stroke="#c4b5fd"
            strokeOpacity="0.55"
            strokeWidth="2"
            transform="rotate(-14 100 115)"
          />
          <circle cx="100" cy="100" r="58" fill="url(#authPlanet)" />
          <ellipse cx="78" cy="78" rx="24" ry="13" fill="#ede9fe" opacity="0.3" />
          <ellipse
            cx="100"
            cy="115"
            rx="92"
            ry="24"
            fill="none"
            stroke="#a78bfa"
            strokeOpacity="0.8"
            strokeWidth="2.5"
            strokeDasharray="2 7"
            transform="rotate(-14 100 115)"
          />
          <circle cx="185" cy="55" r="3" fill="#c4b5fd" opacity="0.7" />
          <circle cx="20" cy="150" r="2.5" fill="#c4b5fd" opacity="0.6" />
          <circle cx="30" cy="40" r="2" fill="#c4b5fd" opacity="0.5" />
        </svg>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-9 w-9 rounded-full border-2 border-bg bg-gradient-to-br from-primary to-fuchsia-500"
            />
          ))}
        </div>
        <div>
          <div className="flex items-center gap-0.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={13} className="fill-warning text-warning" />
            ))}
          </div>
          <p className="text-sm font-bold text-text">54.000+ Lernende weltweit</p>
          <p className="text-xs text-text-faint">vertrauen bereits auf CertCoach</p>
        </div>
      </div>
    </div>
  );
}
