'use client';

/**
 * Real, append-only audit log viewer (migration 032). Read access is
 * SUPER_ADMIN / AUDITOR only (enforced server-side in
 * app/api/admin/audit-logs, not just hidden here).
 */

import { useEffect, useState } from 'react';
import { Loader2, ScrollText } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Entry = {
  id: string;
  actor_email: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const ACTION_LABELS: Record<string, string> = {
  INSTRUCTOR_CODE_CREATED: 'Dozenten-Code erstellt',
  INSTRUCTOR_CODE_UPDATED: 'Dozenten-Code aktualisiert',
  INSTRUCTOR_CODE_ENABLED: 'Dozenten-Code aktiviert',
  INSTRUCTOR_CODE_DISABLED: 'Dozenten-Code deaktiviert',
  TEACHER_LOGIN_CREATED: 'Dozenten-Login erstellt',
  TEACHER_LOGIN_RENEWED: 'Dozenten-Zugang verlängert',
  ADMIN_ROLE_GRANTED: 'Admin-Rolle vergeben',
  ADMIN_ROLE_REVOKED: 'Admin-Rolle entzogen',
};

export default function AuditLogsPage() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [notInstalled, setNotInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/admin/audit-logs', { headers }))
      .then(async (res) => {
        if (res.status === 503) {
          setNotInstalled(true);
          setEntries([]);
          return;
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error === 'forbidden_role' ? 'Nur Super-Administratoren oder Prüfer haben Zugriff.' : 'Fehler beim Laden.');
        }
        const j = await res.json();
        setEntries(j.entries);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (notInstalled) {
    return (
      <div className="rounded-2xl p-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <div className="flex items-center gap-2 mb-2">
          <ScrollText size={18} color="var(--color-text-faint)" />
          <h3 className="text-sm font-semibold">Audit Log noch nicht installiert</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Erfordert Migration <code>032_audit_logs.sql</code>, die noch nicht in Supabase ausgeführt wurde.
        </p>
      </div>
    );
  }

  if (error) {
    return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  }

  if (!entries) {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Loader2 size={16} className="animate-spin" /> Wird geladen…
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <ScrollText size={28} color="var(--color-text-faint)" />
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine protokollierten Aktionen.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
            {['Zeitpunkt', 'Admin', 'Aktion', 'Ressource', 'Details'].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
              <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{new Date(e.created_at).toLocaleString('de-DE')}</td>
              <td className="px-4 py-3 whitespace-nowrap">{e.actor_email ?? '—'}</td>
              <td className="px-4 py-3">
                <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>
                  {ACTION_LABELS[e.action] ?? e.action}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap font-mono text-xs" style={{ color: 'var(--color-text-faint)' }}>
                {e.resource_type ? `${e.resource_type}:${e.resource_id ?? '—'}` : '—'}
              </td>
              <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-text-faint)' }}>
                {e.metadata ? JSON.stringify(e.metadata) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
