'use client';

/**
 * Real Candidate Profile admin page (PHASE 5 IMPLEMENTATION step 9/10
 * support — this is what makes real hands-on testing possible: upload
 * a real test file, verify visibility/rename/replace/soft-delete/
 * restore/permanent-delete all actually work end to end).
 *
 * Requires migrations 034 (candidate_profiles etc.) and 035
 * (candidate_documents.storage_deleted_at + candidate-private bucket)
 * to be live — both confirmed live as of Aug 12 2026.
 *
 * No mock data anywhere: an empty profile/document list is shown
 * honestly as an empty state, not sample content.
 */

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Loader2, Save, Upload, FileText, Eye, EyeOff, Download, Pencil,
  RefreshCw, Trash2, RotateCcw, XCircle, Check, X, Plus, ArrowUp, ArrowDown,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Profile = {
  id: string;
  display_name: string;
  professional_title: string | null;
  bio: string | null;
  location: string | null;
  availability: string | null;
  work_mode: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  website_url: string | null;
  profile_photo_path: string | null;
  desired_positions: string[] | null;
};

type Document = {
  id: string;
  title: string;
  description: string | null;
  document_type: string | null;
  file_name: string;
  mime_type: string;
  file_size_bytes: number;
  visibility: 'public' | 'private';
  allow_download: boolean;
  created_at: string;
  deleted_at: string | null;
  storage_deleted_at?: string | null;
};

type Skill = { id: string; category: string; name: string; level: string | null; is_public: boolean; sort_order: number };
type Certification = { id: string; issuer: string; name: string; credential_id: string | null; issue_date: string | null; expiry_date: string | null; verification_url: string | null; is_public: boolean; sort_order: number };
type Experience = { id: string; role_title: string; company_name: string; location: string | null; start_date: string | null; end_date: string | null; description: string | null; is_public: boolean; sort_order: number };
type Project = { id: string; title: string; description: string | null; technologies: string[] | null; project_url: string | null; repo_url: string | null; is_public: boolean; sort_order: number };
type Education = { id: string; institution_name: string; degree: string | null; field_of_study: string | null; graduation_date: string | null; logo_url: string | null; website_url: string | null; is_public: boolean; sort_order: number };
type ShareLink = {
  id: string; company_name: string; recruiter_name: string | null; recruiter_email: string | null;
  expires_at: string | null; revoked_at: string | null; require_access_code: boolean;
  access_count: number; allow_download: boolean; created_at: string; last_accessed_at: string | null;
};

