import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB)",
  description: "Die Allgemeinen Geschäftsbedingungen von CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/agb" },
};

export default function AgbLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
