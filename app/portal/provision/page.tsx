'use client';

/**
 * Teacher Portal — STEP 8: Commission. Talks to /api/teacher/commission,
 * the same real commission_ledger the admin side reads, filtered to
 * this teacher only.
 */

import { useEffect, useState } from 'react';
import { Loader2, Wallet } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Entry = { id: string; studentName: string; amountCents: number; type: string; status: string; date: string };
type Summary = { earnedCents: number; reversedCents: number; paidCents: number; pendingCents: number };

const STATUS_LABELS: Record<string, string> = { PENDING: 'Ausstehend', APPROVED: 'Genehmigt', PAID: 'Ausgezahlt', REVERSED: 'Storniert', CANCELLED: 'Storniert' };
const TYPE_LABELS: Record<string, string> = { EARNED: 'Provision', REVERSAL: 'Rückbuchung', ADJUSTMENT: 'Anpassung', PAYOUT: 'Auszahlung' };

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE');
}
async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function KpiCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-2xl p-4" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
      <div className="text-lg font-bold" style={{ color }}>{value}</div>
    </div>
  );
}

function ProvisionContent() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/commission', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        const j = await res.json();
        setEntries(j.entries);
        setSummary(j.summary);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!entries || !summary) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <KpiCard label="Verdient" value={fmtEuro(summary.earnedCents)} color="var(--color-text)" />
        <KpiCard label="Ausstehend" value={fmtEuro(summary.pendingCents)} color="#F59E0B" />
        <KpiCard label="Ausgezahlt" value={fmtEuro(summary.paidCents)} color="var(--color-success)" />
        <KpiCard label="Storniert" value={fmtEuro(summary.reversedCents)} color="var(--color-danger)" />
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <Wallet size={28} color="var(--color-text-faint)" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Provisionen.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Datum', 'Student', 'Typ', 'Betrag', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(e.date)}</td>
                  <td className="px-4 py-3">{e.studentName}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{TYPE_LABELS[e.type] ?? e.type}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: e.amountCents < 0 ? 'var(--color-danger)' : 'var(--color-text)' }}>{fmtEuro(e.amountCents)}</td>
                  <td className="px-4 py-3">{STATUS_LABELS[e.status] ?? e.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function TeacherProvisionPage() {
  return (
    <TeacherShell title="Provision">
      <ProvisionContent />
    </TeacherShell>
  );
}
