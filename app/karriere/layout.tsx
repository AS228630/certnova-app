import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Karriere bei CertCoach",
  description: "Aktuell haben wir keine offenen Stellen, aber wir wachsen. Schreib uns gerne initiativ.",
  alternates: {
    canonical: "https://www.certcoach.de/karriere",
  },
};

export default function KarriereLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
