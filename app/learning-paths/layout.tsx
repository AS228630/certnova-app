import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lernpfade",
  description: "Wähle dein Karriereziel und CertCoach zeigt dir deinen personalisierten Lernpfad dorthin.",
  alternates: { canonical: "https://www.certcoach.de/learning-paths" },
};

export default function LearningPathsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
