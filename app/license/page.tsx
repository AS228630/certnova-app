'use client';

import { useState } from 'react';
import { CheckCircle2, KeyRound, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function LicensePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ groupName: string; validUntil: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const errorMessages: Record<string, string> = {
    not_authenticated: 'Bitte melde dich zuerst bei CertCoach an, dann lade diese Seite neu.',
    missing_code: 'Bitte gib einen Code ein.',
    invalid_code: 'Dieser Code ist ungültig.',
    expired: 'Diese Gruppen-Lizenz ist abgelaufen.',
    no_seats_left: 'Alle Lizenzen dieser Gruppe sind bereits vergeben. Bitte wende dich an deine Organisation.',
    already_redeemed: 'Du hast diesen Code bereits eingelöst.',
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const { data } = await supabase.auth.getSession();
    const accessToken = data.session?.access_token;

    try {
      const res = await fetch('/api/redeem-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, accessToken }),
      });
      const json = await res.json();
      if (res.ok) {
        setResult({ groupName: json.groupName, validUntil: json.validUntil });
      } else {
        setError(errorMessages[json.error] ?? 'Etwas ist schiefgelaufen. Bitte versuche es erneut.');
      }
    } catch {
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div className="w-full max-w-md rounded-2xl p-8" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--color-primary-light)' }}>
          <KeyRound size={22} color="var(--color-primary-hover)" />
        </div>
        <h1 className="text-lg font-bold mb-1">Gruppen-Lizenz einlösen</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
          Gib den Code ein, den du von deinem Unternehmen oder deiner Bildungseinrichtung erhalten hast.
        </p>

        {result ? (
          <div className="rounded-xl p-4 flex flex-col items-center text-center gap-2" style={{ background: 'var(--color-success-light)' }}>
            <CheckCircle2 size={24} color="var(--color-success)" />
            <p className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>Zugang aktiviert!</p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Über {result.groupName} · gültig bis {new Date(result.validUntil).toLocaleDateString('de-DE')}
            </p>
            <a href="/dashboard" className="text-xs font-medium mt-2 underline" style={{ color: 'var(--color-primary)' }}>Zum Dashboard</a>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="z. B. WBSTRAINING50"
              className="w-full text-sm rounded-lg px-3 py-2.5 mb-3 font-mono uppercase"
              style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}
            />
            {error && <p className="text-xs mb-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg text-white disabled:opacity-50"
              style={{ background: 'var(--color-primary)' }}
            >
              {loading && <Loader2 size={15} className="animate-spin" />} Code einlösen
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
