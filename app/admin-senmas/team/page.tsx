'use client';

/**
 * Team & Rollen — real RBAC management (migration 031: admin_users).
 * Only visible/functional for SUPER_ADMIN (server-enforced by
 * lib/admin/requireAdmin.ts's requirePermission, not just hidden here).
 *
 * Until migration 031 is actually run, /api/admin/team returns
 * RBAC_NOT_INSTALLED (503) — this page shows that honestly instead of
 * pretending an empty team exists.
 */

import { useState, useEffect } from 'react';
import { Loader2, Plus, Trash2, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'FINANCE_ADMIN' | 'SUPPORT' | 'AUDITOR';
type Admin = { id: string; user_id: string; email: string; role: AdminRole; created_at: string };

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: 'Super Administrator',
  ADMIN: 'Administrator',
  FINANCE_ADMIN: 'Finanzen-Administrator',
  SUPPORT: 'Support',
  AUDITOR: 'Prüfer (nur Lesezugriff)',
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function TeamPage() {
  const [admins, setAdmins] = useState<Admin[] | null>(null);
  const [notInstalled, setNotInstalled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('SUPPORT');
  const [saving, setSaving] = useState(false);

  function fetchTeam() {
    return authHeader()
      .then((headers) => fetch('/api/admin/team', { headers }))
      .then(async (res) => {
        if (res.status === 503) {
          setNotInstalled(true);
          setAdmins([]);
          return;
        }
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error === 'forbidden_role' ? 'Nur Super-Administratoren können dies verwalten.' : 'Fehler beim Laden.');
        }
        const j = await res.json();
        setAdmins(j.admins);
      });
  }

  function reload() {
    setError(null);
    fetchTeam().catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchTeam().catch((e: Error) => setError(e.message));
  }, []);

  async function addAdmin(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ email, role }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(
        j.error === 'NO_ACCOUNT_WITH_THIS_EMAIL'
          ? 'Diese E-Mail hat noch kein CertCoach-Konto. Die Person muss sich zuerst registrieren (oder ein Login über Dozenten-Codes erhalten).'
          : 'Fehler beim Hinzufügen.'
      );
      setSaving(false);
      return;
    }
    setEmail('');
    setSaving(false);
    reload();
  }

  async function remove(a: Admin) {
    const res = await fetch(`/api/admin/team/${a.id}`, { method: 'DELETE', headers: await authHeader() });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(
        j.error === 'CANNOT_REMOVE_YOURSELF' ? 'Sie können sich nicht selbst entfernen.' :
        j.error === 'CANNOT_REMOVE_LAST_SUPER_ADMIN' ? 'Der letzte Super-Administrator kann nicht entfernt werden.' :
        'Fehler beim Entfernen.'
      );
      return;
    }
    reload();
  }

  if (notInstalled) {
    return (
      <div className="rounded-2xl p-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck size={18} color="var(--color-text-faint)" />
          <h3 className="text-sm font-semibold">RBAC noch nicht installiert</h3>
        </div>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Die Rollenverwaltung erfordert Migration <code>031_rbac.sql</code>, die noch nicht in Supabase ausgeführt wurde.
          Bis dahin haben alle Konten in <code>ADMIN_EMAILS</code> vollen Zugriff (wie bisher).
        </p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={addAdmin} className="rounded-2xl p-5 mb-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <h3 className="text-sm font-semibold mb-4">Admin hinzufügen</h3>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-3">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail eines bestehenden CertCoach-Kontos"
            className="text-sm rounded-lg px-3 py-2"
            style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}
          />
          <select value={role} onChange={(e) => setRole(e.target.value as AdminRole)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
            {Object.entries(ROLE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
            {saving && <Loader2 size={14} className="animate-spin" />} <Plus size={15} /> Hinzufügen
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>
          {error}
        </div>
      )}

      {!admins && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {admins && admins.length > 0 && (
        <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['E-Mail', 'Rolle', 'Seit', 'Aktionen'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3">{a.email}</td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>
                      {ROLE_LABELS[a.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{new Date(a.created_at).toLocaleDateString('de-DE')}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => remove(a)} title="Entfernen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                      <Trash2 size={13} color="var(--color-danger)" />
                    </button>
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
