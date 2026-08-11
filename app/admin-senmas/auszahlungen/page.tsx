'use client';

/**
 * Real payout tracking (migration 033: payouts). Financial-manage
 * actions (create, mark paid, cancel) are SUPER_ADMIN/FINANCE_ADMIN
 * only, enforced server-side in app/api/admin/payouts.
 */

import { useEffect, useState } from 'react';
import { Loader2, Plus, Wallet, CheckCircle2, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Teacher = { id: string; name: string };
type Payout = {
  id: string;
  teacher_id: string;
  teacherName: string;
  amount_cents: number;
  currency: string;
  method: string;
  reference: string | null;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  created_at: string;
  paid_at: string | null;
};

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

const METHOD_LABELS: Record<string, string> = { bank_transfer: 'Überweisung', paypal: 'PayPal', other: 'Sonstiges' };
const STATUS_LABELS: Record<string, string> = { PENDING: 'Ausstehend', PAID: 'Ausgezahlt', CANCELLED: 'Storniert' };

function NewPayoutForm({ teachers, onCreated }: { teachers: Teacher[]; onCreated: () => void }) {
  const [teacherId, setTeacherId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('bank_transfer');
  const [reference, setReference] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ teacherId, amountCents: Math.round(Number(amount) * 100), method, reference: reference || undefined }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(
        j.error === 'AMOUNT_EXCEEDS_AVAILABLE_BALANCE'
          ? `Betrag übersteigt das verfügbare Guthaben (${fmtEuro(j.available ?? 0)}).`
          : 'Fehler beim Erstellen.'
      );
      setSaving(false);
      return;
    }
    setAmount('');
    setReference('');
    setSaving(false);
    onCreated();
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-5 mb-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Neue Auszahlung</h3>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <select required value={teacherId} onChange={(e) => setTeacherId(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
          <option value="" disabled>Dozent auswählen…</option>
          {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <input required type="number" min="0.01" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Betrag (€)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
          {Object.entries(METHOD_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <input value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Referenz (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
      </div>
      {error && <p className="text-xs mt-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50 mt-3" style={{ background: 'var(--color-primary)' }}>
        {saving && <Loader2 size={14} className="animate-spin" />} <Plus size={15} /> Auszahlung anlegen
      </button>
    </form>
  );
}

export default function AuszahlungenPage() {
  const [payouts, setPayouts] = useState<Payout[] | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [notInstalled, setNotInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  function fetchAll() {
    return authHeader()
      .then((headers) => Promise.all([fetch('/api/admin/payouts', { headers }), fetch('/api/admin/teachers', { headers })]))
      .then(async ([pRes, tRes]) => {
        if (pRes.status === 503) {
          setNotInstalled(true);
          setPayouts([]);
          return;
        }
        if (!pRes.ok) {
          const j = await pRes.json().catch(() => ({}));
          throw new Error(j.error === 'forbidden_role' ? 'Kein Zugriff auf Finanzdaten.' : 'Fehler beim Laden.');
        }
        const pJson = await pRes.json();
        setPayouts(pJson.payouts);
        if (tRes.ok) setTeachers((await tRes.json()).teachers);
      });
  }

  function reload() {
    setError(null);
    fetchAll().catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchAll().catch((e: Error) => setError(e.message));
  }, []);

  async function act(p: Payout, action: 'mark_paid' | 'cancel') {
    setBusy(p.id);
    const res = await fetch(`/api/admin/payouts/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ action }),
    });
    if (res.ok) reload();
    setBusy(null);
  }

  if (notInstalled) {
    return (
      <div className="rounded-2xl p-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <div className="flex items-center gap-2 mb-2">
          <Wallet size={18} color="var(--color-text-faint)" />
          <h3 className="text-sm font-semibold">Auszahlungen noch nicht installiert</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Erfordert Migration <code>033_payouts.sql</code>, die noch nicht in Supabase ausgeführt wurde.
        </p>
      </div>
    );
  }

  return (
    <div>
      <NewPayoutForm teachers={teachers} onCreated={reload} />

      {error && <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>}

      {!payouts && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {payouts && payouts.length === 0 && !error && (
        <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <Wallet size={28} color="var(--color-text-faint)" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Auszahlungen.</p>
        </div>
      )}

      {payouts && payouts.length > 0 && (
        <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Dozent', 'Betrag', 'Methode', 'Referenz', 'Status', 'Erstellt', 'Ausgezahlt am', 'Aktionen'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payouts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3 whitespace-nowrap">{p.teacherName}</td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">{fmtEuro(p.amount_cents)}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{METHOD_LABELS[p.method] ?? p.method}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{p.reference ?? '—'}</td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: p.status === 'PAID' ? 'var(--color-success-light)' : p.status === 'CANCELLED' ? 'var(--color-danger-light)' : 'var(--color-primary-light)',
                        color: p.status === 'PAID' ? 'var(--color-success)' : p.status === 'CANCELLED' ? 'var(--color-danger)' : 'var(--color-primary-hover)',
                      }}
                    >
                      {STATUS_LABELS[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(p.created_at)}</td>
                  <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(p.paid_at)}</td>
                  <td className="px-4 py-3">
                    {p.status === 'PENDING' && (
                      <div className="flex gap-1.5">
                        <button disabled={busy === p.id} onClick={() => act(p, 'mark_paid')} title="Als ausgezahlt markieren" className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50" style={{ background: 'var(--color-success-light)' }}>
                          <CheckCircle2 size={13} color="var(--color-success)" />
                        </button>
                        <button disabled={busy === p.id} onClick={() => act(p, 'cancel')} title="Stornieren" className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50" style={{ background: 'var(--color-danger-light)' }}>
                          <XCircle size={13} color="var(--color-danger)" />
                        </button>
                      </div>
                    )}
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
