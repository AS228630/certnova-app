'use client';

/**
 * Personal CV / portfolio page.
 *
 * STATUS:
 * - Not linked from anywhere on the site, and marked noindex/nofollow
 *   (see app/cv/page.tsx) — only reachable via direct link.
 * - The HR passcode check is server-side (app/api/cv-access) and the
 *   actual PDF bytes are served through an authenticated route
 *   (app/api/cv-download/[doc]) rather than a static, guessable URL.
 *   See private-documents/cv/README.md for where to put the real files.
 * - TODO before sharing this link with anyone: replace the placeholder
 *   photo, email, LinkedIn and GitHub links below with the real ones,
 *   and set CV_ACCESS_CODE + CV_ACCESS_SECRET in Vercel env vars.
 */

import { useState } from 'react';
import { Mail, Linkedin, Github, MapPin, Globe2, Clock, CheckCircle2, Lock, ShieldCheck, FileText, Loader2 } from 'lucide-react';

// ---- Fill these in with your real info -------------------------------
const CV_EMAIL = 'senmas2022@gmail.com';
const CV_LINKEDIN_URL = 'https://linkedin.com/in/REPLACE-ME';
const CV_GITHUB_URL = 'https://github.com/AS228630';
// ------------------------------------------------------------------------

const T = {
  bg: '#0A0D14',
  card: '#121722',
  border: 'rgba(255,255,255,0.08)',
  accent: '#FF2E4D',
  accentSoft: 'rgba(255,46,77,0.12)',
  success: '#22C55E',
  successSoft: 'rgba(34,197,94,0.14)',
  text: '#F2F3F9',
  textMuted: '#8991AE',
  textFaint: '#5C6485',
};

const DEV_SKILLS = ['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'Git', 'REST API'];
const CLOUD_SKILLS = ['Microsoft Azure (AZ-900)', 'Active Directory', 'Intune', 'Microsoft 365', 'ITIL 4 Foundation', 'CompTIA A+', 'MD-102', 'Windows Server'];

const CERTIFICATES = [
  { label: 'Microsoft AZ-900', color: '#3B82F6' },
  { label: 'CompTIA A+', color: '#EF4444' },
  { label: 'ITIL 4 Foundation', color: '#7C3AED' },
  { label: 'Microsoft MD-102', color: '#3B82F6' },
  { label: 'Microsoft AB-900', color: '#3B82F6' },
  { label: 'Microsoft 365 Certified', color: '#3B82F6' },
  { label: 'Azure Fundamentals', color: '#0EA5E9' },
  { label: 'Windows Server', color: '#0EA5E9' },
];

const LOOKING_FOR = ['Vollzeitstelle', 'Remote / Homeoffice', 'Hybrides Arbeiten', 'Projektbasiert / Freelancer', 'Internationale Teams'];

const DOCUMENTS = [
  { key: 'lebenslauf', label: 'Lebenslauf' },
  { key: 'zeugnisse', label: 'Zeugnisse' },
  { key: 'zertifikate', label: 'Zertifikate' },
  { key: 'arbeitsnachweise', label: 'Arbeitsnachweise' },
];

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: T.card, border: `1px solid ${T.border}`, backdropFilter: 'blur(12px)', ...style }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number; color?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: `1px solid ${T.border}` }}>
      <Icon size={16} color={T.accent} />
      <h2 className="text-xs font-bold tracking-wider" style={{ color: T.text }}>{children}</h2>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="text-xs px-3 py-1.5 rounded-lg inline-block"
      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text }}
    >
      {children}
    </span>
  );
}

