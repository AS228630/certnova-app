'use client';

/**
 * Real admin page for the teacher referral coupon system — replaces the
 * generic "coming soon" placeholder for this one section. Talks to
 * app/api/admin/teacher-coupons/*, which is protected server-side by
 * lib/admin/requireAdmin.ts (checks the caller's email against the
 * server-only ADMIN_EMAILS env var — NOT the client-side one).
 *
 * Requires (see docs/admin-dashboard-plan.md and the 028 migration):
 *   - supabase/migrations/028_teacher_coupons.sql run in Supabase
 *   - ADMIN_EMAILS set in Vercel (server-only — different from
 *     NEXT_PUBLIC_ADMIN_EMAILS, which only controls the UI redirect)
 */

import { useEffect, useState } from 'react';
import { Plus, Loader2, FileText, FileSpreadsheet, Ticket } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Coupon = {
  id: string;
  teacher_name: string;
  teacher_email: string | null;
  code: string;
  extra_days: number;
  commission_rate: number;
  is_active: boolean;
  stats: { count: number; revenueCents: number; commissionCents: number };
};

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function NewCouponForm({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [code, setCode] = useState('');
  const [extraDays, setExtraDays] = useState(10);
  const [commissionRate, setCommissionRate] = useState(50);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/teacher-coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
        body: JSON.stringify({
          teacherName,
          teacherEmail: teacherEmail || undefined,
          code,
          extraDays,
          commissionRate: commissionRate / 100,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error === undefined ? 'Fehler beim Speichern.' : String(j.error));
        setSaving(false);
        return;
      }
      onCreated();
    } catch {
      setError('Fehler beim Speichern.');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-5 mb-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Neuer Dozenten-Code</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Name des Dozenten *</label>
          <input required value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>E-Mail (optional)</label>
          <input type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Code *</label>
          <input required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="z. B. ARND10" className="w-full text-sm rounded-lg px-3 py-2 font-mono" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Bonustage</label>
            <input type="number" min={0} value={extraDays} onChange={(e) => setExtraDays(Number(e.target.value))} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Provision (%)</label>
            <input type="number" min={0} max={100} value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
        </div>
      </div>
      {error && <p className="text-xs mt-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      <div className="flex gap-2 mt-4">
        <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
          {saving && <Loader2 size={14} className="animate-spin" />} Speichern
        </button>
        <button type="button" onClick={onCancel} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}

export default function DozentenCodesPage() {
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);

  async function fetchCoupons(): Promise<Coupon[]> {
    const res = await fetch('/api/admin/teacher-coupons', { headers: await authHeader() });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      const message =
        j.error === 'admin_not_configured'
          ? 'ADMIN_EMAILS ist in Vercel noch nicht konfiguriert.'
          : j.error === 'not_admin'
            ? 'Kein Admin-Zugriff für dieses Konto.'
            : 'Fehler beim Laden der Daten.';
      throw new Error(message);
    }
    const json = await res.json();
    return json.coupons as Coupon[];
  }

  function reload() {
    setError(null);
    fetchCoupons()
      .then(setCoupons)
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchCoupons()
      .then(setCoupons)
      .catch((e: Error) => setError(e.message));
  }, []);

  async function toggleActive(c: Coupon) {
    setToggling(c.id);
    await fetch(`/api/admin/teacher-coupons/${c.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isActive: !c.is_active }),
    });
    reload();
    setToggling(null);
  }

  async function downloadReport(c: Coupon, format: 'pdf' | 'csv') {
    const headers = await authHeader();
    const res = await fetch(`/api/admin/teacher-coupons/${c.id}/report?format=${format}`, { headers });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${c.code}-Bericht.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Echte Daten aus Supabase — nicht mehr die Demo-Zahlen vom Dashboard.
        </p>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          <Plus size={15} /> Neuer Code
        </button>
      </div>

      {showForm && <NewCouponForm onCreated={() => { setShowForm(false); reload(); }} onCancel={() => setShowForm(false)} />}

      {error && (
        <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>
          {error}
        </div>
      )}

      {!coupons && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {coupons && coupons.length === 0 && !error && (
        <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <Ticket size={28} color="var(--color-text-faint)" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Dozenten-Codes angelegt.</p>
        </div>
      )}

      {coupons && coupons.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Code', 'Dozent', 'Bonustage', 'Provision', 'Käufe', 'Umsatz', 'Provision (€)', 'Status', 'Bericht'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>{c.code}</span>
                  </td>
                  <td className="px-4 py-3">{c.teacher_name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>+{c.extra_days} Tage</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{Math.round(c.commission_rate * 100)}%</td>
                  <td className="px-4 py-3">{c.stats.count}</td>
                  <td className="px-4 py-3 font-semibold">{fmtEuro(c.stats.revenueCents)}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-primary-hover)' }}>{fmtEuro(c.stats.commissionCents)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(c)}
                      disabled={toggling === c.id}
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: c.is_active ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                        color: c.is_active ? 'var(--color-success)' : 'var(--color-danger)',
                      }}
                    >
                      {c.is_active ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => downloadReport(c, 'pdf')} title="PDF-Bericht" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                        <FileText size={13} />
                      </button>
                      <button onClick={() => downloadReport(c, 'csv')} title="CSV-Bericht (Excel)" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                        <FileSpreadsheet size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
