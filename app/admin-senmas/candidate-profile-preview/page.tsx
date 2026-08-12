'use client';

/**
 * PHASE 6 — Public Candidate Profile, PREVIEW ONLY.
 *
 * Security note (per the original spec sections 1 and 16): this page
 * must NEVER be reachable via a bare, tokenless URL — that's exactly
 * what "Unlisted Private Share Link" means. Real recruiter-facing
 * access requires PHASE 7 (share_links token verification), not built
 * yet. Until then, this exact page design lives here, under
 * /admin-senmas, gated by the same requirePermission RBAC as every
 * other admin page — so the owner can see and refine the real design
 * with real data, without exposing it publicly a phase early.
 *
 * Uses the distinct color system from the original design spec
 * (section 3) — not this project's usual --color-primary tokens —
 * because the candidate profile is its own product surface with its
 * own approved palette.
 *
 * No fabricated numbers anywhere: "Erfahrung", "Projekte", and
 * "Technologien" in the overview are computed from real
 * experiences/projects data, not hardcoded like the original design
 * reference's mockup values. Sections the current data model doesn't
 * support yet (desired positions, a fixed skills-proficiency bar
 * list) are simply omitted rather than invented.
 */

import { useEffect, useState } from 'react';
import {
  Loader2, MapPin, Mail, Linkedin, Github, FileText, Lock, ShieldCheck,
  Briefcase, FolderGit2, Award, Download, ExternalLink, Globe,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const COLORS = {
  bg: '#020817',
  card: '#07111F',
  cardBorder: '#172338',
  red: '#EF1B2D',
  redHover: '#FF293D',
  blue: '#1683FF',
  green: '#22C55E',
  purple: '#8B5CF6',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
};

type Profile = {
  id: string;
  display_name: string;
  professional_title: string | null;
  bio: string | null;
  location: string | null;
  availability: 'available' | 'open' | 'unavailable' | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  created_at: string;
};
type Skill = { id: string; category: string; name: string; is_public: boolean };
type Certification = { id: string; issuer: string; name: string; credential_id: string | null; issue_date: string | null; verification_url: string | null; is_public: boolean };
type Experience = { id: string; role_title: string; company_name: string; location: string | null; start_date: string | null; end_date: string | null; description: string | null; is_public: boolean };
type Project = { id: string; title: string; description: string | null; technologies: string[] | null; is_public: boolean };
type Doc = { id: string; title: string; document_type: string | null; visibility: 'public' | 'private'; deleted_at: string | null };

const AVAILABILITY_LABEL: Record<string, string> = {
  available: 'Verfügbar für neue Möglichkeiten',
  open: 'Offen für Angebote',
  unavailable: 'Nicht verfügbar',
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function yearsOfExperience(experiences: Experience[]): number {
  const dated = experiences.filter((e) => e.start_date);
  if (dated.length === 0) return 0;
  const earliest = Math.min(...dated.map((e) => new Date(e.start_date!).getTime()));
  const years = (Date.now() - earliest) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(0, Math.round(years));
}

function fmtMonthYear(iso: string | null): string {
  if (!iso) return 'heute';
  return new Date(iso).toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' });
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="rounded-xl p-5" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, ...style }}>
      {children}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, accent, action }: { icon: typeof Award; title: string; accent?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={16} color={accent ?? COLORS.red} />
        <h3 className="text-sm font-semibold" style={{ color: COLORS.textPrimary }}>{title}</h3>
      </div>
      {action}
    </div>
  );
}

