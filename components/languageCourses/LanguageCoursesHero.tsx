"use client";

// Custom hero illustration for the Sprachkurse page hero section,
// approximating the approved design (a globe with floating language
// elements — flags, a book, headphones) using locally-rendered SVG only.
// No external image/network dependency, so it can never fail to load
// regardless of CDN availability (see the flag-rendering issue this
// pattern was adopted to avoid).

export default function LanguageCoursesHero({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="globeGlow" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="globeBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <circle cx="200" cy="115" r="110" fill="url(#globeGlow)" />

      {/* Orbit rings */}
      <ellipse cx="200" cy="115" rx="150" ry="46" fill="none" stroke="#a78bfa" strokeOpacity="0.35" strokeWidth="1.5" />
      <ellipse cx="200" cy="115" rx="120" ry="90" fill="none" stroke="#a78bfa" strokeOpacity="0.2" strokeWidth="1" />

      {/* Globe */}
      <circle cx="200" cy="115" r="62" fill="url(#globeBody)" />
      <ellipse cx="200" cy="115" rx="62" ry="22" fill="none" stroke="#c4b5fd" strokeOpacity="0.55" strokeWidth="1.5" />
      <ellipse cx="200" cy="115" rx="62" ry="45" fill="none" stroke="#c4b5fd" strokeOpacity="0.4" strokeWidth="1.5" />
      <ellipse cx="200" cy="115" rx="22" ry="62" fill="none" stroke="#c4b5fd" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="138" y1="115" x2="262" y2="115" stroke="#c4b5fd" strokeOpacity="0.4" strokeWidth="1.5" />
      <line x1="200" y1="53" x2="200" y2="177" stroke="#c4b5fd" strokeOpacity="0.4" strokeWidth="1.5" />

      {/* Floating flag chips */}
      <g transform="translate(70,40)">
        <rect width="34" height="24" rx="6" fill="#1f2937" stroke="#4b5563" />
        <rect x="4" y="4" width="26" height="16" rx="2" fill="#DE2910" />
      </g>
      <g transform="translate(300,30)">
        <rect width="34" height="24" rx="6" fill="#1f2937" stroke="#4b5563" />
        <rect x="4" y="4" width="26" height="16" rx="2" fill="#000" />
        <rect x="4" y="9.3" width="26" height="5.3" fill="#DD0000" />
        <rect x="4" y="14.7" width="26" height="5.3" fill="#FFCE00" />
      </g>
      <g transform="translate(310,140)">
        <rect width="34" height="24" rx="6" fill="#1f2937" stroke="#4b5563" />
        <rect x="4" y="4" width="26" height="16" rx="2" fill="#AA151B" />
        <rect x="4" y="10" width="26" height="4" fill="#F1BF00" />
      </g>

      {/* Book icon */}
      <g transform="translate(52,150)">
        <rect width="40" height="30" rx="4" fill="#fbbf24" />
        <rect x="4" y="4" width="32" height="3" rx="1.5" fill="#78350f" opacity="0.5" />
        <rect x="4" y="10" width="32" height="3" rx="1.5" fill="#78350f" opacity="0.5" />
        <rect x="4" y="16" width="20" height="3" rx="1.5" fill="#78350f" opacity="0.5" />
      </g>

      {/* Headphones icon */}
      <g transform="translate(300,190)" stroke="#e0e7ff" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M2 20 A18 18 0 0 1 38 20" />
        <rect x="-2" y="18" width="10" height="16" rx="4" fill="#e0e7ff" stroke="none" />
        <rect x="32" y="18" width="10" height="16" rx="4" fill="#e0e7ff" stroke="none" />
      </g>

      {/* Sparkle accents */}
      <circle cx="120" cy="200" r="3" fill="#c4b5fd" />
      <circle cx="360" cy="90" r="2.5" fill="#c4b5fd" />
      <circle cx="45" cy="100" r="2" fill="#c4b5fd" />
    </svg>
  );
}
