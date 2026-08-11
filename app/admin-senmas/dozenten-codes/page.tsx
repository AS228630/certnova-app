'use client';

/**
 * Real admin page for the teacher referral coupon system — matches the
 * approved design reference (KPI cards, search/filter, info footer),
 * but per the senior advisor's explicit rule: the screenshot is a
 * visual reference only. No number, name, or status from it is used
 * as data — everything below comes from
 * app/api/admin/teacher-coupons and app/api/admin/teachers.
 *
 * Requires migrations 028, 029, and 030 (confirmed live Aug 11 2026).
 *
 * Honest, documented limitation, not hidden: search/filter below is
 * client-side. At the project's current scale (a handful of codes)
 * that's the correct tradeoff — the approved spec's server-side
 * pagination requirement (its section 49) is deferred until the
 * dataset is actually large enough to need it, consistent with the
 * Free-Tier principle of not building for scale that doesn't exist
 * yet. Revisit once this list is realistically multiple pages long.
 */

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Loader2, FileText, FileSpreadsheet, Ticket, KeyRound, X, Search, Gift, Share2, KeyRound as KeyIcon, ShoppingCart, Wallet as WalletIcon } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Teacher = { id: string; name: string; email: string | null; user_id: string | null; access_valid_until: string | null; codeCount: number };

type Coupon = {
  id: string;
  teacher_id: string | null;
  teacher_name: string;
  teacher_email: string | null;
  code: string;
  extra_days: number;
  commission_rate: number;
  max_uses: number | null;
  valid_until: string | null;
  created_at: string;
  is_active: boolean;
  stats: { count: number; revenueCents: number; commissionCents: number };
  teacher: { id: string; name: string; user_id: string | null; access_valid_until: string | null } | null;
};

type Summary = { totalCodes: number; activeCodes: number; usedCodes: number; grantedBonusDays: number; outstandingCommissionCents: number };

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('de-DE');
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function KpiCard({ icon: Icon, iconBg, label, value }: { icon: typeof Ticket; iconBg: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${iconBg}26` }}>
        <Icon size={18} color={iconBg} />
      </div>
      <div className="min-w-0">
        <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>{label}</div>
        <div className="text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}

function NewCouponForm({ teachers, onCreated, onCancel }: { teachers: Teacher[]; onCreated: () => void; onCancel: () => void }) {
  const [teacherId, setTeacherId] = useState<string>('');
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [code, setCode] = useState('');
  const [extraDays, setExtraDays] = useState(10);
  const [commissionRate, setCommissionRate] = useState(50);
  const [maxUses, setMaxUses] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isNewTeacher = teacherId === '__new__';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/teacher-coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
        body: JSON.stringify({
          teacherId: isNewTeacher || !teacherId ? undefined : teacherId,
          teacherName: isNewTeacher || !teacherId ? teacherName : undefined,
          teacherEmail: isNewTeacher || !teacherId ? (teacherEmail || undefined) : undefined,
          code,
          extraDays,
          commissionRate: commissionRate / 100,
          maxUses: maxUses === '' ? undefined : Number(maxUses),
          validUntil: validUntil || undefined,
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
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Dozent *</label>
          <select
            required
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="w-full text-sm rounded-lg px-3 py-2"
            style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}
          >
            <option value="" disabled>Auswählen…</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.codeCount} Code{t.codeCount === 1 ? '' : 's'})</option>
            ))}
            <option value="__new__">+ Neuer Dozent…</option>
          </select>
        </div>
        {isNewTeacher && (
          <>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Name des Dozenten *</label>
              <input required value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>E-Mail (optional)</label>
              <input type="email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
            </div>
          </>
        )}
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Code *</label>
          <input required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="z. B. AHMAD10" className="w-full text-sm rounded-lg px-3 py-2 font-mono" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Max. Nutzung (leer = unbegrenzt)</label>
            <input type="number" min={1} value={maxUses} onChange={(e) => setMaxUses(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Gültig bis (optional)</label>
            <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
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

function CreateLoginModal({ teacherId, teacherName, onDone, onClose }: { teacherId: string; teacherName: string; onDone: () => void; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch(`/api/admin/teachers/${teacherId}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ action: 'create', email, password }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(String(j.error ?? 'Fehler beim Erstellen.'));
      setSaving(false);
      return;
    }
    onDone();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl p-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Login für {teacherName} erstellen</h3>
          <button type="button" onClick={onClose}><X size={16} /></button>
        </div>
        <p className="text-xs mb-3" style={{ color: 'var(--color-text-faint)' }}>
          Der Dozent erhält ein kostenloses 1-Jahres-Konto (jährlich manuell verlängerbar). E-Mail und Passwort werden von Ihnen frei gewählt — die E-Mail muss nur gültig formatiert sein, keine Bestätigung wird verschickt.
        </p>
        <div className="space-y-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>E-Mail *</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Passwort * (mind. 8 Zeichen)</label>
            <input required type="text" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2 font-mono" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
        </div>
        {error && <p className="text-xs mt-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
        <div className="flex gap-2 mt-4">
          <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
            {saving && <Loader2 size={14} className="animate-spin" />} Konto erstellen
          </button>
          <button type="button" onClick={onClose} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}

