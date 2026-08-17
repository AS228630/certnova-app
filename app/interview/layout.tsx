import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview-Vorbereitung",
  description: "Übe echte Interviewfragen und bereite dich gezielt auf dein nächstes Vorstellungsgespräch vor.",
  alternates: { canonical: "https://www.certcoach.de/interview" },
};

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