async function authHeader(): Promise<Record<string, string>> {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function fmtBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

/** Shared row controls (reorder / show-hide / remove) for Skills,
 * Certifications, Experience, and Projects — all four share the same
 * id + is_public + sort_order shape, so this avoids repeating the
 * same four buttons four times. */
function ItemControls({
  isPublic, canMoveUp, canMoveDown, onMoveUp, onMoveDown, onTogglePublic, onRemove,
}: {
  isPublic: boolean; canMoveUp: boolean; canMoveDown: boolean;
  onMoveUp: () => void; onMoveDown: () => void; onTogglePublic: () => void; onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button onClick={onMoveUp} disabled={!canMoveUp} title="Nach oben" className="disabled:opacity-25"><ArrowUp size={13} color="var(--color-text-faint)" /></button>
      <button onClick={onMoveDown} disabled={!canMoveDown} title="Nach unten" className="disabled:opacity-25"><ArrowDown size={13} color="var(--color-text-faint)" /></button>
      <button onClick={onTogglePublic} title={isPublic ? 'Öffentlich sichtbar (klicken zum Verbergen)' : 'Verborgen (klicken zum Anzeigen)'}>
        {isPublic ? <Eye size={13} color="var(--color-success)" /> : <EyeOff size={13} color="var(--color-text-faint)" />}
      </button>
      <button onClick={onRemove} title="Entfernen"><X size={13} color="var(--color-text-faint)" /></button>
    </div>
  );
}

/** Reorders two adjacent items by swapping their sort_order via the
 * given PATCH endpoint, then reloads. */
async function swapSortOrder(basePath: string, a: { id: string; sort_order: number }, b: { id: string; sort_order: number }) {
  const headers = { 'Content-Type': 'application/json', ...(await authHeader()) };
  await Promise.all([
    fetch(`${basePath}/${a.id}`, { method: 'PATCH', headers, body: JSON.stringify({ sortOrder: b.sort_order }) }),
    fetch(`${basePath}/${b.id}`, { method: 'PATCH', headers, body: JSON.stringify({ sortOrder: a.sort_order }) }),
  ]);
}

function ProfileForm({ profile, onSaved }: { profile: Profile | null; onSaved: (p: Profile) => void }) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [title, setTitle] = useState(profile?.professional_title ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');
  const [availability, setAvailability] = useState(profile?.availability ?? 'available');
  const [workMode, setWorkMode] = useState(profile?.work_mode ?? '');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [linkedin, setLinkedin] = useState(profile?.linkedin_url ?? '');
  const [github, setGithub] = useState(profile?.github_url ?? '');
  const [website, setWebsite] = useState(profile?.website_url ?? '');
  const [desiredPositions, setDesiredPositions] = useState((profile?.desired_positions ?? []).join(', '));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  useEffect(() => {
    if (!profile?.profile_photo_path) {
      Promise.resolve().then(() => setPhotoUrl(null));
      return;
    }
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile/photo/view', { headers }))
      .then((res) => res.json())
      .then((j) => setPhotoUrl(j.url ?? null))
      .catch(() => setPhotoUrl(null));
  }, [profile?.profile_photo_path]);

  async function uploadPhoto(file: File) {
    setPhotoUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/admin/candidate/profile/photo', { method: 'POST', headers: await authHeader(), body: formData });
    setPhotoUploading(false);
    if (res.ok) {
      const j = await res.json();
      onSaved(j.profile);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/candidate/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        displayName, professionalTitle: title, bio, location, availability, workMode,
        email, linkedinUrl: linkedin, githubUrl: github, websiteUrl: website,
        desiredPositions: desiredPositions.split(',').map((s) => s.trim()).filter(Boolean),
      }),
    });
    if (!res.ok) {
      setError('Fehler beim Speichern.');
      setSaving(false);
      return;
    }
    const j = await res.json();
    onSaved(j.profile);
    setSaving(false);
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Profil</h3>

      {profile && (
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shrink-0" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)' }}>
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={photoUrl} alt="Profilfoto" className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-bold" style={{ color: 'var(--color-text-faint)' }}>{displayName.slice(0, 1).toUpperCase() || '?'}</span>
            )}
          </div>
          <label className="text-sm px-3 py-2 rounded-lg cursor-pointer" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text)' }}>
            {photoUploading ? 'Wird hochgeladen…' : 'Foto hochladen'}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={photoUploading} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadPhoto(f); }} />
          </label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Name *</label>
          <input required value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Titel</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z. B. Software Engineer" className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Über mich</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Standort</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Verfügbarkeit</label>
          <select value={availability ?? ''} onChange={(e) => setAvailability(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
            <option value="available">Verfügbar</option>
            <option value="open">Offen für Angebote</option>
            <option value="unavailable">Nicht verfügbar</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Arbeitsmodell</label>
          <input value={workMode} onChange={(e) => setWorkMode(e.target.value)} placeholder="z. B. Remote / Hybrid / Vor Ort" className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Gesuchte Positionen (mit Komma getrennt)</label>
          <input value={desiredPositions} onChange={(e) => setDesiredPositions(e.target.value)} placeholder="z. B. Software Engineer, Full-Stack Developer" className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>E-Mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>LinkedIn</label>
          <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>GitHub</label>
          <input value={github} onChange={(e) => setGithub(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Website</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="z. B. https://www.certcoach.de" className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
      </div>
      {error && <p className="text-xs mt-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      <button type="submit" disabled={saving} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50 mt-4" style={{ background: 'var(--color-primary)' }}>
        {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Speichern
      </button>
    </form>
  );
}

function UploadForm({ candidateId, onUploaded }: { candidateId: string; onUploaded: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [documentType, setDocumentType] = useState('CV');
  const [visibility, setVisibility] = useState<'public' | 'private'>('private');
  const [allowDownload, setAllowDownload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title) return;
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('candidateId', candidateId);
    formData.append('title', title);
    formData.append('documentType', documentType);
    formData.append('visibility', visibility);
    formData.append('allowDownload', String(allowDownload));

    const res = await fetch('/api/admin/candidate/documents', {
      method: 'POST',
      headers: await authHeader(),
      body: formData,
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(
        j.error === 'UNSUPPORTED_FILE_TYPE' ? 'Dateityp nicht unterstützt (nur PDF, JPEG, PNG, WebP).' :
        j.error === 'FILE_TOO_LARGE' ? 'Datei zu groß (max. 20 MB).' :
        j.error === 'FILE_SIGNATURE_MISMATCH' ? 'Datei entspricht nicht dem angegebenen Typ.' :
        'Fehler beim Hochladen.'
      );
      setUploading(false);
      return;
    }
    setFile(null);
    setTitle('');
    setUploading(false);
    onUploaded();
  }

  return (
    <form onSubmit={submit} className="rounded-2xl p-5 mb-5" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4 flex items-center gap-2"><Upload size={15} /> Dokument hochladen</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <input
            required
            type="file"
            accept="application/pdf,image/jpeg,image/png,image/webp"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="w-full text-sm"
          />
          <p className="text-[11px] mt-1" style={{ color: 'var(--color-text-faint)' }}>PDF, JPEG, PNG oder WebP, max. 20 MB.</p>
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Titel *</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="z. B. Lebenslauf 2026" className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Typ</label>
          <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
            {['CV', 'Certificate', 'Employment Certificate', 'Reference', 'Project Document', 'Portfolio', 'Diploma', 'Other'].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input id="vis" type="checkbox" checked={visibility === 'public'} onChange={(e) => setVisibility(e.target.checked ? 'public' : 'private')} />
          <label htmlFor="vis" className="text-sm">Öffentlich sichtbar</label>
        </div>
        <div className="flex items-center gap-2">
          <input id="dl" type="checkbox" checked={allowDownload} onChange={(e) => setAllowDownload(e.target.checked)} />
          <label htmlFor="dl" className="text-sm">Download erlauben</label>
        </div>
      </div>
      {error && <p className="text-xs mt-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      <button type="submit" disabled={uploading || !file} className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg text-white disabled:opacity-50 mt-4" style={{ background: 'var(--color-primary)' }}>
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Hochladen
      </button>
    </form>
  );
}

function DocumentRow({ doc, onChanged }: { doc: Document; onChanged: () => void }) {
  const [busy, setBusy] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState(doc.title);
  const isDeleted = !!doc.deleted_at;
  const isPermanentlyGone = !!doc.storage_deleted_at;

  async function patch(body: Record<string, unknown>) {
    setBusy(true);
    await fetch(`/api/admin/candidate/documents/${doc.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify(body),
    });
    setBusy(false);
    onChanged();
  }

  async function del(permanent: boolean) {
    setBusy(true);
    await fetch(`/api/admin/candidate/documents/${doc.id}${permanent ? '?permanent=true' : ''}`, {
      method: 'DELETE',
      headers: await authHeader(),
    });
    setBusy(false);
    onChanged();
  }

  async function view() {
    const res = await fetch(`/api/admin/candidate/documents/${doc.id}/view`, { headers: await authHeader() });
    if (!res.ok) return;
    const j = await res.json();
    window.open(j.url, '_blank');
  }

  async function download() {
    setBusy(true);
    // ?download=true asks Supabase to set Content-Disposition:
    // attachment on this specific signed URL, so simply navigating to
    // it forces a real download — no client-side fetch of the file
    // bytes needed, which is what avoids the CORS issue that made the
    // previous version silently fail.
    const res = await fetch(`/api/admin/candidate/documents/${doc.id}/view?download=true`, { headers: await authHeader() });
    setBusy(false);
    if (!res.ok) return;
    const j = await res.json();
    window.location.href = j.url;
  }

  async function replace(file: File) {
    setBusy(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch(`/api/admin/candidate/documents/${doc.id}/replace`, {
      method: 'POST',
      headers: await authHeader(),
      body: formData,
    });
    setBusy(false);
    onChanged();
  }

  return (
    <tr style={{ borderBottom: '1px solid var(--color-border-soft)', opacity: isDeleted ? 0.5 : 1 }}>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <FileText size={14} color="var(--color-text-faint)" />
          {editingTitle ? (
            <>
              <input value={titleDraft} onChange={(e) => setTitleDraft(e.target.value)} className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
              <button onClick={() => { patch({ title: titleDraft }); setEditingTitle(false); }} title="Speichern"><Check size={14} color="var(--color-success)" /></button>
              <button onClick={() => { setTitleDraft(doc.title); setEditingTitle(false); }} title="Abbrechen"><X size={14} color="var(--color-danger)" /></button>
            </>
          ) : (
            <>
              <span>{doc.title}</span>
              {!isDeleted && <button onClick={() => setEditingTitle(true)} title="Umbenennen"><Pencil size={12} color="var(--color-text-faint)" /></button>}
            </>
          )}
        </div>
        <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>{doc.file_name} · {fmtBytes(doc.file_size_bytes)}</div>
      </td>
      <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-text-faint)' }}>{doc.document_type ?? '—'}</td>
      <td className="px-4 py-3">
        {!isDeleted && (
          <button onClick={() => patch({ visibility: doc.visibility === 'public' ? 'private' : 'public' })} disabled={busy} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: doc.visibility === 'public' ? 'var(--color-success-light)' : 'var(--color-panel-alt)', color: doc.visibility === 'public' ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
            {doc.visibility === 'public' ? <Eye size={11} /> : <EyeOff size={11} />} {doc.visibility === 'public' ? 'Öffentlich' : 'Privat'}
          </button>
        )}
      </td>
      <td className="px-4 py-3">
        {!isDeleted && (
          <button
            onClick={() => patch({ allowDownload: !doc.allow_download })}
            disabled={busy}
            title="Umschalten, ob Bewerber-Empfänger diese Datei herunterladen dürfen (wirkt sich erst mit den Recruiter-Links aus einer späteren Phase aus)"
            className="text-[11px] px-2 py-0.5 rounded-full font-medium"
            style={{ background: doc.allow_download ? 'var(--color-success-light)' : 'var(--color-panel-alt)', color: doc.allow_download ? 'var(--color-success)' : 'var(--color-text-faint)' }}
          >
            {doc.allow_download ? 'Erlaubt' : 'Gesperrt'}
          </button>
        )}
      </td>
      <td className="px-4 py-3">
        {isPermanentlyGone ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>Endgültig gelöscht</span>
        ) : isDeleted ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>Gelöscht (wiederherstellbar)</span>
        ) : (
          <span className="text-[11px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'var(--color-success-light)', color: 'var(--color-success)' }}>Aktiv</span>
        )}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-1.5">
          {!isDeleted && (
            <>
              <button onClick={view} disabled={busy} title="Ansehen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}><Eye size={13} /></button>
              <button onClick={download} disabled={busy} title="Herunterladen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}><Download size={13} /></button>
              <label title="Ersetzen" className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer" style={{ background: 'var(--color-panel-alt)' }}>
                <RefreshCw size={13} />
                <input type="file" className="hidden" accept="application/pdf,image/jpeg,image/png,image/webp" onChange={(e) => { const f = e.target.files?.[0]; if (f) replace(f); }} />
              </label>
              <button onClick={() => del(false)} disabled={busy} title="Löschen (wiederherstellbar)" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-panel-alt)' }}><Trash2 size={13} color="var(--color-danger)" /></button>
            </>
          )}
          {isDeleted && !isPermanentlyGone && (
            <>
              <button onClick={() => patch({ action: 'restore' })} disabled={busy} title="Wiederherstellen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-success-light)' }}><RotateCcw size={13} color="var(--color-success)" /></button>
              <button onClick={() => del(true)} disabled={busy} title="Endgültig löschen" className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-danger-light)' }}><XCircle size={13} color="var(--color-danger)" /></button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

function DocumentsSection({ candidateId, documents, onChanged }: { candidateId: string; documents: Document[]; onChanged: () => void }) {
  return (
    <div>
      <div className="rounded-xl p-3 mb-4 text-xs" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary-hover)' }}>
        Als Administrator sehen und laden Sie hier immer alle Dokumente vollständig — unabhängig von „Sichtbarkeit&quot; und „Download für Bewerber&quot;.
        Diese beiden Einstellungen steuern erst später, sobald Recruiter-Links existieren, was ein Unternehmen sehen darf.
      </div>
      <UploadForm candidateId={candidateId} onUploaded={onChanged} />
      {documents.length === 0 ? (
        <div className="rounded-2xl p-10 flex flex-col items-center text-center gap-3" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <FileText size={28} color="var(--color-text-faint)" />
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Noch keine Dokumente hochgeladen.</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-x-auto" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border-soft)' }}>
                {['Dokument', 'Typ', 'Sichtbarkeit', 'Download für Bewerber', 'Status', 'Aktionen'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium whitespace-nowrap" style={{ color: 'var(--color-text-faint)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map((d) => <DocumentRow key={d.id} doc={d} onChanged={onChanged} />)}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SkillsSection({ candidateId, skills, onChanged }: { candidateId: string; skills: Skill[]; onChanged: () => void }) {
  const [category, setCategory] = useState('IT & Cloud');
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editLevel, setEditLevel] = useState('');

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setSaving(true);
    await fetch('/api/admin/candidate/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ candidateId, category, name, level: level || undefined }),
    });
    setName(''); setLevel('');
    setSaving(false);
    onChanged();
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/candidate/skills/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ name: editName, level: editLevel || null }),
    });
    setEditingId(null);
    onChanged();
  }

  async function togglePublic(s: Skill) {
    await fetch(`/api/admin/candidate/skills/${s.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isPublic: !s.is_public }),
    });
    onChanged();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/candidate/skills/${id}`, { method: 'DELETE', headers: await authHeader() });
    onChanged();
  }

  const grouped = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-1">Fähigkeiten</h3>
      <p className="text-[11px] mb-4" style={{ color: 'var(--color-text-faint)' }}>
        Kategorie „Was mich auszeichnet&quot; erscheint als eigene Checkliste. Ein optionaler Level-Wert (0–100) zeigt die Fähigkeit zusätzlich als Balken unter „Top Technologien&quot;.
      </p>
      <form onSubmit={add} className="flex flex-wrap gap-2 mb-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }}>
          {['Development', 'IT & Cloud', 'Microsoft', 'DevOps', 'Database', 'Sprachen', 'Was mich auszeichnet', 'Sonstiges'].map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="z. B. Deutsch (B2) oder Microsoft Azure" className="flex-1 min-w-[200px] text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input type="number" min={0} max={100} value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Level % (optional)" className="w-36 text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <button type="submit" disabled={saving || !name} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
          <Plus size={14} /> Hinzufügen
        </button>
      </form>
      {Object.keys(grouped).length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Fähigkeiten hinzugefügt.</p>
      ) : (
        Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className="mb-3">
            <div className="text-[11px] mb-1.5" style={{ color: 'var(--color-text-faint)' }}>{cat}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((s, i) => (
                <span key={s.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text)', opacity: s.is_public ? 1 : 0.5 }}>
                  {editingId === s.id ? (
                    <>
                      <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} className="text-xs rounded px-1.5 py-0.5 w-28" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                      <input type="number" min={0} max={100} value={editLevel} onChange={(e) => setEditLevel(e.target.value)} placeholder="%" className="text-xs rounded px-1.5 py-0.5 w-14" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                      <button onClick={() => saveEdit(s.id)} title="Speichern"><Check size={12} color="var(--color-success)" /></button>
                      <button onClick={() => setEditingId(null)} title="Abbrechen"><X size={12} color="var(--color-danger)" /></button>
                    </>
                  ) : (
                    <>
                      {s.name}{s.level ? ` · ${s.level}%` : ''}
                      <button onClick={() => { setEditingId(s.id); setEditName(s.name); setEditLevel(s.level ?? ''); }} title="Bearbeiten"><Pencil size={11} color="var(--color-text-faint)" /></button>
                      <ItemControls
                        isPublic={s.is_public}
                        canMoveUp={i > 0}
                        canMoveDown={i < items.length - 1}
                        onMoveUp={() => swapSortOrder('/api/admin/candidate/skills', s, items[i - 1]).then(onChanged)}
                        onMoveDown={() => swapSortOrder('/api/admin/candidate/skills', s, items[i + 1]).then(onChanged)}
                        onTogglePublic={() => togglePublic(s)}
                        onRemove={() => remove(s.id)}
                      />
                    </>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function CertificationsSection({ candidateId, certifications, onChanged }: { candidateId: string; certifications: Certification[]; onChanged: () => void }) {
  const [issuer, setIssuer] = useState('');
  const [name, setName] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editIssuer, setEditIssuer] = useState('');
  const [editName, setEditName] = useState('');
  const [editCredentialId, setEditCredentialId] = useState('');
  const [editIssueDate, setEditIssueDate] = useState('');
  const [editExpiryDate, setEditExpiryDate] = useState('');
  const [editVerificationUrl, setEditVerificationUrl] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!issuer || !name) return;
    setSaving(true);
    await fetch('/api/admin/candidate/certifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        candidateId, issuer, name,
        credentialId: credentialId || undefined,
        issueDate: issueDate || undefined,
        expiryDate: expiryDate || undefined,
        verificationUrl: verificationUrl || undefined,
        logoUrl: logoUrl || undefined,
      }),
    });
    setIssuer(''); setName(''); setCredentialId(''); setIssueDate(''); setExpiryDate(''); setVerificationUrl(''); setLogoUrl('');
    setSaving(false);
    onChanged();
  }

  function startEdit(c: Certification) {
    setEditingId(c.id);
    setEditIssuer(c.issuer); setEditName(c.name); setEditCredentialId(c.credential_id ?? '');
    setEditIssueDate(c.issue_date ?? ''); setEditExpiryDate(c.expiry_date ?? ''); setEditVerificationUrl(c.verification_url ?? ''); setEditLogoUrl('');
  }

  async function saveEdit(id: string) {
    setEditError(null);
    const res = await fetch(`/api/admin/candidate/certifications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        issuer: editIssuer, name: editName,
        credentialId: editCredentialId || null, issueDate: editIssueDate || null,
        expiryDate: editExpiryDate || null,
        verificationUrl: editVerificationUrl || null, logoUrl: editLogoUrl || undefined,
      }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setEditError(j.error ?? `Fehler beim Speichern (${res.status}).`);
      return; // keep the edit form open with the entered values so nothing is lost
    }
    setEditingId(null);
    onChanged();
  }

  async function togglePublic(c: Certification) {
    await fetch(`/api/admin/candidate/certifications/${c.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isPublic: !c.is_public }),
    });
    onChanged();
  }

  async function uploadLogo(certId: string, file: File) {
    setUploadingLogo(true);
    const formData = new FormData();
    formData.append('file', file);
    await fetch(`/api/admin/candidate/certifications/${certId}/logo`, {
      method: 'POST',
      headers: await authHeader(),
      body: formData,
    });
    setUploadingLogo(false);
    onChanged();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/candidate/certifications/${id}`, { method: 'DELETE', headers: await authHeader() });
    onChanged();
  }

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Zertifizierungen</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input required value={issuer} onChange={(e) => setIssuer(e.target.value)} placeholder="Aussteller (z. B. Microsoft)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (z. B. Azure AZ-900)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={credentialId} onChange={(e) => setCredentialId(e.target.value)} placeholder="Credential-ID (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] mb-1" style={{ color: 'var(--color-text-faint)' }}>Ausgestellt</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
          <div>
            <label className="block text-[10px] mb-1" style={{ color: 'var(--color-text-faint)' }}>Gültig bis (optional)</label>
            <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
        </div>
        <input value={verificationUrl} onChange={(e) => setVerificationUrl(e.target.value)} placeholder="Verifizierungs-URL (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="Logo-URL (echtes Badge, optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <button type="submit" disabled={saving} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50 w-fit" style={{ background: 'var(--color-primary)' }}>
          <Plus size={14} /> Hinzufügen
        </button>
      </form>
      {certifications.length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Zertifizierungen hinzugefügt.</p>
      ) : (
        <div className="space-y-2">
          {certifications.map((c, i) => (
            <div key={c.id} className="rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', opacity: c.is_public ? 1 : 0.5 }}>
              {editingId === c.id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input value={editIssuer} onChange={(e) => setEditIssuer(e.target.value)} placeholder="Aussteller" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editCredentialId} onChange={(e) => setEditCredentialId(e.target.value)} placeholder="Credential-ID" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input type="date" value={editIssueDate} onChange={(e) => setEditIssueDate(e.target.value)} className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input type="date" value={editExpiryDate} onChange={(e) => setEditExpiryDate(e.target.value)} title="Gültig bis" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editVerificationUrl} onChange={(e) => setEditVerificationUrl(e.target.value)} placeholder="Verifizierungs-URL" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editLogoUrl} onChange={(e) => setEditLogoUrl(e.target.value)} placeholder="Logo-URL (extern)" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <label className="flex items-center justify-center gap-1.5 text-xs rounded px-2 py-1.5 cursor-pointer" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text-muted)' }}>
                    {uploadingLogo ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                    {uploadingLogo ? 'Wird hochgeladen…' : 'Oder Badge-Bild hochladen'}
                    <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={uploadingLogo} onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLogo(c.id, f); }} />
                  </label>
                  <div className="sm:col-span-2 flex gap-2 items-center">
                    <button onClick={() => saveEdit(c.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}><Check size={12} /> Speichern</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-panel)', color: 'var(--color-text-muted)' }}>Abbrechen</button>
                    {editError && <span className="text-xs" style={{ color: 'var(--color-danger)' }}>{editError}</span>}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      {c.name} <span style={{ color: 'var(--color-text-faint)' }}>· {c.issuer}</span>
                      {!c.issue_date && !c.credential_id && !c.verification_url && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'var(--color-warning-light, rgba(245,158,11,0.15))', color: 'var(--color-warning, #F59E0B)' }}>
                          In Vorbereitung — noch nicht erhalten
                        </span>
                      )}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                      {c.issue_date ? new Date(c.issue_date).toLocaleDateString('de-DE') : '—'}
                      {c.expiry_date ? ` · gültig bis ${new Date(c.expiry_date).toLocaleDateString('de-DE')}` : ''}
                      {c.credential_id ? ` · ${c.credential_id}` : ''}
                      {!c.verification_url ? ' · Verifizierung nicht verfügbar' : ''}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(c)} title="Bearbeiten"><Pencil size={13} color="var(--color-text-faint)" /></button>
                    <ItemControls
                      isPublic={c.is_public}
                      canMoveUp={i > 0}
                      canMoveDown={i < certifications.length - 1}
                      onMoveUp={() => swapSortOrder('/api/admin/candidate/certifications', c, certifications[i - 1]).then(onChanged)}
                      onMoveDown={() => swapSortOrder('/api/admin/candidate/certifications', c, certifications[i + 1]).then(onChanged)}
                      onTogglePublic={() => togglePublic(c)}
                      onRemove={() => remove(c.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExperienceSection({ candidateId, experiences, onChanged }: { candidateId: string; experiences: Experience[]; onChanged: () => void }) {
  const [roleTitle, setRoleTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [companyLogoUrl, setCompanyLogoUrl] = useState('');
  const [companyWebsiteUrl, setCompanyWebsiteUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRoleTitle, setEditRoleTitle] = useState('');
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCompanyLogoUrl, setEditCompanyLogoUrl] = useState('');
  const [editCompanyWebsiteUrl, setEditCompanyWebsiteUrl] = useState('');

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!roleTitle || !companyName) return;
    setSaving(true);
    await fetch('/api/admin/candidate/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        candidateId, roleTitle, companyName,
        location: location || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        description: description || undefined,
        companyLogoUrl: companyLogoUrl || undefined,
        companyWebsiteUrl: companyWebsiteUrl || undefined,
      }),
    });
    setRoleTitle(''); setCompanyName(''); setLocation(''); setStartDate(''); setEndDate(''); setDescription(''); setCompanyLogoUrl(''); setCompanyWebsiteUrl('');
    setSaving(false);
    onChanged();
  }

  function startEdit(exp: Experience) {
    setEditingId(exp.id);
    setEditRoleTitle(exp.role_title); setEditCompanyName(exp.company_name); setEditLocation(exp.location ?? '');
    setEditStartDate(exp.start_date ?? ''); setEditEndDate(exp.end_date ?? ''); setEditDescription('');
    setEditCompanyLogoUrl(''); setEditCompanyWebsiteUrl('');
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/candidate/experiences/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        roleTitle: editRoleTitle, companyName: editCompanyName, location: editLocation || null,
        startDate: editStartDate || null, endDate: editEndDate || null, description: editDescription || undefined,
        companyLogoUrl: editCompanyLogoUrl || undefined, companyWebsiteUrl: editCompanyWebsiteUrl || undefined,
      }),
    });
    setEditingId(null);
    onChanged();
  }

  async function togglePublic(exp: Experience) {
    await fetch(`/api/admin/candidate/experiences/${exp.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isPublic: !exp.is_public }),
    });
    onChanged();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/candidate/experiences/${id}`, { method: 'DELETE', headers: await authHeader() });
    onChanged();
  }

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Berufserfahrung</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input required value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} placeholder="Position" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Unternehmen" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ort (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="leer = heute" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        </div>
        <input value={companyLogoUrl} onChange={(e) => setCompanyLogoUrl(e.target.value)} placeholder="Firmen-Logo-URL (echt, optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={companyWebsiteUrl} onChange={(e) => setCompanyWebsiteUrl(e.target.value)} placeholder="Firmen-Website (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung (optional, eine Zeile pro Punkt)" rows={2} className="sm:col-span-2 text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <button type="submit" disabled={saving} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50 w-fit" style={{ background: 'var(--color-primary)' }}>
          <Plus size={14} /> Hinzufügen
        </button>
      </form>
      {experiences.length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Berufserfahrung hinzugefügt.</p>
      ) : (
        <div className="space-y-2">
          {experiences.map((exp, i) => (
            <div key={exp.id} className="rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', opacity: exp.is_public ? 1 : 0.5 }}>
              {editingId === exp.id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input value={editRoleTitle} onChange={(e) => setEditRoleTitle(e.target.value)} placeholder="Position" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editCompanyName} onChange={(e) => setEditCompanyName(e.target.value)} placeholder="Unternehmen" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editLocation} onChange={(e) => setEditLocation(e.target.value)} placeholder="Ort" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                    <input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  </div>
                  <input value={editCompanyLogoUrl} onChange={(e) => setEditCompanyLogoUrl(e.target.value)} placeholder="Firmen-Logo-URL" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editCompanyWebsiteUrl} onChange={(e) => setEditCompanyWebsiteUrl(e.target.value)} placeholder="Firmen-Website" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Beschreibung" rows={2} className="sm:col-span-2 text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <div className="sm:col-span-2 flex gap-2">
                    <button onClick={() => saveEdit(exp.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}><Check size={12} /> Speichern</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-panel)', color: 'var(--color-text-muted)' }}>Abbrechen</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div>{exp.role_title} <span style={{ color: 'var(--color-text-faint)' }}>· {exp.company_name}</span></div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                      {exp.start_date ? new Date(exp.start_date).toLocaleDateString('de-DE') : '—'} – {exp.end_date ? new Date(exp.end_date).toLocaleDateString('de-DE') : 'heute'}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(exp)} title="Bearbeiten"><Pencil size={13} color="var(--color-text-faint)" /></button>
                    <ItemControls
                      isPublic={exp.is_public}
                      canMoveUp={i > 0}
                      canMoveDown={i < experiences.length - 1}
                      onMoveUp={() => swapSortOrder('/api/admin/candidate/experiences', exp, experiences[i - 1]).then(onChanged)}
                      onMoveDown={() => swapSortOrder('/api/admin/candidate/experiences', exp, experiences[i + 1]).then(onChanged)}
                      onTogglePublic={() => togglePublic(exp)}
                      onRemove={() => remove(exp.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSection({ candidateId, projects, onChanged }: { candidateId: string; projects: Project[]; onChanged: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTechnologies, setEditTechnologies] = useState('');
  const [editProjectUrl, setEditProjectUrl] = useState('');
  const [editRepoUrl, setEditRepoUrl] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    setFormError(null);
    const res = await fetch('/api/admin/candidate/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        candidateId, title,
        description: description || undefined,
        technologies: technologies ? technologies.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
        projectUrl: projectUrl || undefined,
        repoUrl: repoUrl || undefined,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setFormError(j.error ?? `Fehler beim Speichern (${res.status}).`);
      return; // keep the entered values so nothing is lost
    }
    setTitle(''); setDescription(''); setTechnologies(''); setProjectUrl(''); setRepoUrl('');
    onChanged();
  }

  function startEdit(p: Project) {
    setEditingId(p.id);
    setEditTitle(p.title); setEditDescription(p.description ?? ''); setEditTechnologies((p.technologies ?? []).join(', '));
    setEditProjectUrl(p.project_url ?? ''); setEditRepoUrl(p.repo_url ?? '');
  }

  async function saveEdit(id: string) {
    setFormError(null);
    const res = await fetch(`/api/admin/candidate/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        title: editTitle, description: editDescription || null,
        technologies: editTechnologies.split(',').map((t) => t.trim()).filter(Boolean),
        projectUrl: editProjectUrl || null, repoUrl: editRepoUrl || null,
      }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setFormError(j.error ?? `Fehler beim Speichern (${res.status}).`);
      return;
    }
    setEditingId(null);
    onChanged();
  }

  async function togglePublic(p: Project) {
    await fetch(`/api/admin/candidate/projects/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isPublic: !p.is_public }),
    });
    onChanged();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/candidate/projects/${id}`, { method: 'DELETE', headers: await authHeader() });
    onChanged();
  }

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Projekte</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titel" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={technologies} onChange={(e) => setTechnologies(e.target.value)} placeholder="Technologien (mit Komma getrennt)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} placeholder="Projekt-URL (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} placeholder="Repository-URL (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beschreibung (optional)" rows={2} className="sm:col-span-2 text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <button type="submit" disabled={saving} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50 w-fit" style={{ background: 'var(--color-primary)' }}>
          <Plus size={14} /> Hinzufügen
        </button>
      </form>
      {formError && <p className="text-xs mb-3" style={{ color: 'var(--color-danger)' }}>{formError}</p>}
      {projects.length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Projekte hinzugefügt.</p>
      ) : (
        <div className="space-y-2">
          {projects.map((p, i) => (
            <div key={p.id} className="rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', opacity: p.is_public ? 1 : 0.5 }}>
              {editingId === p.id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Titel" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editTechnologies} onChange={(e) => setEditTechnologies(e.target.value)} placeholder="Technologien" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editProjectUrl} onChange={(e) => setEditProjectUrl(e.target.value)} placeholder="Projekt-URL" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editRepoUrl} onChange={(e) => setEditRepoUrl(e.target.value)} placeholder="Repository-URL" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Beschreibung" rows={2} className="sm:col-span-2 text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <div className="sm:col-span-2 flex gap-2 items-center">
                    <button onClick={() => saveEdit(p.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}><Check size={12} /> Speichern</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-panel)', color: 'var(--color-text-muted)' }}>Abbrechen</button>
                    {formError && <span className="text-xs" style={{ color: 'var(--color-danger)' }}>{formError}</span>}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div>{p.title}</div>
                    {p.technologies && p.technologies.length > 0 && (
                      <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>{p.technologies.join(', ')}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(p)} title="Bearbeiten"><Pencil size={13} color="var(--color-text-faint)" /></button>
                    <ItemControls
                      isPublic={p.is_public}
                      canMoveUp={i > 0}
                      canMoveDown={i < projects.length - 1}
                      onMoveUp={() => swapSortOrder('/api/admin/candidate/projects', p, projects[i - 1]).then(onChanged)}
                      onMoveDown={() => swapSortOrder('/api/admin/candidate/projects', p, projects[i + 1]).then(onChanged)}
                      onTogglePublic={() => togglePublic(p)}
                      onRemove={() => remove(p.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EducationSection({ candidateId, education, onChanged }: { candidateId: string; education: Education[]; onChanged: () => void }) {
  const [institutionName, setInstitutionName] = useState('');
  const [degree, setDegree] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [graduationDate, setGraduationDate] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInstitutionName, setEditInstitutionName] = useState('');
  const [editDegree, setEditDegree] = useState('');
  const [editFieldOfStudy, setEditFieldOfStudy] = useState('');
  const [editGraduationDate, setEditGraduationDate] = useState('');
  const [editLogoUrl, setEditLogoUrl] = useState('');
  const [editWebsiteUrl, setEditWebsiteUrl] = useState('');

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!institutionName) return;
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/candidate/education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        candidateId, institutionName,
        degree: degree || undefined, fieldOfStudy: fieldOfStudy || undefined,
        graduationDate: graduationDate || undefined, logoUrl: logoUrl || undefined, websiteUrl: websiteUrl || undefined,
      }),
    });
    if (!res.ok) {
      setError('Fehler beim Speichern.');
      setSaving(false);
      return;
    }
    setInstitutionName(''); setDegree(''); setFieldOfStudy(''); setGraduationDate(''); setLogoUrl(''); setWebsiteUrl('');
    setSaving(false);
    onChanged();
  }

  function startEdit(edu: Education) {
    setEditingId(edu.id);
    setEditInstitutionName(edu.institution_name); setEditDegree(edu.degree ?? ''); setEditFieldOfStudy(edu.field_of_study ?? '');
    setEditGraduationDate(edu.graduation_date ?? ''); setEditLogoUrl(edu.logo_url ?? ''); setEditWebsiteUrl(edu.website_url ?? '');
  }

  async function saveEdit(id: string) {
    await fetch(`/api/admin/candidate/education/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        institutionName: editInstitutionName, degree: editDegree || null, fieldOfStudy: editFieldOfStudy || null,
        graduationDate: editGraduationDate || null, logoUrl: editLogoUrl || null, websiteUrl: editWebsiteUrl || null,
      }),
    });
    setEditingId(null);
    onChanged();
  }

  async function togglePublic(edu: Education) {
    await fetch(`/api/admin/candidate/education/${edu.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({ isPublic: !edu.is_public }),
    });
    onChanged();
  }

  async function remove(id: string) {
    await fetch(`/api/admin/candidate/education/${id}`, { method: 'DELETE', headers: await authHeader() });
    onChanged();
  }

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <h3 className="text-sm font-semibold mb-4">Ausbildung</h3>
      <form onSubmit={add} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <input required value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} placeholder="Hochschule / Institution" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Abschluss (z. B. Bachelor)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} placeholder="Fachrichtung" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input type="date" value={graduationDate} onChange={(e) => setGraduationDate(e.target.value)} className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="Logo-URL (echt, optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="Offizielle Website (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
        <button type="submit" disabled={saving} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50 w-fit" style={{ background: 'var(--color-primary)' }}>
          <Plus size={14} /> Hinzufügen
        </button>
      </form>
      {error && <p className="text-xs mb-3" style={{ color: 'var(--color-danger)' }}>{error}</p>}
      {education.length === 0 ? (
        <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Noch keine Ausbildung hinzugefügt.</p>
      ) : (
        <div className="space-y-2">
          {education.map((edu, i) => (
            <div key={edu.id} className="rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', opacity: edu.is_public ? 1 : 0.5 }}>
              {editingId === edu.id ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input value={editInstitutionName} onChange={(e) => setEditInstitutionName(e.target.value)} placeholder="Institution" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editDegree} onChange={(e) => setEditDegree(e.target.value)} placeholder="Abschluss" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editFieldOfStudy} onChange={(e) => setEditFieldOfStudy(e.target.value)} placeholder="Fachrichtung" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input type="date" value={editGraduationDate} onChange={(e) => setEditGraduationDate(e.target.value)} className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editLogoUrl} onChange={(e) => setEditLogoUrl(e.target.value)} placeholder="Logo-URL" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <input value={editWebsiteUrl} onChange={(e) => setEditWebsiteUrl(e.target.value)} placeholder="Website" className="text-sm rounded px-2 py-1" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
                  <div className="sm:col-span-2 flex gap-2">
                    <button onClick={() => saveEdit(edu.id)} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}><Check size={12} /> Speichern</button>
                    <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-panel)', color: 'var(--color-text-muted)' }}>Abbrechen</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <div>{edu.institution_name}</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>{[edu.degree, edu.field_of_study].filter(Boolean).join(' · ')}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => startEdit(edu)} title="Bearbeiten"><Pencil size={13} color="var(--color-text-faint)" /></button>
                    <ItemControls
                      isPublic={edu.is_public}
                      canMoveUp={i > 0}
                      canMoveDown={i < education.length - 1}
                      onMoveUp={() => swapSortOrder('/api/admin/candidate/education', edu, education[i - 1]).then(onChanged)}
                      onMoveDown={() => swapSortOrder('/api/admin/candidate/education', edu, education[i + 1]).then(onChanged)}
                      onTogglePublic={() => togglePublic(edu)}
                      onRemove={() => remove(edu.id)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ShareLinksSection({ candidateId, documents }: { candidateId: string; documents: Document[]; }) {
  const [links, setLinks] = useState<ShareLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [expiresInDays, setExpiresInDays] = useState(30);
  const [requireAccessCode, setRequireAccessCode] = useState(true);
  const [allowDownload, setAllowDownload] = useState(false);
  const [selectedDocIds, setSelectedDocIds] = useState<string[]>([]);
  const [creating, setCreating] = useState(false);
  const [justCreated, setJustCreated] = useState<{ shareUrl: string; rawToken: string; rawAccessCode: string | null; companyName: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [hideRevoked, setHideRevoked] = useState(true);

  const privateDocs = documents.filter((d) => d.visibility === 'private' && !d.deleted_at);

  function loadLinks() {
    setLoading(true);
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/share-links', { headers }))
      .then((res) => res.json())
      .then((j) => setLinks(j.shareLinks ?? []))
      .finally(() => setLoading(false));
  }

  useEffect(() => { Promise.resolve().then(loadLinks); }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!companyName) return;
    setCreating(true);
    const res = await fetch('/api/admin/candidate/share-links', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        candidateId, companyName,
        recruiterName: recruiterName || undefined, recruiterEmail: recruiterEmail || undefined,
        expiresInDays, requireAccessCode, allowDownload, documentIds: selectedDocIds,
      }),
    });
    setCreating(false);
    if (!res.ok) return;
    const j = await res.json();
    setJustCreated({ shareUrl: j.shareUrl, rawToken: j.rawToken, rawAccessCode: j.rawAccessCode, companyName });
    setCompanyName(''); setRecruiterName(''); setRecruiterEmail(''); setSelectedDocIds([]);
    setShowForm(false);
    loadLinks();
  }

  async function revoke(id: string) {
    await fetch(`/api/admin/candidate/share-links/${id}/revoke`, { method: 'POST', headers: await authHeader() });
    loadLinks();
  }

  function copy(text: string, field: string) {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  }

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div className="rounded-2xl p-5 mb-6" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Share-Links für Unternehmen</h3>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <input type="checkbox" checked={hideRevoked} onChange={(e) => setHideRevoked(e.target.checked)} />
            Widerrufene ausblenden
          </label>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-lg text-white" style={{ background: 'var(--color-primary)' }}>
            <Plus size={14} /> Neuer Link
          </button>
        </div>
      </div>

      {justCreated && (
        <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--color-success-light)', border: '1px solid var(--color-success)' }}>
          <p className="text-xs font-semibold mb-2" style={{ color: 'var(--color-success)' }}>
            Link für {justCreated.companyName} erstellt — Token und Code werden nur jetzt angezeigt, danach nicht mehr abrufbar!
          </p>
          <div className="flex items-center gap-2 mb-2">
            <code className="flex-1 text-xs px-2 py-1.5 rounded overflow-x-auto" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text)' }}>{origin}{justCreated.shareUrl}</code>
            <button onClick={() => copy(`${origin}${justCreated.shareUrl}`, 'link')} className="text-xs px-2 py-1.5 rounded" style={{ background: 'var(--color-panel-alt)' }}>{copiedField === 'link' ? <Check size={13} color="var(--color-success)" /> : 'Kopieren'}</button>
          </div>
          {justCreated.rawAccessCode && (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Zugriffscode:</span>
              <code className="text-sm font-bold px-2 py-1 rounded" style={{ background: 'var(--color-panel-alt)', color: 'var(--color-text)' }}>{justCreated.rawAccessCode}</code>
              <button onClick={() => copy(justCreated.rawAccessCode!, 'code')} className="text-xs px-2 py-1.5 rounded" style={{ background: 'var(--color-panel-alt)' }}>{copiedField === 'code' ? <Check size={13} color="var(--color-success)" /> : 'Kopieren'}</button>
            </div>
          )}
          <button onClick={() => setJustCreated(null)} className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>Schließen</button>
        </div>
      )}

      {showForm && (
        <form onSubmit={create} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 p-4 rounded-xl" style={{ background: 'var(--color-panel-alt)' }}>
          <input required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Unternehmen *" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          <input value={recruiterName} onChange={(e) => setRecruiterName(e.target.value)} placeholder="Ansprechpartner (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          <input value={recruiterEmail} onChange={(e) => setRecruiterEmail(e.target.value)} placeholder="E-Mail (optional)" className="text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Gültig für (Tage, 0 = unbegrenzt)</label>
            <input type="number" min={0} value={expiresInDays} onChange={(e) => setExpiresInDays(Number(e.target.value))} className="w-full text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border-soft)', color: 'var(--color-text)' }} />
          </div>
          <div className="flex items-center gap-2">
            <input id="reqcode" type="checkbox" checked={requireAccessCode} onChange={(e) => setRequireAccessCode(e.target.checked)} />
            <label htmlFor="reqcode" className="text-sm">Zugriffscode für vertrauliche Dokumente</label>
          </div>
          <div className="flex items-center gap-2">
            <input id="dl" type="checkbox" checked={allowDownload} onChange={(e) => setAllowDownload(e.target.checked)} />
            <label htmlFor="dl" className="text-sm">Download erlauben</label>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>Welche privaten Dokumente für dieses Unternehmen freigeben?</label>
            {privateDocs.length === 0 ? (
              <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>Keine privaten Dokumente vorhanden.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {privateDocs.map((d) => (
                  <label key={d.id} className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg cursor-pointer" style={{ background: selectedDocIds.includes(d.id) ? 'var(--color-primary-light)' : 'var(--color-panel)', border: '1px solid var(--color-border-soft)' }}>
                    <input
                      type="checkbox"
                      checked={selectedDocIds.includes(d.id)}
                      onChange={(e) => setSelectedDocIds(e.target.checked ? [...selectedDocIds, d.id] : selectedDocIds.filter((id) => id !== d.id))}
                    />
                    {d.title}
                  </label>
                ))}
              </div>
            )}
          </div>
          <button type="submit" disabled={creating} className="flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg text-white disabled:opacity-50 w-fit" style={{ background: 'var(--color-primary)' }}>
            {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Link erstellen
          </button>
        </form>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={14} className="animate-spin" /> Wird geladen…</div>
      ) : (() => {
        const visibleLinks = hideRevoked ? links.filter((l) => !l.revoked_at) : links;
        if (visibleLinks.length === 0) {
          return <p className="text-xs" style={{ color: 'var(--color-text-faint)' }}>{hideRevoked && links.length > 0 ? 'Keine aktiven Share-Links (widerrufene sind ausgeblendet).' : 'Noch keine Share-Links erstellt.'}</p>;
        }
        return (
          <div className="space-y-2">
            {visibleLinks.map((l) => {
              const isRevoked = !!l.revoked_at;
              const isExpired = l.expires_at ? new Date(l.expires_at) < new Date() : false;
              return (
                <div key={l.id} className="flex items-center justify-between text-sm rounded-lg px-3 py-2" style={{ background: 'var(--color-panel-alt)', opacity: isRevoked ? 0.5 : 1 }}>
                  <div>
                    <div>{l.company_name} {l.recruiter_name ? <span style={{ color: 'var(--color-text-faint)' }}>· {l.recruiter_name}</span> : null}</div>
                    <div className="text-[11px]" style={{ color: 'var(--color-text-faint)' }}>
                      Aufrufe: {l.access_count} · {isRevoked ? 'Widerrufen' : isExpired ? 'Abgelaufen' : `Gültig bis ${l.expires_at ? new Date(l.expires_at).toLocaleDateString('de-DE') : 'unbegrenzt'}`}
                    </div>
                  </div>
                  {!isRevoked && (
                    <button onClick={() => revoke(l.id)} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>Widerrufen</button>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </div>
  );
}

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  function applyResponse(j: { profile: Profile | null; skills: Skill[]; certifications: Certification[]; experiences: Experience[]; projects: Project[]; education: Education[]; documents: Document[] }) {
    setProfile(j.profile);
    setSkills(j.skills ?? []);
    setCertifications(j.certifications ?? []);
    setExperiences(j.experiences ?? []);
    setProjects(j.projects ?? []);
    setEducation(j.education ?? []);
    setDocuments(j.documents ?? []);
  }

  function reload() {
    setError(null);
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        applyResponse(await res.json());
      })
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        applyResponse(await res.json());
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (profile === undefined) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>
        Privates Kandidatenprofil — Profil, Fähigkeiten, Zertifikate, Berufserfahrung und Dokumente für Bewerbungen. Echte Daten aus Supabase.
      </p>
      <Link href="/admin-senmas/candidate-profile-preview" className="inline-block text-sm font-medium px-4 py-2 rounded-lg text-white mb-5" style={{ background: '#EF1B2D' }}>
        Vorschau ansehen
      </Link>
      <ProfileForm profile={profile} onSaved={reload} />
      {profile && (
        <>
          <SkillsSection candidateId={profile.id} skills={skills} onChanged={reload} />
          <CertificationsSection candidateId={profile.id} certifications={certifications} onChanged={reload} />
          <ExperienceSection candidateId={profile.id} experiences={experiences} onChanged={reload} />
          <ProjectsSection candidateId={profile.id} projects={projects} onChanged={reload} />
          <EducationSection candidateId={profile.id} education={education} onChanged={reload} />
          <h3 className="text-sm font-semibold mb-3">Dokumente</h3>
          <DocumentsSection candidateId={profile.id} documents={documents} onChanged={reload} />
          <ShareLinksSection candidateId={profile.id} documents={documents} />
        </>
      )}
    </div>
  );
}