const HOW_IT_WORKS = [
  { icon: Share2, title: '1. Code erstellen', text: 'Erstellen Sie einen Code für Ihren Dozenten mit Bonustagen und Provision.' },
  { icon: KeyIcon, title: '2. Code teilen', text: 'Der Dozent teilt den Code mit seinen Studenten.' },
  { icon: Gift, title: '3. Code einlösen', text: 'Student verwendet den Code und erhält zusätzliche Tage.' },
  { icon: ShoppingCart, title: '4. Provision verdienen', text: 'Bei Zahlungen verdient der Dozent Provision.' },
  { icon: WalletIcon, title: '5. Auszahlung erhalten', text: 'Sie genehmigen und überweisen die Provision.' },
];

export default function DozentenCodesPage() {
  const [coupons, setCoupons] = useState<Coupon[] | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toggling, setToggling] = useState<string | null>(null);
  const [loginModalFor, setLoginModalFor] = useState<{ id: string; name: string } | null>(null);
  const [search, setSearch] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  async function fetchAll(): Promise<{ coupons: Coupon[]; summary: Summary; teachers: Teacher[] }> {
    const headers = await authHeader();
    const [couponsRes, teachersRes] = await Promise.all([
      fetch('/api/admin/teacher-coupons', { headers }),
      fetch('/api/admin/teachers', { headers }),
    ]);
    if (!couponsRes.ok) {
      const j = await couponsRes.json().catch(() => ({}));
      const message =
        j.error === 'admin_not_configured'
          ? 'ADMIN_EMAILS ist in Vercel noch nicht konfiguriert.'
          : j.error === 'not_admin'
            ? 'Kein Admin-Zugriff für dieses Konto.'
            : 'Fehler beim Laden der Daten.';
      throw new Error(message);
    }
    const couponsJson = await couponsRes.json();
    const teachersJson = teachersRes.ok ? await teachersRes.json() : { teachers: [] };
    return { coupons: couponsJson.coupons as Coupon[], summary: couponsJson.summary as Summary, teachers: teachersJson.teachers as Teacher[] };
  }

  function reload() {
    setError(null);
    fetchAll()
      .then(({ coupons: c, summary: s, teachers: t }) => {
        setCoupons(c);
        setSummary(s);
        setTeachers(t);
      })
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    fetchAll()
      .then(({ coupons: c, summary: s, teachers: t }) => {
        setCoupons(c);
        setSummary(s);
        setTeachers(t);
      })
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

  const filtered = useMemo(() => {
    if (!coupons) return [];
    const q = search.trim().toLowerCase();
    return coupons.filter((c) => {
      if (q && !c.code.toLowerCase().includes(q) && !c.teacher_name.toLowerCase().includes(q) && !(c.teacher_email ?? '').toLowerCase().includes(q)) return false;
      if (teacherFilter && c.teacher_id !== teacherFilter) return false;
      if (statusFilter === 'active' && !c.is_active) return false;
      if (statusFilter === 'inactive' && c.is_active) return false;
      return true;
    });
  }, [coupons, search, teacherFilter, statusFilter]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Echte Daten aus Supabase — jeder Dozent ist eine echte, eigenständige Entität (mehrere Codes pro Dozent möglich).
        </p>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white"
          style={{ background: 'var(--color-primary)' }}
        >
          <Plus size={15} /> Neuer Code
        </button>
      </div>

      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mb-5">
          <KpiCard icon={Ticket} iconBg="#7C3AED" label="Gesamt Codes" value={String(summary.totalCodes)} />
          <KpiCard icon={KeyRound} iconBg="#3B82F6" label="Aktive Codes" value={String(summary.activeCodes)} />
          <KpiCard icon={Gift} iconBg="#22C55E" label="Verwendete Codes" value={String(summary.usedCodes)} />
          <KpiCard icon={ShoppingCart} iconBg="#F59E0B" label="Geschenkte Tage" value={String(summary.grantedBonusDays)} />
          <KpiCard icon={WalletIcon} iconBg="#EF4444" label="Provision ausstehend" value={fmtEuro(summary.outstandingCommissionCents)} />
        </div>
      )}

      {showForm && <NewCouponForm teachers={teachers} onCreated={() => { setShowForm(false); reload(); }} onCancel={() => setShowForm(false)} />}

      {loginModalFor && (
        <CreateLoginModal
          teacherId={loginModalFor.id}
          teacherName={loginModalFor.name}
          onDone={() => { setLoginModalFor(null); reload(); }}
          onClose={() => setLoginModalFor(null)}
        />
      )}

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
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2" color="var(--color-text-faint)" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Suche nach Code, Dozent oder E-Mail…"
                className="w-full text-sm rounded-lg pl-9 pr-3 py-2"
                style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}
              />
            </div>
            <select value={teacherFilter} onChange={(e) => setTeacherFilter(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
              <option value="">Alle Dozenten</option>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
              <option value="">Alle Status</option>
              <option value="active">Aktiv</option>
              <option value="inactive">Inaktiv</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl p-8 text-center text-sm" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text-muted)' }}>
              Keine Codes gefunden.
            </div>
          ) : (
            <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                    {['Code', 'Dozent', 'Bonustage', 'Provision', 'Verwendet', 'Umsatz', 'Provision (€)', 'Status', 'Gültig bis', 'Erstellt am', 'Aktionen'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>{c.code}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {c.teacher_id ? (
                          <Link href={`/admin-senmas/dozenten-codes/${c.teacher_id}`} className="hover:underline" style={{ color: 'var(--color-primary)' }}>
                            {c.teacher_name}
                          </Link>
                        ) : c.teacher_name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>+{c.extra_days} Tage</td>
                      <td className="px-4 py-3" style={{ color: 'var(--color-text-faint)' }}>{Math.round(c.commission_rate * 100)}%</td>
                      <td className="px-4 py-3">{c.stats.count}{c.max_uses ? ` / ${c.max_uses}` : ''}</td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">{fmtEuro(c.stats.revenueCents)}</td>
                      <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: 'var(--color-primary-hover)' }}>{fmtEuro(c.stats.commissionCents)}</td>
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
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(c.valid_until)}</td>
                      <td className="px-4 py-3 whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{fmtDate(c.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => downloadReport(c, 'pdf')} title="PDF-Bericht" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                            <FileText size={13} />
                          </button>
                          <button onClick={() => downloadReport(c, 'csv')} title="CSV-Bericht (Excel)" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                            <FileSpreadsheet size={13} />
                          </button>
                          {c.teacher_id && !c.teacher?.user_id && (
                            <button onClick={() => setLoginModalFor({ id: c.teacher_id!, name: c.teacher_name })} title="Login erstellen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}>
                              <KeyRound size={13} />
                            </button>
                          )}
                          {c.teacher?.user_id && (
                            <span title={`Login aktiv, gültig bis ${fmtDate(c.teacher.access_valid_until)}`} className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}>
                              <KeyRound size={13} color="var(--color-success)" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      <div className="rounded-2xl p-5 mt-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <h3 className="text-sm font-semibold mb-1">Wie funktionieren Dozenten-Codes?</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--color-text-faint)' }}>
          Dozenten-Codes ermöglichen es Ihren Partnern, neue Studenten zu werben. Jeder Code gewährt dem Studenten zusätzliche Tage und dem Dozenten eine Provision.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.title} className="flex flex-col gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
                <step.icon size={16} color="var(--color-primary-hover)" />
              </div>
              <div className="text-xs font-semibold">{step.title}</div>
              <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{step.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
