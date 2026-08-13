'use client';

/**
 * PHASE 7/8 — the real public-facing candidate profile. NO admin
 * session is used or checked anywhere on this page; every data fetch
 * goes through the token-only /api/candidate/[token]/* routes. A
 * visitor here can never reach /admin-senmas — there is no link, no
 * shared code path, and the API routes this page calls are entirely
 * separate from every app/api/admin/* route (different auth,
 * different files).
 */

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Loader2, MapPin, Mail, Linkedin, Github, FileText, Lock, ShieldCheck,
  Briefcase, Award, Download, ExternalLink, Globe, Eye, EyeOff, AlertCircle, CheckCircle2, BarChart3,
} from 'lucide-react';

const COLORS = {
  bg: '#020B14', card: '#071421', cardBorder: '#1A2A39',
  red: '#EF233C', blue: '#22A7F0', green: '#22C55E', purple: '#A855F7',
  textPrimary: '#F4F7FA', textSecondary: '#A8B3BF',
};

type Profile = {
  display_name: string; professional_title: string | null; bio: string | null; location: string | null;
  availability: 'available' | 'open' | 'unavailable' | null; work_mode: string | null; email: string | null;
  linkedin_url: string | null; github_url: string | null; website_url: string | null; desired_positions: string[] | null; created_at: string;
};
type Skill = { id: string; category: string; name: string; level: string | null };
type Certification = { id: string; issuer: string; name: string; issue_date: string | null; expiry_date: string | null; verification_url: string | null; logo_url: string | null };
type Experience = { id: string; role_title: string; company_name: string; location: string | null; start_date: string | null; end_date: string | null; description: string | null; company_logo_url: string | null; company_website_url: string | null };
type Education = { id: string; institution_name: string; degree: string | null; field_of_study: string | null; graduation_date: string | null; logo_url: string | null; website_url: string | null };
type PublicDoc = { id: string; title: string; document_type: string | null };
type ConfidentialDoc = { id: string; title: string; documentType: string | null; unlocked: boolean };

type ProfileResponse = {
  companyName: string; requireAccessCode: boolean; allowDownload: boolean;
  profile: Profile; skills: Skill[]; certifications: Certification[]; experiences: Experience[];
  projects: { id: string; title: string; description: string | null; technologies: string[] | null }[];
  education: Education[]; publicDocuments: PublicDoc[]; confidentialDocuments: ConfidentialDoc[];
};

const AVAILABILITY_LABEL: Record<string, string> = {
  available: 'Verfügbar für neue Möglichkeiten', open: 'Offen für Angebote', unavailable: 'Nicht verfügbar',
};

function fmtMonthYear(iso: string | null): string {
  if (!iso) return 'heute';
  return new Date(iso).toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' });
}
function yearsOfExperience(experiences: Experience[]): number {
  const dated = experiences.filter((e) => e.start_date);
  if (dated.length === 0) return 0;
  const earliest = Math.min(...dated.map((e) => new Date(e.start_date!).getTime()));
  return Math.max(0, Math.round((Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25)));
}
function certStatus(expiryDate: string | null): { label: string; color: string } {
  if (!expiryDate) return { label: 'Kein Ablaufdatum', color: COLORS.textSecondary };
  return new Date(expiryDate).getTime() < Date.now() ? { label: 'Abgelaufen', color: COLORS.red } : { label: 'Aktiv', color: COLORS.green };
}
function BrandLogo({ url, alt, size = 44 }: { url: string | null; alt: string; size?: number }) {
  if (url) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={url} alt={alt} style={{ width: size, height: size, objectFit: 'contain', borderRadius: 10, background: '#fff', padding: 4 }} />;
  }
  return <div className="flex items-center justify-center font-bold" style={{ width: size, height: size, borderRadius: 10, background: COLORS.cardBorder, color: COLORS.textSecondary, fontSize: size * 0.4 }}>{alt.slice(0, 1).toUpperCase()}</div>;
}

/** Public-side certification logo: resolves an internal Storage path
 * (uploaded badge image, never starts with http) to a fresh signed
 * URL via the token-gated logo endpoint. An external URL (pasted by
 * the admin) is used directly. */
