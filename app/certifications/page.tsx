import DashboardShell from "@/components/DashboardShell";
import { companies } from "@/lib/companiesData";
import CertificationsPageClient from "@/components/certifications/CertificationsPageClient";

export default function CertificationsPage() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <CertificationsPageClient companies={companies} />
      </main>
    </DashboardShell>
  );
}
