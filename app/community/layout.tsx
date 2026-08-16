import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Lerne, teile Wissen und wachse gemeinsam mit tausenden Lernenden weltweit auf CertCoach.",
  alternates: { canonical: "https://www.certcoach.de/community" },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
