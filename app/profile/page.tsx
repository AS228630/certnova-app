import DashboardShell from "@/components/DashboardShell";
import ProfileClient from "@/components/ProfileClient";

export default function ProfilePage() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <ProfileClient />
      </main>
    </DashboardShell>
  );
}