function HRAccessPanel() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'granted' | 'denied'>('idle');
  const [downloading, setDownloading] = useState<string | null>(null);
  const [docError, setDocError] = useState<string | null>(null);

  async function requestAccess(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setDocError(null);
    try {
      const res = await fetch('/api/cv-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      setStatus(res.ok ? 'granted' : 'denied');
    } catch {
      setStatus('denied');
    }
  }

  async function downloadDoc(key: string, label: string) {
    setDownloading(key);
    setDocError(null);
    try {
      const res = await fetch(`/api/cv-download/${key}`);
      if (!res.ok) {
        setDocError(
          res.status === 404
            ? `${label} wurde noch nicht hochgeladen.`
            : 'Zugriff abgelaufen — bitte Code erneut eingeben.'
        );
        if (res.status === 401) setStatus('idle');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${label}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setDocError('Download fehlgeschlagen. Bitte erneut versuchen.');
    } finally {
      setDownloading(null);
    }
  }

  return (
    <Card style={{ borderColor: 'rgba(255,46,77,0.25)' }}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Lock size={15} color={T.accent} />
          <h2 className="text-xs font-bold tracking-wider" style={{ color: T.text }}>HR-BEREICH</h2>
        </div>
        <span
          className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1"
          style={{ background: T.successSoft, color: T.success }}
        >
          <ShieldCheck size={12} /> Geschützter Bereich
        </span>
      </div>

      <p className="text-sm font-semibold mt-4" style={{ color: T.accent }}>Vertrauliche Unterlagen &amp; Dokumente</p>
      <p className="text-xs mt-1" style={{ color: T.textMuted }}>
        Dieser Bereich ist nur für autorisierte Personalabteilungen zugänglich.
      </p>

      {status !== 'granted' && (
        <form onSubmit={requestAccess} className="mt-4 flex gap-2">
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Ihr Zugriffscode eingeben"
            className="flex-1 text-sm rounded-xl px-3 py-2.5 outline-none"
            style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text }}
          />
        </form>
      )}
      {status !== 'granted' && (
        <button
          onClick={requestAccess}
          disabled={status === 'loading' || !code}
          className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl disabled:opacity-50"
          style={{ background: T.accent, color: '#fff' }}
        >
          {status === 'loading' ? <Loader2 size={15} className="animate-spin" /> : <Lock size={15} />}
          Zugriff anfordern
        </button>
      )}
      {status === 'denied' && (
        <p className="text-xs mt-2" style={{ color: T.accent }}>Ungültiger Code. Bitte erneut versuchen.</p>
      )}
      {docError && <p className="text-xs mt-2" style={{ color: T.accent }}>{docError}</p>}

      <p className="text-xs font-medium mt-5 mb-2" style={{ color: T.textMuted }}>
        Verfügbare Dokumente {status !== 'granted' && '(nach Freigabe)'}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {DOCUMENTS.map((d) => (
          <button
            key={d.key}
            disabled={status !== 'granted' || downloading === d.key}
            onClick={() => downloadDoc(d.key, d.label)}
            className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-xs disabled:opacity-40"
            style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}`, color: T.textMuted }}
          >
            {downloading === d.key ? <Loader2 size={18} color={T.accent} className="animate-spin" /> : status === 'granted' ? <FileText size={18} color={T.accent} /> : <Lock size={14} color={T.textFaint} />}
            {d.label}
            <span style={{ color: T.textFaint }}>PDF</span>
          </button>
        ))}
      </div>
    </Card>
  );
}

export default function CvPageClient() {
  return (
    <div className="min-h-screen py-10 px-4" style={{ background: T.bg, color: T.text, fontFamily: 'Inter Variable, Inter, sans-serif' }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-5">
        {/* Left column */}
        <div className="space-y-5">
          <Card>
            <div className="flex justify-end">
              <span
                className="text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1.5"
                style={{ background: T.successSoft, color: T.success }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: T.success }} />
                Verfügbar
              </span>
            </div>
            <div className="flex flex-col items-center text-center mt-2">
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold"
                style={{ border: `2px solid ${T.accent}`, color: T.accent, background: T.accentSoft }}
              >
                AS
              </div>
              <h1 className="text-xl font-bold mt-4">Ataullah Senmas</h1>
              <p className="text-sm mt-1" style={{ color: T.accent }}>Software Engineer &amp; IT Specialist</p>
              <p className="text-xs mt-2 flex items-center gap-1" style={{ color: T.textMuted }}>
                <MapPin size={12} /> Berlin, Deutschland · 5+ Jahre Erfahrung
              </p>
              <p className="text-xs mt-3 leading-relaxed" style={{ color: T.textMuted }}>
                Leidenschaftlicher Software Engineer und IT-Spezialist mit fundierter Erfahrung in der
                Entwicklung moderner Webanwendungen und IT-Infrastrukturen.
              </p>
              <div className="flex gap-2 mt-4 w-full">
                <a href={`mailto:${CV_EMAIL}`} className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text }}>
                  <Mail size={13} /> E-Mail
                </a>
                <a href={CV_LINKEDIN_URL} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text }}>
                  <Linkedin size={13} /> LinkedIn
                </a>
                <a href={CV_GITHUB_URL} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${T.border}`, color: T.text }}>
                  <Github size={13} /> GitHub
                </a>
              </div>
            </div>
          </Card>

          <Card>
            <SectionHeading icon={Globe2}>ÜBER MICH</SectionHeading>
            <ul className="space-y-2.5 text-xs">
              <li className="flex justify-between"><span style={{ color: T.textFaint }}>Wohnort</span><span>Berlin, Deutschland</span></li>
              <li className="flex justify-between"><span style={{ color: T.textFaint }}>Sprachen</span><span>Deutsch, Englisch</span></li>
              <li className="flex justify-between"><span style={{ color: T.textFaint }}>Erfahrung</span><span>5+ Jahre</span></li>
              <li className="flex justify-between"><span style={{ color: T.textFaint }}>Verfügbarkeit</span><span style={{ color: T.success }}>Sofort verfügbar</span></li>
            </ul>
          </Card>

          <Card>
            <SectionHeading icon={Clock}>ICH SUCHE</SectionHeading>
            <ul className="space-y-2.5 text-xs">
              {LOOKING_FOR.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={13} color={T.success} /> {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          <Card>
            <SectionHeading icon={Globe2}>FÄHIGKEITEN</SectionHeading>
            <p className="text-xs font-semibold mb-2" style={{ color: T.textMuted }}>Development</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {DEV_SKILLS.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            <p className="text-xs font-semibold mb-2" style={{ color: T.textMuted }}>IT &amp; Cloud</p>
            <div className="flex flex-wrap gap-2">
              {CLOUD_SKILLS.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
          </Card>

          <Card>
            <SectionHeading icon={ShieldCheck}>ZERTIFIKATE</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CERTIFICATES.map((c) => (
                <div key={c.label} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${T.border}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${c.color}22` }}>
                    <ShieldCheck size={18} color={c.color} />
                  </div>
                  <span className="text-[11px]" style={{ color: T.textMuted }}>{c.label}</span>
                </div>
              ))}
            </div>
          </Card>

          <HRAccessPanel />
        </div>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
        {[
          { icon: ShieldCheck, title: '100% DSGVO-konform', sub: 'Ihre Daten sind bei uns sicher und geschützt.' },
          { icon: Globe2, title: 'Made in Germany', sub: 'Qualität aus Deutschland.' },
          { icon: Lock, title: 'Sichere Verbindung', sub: 'Verschlüsselte Datenübertragung.' },
        ].map((b) => (
          <div key={b.title} className="flex items-center gap-3 rounded-xl p-4" style={{ background: T.card, border: `1px solid ${T.border}` }}>
            <b.icon size={18} color={T.success} />
            <div>
              <div className="text-xs font-semibold">{b.title}</div>
              <div className="text-[11px]" style={{ color: T.textFaint }}>{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