export default function CandidateProfilePreviewPage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [documents, setDocuments] = useState<Doc[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        const j = await res.json();
        setProfile(j.profile);
        setSkills(j.skills ?? []);
        setCertifications(j.certifications ?? []);
        setExperiences(j.experiences ?? []);
        setProjects(j.projects ?? []);
        setDocuments(j.documents ?? []);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'rgba(239,27,45,0.12)', color: COLORS.red }}>{error}</div>;
  if (profile === undefined) return <div className="flex items-center gap-2 text-sm" style={{ color: COLORS.textSecondary }}><Loader2 size={16} className="animate-spin" /> Wird geladen…</div>;
  if (profile === null) {
    return (
      <div className="rounded-xl p-8 text-center text-sm" style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, color: COLORS.textSecondary }}>
        Noch kein Profil angelegt. Legen Sie zuerst unter „Karriere-Dokumente&quot; Ihr Profil an, dann erscheint hier die Vorschau.
      </div>
    );
  }

  const publicSkills = skills.filter((s) => s.is_public);
  const publicCerts = certifications.filter((c) => c.is_public);
  const publicExperiences = experiences.filter((e) => e.is_public);
  const publicProjects = projects.filter((p) => p.is_public);
  const publicDocs = documents.filter((d) => d.visibility === 'public' && !d.deleted_at);
  const confidentialDocsCount = documents.filter((d) => d.visibility === 'private' && !d.deleted_at).length;

  const techCount = new Set(publicProjects.flatMap((p) => p.technologies ?? [])).size;
  const skillsByCategory = publicSkills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}` }}>
      <div className="px-5 py-3 flex items-center gap-2 text-xs" style={{ background: 'rgba(239,27,45,0.1)', color: COLORS.red, borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <Lock size={13} />
        Vorschau — diese Seite ist noch nicht öffentlich erreichbar. Der echte, tokengeschützte Recruiter-Link folgt in Phase 7.
      </div>

      <div className="p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-4">
            <Card>
              <div className="text-center mb-4">
                <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold" style={{ background: `${COLORS.red}22`, color: COLORS.red, border: `2px solid ${COLORS.red}` }}>
                  {profile.display_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                {profile.availability && (
                  <span className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full mb-3" style={{ background: 'rgba(34,197,94,0.12)', color: COLORS.green }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: COLORS.green }} /> {AVAILABILITY_LABEL[profile.availability]}
                  </span>
                )}
                <h1 className="text-lg font-bold" style={{ color: COLORS.textPrimary }}>{profile.display_name}</h1>
                {profile.professional_title && <p className="text-sm font-medium mt-0.5" style={{ color: COLORS.red }}>{profile.professional_title}</p>}
                {profile.location && (
                  <p className="flex items-center justify-center gap-1 text-xs mt-2" style={{ color: COLORS.textSecondary }}>
                    <MapPin size={11} /> {profile.location}
                  </p>
                )}
              </div>
              {profile.bio && <p className="text-xs leading-relaxed mb-4" style={{ color: COLORS.textSecondary }}>{profile.bio}</p>}
              <div className="space-y-2">
                {profile.email && (
                  <a href={`mailto:${profile.email}`} className="flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg text-white" style={{ background: COLORS.red }}>
                    <Mail size={14} /> Kontakt aufnehmen
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
                    <Linkedin size={14} /> LinkedIn Profil
                  </a>
                )}
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
                    <Github size={14} /> GitHub Profil
                  </a>
                )}
              </div>
            </Card>

            <Card style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <ShieldCheck size={16} color={COLORS.green} className="shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-semibold mb-0.5" style={{ color: COLORS.textPrimary }}>Vertraulich & Sicher</div>
                <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Vertrauliche Dokumente sind durch einen Zugriffscode geschützt und nur für autorisierte Unternehmen einsehbar.</div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <SectionHeader icon={Briefcase} title="Überblick" />
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{yearsOfExperience(publicExperiences)}+</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Jahre Erfahrung</div>
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{publicProjects.length}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Projekte</div>
                </div>
                <div>
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{techCount}</div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Technologien</div>
                </div>
              </div>
            </Card>

            <Card>
              <SectionHeader icon={Globe} title="Fähigkeiten" accent={COLORS.blue} />
              {Object.keys(skillsByCategory).length === 0 ? (
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Fähigkeiten hinterlegt.</p>
              ) : (
                Object.entries(skillsByCategory).map(([cat, items]) => (
                  <div key={cat} className="mb-3 last:mb-0">
                    <div className="text-[11px] mb-1.5" style={{ color: COLORS.textSecondary }}>{cat}</div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span key={s.id} className="text-xs px-2.5 py-1 rounded-md" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>{s.name}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </Card>

            <Card>
              <SectionHeader icon={Award} title="Zertifizierungen" accent={COLORS.purple} />
              {publicCerts.length === 0 ? (
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Zertifizierungen hinterlegt.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {publicCerts.map((c) => (
                    <div key={c.id} className="rounded-lg p-3" style={{ background: COLORS.cardBorder }}>
                      <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{c.name}</div>
                      <div className="text-[11px] mb-1" style={{ color: COLORS.textSecondary }}>{c.issuer} · Ausgestellt: {fmtMonthYear(c.issue_date)}</div>
                      {c.verification_url ? (
                        <a href={c.verification_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px]" style={{ color: COLORS.red }}>
                          Verifizieren <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-[11px]" style={{ color: COLORS.textSecondary }}>Verifizierung nicht verfügbar</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <SectionHeader icon={Briefcase} title="Berufliche Erfahrung" />
              {publicExperiences.length === 0 ? (
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentliche Berufserfahrung hinterlegt.</p>
              ) : (
                <div className="space-y-4">
                  {publicExperiences.map((exp) => (
                    <div key={exp.id} className="pl-3" style={{ borderLeft: `2px solid ${COLORS.red}` }}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{exp.role_title}</div>
                        <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>{fmtMonthYear(exp.start_date)} – {fmtMonthYear(exp.end_date)}</div>
                      </div>
                      <div className="text-xs" style={{ color: COLORS.textSecondary }}>{exp.company_name}{exp.location ? ` · ${exp.location}` : ''}</div>
                      {exp.description && <p className="text-xs mt-1 whitespace-pre-line" style={{ color: COLORS.textSecondary }}>{exp.description}</p>}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {publicProjects.length > 0 && (
              <Card>
                <SectionHeader icon={FolderGit2} title="Ausgewählte Projekte" accent={COLORS.green} />
                <div className="space-y-3">
                  {publicProjects.map((p) => (
                    <div key={p.id}>
                      <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{p.title}</div>
                      {p.description && <p className="text-xs mt-0.5" style={{ color: COLORS.textSecondary }}>{p.description}</p>}
                      {p.technologies && p.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {p.technologies.map((t) => <span key={t} className="text-[10px] px-2 py-0.5 rounded" style={{ background: COLORS.cardBorder, color: COLORS.textSecondary }}>{t}</span>)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <SectionHeader icon={FileText} title="Verfügbare Unterlagen" />
                {publicDocs.length === 0 ? (
                  <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Dokumente.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {publicDocs.map((d) => (
                      <div key={d.id} className="flex flex-col items-center gap-1.5 text-center rounded-lg p-3" style={{ background: COLORS.cardBorder }}>
                        <FileText size={18} color={COLORS.red} />
                        <span className="text-[11px]" style={{ color: COLORS.textPrimary }}>{d.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>

              <Card>
                <SectionHeader icon={Lock} title="Vertrauliche Unterlagen" accent={COLORS.red} />
                <p className="text-xs mb-3" style={{ color: COLORS.textSecondary }}>
                  {confidentialDocsCount > 0
                    ? `${confidentialDocsCount} Dokument${confidentialDocsCount === 1 ? '' : 'e'} — Zugriff erfordert einen Code (Phase 8, noch nicht aktiv).`
                    : 'Noch keine vertraulichen Dokumente hinterlegt.'}
                </p>
                <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textSecondary }}>
                  <Download size={13} className="opacity-40" /> Zugriffscode-Freischaltung folgt in Phase 8
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