function CertLogo({ token, certId, logoUrl, alt, size = 48 }: { token: string; certId: string; logoUrl: string | null; alt: string; size?: number }) {
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(logoUrl && logoUrl.startsWith('http') ? logoUrl : null);

  useEffect(() => {
    if (!logoUrl || logoUrl.startsWith('http')) {
      Promise.resolve().then(() => setResolvedUrl(logoUrl));
      return;
    }
    fetch(`/api/candidate/${token}/certifications/${certId}/logo`)
      .then((res) => res.json())
      .then((j) => setResolvedUrl(j.url ?? null))
      .catch(() => setResolvedUrl(null));
  }, [token, certId, logoUrl]);

  return <BrandLogo url={resolvedUrl} alt={alt} size={size} />;
}
function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl p-5" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}` }}>{children}</div>;
}
function SectionHeader({ icon: Icon, title, accent }: { icon: typeof Award; title: string; accent?: string }) {
  return <div className="flex items-center gap-2 mb-4"><Icon size={16} color={accent ?? COLORS.red} /><h3 className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>{title}</h3></div>;
}

function ConfidentialSection({ token, docs, requireCode, onUnlocked }: { token: string; docs: ConfidentialDoc[]; requireCode: boolean; onUnlocked: () => void }) {
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const allUnlocked = docs.every((d) => d.unlocked);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch(`/api/candidate/${token}/access-code`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }),
    });
    setSubmitting(false);
    if (res.ok) {
      onUnlocked();
      return;
    }
    const j = await res.json().catch(() => ({}));
    setError(
      j.error === 'CODE_ALREADY_USED' ? 'Dieser Code wurde bereits verwendet und ist nicht mehr gültig.' :
      j.error === 'TOO_MANY_ATTEMPTS_LOCKED' ? 'Zu viele Fehlversuche. Bitte versuchen Sie es später erneut.' :
      j.error === 'INVALID_CODE' ? 'Ungültiger Zugriffscode.' : 'Fehler bei der Überprüfung.'
    );
  }

  async function download(docId: string, fileName: string) {
    const res = await fetch(`/api/candidate/${token}/documents/${docId}?download=true`);
    if (!res.ok) return;
    const j = await res.json();
    window.location.href = j.url;
    void fileName;
  }

  async function view(docId: string) {
    const res = await fetch(`/api/candidate/${token}/documents/${docId}`);
    if (!res.ok) return;
    const j = await res.json();
    window.open(j.url, '_blank');
  }

  return (
    <Card>
      <SectionHeader icon={Lock} title="Vertrauliche Unterlagen" accent={COLORS.red} />
      {allUnlocked ? (
        <div className="grid grid-cols-2 gap-2">
          {docs.map((d) => (
            <div key={d.id} className="flex flex-col items-center gap-1.5 text-center rounded-lg p-3" style={{ background: COLORS.cardBorder }}>
              <FileText size={18} color={COLORS.green} />
              <span className="text-[11px]" style={{ color: COLORS.textPrimary }}>{d.title}</span>
              <div className="flex gap-2 mt-1">
                <button onClick={() => view(d.id)} title="Ansehen"><Eye size={13} color={COLORS.textSecondary} /></button>
                <button onClick={() => download(d.id, d.title)} title="Herunterladen"><Download size={13} color={COLORS.textSecondary} /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-xs mb-3" style={{ color: COLORS.textSecondary }}>
            Dieser Bereich enthält {docs.length} vertrauliche{docs.length === 1 ? 's Dokument' : ' Dokumente'}, die nicht öffentlich einsehbar sind.
          </p>
          {requireCode ? (
            <form onSubmit={submit} className="space-y-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Zugriffscode eingeben"
                className="w-full text-sm rounded-lg px-3 py-2"
                style={{ background: COLORS.cardBorder, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.textPrimary }}
              />
              {error && <p className="flex items-center gap-1 text-[11px]" style={{ color: COLORS.red }}><AlertCircle size={12} /> {error}</p>}
              <button type="submit" disabled={submitting || !code.trim()} className="flex items-center justify-center gap-2 w-full text-sm font-medium py-2.5 rounded-lg text-white disabled:opacity-50" style={{ background: COLORS.red }}>
                {submitting ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />} Zugriff freischalten
              </button>
              <p className="text-[10px]" style={{ color: COLORS.textSecondary }}>Der Zugriffscode wurde Ihnen vom Kandidaten oder einer autorisierten Person bereitgestellt. Der Code ist nur einmal gültig.</p>
            </form>
          ) : (
            <p className="text-[11px]" style={{ color: COLORS.textSecondary }}>Für diesen Bereich ist derzeit kein Zugriffscode konfiguriert.</p>
          )}
        </>
      )}
    </Card>
  );
}

export default function PublicCandidateProfilePage() {
  // The [slug] segment (candidate's name, e.g. "ataullah-senmas") is
  // Per the advisor's final URL design decision: the standalone name
  // slug was dropped in favor of a shorter, cleaner token (128-bit,
  // ~22 characters) at /c/{token} — no cosmetic segment needed
  // anymore since the token itself is now short enough to look like a
  // normal, professional share link on its own.
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [data, setData] = useState<ProfileResponse | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const load = useCallback(() => {
    fetch(`/api/candidate/${token}`)
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(
            j.error === 'LINK_REVOKED' ? 'Dieser Link wurde widerrufen.' :
            j.error === 'LINK_EXPIRED' ? 'Dieser Link ist abgelaufen.' :
            j.error === 'LINK_VIEW_LIMIT_REACHED' ? 'Dieser Link hat sein Aufrufe-Limit erreicht.' :
            'Dieser Link ist ungültig oder nicht mehr verfügbar.'
          );
        }
        return res.json();
      })
      .then((j: ProfileResponse) => setData(j))
      .catch((e: Error) => setError(e.message));
  }, [token]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    fetch(`/api/candidate/${token}/photo`).then((r) => r.json()).then((j) => setPhotoUrl(j.url ?? null)).catch(() => setPhotoUrl(null));
  }, [token]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: COLORS.bg }}>
        <div className="text-center max-w-sm">
          <Lock size={32} color={COLORS.textSecondary} className="mx-auto mb-3" />
          <p className="text-sm" style={{ color: COLORS.textPrimary }}>{error}</p>
        </div>
      </div>
    );
  }
  if (data === undefined) {
    return <div className="min-h-screen flex items-center justify-center" style={{ background: COLORS.bg }}><Loader2 size={24} className="animate-spin" color={COLORS.textSecondary} /></div>;
  }

  const { profile } = data;

  return (
    <div className="min-h-screen" style={{ background: COLORS.bg }}>
      <div className="px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <div>
          <div className="text-base font-bold" style={{ color: COLORS.textPrimary }}>CertCoach</div>
          <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Private Candidate Profile</div>
        </div>
        <div className="flex items-center gap-2 text-[11px]" style={{ color: COLORS.textSecondary }}>
          <Lock size={12} /> Dieser Link ist privat und vertraulich. Nur für {data.companyName}.
        </div>
      </div>

      <div className="p-5 sm:p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-4">
            <Card>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden flex items-center justify-center text-2xl font-bold" style={{ background: `${COLORS.red}22`, color: COLORS.red, border: `2px solid ${COLORS.red}` }}>
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoUrl} alt={profile.display_name} className="w-full h-full object-cover" />
                  ) : (
                    profile.display_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
                  )}
                </div>
                {profile.availability && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(53,208,127,0.12)', color: COLORS.green }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.green }} /> {AVAILABILITY_LABEL[profile.availability]}
                  </span>
                )}
                <h1 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>{profile.display_name}</h1>
                {profile.professional_title && <p className="text-sm font-medium mt-0.5" style={{ color: COLORS.red }}>{profile.professional_title}</p>}
                {profile.location && <p className="flex items-center justify-center gap-1 text-xs mt-2" style={{ color: COLORS.textSecondary }}><MapPin size={11} /> {profile.location}</p>}
              </div>
              {profile.bio && <p className="text-xs leading-relaxed mb-4" style={{ color: COLORS.textSecondary }}>{profile.bio}</p>}
              <div className="space-y-2">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg text-white" style={{ background: COLORS.red }}>
                    <Mail size={14} /> Kontakt aufnehmen
                  </a>
                )}
                {profile.linkedin_url && <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}><Linkedin size={14} /> LinkedIn Profil</a>}
                {profile.github_url && <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}><Github size={14} /> GitHub Profil</a>}
                {profile.website_url && <a href={profile.website_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}><Globe size={14} /> Website</a>}
              </div>
            </Card>

            <Card>
              <div className="text-xs font-semibold mb-3" style={{ color: COLORS.textPrimary }}>Über mich</div>
              <div className="space-y-2.5 text-xs">
                {profile.location && <div className="flex items-center justify-between"><span style={{ color: COLORS.textSecondary }}>Wohnort</span><span style={{ color: COLORS.textPrimary }}>{profile.location}</span></div>}
                {data.skills.filter((s) => s.category === 'Sprachen').length > 0 && (
                  <div className="flex items-center justify-between"><span style={{ color: COLORS.textSecondary }}>Sprachen</span><span style={{ color: COLORS.textPrimary }}>{data.skills.filter((s) => s.category === 'Sprachen').map((s) => s.name).join(', ')}</span></div>
                )}
                {profile.availability && <div className="flex items-center justify-between"><span style={{ color: COLORS.textSecondary }}>Verfügbarkeit</span><span style={{ color: COLORS.textPrimary }}>{AVAILABILITY_LABEL[profile.availability]}</span></div>}
                {profile.work_mode && <div className="flex items-center justify-between"><span style={{ color: COLORS.textSecondary }}>Arbeitsmodell</span><span style={{ color: COLORS.textPrimary }}>{profile.work_mode}</span></div>}
              </div>
            </Card>

            <Card>
              <div className="flex gap-2 items-start">
                <ShieldCheck size={16} color={COLORS.green} className="shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: COLORS.textPrimary }}>Vertraulich & Sicher</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Diese Verbindung ist verschlüsselt. Ihr Zugriff wird protokolliert.</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <SectionHeader icon={Briefcase} title="Überblick" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{yearsOfExperience(data.experiences)}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Jahre Erfahrung</div>
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{data.projects.length}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Projekte</div>
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{new Set(data.projects.flatMap((p) => p.technologies ?? [])).size}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Technologien</div>
                </div>
                <div>
                  <div className="text-sm font-bold" style={{ color: COLORS.textPrimary }}>{profile.availability ? AVAILABILITY_LABEL[profile.availability] : '—'}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Verfügbarkeit</div>
                </div>
              </div>
            </Card>

            {profile.desired_positions && profile.desired_positions.length > 0 && (
              <Card>
                <SectionHeader icon={Briefcase} title="Gesuchte Positionen" />
                <div className="flex flex-wrap gap-2">
                  {profile.desired_positions.map((pos: string) => <span key={pos} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>{pos}</span>)}
                </div>
              </Card>
            )}

            {data.skills.length > 0 && (() => {
              const STRENGTHS_CATEGORY = 'Was mich auszeichnet';
              const strengths = data.skills.filter((s) => s.category === STRENGTHS_CATEGORY);
              const regularSkills = data.skills.filter((s) => s.category !== STRENGTHS_CATEGORY);
              const skillsByCategory = regularSkills.reduce<Record<string, Skill[]>>((acc, s) => { (acc[s.category] ??= []).push(s); return acc; }, {});
              const topTechnologies = regularSkills
                .filter((s) => s.level && !isNaN(Number(s.level)) && Number(s.level) > 0 && Number(s.level) <= 100)
                .sort((a, b) => Number(b.level) - Number(a.level))
                .slice(0, 6);
              return (
                <>
                  {Object.keys(skillsByCategory).length > 0 && (
                    <Card>
                      <SectionHeader icon={Globe} title="Fähigkeiten" accent={COLORS.blue} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                        {Object.entries(skillsByCategory).map(([cat, items]) => (
                          <div key={cat}>
                            <div className="text-[11px] mb-1.5" style={{ color: COLORS.textSecondary }}>{cat}</div>
                            <div className="flex flex-wrap gap-2">{items.map((s) => <span key={s.id} className="text-xs px-2.5 py-1 rounded-md" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>{s.name}</span>)}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {strengths.length > 0 && (
                    <Card>
                      <SectionHeader icon={CheckCircle2} title="Was mich auszeichnet" accent={COLORS.green} />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {strengths.map((s) => (
                          <div key={s.id} className="flex items-center gap-2 text-xs" style={{ color: COLORS.textPrimary }}>
                            <CheckCircle2 size={13} color={COLORS.green} className="shrink-0" /> {s.name}
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}

                  {topTechnologies.length > 0 && (
                    <Card>
                      <SectionHeader icon={BarChart3} title="Top Technologien" accent={COLORS.blue} />
                      <div className="space-y-2.5">
                        {topTechnologies.map((s) => (
                          <div key={s.id}>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span style={{ color: COLORS.textPrimary }}>{s.name}</span>
                              <span style={{ color: COLORS.textSecondary }}>{s.level}%</span>
                            </div>
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: COLORS.cardBorder }}>
                              <div className="h-full rounded-full" style={{ width: `${s.level}%`, background: COLORS.blue }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </>
              );
            })()}

            {data.certifications.length > 0 && (
              <Card>
                <SectionHeader icon={Award} title="Zertifizierungen" accent={COLORS.purple} />
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {data.certifications.map((c) => {
                    const status = certStatus(c.expiry_date);
                    return (
                      <div key={c.id} className="flex flex-col items-center text-center rounded-xl p-4" style={{ background: `linear-gradient(180deg, ${COLORS.cardBorder} 0%, ${COLORS.card} 100%)`, border: `1px solid ${COLORS.cardBorder}` }}>
                        <CertLogo token={token} certId={c.id} logoUrl={c.logo_url} alt={c.issuer} size={48} />
                        <div className="text-sm font-semibold mt-2.5" style={{ color: COLORS.textPrimary }}>{c.name}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: COLORS.textSecondary }}>{c.issuer}</div>
                        <div className="text-[10px] mt-1" style={{ color: COLORS.textSecondary }}>Ausgestellt: {fmtMonthYear(c.issue_date)}</div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full mt-2" style={{ background: `${status.color}22`, color: status.color }}>{status.label}</span>
                        <div className="mt-2.5">
                          {c.verification_url ? <a href={c.verification_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] font-medium" style={{ color: COLORS.red }}>Verifizieren <ExternalLink size={10} /></a> : <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>Verifizierung nicht verfügbar</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {data.experiences.length > 0 && (
              <Card>
                <SectionHeader icon={Briefcase} title="Berufliche Erfahrung" />
                <div className="space-y-4">
                  {data.experiences.map((exp) => (
                    <div key={exp.id} className="flex gap-3 pl-3" style={{ borderLeft: `2px solid ${COLORS.red}` }}>
                      <BrandLogo url={exp.company_logo_url} alt={exp.company_name} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{exp.role_title}</div>
                          <div className="text-[11px] whitespace-nowrap" style={{ color: COLORS.textSecondary }}>{fmtMonthYear(exp.start_date)} – {fmtMonthYear(exp.end_date)}</div>
                        </div>
                        <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                          {exp.company_website_url ? <a href={exp.company_website_url} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: COLORS.blue }}>{exp.company_name}</a> : exp.company_name}
                          {exp.location ? ` · ${exp.location}` : ''}
                        </div>
                        {exp.description && <p className="text-xs mt-1 whitespace-pre-line" style={{ color: COLORS.textSecondary }}>{exp.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {data.education.length > 0 && (
              <Card>
                <SectionHeader icon={Award} title="Ausbildung" accent={COLORS.blue} />
                <div className="space-y-4">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="flex gap-3">
                      <BrandLogo url={edu.logo_url} alt={edu.institution_name} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                          {edu.website_url ? <a href={edu.website_url} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: COLORS.textPrimary }}>{edu.institution_name}</a> : edu.institution_name}
                        </div>
                        <div className="text-xs" style={{ color: COLORS.textSecondary }}>{[edu.degree, edu.field_of_study].filter(Boolean).join(' · ')}</div>
                        {edu.graduation_date && <div className="text-[11px] mt-0.5" style={{ color: COLORS.textSecondary }}>Abschluss: {fmtMonthYear(edu.graduation_date)}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <SectionHeader icon={FileText} title="Verfügbare Unterlagen" />
                {data.publicDocuments.length === 0 ? (
                  <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Dokumente.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {data.publicDocuments.map((d) => (
                      <button
                        key={d.id}
                        onClick={async () => {
                          const res = await fetch(`/api/candidate/${token}/documents/${d.id}`);
                          if (res.ok) window.open((await res.json()).url, '_blank');
                        }}
                        className="flex flex-col items-center gap-1.5 text-center rounded-lg p-3"
                        style={{ background: COLORS.cardBorder }}
                      >
                        <FileText size={18} color={COLORS.red} />
                        <span className="text-[11px]" style={{ color: COLORS.textPrimary }}>{d.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </Card>

              {data.confidentialDocuments.length > 0 ? (
                <ConfidentialSection token={token} docs={data.confidentialDocuments} requireCode={data.requireAccessCode} onUnlocked={load} />
              ) : (
                <Card>
                  <SectionHeader icon={EyeOff} title="Vertrauliche Unterlagen" />
                  <p className="text-xs" style={{ color: COLORS.textSecondary }}>Für dieses Unternehmen sind keine vertraulichen Dokumente freigegeben.</p>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 pt-5 text-[11px]" style={{ borderTop: `1px solid ${COLORS.cardBorder}`, color: COLORS.textSecondary }}>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} color={COLORS.green} /> Datenschutz & sichere Datenübertragung</span>
          <span>Made in Germany</span>
          <span className="flex items-center gap-1.5"><Lock size={13} /> Verschlüsselte Verbindung</span>
        </div>
      </div>
    </div>
  );
}
