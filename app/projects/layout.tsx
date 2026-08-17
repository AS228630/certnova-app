import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projekte",
  description: "Praxisprojekte, mit denen du dein Wissen in realistischen Szenarien anwendest.",
  alternates: { canonical: "https://www.certcoach.de/projects" },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
