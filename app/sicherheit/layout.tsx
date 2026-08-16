import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sicherheit",
  description: "So schützt CertCoach deine Daten und dein Konto.",
  alternates: { canonical: "https://www.certcoach.de/sicherheit" },
};

export default function SicherheitLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
