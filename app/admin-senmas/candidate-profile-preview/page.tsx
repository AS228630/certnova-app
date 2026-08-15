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

import { useEffect, useRef, useState } from 'react';
import {
  Loader2, MapPin, Mail, Linkedin, Github, FileText, Lock, ShieldCheck,
  Briefcase, FolderGit2, Award, Download, ExternalLink, Globe, CheckCircle2, BarChart3, X, User, Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

const COLORS = {
  bg: '#020B14',
  card: '#071421',
  cardHover: '#0A1927',
  cardBorder: '#1A2A39',
  red: '#EF233C',
  redHover: '#FF334F',
  blue: '#22A7F0',
  green: '#22C55E',
  yellow: '#F59E0B',
  purple: '#A855F7',
  textPrimary: '#F4F7FA',
  textSecondary: '#A8B3BF',
  textMuted: '#71808F',
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
  website_url: string | null;
  work_mode: string | null;
  profile_photo_path: string | null;
  desired_positions: string[] | null;
  created_at: string;
};
type Skill = { id: string; category: string; name: string; level: string | null; is_public: boolean };
type Certification = { id: string; issuer: string; name: string; credential_id: string | null; issue_date: string | null; expiry_date: string | null; verification_url: string | null; logo_url: string | null; is_public: boolean };
type Education = { id: string; institution_name: string; degree: string | null; field_of_study: string | null; graduation_date: string | null; logo_url: string | null; website_url: string | null; is_public: boolean };
type Experience = { id: string; role_title: string; company_name: string; location: string | null; start_date: string | null; end_date: string | null; description: string | null; company_logo_url: string | null; company_website_url: string | null; is_public: boolean };
type Project = { id: string; title: string; description: string | null; technologies: string[] | null; project_url: string | null; repo_url: string | null; is_public: boolean };
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

/** Certification status computed from expiry_date, per Stage 1's
 * decision — never stored, so it can never drift out of sync with
 * the real date. */
function certStatus(expiryDate: string | null): { label: string; color: string } {
  if (!expiryDate) return { label: 'Kein Ablaufdatum', color: COLORS.textSecondary };
  const expired = new Date(expiryDate).getTime() < Date.now();
  return expired ? { label: 'Abgelaufen', color: COLORS.red } : { label: 'Aktiv', color: COLORS.green };
}

function BrandLogo({ url, alt, size = 44, wide = false }: { url: string | null; alt: string; size?: number; wide?: boolean }) {
  if (url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={alt}
        style={{ width: wide ? size * 2.4 : size, height: size, objectFit: 'contain', borderRadius: 10, background: '#fff', padding: 4 }}
      />
    );
  }
  return (
    <div
      className="flex items-center justify-center font-bold"
      style={{ width: size, height: size, borderRadius: 10, background: COLORS.cardBorder, color: COLORS.textSecondary, fontSize: size * 0.4 }}
    >
      {alt.slice(0, 1).toUpperCase()}
    </div>
  );
}

/**
 * Certification-logo-specific variant: logo_url can be either an
 * external http(s) URL (pasted by the admin, rendered directly) or an
 * internal Storage path (from a direct badge-image upload — never
 * starts with http). For the latter, a signed URL is resolved via the
 * admin logo-view endpoint before rendering, since the bucket is
 * private and has no permanent public URL.
 */
function CertLogo({ certId, logoUrl, alt, size = 48 }: { certId: string; logoUrl: string | null; alt: string; size?: number }) {
  const isDirectUrl = (u: string) => u.startsWith('http') || u.startsWith('/');
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(logoUrl && isDirectUrl(logoUrl) ? logoUrl : null);

  useEffect(() => {
    if (!logoUrl || isDirectUrl(logoUrl)) {
      Promise.resolve().then(() => setResolvedUrl(logoUrl));
      return;
    }
    authHeader()
      .then((headers) => fetch(`/api/admin/candidate/certifications/${certId}/logo/view`, { headers }))
      .then((res) => res.json())
      .then((j) => setResolvedUrl(j.url ?? null))
      .catch(() => setResolvedUrl(null));
  }, [certId, logoUrl]);

  return <BrandLogo url={resolvedUrl} alt={alt} size={size} />;
}

function CvDownloadButton({ documentId }: { documentId: string }) {
  async function download() {
    const res = await fetch(`/api/admin/candidate/documents/${documentId}/view?download=true`, { headers: await authHeader() });
    if (!res.ok) return;
    const j = await res.json();
    window.location.href = j.url;
  }
  return (
    <button onClick={download} className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg w-full" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
      <Download size={14} /> CV herunterladen
    </button>
  );
}

