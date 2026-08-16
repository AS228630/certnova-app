import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aktuelles",
  description: "Neuigkeiten, Produkt-Updates und Ankündigungen rund um CertCoach.",
  alternates: {
    canonical: "https://www.certcoach.de/news",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
