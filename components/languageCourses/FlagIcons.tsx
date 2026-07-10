// Locally-rendered SVG flags for the language courses page. Built inline
// (no external image CDN, no emoji) so they render identically everywhere
// — some networks/browsers block third-party image CDNs, and Windows
// doesn't render Unicode flag emoji at all, which is what these replace.

type FlagProps = { className?: string };

export function FlagDE({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden="true">
      <rect width="5" height="1" y="0" fill="#000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

export function FlagGB({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 36" className={className} aria-hidden="true">
      <rect width="60" height="36" fill="#00247d" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="7.2" />
      <path d="M0 0 60 36M60 0 0 36" stroke="#cf142b" strokeWidth="2.4" />
      <path d="M30 0V36M0 18H60" stroke="#fff" strokeWidth="12" />
      <path d="M30 0V36M0 18H60" stroke="#cf142b" strokeWidth="7.2" />
    </svg>
  );
}

export function FlagES({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden="true">
      <rect width="5" height="3" fill="#AA151B" />
      <rect width="5" height="1.5" y="0.75" fill="#F1BF00" />
    </svg>
  );
}

export function FlagFR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  );
}

export function FlagCN({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#DE2910" />
      <g fill="#FFDE00">
        <polygon points="5,3 6,6 9,6 6.5,8 7.5,11 5,9 2.5,11 3.5,8 1,6 4,6" />
        <polygon points="11,2 11.6,3.2 12.9,3.2 11.9,4 12.3,5.2 11,4.5 9.7,5.2 10.1,4 9.1,3.2 10.4,3.2" transform="scale(0.6) translate(6,2)" />
      </g>
    </svg>
  );
}

export function FlagJP({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <circle cx="15" cy="10" r="6" fill="#BC002D" />
    </svg>
  );
}

export function FlagIT({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" className={className} aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#CE2B37" />
    </svg>
  );
}

export function FlagTR({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#E30A17" />
      <circle cx="12" cy="10" r="5" fill="#fff" />
      <circle cx="13.3" cy="10" r="4" fill="#E30A17" />
      <polygon points="19,10 21.5,10.9 20,8.7 20,11.3 21.5,9.1" fill="#fff" />
    </svg>
  );
}

export const FLAG_COMPONENTS: Record<string, React.ComponentType<FlagProps>> = {
  de: FlagDE,
  gb: FlagGB,
  es: FlagES,
  fr: FlagFR,
  cn: FlagCN,
  jp: FlagJP,
  it: FlagIT,
  tr: FlagTR,
};
