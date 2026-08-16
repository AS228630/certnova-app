import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";
import ProfileClient from "@/components/ProfileClient";

// Per Stage 6 spec item 31: a signed-in user's Dashboard/Profile must
// never be indexable, unlike the public Certification pages.
export const metadata: Metadata = {
  robots: { index: false },
};

export default function ProfilePage() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <ProfileClient />
      </main>
    </DashboardShell>
  );
}
