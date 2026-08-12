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
import {
  Loader2, Save, Upload, FileText, Eye, EyeOff, Download, Pencil,
  RefreshCw, Trash2, RotateCcw, XCircle, Check, X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

type Profile = {
  id: string;
  display_name: string;
  professional_title: string | null;
  bio: string | null;
  location: string | null;
  availability: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
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

function ProfileForm({ profile, onSaved }: { profile: Profile | null; onSaved: (p: Profile) => void }) {
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [title, setTitle] = useState(profile?.professional_title ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [location, setLocation] = useState(profile?.location ?? '');
  const [availability, setAvailability] = useState(profile?.availability ?? 'available');
  const [email, setEmail] = useState(profile?.email ?? '');
  const [linkedin, setLinkedin] = useState(profile?.linkedin_url ?? '');
  const [github, setGithub] = useState(profile?.github_url ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch('/api/admin/candidate/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', ...(await authHeader()) },
      body: JSON.stringify({
        displayName, professionalTitle: title, bio, location, availability,
        email, linkedinUrl: linkedin, githubUrl: github,
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

export default function CandidateProfilePage() {
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  function reload() {
    setError(null);
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        const j = await res.json();
        setProfile(j.profile);
        setDocuments(j.documents ?? []);
      })
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    authHeader()
      .then((headers) => fetch('/api/admin/candidate/profile', { headers }))
      .then(async (res) => {
        if (!res.ok) throw new Error('Fehler beim Laden.');
        const j = await res.json();
        setProfile(j.profile);
        setDocuments(j.documents ?? []);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  if (error) return <div className="rounded-xl p-4 text-sm" style={{ background: 'var(--color-danger-light)', color: 'var(--color-danger)' }}>{error}</div>;
  if (profile === undefined) return <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-muted)' }}><Loader2 size={16} className="animate-spin" /> Daten werden geladen…</div>;

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>
        Privates Kandidatenprofil — Profil, Fähigkeiten, Zertifikate und Dokumente für Bewerbungen. Echte Daten aus Supabase.
      </p>
      <ProfileForm profile={profile} onSaved={reload} />
      {profile && (
        <>
          <h3 className="text-sm font-semibold mb-3">Dokumente</h3>
          <DocumentsSection candidateId={profile.id} documents={documents} onChanged={reload} />
        </>
      )}
    </div>
  );
}
