'use client';

/**
 * Teacher Portal — STEP 9: Payout History. Read-only (the API has no
 * mutation endpoint for teachers — see app/api/teacher/payouts).
 */

import { useEffect, useState } from 'react';
import { Loader2, Banknote } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Payout = { id: string; amount_cents: number; method: string; status: 'PENDING' | 'PAID' | 'CANCELLED'; created_at: string; paid_at: string | null };

const METHOD_LABELS: Record<string, string> = { bank_transfer: 'Überweisung', paypal: 'PayPal', other: 'Sonstiges' };
const STATUS_LABELS: Record<string, string> = { PENDING: 'Ausstehend', PAID: 'Ausgezahlt', CANCELLED: 'Storniert' };

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString('de-DE') : '—';
}
async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function AuszahlungenContent() {
  const [payouts, setPayouts] = useState<Payout[] | null>(null);
  const [notInstalled, setNotInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/payouts', { headers }))
      .then(async (res) => {
        if (res.status === 503) {
          setNotInstalled(true);
          setPayouts([]);
          return;
        }
        if (!res.ok) throw new Error('Fehler beim Laden.');
        setPayouts((await res.json()).payouts);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (notInstalled) {
    return <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Auszahlungen sind noch nicht verfügbar.</p>;
  }
  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!payouts) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  if (payouts.length === 0) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <Banknote size={28} color="var(--color-text-faint)" />
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Auszahlungen vorhanden.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
            {['Datum', 'Betrag', 'Methode', 'Status', 'Ausgezahlt am'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payouts.map((p) => (
            <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
              <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(p.created_at)}</td>
              <td className="px-4 py-3 font-semibold">{fmtEuro(p.amount_cents)}</td>
              <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{METHOD_LABELS[p.method] ?? p.method}</td>
              <td className="px-4 py-3">{STATUS_LABELS[p.status]}</td>
              <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(p.paid_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TeacherPayoutsPage() {
  return (
    <TeacherShell title="Auszahlungen">
      <AuszahlungenContent />
    </TeacherShell>
  );
}