/** Click-to-enlarge profile photo, Instagram/Facebook-style: click the
 * small circular avatar, see it full-size in a dark overlay; click
 * anywhere (overlay, image, or the X) or press Escape to close.
 * Accessibility: focus moves to the close button on open, Tab is
 * trapped inside the dialog (the close button is the only focusable
 * element), and focus returns to whatever triggered the lightbox on
 * close. */
function PhotoLightbox({ url, alt, onClose }: { url: string; alt: string; onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    return () => {
      previouslyFocused.current?.focus();
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        // The close button is the only focusable element in this
        // dialog, so trapping focus just means Tab/Shift+Tab always
        // keeps it there rather than escaping to the page behind.
        e.preventDefault();
        closeButtonRef.current?.focus();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: 'rgba(2,11,20,0.92)' }}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        aria-label="Schließen"
        className="absolute top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <X size={20} color="#fff" />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full rounded-xl object-contain"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.5)' }}
      />
    </div>
  );
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
  const [education, setEducation] = useState<Education[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoLightboxOpen, setPhotoLightboxOpen] = useState(false);

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
        setEducation(j.education ?? []);
        if (j.profile?.profile_photo_path) {
          authHeader()
            .then((headers2) => fetch('/api/admin/candidate/profile/photo/view', { headers: headers2 }))
            .then((r) => r.json())
            .then((pj) => setPhotoUrl(pj.url ?? null))
            .catch(() => setPhotoUrl(null));
        }
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
  const cvDoc = publicDocs.find((d) => d.document_type === 'CV');
  const languageSkills = publicSkills.filter((s) => s.category === 'Sprachen').map((s) => s.name);

  const techCount = new Set(publicProjects.flatMap((p) => p.technologies ?? [])).size;
  const STRENGTHS_CATEGORY = 'Was mich auszeichnet';
  const strengths = publicSkills.filter((s) => s.category === STRENGTHS_CATEGORY);
  const regularSkills = publicSkills.filter((s) => s.category !== STRENGTHS_CATEGORY);
  const skillsByCategory = regularSkills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});
  const topTechnologies = regularSkills
    .filter((s) => s.level && !isNaN(Number(s.level)) && Number(s.level) > 0 && Number(s.level) <= 100)
    .sort((a, b) => Number(b.level) - Number(a.level))
    .slice(0, 6);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: COLORS.bg, border: `1px solid ${COLORS.cardBorder}` }}>
      <div className="px-5 py-3 flex items-center gap-2 text-xs" style={{ background: 'rgba(239,27,45,0.1)', color: COLORS.red, borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <Lock size={13} />
        Vorschau — diese Seite ist noch nicht öffentlich erreichbar. Der echte, tokengeschützte Recruiter-Link folgt in Phase 7.
      </div>

      <div className="px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3" style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}>
        <div>
          <div className="text-base font-bold" style={{ color: COLORS.textPrimary }}>CertCoach</div>
          <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>Private Candidate Profile</div>
        </div>
        <div className="flex items-center gap-2 text-[11px]" style={{ color: COLORS.textSecondary }}>
          <Lock size={12} /> Dieser Link ist privat und vertraulich. Nur für autorisierte Unternehmen.
        </div>
        <div className="flex items-center gap-3 text-[11px]" style={{ color: COLORS.textSecondary }}>
          <span>Profil erstellt: {new Date(profile.created_at).toLocaleDateString('de-DE')}</span>
          <span className="px-3 py-1.5 rounded-lg" style={{ background: COLORS.cardBorder, opacity: 0.5 }} title="Verfügbar, sobald Phase 7 (Recruiter-Links) aktiv ist">Link teilen (Phase 7)</span>
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div className="space-y-4">
            <Card>
              <div className="text-center mb-4">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden flex items-center justify-center text-2xl font-bold"
                  style={{ background: `${COLORS.red}22`, color: COLORS.red, border: `2px solid ${COLORS.red}`, cursor: photoUrl ? 'pointer' : 'default' }}
                  onClick={() => photoUrl && setPhotoLightboxOpen(true)}
                  role={photoUrl ? 'button' : undefined}
                  aria-label={photoUrl ? 'Profilbild vergrößern' : undefined}
                >
                  {photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoUrl} alt={profile.display_name} className="w-full h-full object-cover" />
                  ) : (
                    profile.display_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                  )}
                </div>
                {photoLightboxOpen && photoUrl && (
                  <PhotoLightbox url={photoUrl} alt={profile.display_name} onClose={() => setPhotoLightboxOpen(false)} />
                )}
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
                {cvDoc && <CvDownloadButton documentId={cvDoc.id} />}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
                    <Linkedin size={14} color="#0A66C2" /> LinkedIn Profil
                  </a>
                )}
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
                    <Github size={14} color="#FFFFFF" /> GitHub Profil
                  </a>
                )}
                {profile.website_url && (
                  <a href={profile.website_url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-sm py-2.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>
                    <Globe size={14} color="#7c3aed" /> Website
                  </a>
                )}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 mb-4">
                <User size={15} color={COLORS.red} />
                <span className="text-xs font-semibold" style={{ color: COLORS.textPrimary }}>Über mich</span>
              </div>
              <div className="space-y-3.5 text-xs">
                {profile.location && (
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} color={COLORS.red} className="shrink-0 mt-0.5" />
                    <span style={{ color: COLORS.textSecondary }} className="w-24 shrink-0">Wohnort</span>
                    <span style={{ color: COLORS.textPrimary }} className="flex-1 text-right">{profile.location}</span>
                  </div>
                )}
                {languageSkills.length > 0 && (
                  <div className="flex items-start gap-2.5">
                    <Globe size={14} color={COLORS.red} className="shrink-0 mt-0.5" />
                    <span style={{ color: COLORS.textSecondary }} className="w-24 shrink-0">Sprachen</span>
                    <span style={{ color: COLORS.textPrimary }} className="flex-1 text-right">{languageSkills.join(', ')}</span>
                  </div>
                )}
                <div className="flex items-start gap-2.5">
                  <Clock size={14} color={COLORS.red} className="shrink-0 mt-0.5" />
                  <span style={{ color: COLORS.textSecondary }} className="w-24 shrink-0">Erfahrung</span>
                  <span style={{ color: COLORS.textPrimary }} className="flex-1 text-right">{yearsOfExperience(publicExperiences)} Jahre</span>
                </div>
                {profile.availability && (
                  <div className="flex items-start gap-2.5">
                    <Clock size={14} color={COLORS.red} className="shrink-0 mt-0.5" />
                    <span style={{ color: COLORS.textSecondary }} className="w-24 shrink-0">Verfügbarkeit</span>
                    <span style={{ color: COLORS.textPrimary }} className="flex-1 text-right">{AVAILABILITY_LABEL[profile.availability]}</span>
                  </div>
                )}
                {profile.work_mode && (
                  <div className="flex items-start gap-2.5">
                    <Briefcase size={14} color={COLORS.red} className="shrink-0 mt-0.5" />
                    <span style={{ color: COLORS.textSecondary }} className="w-24 shrink-0">Arbeitsmodell</span>
                    <span style={{ color: COLORS.textPrimary }} className="flex-1 text-right">{profile.work_mode}</span>
                  </div>
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
                  <div className="text-xl font-bold" style={{ color: COLORS.textPrimary }}>{yearsOfExperience(publicExperiences)}</div>
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

            {profile.desired_positions && profile.desired_positions.length > 0 && (
              <Card>
                <SectionHeader icon={Briefcase} title="Gesuchte Positionen" />
                <div className="flex flex-wrap gap-2">
                  {profile.desired_positions.map((pos) => (
                    <span key={pos} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>{pos}</span>
                  ))}
                </div>
              </Card>
            )}

            <Card>
              <SectionHeader icon={Globe} title="Fähigkeiten" accent={COLORS.blue} />
              {Object.keys(skillsByCategory).length === 0 ? (
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Fähigkeiten hinterlegt.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {Object.entries(skillsByCategory).map(([cat, items]) => (
                    <div key={cat}>
                      <div className="text-[11px] mb-1.5" style={{ color: COLORS.textSecondary }}>{cat}</div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((s) => (
                          <span key={s.id} className="text-xs px-2.5 py-1 rounded-md" style={{ background: COLORS.cardBorder, color: COLORS.textPrimary }}>{s.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

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

            <Card>
              <SectionHeader icon={Award} title="Zertifizierungen" accent={COLORS.purple} />
              {publicCerts.length === 0 ? (
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>Noch keine öffentlichen Zertifizierungen hinterlegt.</p>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {publicCerts.map((c) => {
                    const status = certStatus(c.expiry_date);
                    return (
                      <div
                        key={c.id}
                        className="flex flex-col items-center text-center rounded-xl p-4 transition-transform"
                        style={{ background: `linear-gradient(180deg, ${COLORS.cardBorder} 0%, ${COLORS.card} 100%)`, border: `1px solid ${COLORS.cardBorder}` }}
                      >
                        <CertLogo certId={c.id} logoUrl={c.logo_url} alt={c.issuer} size={48} />
                        <div className="text-sm font-semibold mt-2.5" style={{ color: COLORS.textPrimary }}>{c.name}</div>
                        <div className="text-[11px] mt-0.5" style={{ color: COLORS.textSecondary }}>{c.issuer}</div>
                        <div className="text-[10px] mt-1" style={{ color: COLORS.textSecondary }}>Ausgestellt: {fmtMonthYear(c.issue_date)}</div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full mt-2" style={{ background: `${status.color}22`, color: status.color }}>{status.label}</span>
                        <div className="mt-2.5">
                          {c.verification_url ? (
                            <a href={c.verification_url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[11px] font-medium" style={{ color: COLORS.red }}>
                              Verifizieren <ExternalLink size={10} />
                            </a>
                          ) : (
                            <span className="text-[10px]" style={{ color: COLORS.textSecondary }}>Verifizierung nicht verfügbar</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                    <div key={exp.id} className="flex gap-3 pl-3" style={{ borderLeft: `2px solid ${COLORS.red}` }}>
                      <BrandLogo url={exp.company_logo_url} alt={exp.company_name} size={36} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{exp.role_title}</div>
                          <div className="text-[11px] whitespace-nowrap" style={{ color: COLORS.textSecondary }}>{fmtMonthYear(exp.start_date)} – {fmtMonthYear(exp.end_date)}</div>
                        </div>
                        <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                          {exp.company_website_url ? (
                            <a href={exp.company_website_url} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: COLORS.blue }}>{exp.company_name}</a>
                          ) : exp.company_name}
                          {exp.location ? ` · ${exp.location}` : ''}
                        </div>
                        {exp.description && <p className="text-xs mt-1 whitespace-pre-line" style={{ color: COLORS.textSecondary }}>{exp.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {(() => {
              const publicEducation = education.filter((e) => e.is_public);
              if (publicEducation.length === 0) return null;
              return (
                <Card>
                  <SectionHeader icon={Award} title="Ausbildung" accent={COLORS.blue} />
                  <div className="space-y-4">
                    {publicEducation.map((edu) => (
                      <div key={edu.id} className="flex gap-3">
                        <BrandLogo url={edu.logo_url} alt={edu.institution_name} size={36} />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>
                            {edu.website_url ? (
                              <a href={edu.website_url} target="_blank" rel="noreferrer" className="hover:underline" style={{ color: COLORS.textPrimary }}>{edu.institution_name}</a>
                            ) : edu.institution_name}
                          </div>
                          <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                            {[edu.degree, edu.field_of_study].filter(Boolean).join(' · ')}
                          </div>
                          {edu.graduation_date && (
                            <div className="text-[11px] mt-0.5" style={{ color: COLORS.textSecondary }}>Abschluss: {fmtMonthYear(edu.graduation_date)}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })()}

            {publicProjects.length > 0 && (
              <Card>
                <SectionHeader icon={FolderGit2} title="Ausgewählte Projekte" accent={COLORS.green} />
                <div className="space-y-3">
                  {publicProjects.map((p) => (
                    <div key={p.id}>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: COLORS.textPrimary }}>{p.title}</span>
                        {p.project_url && <a href={p.project_url} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-[11px]" style={{ color: COLORS.green }}>Website <ExternalLink size={10} /></a>}
                        {p.repo_url && <a href={p.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-0.5 text-[11px]" style={{ color: COLORS.textSecondary }}>Code <ExternalLink size={10} /></a>}
                      </div>
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
                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={async () => {
                              const res = await fetch(`/api/admin/candidate/documents/${d.id}/view`, { headers: await authHeader() });
                              if (res.ok) window.open((await res.json()).url, '_blank');
                            }}
                            title="Ansehen"
                          >
                            <FileText size={13} color={COLORS.textSecondary} />
                          </button>
                          <button
                            onClick={async () => {
                              const res = await fetch(`/api/admin/candidate/documents/${d.id}/view?download=true`, { headers: await authHeader() });
                              if (res.ok) window.location.href = (await res.json()).url;
                            }}
                            title="Herunterladen"
                          >
                            <Download size={13} color={COLORS.textSecondary} />
                          </button>
                        </div>
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

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 pt-5 text-[11px]" style={{ borderTop: `1px solid ${COLORS.cardBorder}`, color: COLORS.textSecondary }}>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} color={COLORS.green} /> Datenschutz & sichere Datenübertragung</span>
          <span>Made in Germany</span>
        </div>
      </div>
    </div>
  );
}
