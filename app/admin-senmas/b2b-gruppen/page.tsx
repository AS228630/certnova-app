'use client';

/**
 * Real admin page for B2B / group licensing — replaces the generic
 * "coming soon" placeholder. See app/api/admin/b2b-groups/* (protected
 * by lib/admin/requireAdmin.ts) and app/api/redeem-license/route.ts
 * (the public, student-facing redemption endpoint — share
 * https://www.certcoach.de/license with the company/school along with
 * their code).
 */

import { useEffect, useState } from 'react';
import { Plus, Loader2, Building2, Copy } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Group = {
  id: string;
  name: string;
  type: 'unternehmen' | 'bildungseinrichtung';
  code: string;
  total_licenses: number;
  usedLicenses: number;
  plan: string;
  valid_until: string | null;
  is_active: boolean;
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function NewGroupForm({ onCreated, onCancel }: { onCreated: () => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const [type, setType] = useState<'unternehmen' | 'bildungseinrichtung'>('unternehmen');
  const [code, setCode] = useState('');
  const [totalLicenses, setTotalLicenses] = useState(10);
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [validUntil, setValidUntil] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/b2b-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
        body: JSON.stringify({ name, type, code, totalLicenses, plan, validUntil: validUntil || undefined }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(String(j.error ?? 'Fehler beim Speichern.'));
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
      <h3 className="text-sm font-semibold mb-4">Neue Gruppen-Lizenz</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Firmen-/Schulname *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Typ</label>
          <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
            <option value="unternehmen">Unternehmen</option>
            <option value="bildungseinrichtung">Bildungseinrichtung</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Code *</label>
          <input required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="z. B. WBSTRAINING50" className="w-full text-sm rounded-lg px-3 py-2 font-mono" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Anzahl Lizenzen *</label>
          <input required type="number" min={1} value={totalLicenses} onChange={(e) => setTotalLicenses(Number(e.target.value))} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Plan</label>
          <select value={plan} onChange={(e) => setPlan(e.target.value as typeof plan)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
            <option value="monthly">Monatlich</option>
            <option value="yearly">Jährlich</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Gültig bis (optional)</label>
          <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
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

export default function B2BGruppenPage() {
  const [groups, setGroups] = useState<Group[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function fetchGroups(): Promise<Group[]> {
    const res = await fetch('/api/admin/b2b-groups', { headers: await authHeader() });
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
    return json.groups as Group[];
  }

  function reload() {
    setError(null);
    fetchGroups().then(setGroups).catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchGroups().then(setGroups).catch((e: Error) => setError(e.message));
  }, []);

  async function toggleActive(g: Group) {
    setToggling(g.id);
    await fetch(`/api/admin/b2b-groups/${g.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isActive: !g.is_active }),
    });
    reload();
    setToggling(null);
  }

  function copyRedeemLink(g: Group) {
    const text = `https://www.certcoach.de/license — Code: ${g.code}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(g.id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Echte Daten — Studenten lösen ihren Code auf{' '}
          <a href="/license" target="_blank" className="underline" style={{ color: 'var(--color-primary)' }}>certcoach.de/license</a> ein.
        </p>
        <button onClick={() => setShowForm((s) => !s)} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
          <Plus size={15} /> Neue Gruppe
        </button>
      </div>

      {showForm && <NewGroupForm onCreated={() => { setShowForm(false); reload(); }} onCancel={() => setShowForm(false)} />}

      {error && (
        <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>
          {error}
        </div>
      )}

      {!groups && !error && (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
          <Loader2 size={16} className="animate-spin" /> Wird geladen…
        </div>
      )}

      {groups && groups.length === 0 && !error && (
        <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <Building2 size={28} color="var(--color-text-faint)" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Gruppen-Lizenzen angelegt.</p>
        </div>
      )}

      {groups && groups.length > 0 && (
        <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Name', 'Typ', 'Code', 'Lizenzen', 'Plan', 'Gültig bis', 'Status', ''].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                  <td className="px-4 py-3">{g.name}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{g.type === 'unternehmen' ? 'Unternehmen' : 'Bildungseinrichtung'}</td>
                  <td className="px-4 py-3"><span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>{g.code}</span></td>
                  <td className="px-4 py-3">{g.usedLicenses}/{g.total_licenses}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{g.plan === 'yearly' ? 'Jährlich' : 'Monatlich'}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{g.valid_until ? new Date(g.valid_until).toLocaleDateString('de-DE') : '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(g)}
                      disabled={toggling === g.id}
                      className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                      style={{ background: g.is_active ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: g.is_active ? 'var(--color-success)' : 'var(--color-danger)' }}
                    >
                      {g.is_active ? 'Aktiv' : 'Inaktiv'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => copyRedeemLink(g)} title="Link + Code kopieren" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                      <Copy size={13} />
                    </button>
                    {copiedId === g.id && <span className="text-[10px] ml-1" style={{ color: 'var(--color-success)' }}>Kopiert!</span>}
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
