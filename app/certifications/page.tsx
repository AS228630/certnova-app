import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { supabase } from "@/lib/supabase/client";
import { getVendorIcon } from "@/lib/vendorIcons";

export const revalidate = 0;

export default async function CertificationsPage() {
  const { data: certs, error } = await supabase
    .from("certifications")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="bg-slate-50 p-4 md:p-8">
          <h1 className="mb-1 text-2xl font-bold text-navy">Certifications</h1>
          <p className="mb-6 text-sm text-slate-500">
            Master IT certifications and advance your career.
          </p>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              خطا در اتصال به دیتابیس: {error.message}
            </p>
          )}

          {!error && (!certs || certs.length === 0) && (
            <p className="text-sm text-slate-500">
              هنوز هیچ گواهی‌نامه‌ای در دیتابیس ثبت نشده است.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs?.map((c) => (
              <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-navy/10">
                  {getVendorIcon(c.vendor)}
                </div>
                <h3 className="font-bold text-navy">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.vendor}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{c.total_questions} Questions</span>
                  <span className="rounded-full bg-gold/10 px-2 py-1 font-semibold text-gold">
                    {c.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
