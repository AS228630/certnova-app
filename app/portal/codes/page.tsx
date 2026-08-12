'use client';

/**
 * Teacher Portal — STEP 5/6: My Codes + Referral Links. Talks to
 * /api/teacher/codes, scoped exclusively to the authenticated
 * teacher's own codes.
 */

import { useEffect, useState } from 'react';
import { Loader2, Ticket, Copy, Check } from 'lucide-react';
import TeacherShell from '@/components/teacher/TeacherShell';
import { supabase } from '@/lib/supabase/client';

type Code = {
  id: string;
  code: string;
  extra_days: number;
  commission_rate: number;
  is_active: boolean;
  max_uses: number | null;
  valid_until: string | null;
  referralPath: string;
  stats: { studentsCount: number; revenueCents: number };
};

function fmtEuro(cents: number): string {
  return '€ ' + (cents / 100).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard?.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
      style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}
    >
      {copied ? <Check size={13} color="var(--color-success)" /> : <Copy size={13} />}
      {copied ? 'Kopiert!' : label}
    </button>
  );
}

function CodesContent() {
  const [codes, setCodes] = useState<Code[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [origin] = useState(() => (typeof window !== 'undefined' ? window.location.origin : ''));

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/teacher/codes', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        setCodes((await res.json()).codes);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (!codes) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  if (codes.length === 0) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <Ticket size={28} color="var(--color-text-faint)" />
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Referral-Codes vorhanden.</p>
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Ihr Administrator kann für Sie einen Code anlegen.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {codes.map((c) => (
        <div key={c.id} className="rounded-2xl p-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-sm px-2.5 py-1 rounded-lg font-bold" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>{c.code}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: c.is_active ? 'var(--color-success-light)' : 'var(--color-danger-light)', color: c.is_active ? 'var(--color-success)' : 'var(--color-danger)' }}>
              {c.is_active ? 'Aktiv' : 'Deaktiviert'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div>
              <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Studenten</div>
              <div className="font-semibold">{c.stats.studentsCount}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Umsatz</div>
              <div className="font-semibold">{fmtEuro(c.stats.revenueCents)}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Bonustage</div>
              <div>+{c.extra_days} Tage</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Provision</div>
              <div>{Math.round(c.commission_rate * 100)}%</div>
            </div>
          </div>
          <div className="flex gap-2">
            <CopyButton text={c.code} label="Code kopieren" />
            <CopyButton text={`${origin}${c.referralPath}`} label="Link kopieren" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TeacherCodesPage() {
  return (
    <TeacherShell title="Meine Codes">
      <CodesContent />
    </TeacherShell>
  );
}
