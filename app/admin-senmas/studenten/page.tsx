'use client';

/**
 * Real admin page for student management — replaces the generic
 * "coming soon" placeholder for this section. See
 * app/api/admin/students/* (protected by lib/admin/requireAdmin.ts).
 */

import { useEffect, useState } from 'react';
import { Loader2, Search, Clock, XCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Student = {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
  plan: string;
  status: string;
  currentPeriodEnd: string | null;
  referredByCode: string | null;
  referredByTeacher: string | null;
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE');
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string; label: string }> = {
    active: { bg: 'var(--color-success-light)', color: 'var(--color-success)', label: 'Aktiv' },
    canceled: { bg: 'var(--color-danger-light)', color: 'var(--color-danger)', label: 'Gekündigt' },
    past_due: { bg: 'var(--color-warning-light, rgba(245,158,11,0.14))', color: 'var(--color-warning, #F59E0B)', label: 'Überfällig' },
    free: { bg: 'var(--color-panel-alt)', color: 'var(--color-text-faint)', label: 'Kostenlos' },
  };
  const s = map[status] ?? map.free;
  return (
    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

export default function StudentenPage() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);

  async function fetchStudents(): Promise<Student[]> {
    const res = await fetch('/api/admin/students', { headers: await authHeader() });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      throw new Error(
        j.error === 'admin_not_configured'
          ? 'ADMIN_EMAILS ist in Vercel noch nicht konfiguriert.'
          : j.error === 'not_admin'
            ? 'Kein Admin-Zugriff für dieses Konto.'
            : 'Fehler beim Laden der Daten.'
      );
    }
    const json = await res.json();
    return json.students as Student[];
  }

  function reload() {
    setError(null);
    fetchStudents()
      .then(setStudents)
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchStudents()
      .then(setStudents)
      .catch((e: Error) => setError(e.message));
  }, []);

  async function extend(id: string) {
    const days = window.prompt('Um wie viele Tage verlängern?', '30');
    if (!days) return;
    setBusyId(id);
    await fetch(`/api/admin/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ action: 'extend', days: Number(days) }),
    });
    reload();
    setBusyId(null);
  }

  async function cancel(id: string) {
    if (!window.confirm('Zugang wirklich kündigen (zum Ende der aktuellen Periode)?')) return;
    setBusyId(id);
    await fetch(`/api/admin/students/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ action: 'cancel' }),
    });
    reload();
    setBusyId(null);
  }

  const filtered = (students ?? []).filter((s) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return s.email.toLowerCase().includes(q) || (s.fullName ?? '').toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-3">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Echte Nutzerdaten aus Supabase Auth — {students?.length ?? 0} registriert.
        </p>
        <div className="relative w-64 max-w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--color-text-faint)" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suchen…"
            className="w-full text-sm rounded-lg pl-8 pr-3 py-2"
            style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}
          />
        </div>
      </div>

      {error && (
        <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>
          {error}
        </div>
      )}

      {!students && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {students && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Student', 'Registriert', 'Plan', 'Status', 'Läuft bis', 'Geworben von', 'Aktionen'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3">
                    <div>{s.fullName || '—'}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{s.email}</div>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(s.createdAt)}</td>
                  <td className="px-4 py-3">{s.plan}</td>
                  <td className="px-4 py-3"><StatusPill status={s.status} /></td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(s.currentPeriodEnd)}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>
                    {s.referredByTeacher ? `${s.referredByTeacher} (${s.referredByCode})` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => extend(s.id)}
                        disabled={busyId === s.id}
                        title="Zugang verlängern"
                        className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50"
                        style={{ background: 'var(--color-panel-alt)' }}
                      >
                        {busyId === s.id ? <Loader2 size={13} className="animate-spin" /> : <Clock size={13} />}
                      </button>
                      <button
                        onClick={() => cancel(s.id)}
                        disabled={busyId === s.id}
                        title="Zugang kündigen"
                        className="w-7 h-7 rounded-lg flex items-center justify-center disabled:opacity-50"
                        style={{ background: 'var(--color-panel-alt)', color: 'var(--color-danger)' }}
                      >
                        <XCircle size={13} />
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
