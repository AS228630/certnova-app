import DashboardShell from "@/components/DashboardShell";
import { companies } from "@/lib/companiesData";
import CertificationsHero from "@/components/certifications/CertificationsHero";
import CertificationsStats from "@/components/certifications/CertificationsStats";
import PopularProvidersCarousel from "@/components/certifications/PopularProvidersCarousel";
import AllProvidersGrid from "@/components/certifications/AllProvidersGrid";
import CertificationsCTA from "@/components/certifications/CertificationsCTA";
import Footer from "@/components/Footer";

export default function CertificationsPage() {
  const featured = companies.slice(0, 4);

  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <CertificationsHero />
        <CertificationsStats />
        <PopularProvidersCarousel companies={featured} />
        <AllProvidersGrid companies={companies} />
        <CertificationsCTA />
        <Footer />
      </main>
    </DashboardShell>
  );
}
