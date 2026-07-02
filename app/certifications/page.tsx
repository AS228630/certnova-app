import DashboardShell from "@/components/DashboardShell";
import { supabase } from "@/lib/supabase/client";
import { getVendorIcon } from "@/lib/vendorIcons";

export const revalidate = 0;

export default async function CertificationsPage() {
  const { data: certs, error } = await supabase
    .from("certifications")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <DashboardShell>
      <main className="flex-1 p-4 md:p-8">
        <h1 className="mb-1 text-2xl font-bold text-text">Zertifizierungen</h1>
        <p className="mb-6 text-sm text-text-muted">
          Meistere IT-Zertifizierungen und bring deine Karriere voran.
        </p>

        {error && (
          <p className="mb-4 rounded-lg bg-danger/10 p-4 text-sm text-danger">
            Fehler bei der Datenbankverbindung: {error.message}
          </p>
        )}

        {!error && (!certs || certs.length === 0) && (
          <p className="text-sm text-text-muted">
            Es sind noch keine Zertifizierungen in der Datenbank vorhanden.
          </p>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certs?.map((c) => (
            <div key={c.id} className="rounded-xl border border-border-soft bg-panel p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
                {getVendorIcon(c.vendor)}
              </div>
              <h3 className="font-bold text-text">{c.title}</h3>
              <p className="text-sm text-text-muted">{c.vendor}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-text-faint">{c.total_questions} Fragen</span>
                <span className="rounded-full bg-primary-light px-2 py-1 font-semibold text-primary">
                  {c.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </DashboardShell>
  );
}
