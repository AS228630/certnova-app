import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Hast du Fragen oder Feedback zu CertCoach? Schreib uns direkt.",
  alternates: {
    canonical: "https://www.certcoach.de/kontakt",
  },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
