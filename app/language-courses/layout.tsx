import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sprachkurse",
  description: "Lerne Sprachen bei CertCoach — passend zu deiner IT-Karriere.",
  alternates: { canonical: "https://www.certcoach.de/language-courses" },
};

export default function LanguageCoursesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
