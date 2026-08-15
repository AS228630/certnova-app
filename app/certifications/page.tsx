import DashboardShell from "@/components/DashboardShell";
import { companies } from "@/lib/companiesData";
import CertificationsPageClient from "@/components/certifications/CertificationsPageClient";

// Guest-accessible: this is the real, full certifications catalog (not
// the simpler /zertifizierungen marketing page) — per the agreed 8-step
// journey, "Kostenlos starten" must take a Guest straight into
// certification selection (stage 2) without requiring login first.
// CertificationsPageClient has no dependency on a signed-in user (pure
// catalog data), so nothing here needs a guest/logged-in branch.
export default function CertificationsPage() {
  return (
    <DashboardShell requireAuth={false}>
      <main className="flex-1 p-4 md:p-8">
        <CertificationsPageClient companies={companies} />
      </main>
    </DashboardShell>
  );
}
