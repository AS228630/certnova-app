import DashboardShell from "@/components/DashboardShell";
import CompanyGrid from "@/components/certifications/CompanyGrid";
import { companies } from "@/lib/companiesData";

export default function CertificationsPage() {
  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <h1 className="mb-1 text-2xl font-bold text-text">Zertifizierungen</h1>
        <p className="mb-6 text-sm text-text-muted">
          Entdecke Zertifizierungen der besten Unternehmen.
        </p>

        <CompanyGrid companies={companies} />
      </main>
    </DashboardShell>
  );
}
