import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interview-Vorbereitung",
  description: "Bereite dich mit KI-gestützten Mock-Interviews und echten Jobangeboten auf deine IT-Karriere vor.",
  alternates: { canonical: "https://www.certcoach.de/interview" },
};

export default function InterviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
