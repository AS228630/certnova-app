import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erfolgsgeschichten",
  description: "So könnte dein Weg mit CertCoach aussehen.",
  alternates: {
    canonical: "https://www.certcoach.de/erfolgsgeschichten",
  },
};

export default function ErfolgsgeschichtenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
