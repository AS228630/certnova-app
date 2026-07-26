/**
 * CertCoach brand mark: a purple-gradient hexagon containing a combined
 * "C" + checkmark glyph, with a small sparkle accent (representing
 * AI/intelligence). Matches the logo design provided by the site owner —
 * used everywhere the old plain "C in a box" mark used to appear
 * (Header, LandingHeader, sidebar, etc.) so there's one single source of
 * truth for the mark instead of duplicated inline markup.
 */
export default function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      className={className}
      role="img"
      aria-label="CertCoach"
    >
      <defs>
        <linearGradient id="cc-hex-grad" x1="20%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#c4b5fd" />
          <stop offset="35%" stopColor="#a855f7" />
          <stop offset="70%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <linearGradient id="cc-hex-shine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cc-glyph-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f3e8ff" />
        </linearGradient>
      </defs>

      <polygon points="128,10 227,68 227,188 128,246 29,188 29,68" fill="url(#cc-hex-grad)" />
      <polygon points="128,10 227,68 227,188 128,246 29,188 29,68" fill="url(#cc-hex-shine)" />
      <polygon
        points="128,10 227,68 227,188 128,246 29,188 29,68"
        fill="none"
        stroke="#ede9fe"
        strokeOpacity="0.25"
        strokeWidth="2"
      />

      <path d="M 160 82 A 52 52 0 1 0 160 174" fill="none" stroke="url(#cc-glyph-grad)" strokeWidth="22" strokeLinecap="round" />

      <path
        d="M 108 130 L 128 150 L 168 104"
        fill="none"
        stroke="url(#cc-glyph-grad)"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M 186 42 C 188 52, 192 56, 202 58 C 192 60, 188 64, 186 74 C 184 64, 180 60, 170 58 C 180 56, 184 52, 186 42 Z"
        fill="#f5d0fe"
      />
    </svg>
  );
}
