# CertCoach — Private Candidate Profile: PHASE 5 Design/Audit Report

Storage Architecture & Secure File Upload — **DESIGN/AUDIT ONLY**,
per the advisor's Aug 12 2026 directive. No bucket created, no upload
code written, no file uploaded, no mock data. Migration 034 is now
live (PHASE 4 approved and executed) — this report designs what comes
next, doesn't build it.

---

## 1-2. Bucket — single, private (revised per the advisor's final decision)

**Correction applied:** the two-bucket design (§1-2 of the original
draft) is replaced with a single bucket:

- **`candidate-private`** — every file this system ever stores: CV,
  certificates, Arbeitszeugnisse, references, portfolio items, the
  profile photo, anything else. One bucket, one access pattern, no
  exception to remember or explain later.

Created with `public = false`. There is no `candidate-public` bucket
in this design anymore — the reasoning that made the original
two-bucket split unnecessary was already present in the first draft
(every file, public-document or not, is always served through the
backend via a signed URL, never a bare Storage URL) — the advisor's
correction is that this same reasoning means a second bucket adds
complexity without adding any real capability. `visibility` on
`candidate_documents` remains exactly what decides who the backend
will generate a signed URL for; it was never what decided *which*
bucket a file lived in, so removing the second bucket changes nothing
about that logic.

## 3. Database stores metadata only

Already true and already verified in PHASE 4 — `candidate_documents`
has no column capable of holding file bytes (no `bytea`, no
`text` sized for base64). Nothing about PHASE 5 changes this; §1-2
above just decide *which* bucket the `storage_path` metadata points
into.

## 4. Storage path convention

```
candidate/{candidateId}/documents/{documentId}/{uuid}.{ext}
candidate/{candidateId}/photo/{uuid}.{ext}
```

Both paths live in the single `candidate-private` bucket (§1-2) —
the path prefix (`documents/` vs `photo/`) is just organizational,
not a security boundary; the bucket-level privacy and the
signed-URL-only access pattern are what actually protect every file,
regardless of which prefix it's under. Never the original filename —
`file_name` (a separate column) is what the UI displays;
`storage_path` is opaque and UUID-based specifically so a
guessed/enumerated path reveals nothing (no candidate name, no
document title, no sequential numbering to iterate over).

## 5. File size limits

**20 MB per file**, matching the original spec's own number (section
34) and consistent with what CV/certificate/reference PDFs actually
need. Enforced in two places, not one:
- Storage bucket's own `file_size_limit` (hard backstop, Supabase
  rejects the upload regardless of what the application does).
- Application-layer check before even attempting the upload (fast,
  clear error message, doesn't waste a round trip to Storage for an
  oversized file).

A single named constant (e.g. `MAX_DOCUMENT_SIZE_BYTES` in one shared
file), not a number repeated in multiple places — same discipline
already used for the referral system's commission rate/bonus days
constants.

## 6. MIME/signature validation

Per the original spec's own warning (section 33: "don't trust the
extension alone"):

```
Upload request
  -> reject if declared MIME type isn't in the allow-list
     (application/pdf, image/jpeg, image/png, image/webp —
     matches the bucket's own allowed_mime_types from migration
     34's design)
  -> reject if file size > limit (section 5)
  -> read the first few bytes and verify the actual file signature
     matches the declared type (a PDF must start with %PDF-, a JPEG
     with its own magic bytes, etc.) -- catches a renamed .exe with a
     .pdf extension, which declared-MIME-type checking alone would miss
  -> only then upload to Storage
```

No malware-scanning service is proposed for v1 (the original spec
listed it as "Optional" — section 33) — flagged here as a known,
accepted gap for a single-candidate, admin-only-upload system, not
silently skipped.

## 7. Upload/delete/replace/rename behavior

- **Upload:** create the `candidate_documents` row and the Storage
  object together; if either fails, the other is cleaned up (§11) —
  never leave a database row with no file, or a file with no row.
- **Rename:** updates `candidate_documents.title` (the display name)
  only — `storage_path`/`file_name` (the original filename) are
  untouched, since renaming is purely a metadata operation.
- **Replace:** uploads a new file to a **new** `storage_path` (new
  UUID), updates the `candidate_documents` row to point at it, then
  deletes the old Storage object only after the new one is confirmed
  uploaded and the database row is confirmed updated — never delete
  the old file first (if the new upload then failed, the document
  would be left with no file at all).
- **Delete:** soft-delete only (`deleted_at`, per migration 034,
  unchanged) — see §12.
- **Visibility toggle (public/private):** a plain `UPDATE` of
  `candidate_documents.visibility` — no Storage-level change at all,
  since (per §1-2) every file lives in a private bucket regardless of
  its document-level visibility; only the *serving* API route (§9)
  behaves differently based on this column.

All five operations: **admin-only** (§14), and all five satisfy the
full-editability requirement from the PHASE 3 addendum without any
further schema change.

## 8. Public vs private document access

- **Public document** (`visibility = 'public'`): served to anyone who
  already has a valid, unrevoked, unexpired share link (or, if the
  base profile page itself is ever made link-free — not decided yet,
  out of scope for this report) — still through the API route (§9),
  still never a bare Storage URL, so "public" never means
  "google-indexable" or "guessable-URL-readable".
- **Private document**: additionally requires a
  `document_access_grant` for that specific document on that specific
  share link (the confidential-documents flow, PHASE 8).

## 9. Signed URL strategy

```
Client requests to view/download a document
  -> API route verifies authorization first (admin session, OR for
     the recruiter flow: valid share link + [for private docs] a
     live access grant — §10)
  -> only after authorization passes: request a signed URL from
     Supabase Storage for that specific storage_path
  -> signed URL expires in 5-10 minutes (matches the original spec's
     own number, section 24)
  -> client uses that URL directly for the view/download; the app
     server is out of the data path for the actual file bytes (no
     proxying multi-megabyte PDFs through the Next.js function)
```

The signed URL is generated fresh on every request — never cached,
never stored anywhere (not in the database, not in `audit_logs`
metadata) — so a leaked/logged URL is only useful for the few minutes
it's valid.

## 10. Authorization and IDOR protection

Two separate authorization paths, both already designed in the PHASE
3 report's §3 security flow, restated here specifically for documents:

- **Admin path:** `requirePermission(token, 'candidate_profile.manage')`
  — identical to every other candidate-profile route.
- **Recruiter path:** the exact IDOR check the original spec's section
  66 requires — verify a `document_access_grants` row exists matching
  **both** `share_link_id` (from this recruiter's own token) **and**
  `document_id` (the one being requested), not just "does this share
  link have any grants at all". This is what stops Company A from
  reaching Company B's document by editing an id in the URL — tested
  explicitly once PHASE 8 builds this route (test case already listed
  in the original spec's section 66).

## 11. Orphan-file handling

Per the original spec's section 67 ("upload must not create an orphan
file or a broken document record"):

- If the Storage upload succeeds but the database insert then fails:
  the just-uploaded Storage object is deleted before returning the
  error to the admin. No orphan file left behind.
- If the database insert succeeds but something after it fails (there
  isn't really a "something after" in this design — the DB write is
  the last step of a successful upload — so this direction has no
  realistic failure mode to handle beyond the DB write itself failing,
  which is the first bullet's case in reverse order).
- Implemented as a straightforward try/catch with an explicit cleanup
  step, not a database transaction spanning Storage and Postgres
  (Supabase doesn't support that across the two systems) — this is
  the accepted, standard pattern for this kind of two-system write,
  not a shortcut.

## 12. Soft-delete strategy

Unchanged from migration 034 (already reviewed in PHASE 2/4):
`candidate_documents.deleted_at` — a delete sets this timestamp,
never removes the row or the Storage object immediately. Actual
Storage cleanup (removing the object to reclaim space) is a
**separate, deliberately manual/reviewed step** — e.g. an admin
action taken well after the soft-delete, or a periodic manual review
— never an automatic cascade, so a mistaken delete is always
recoverable until that manual step happens.

## 13. Audit events (existing audit_logs, no new table)

Confirmed against the advisor's required list from PHASE 3 §5, all
still applicable, now mapped to actual PHASE 5 operations:
`DOCUMENT_UPLOADED`, `DOCUMENT_VIEWED`, `DOCUMENT_DOWNLOADED`. Adding
two more for completeness, matching this project's established
granularity (skills/certifications/experience/projects each got
ADDED/UPDATED/REMOVED in PHASE 3, not just one generic event):
`DOCUMENT_REPLACED`, `DOCUMENT_DELETED` (soft-delete),
`DOCUMENT_VISIBILITY_CHANGED`. All via the existing `logAudit()`
helper, same table, no schema change — consistent with every prior
phase's finding on this point.

## 14. Admin-only management

Every write operation in this report (§7) is gated by
`candidate_profile.manage` — the same permission, same
`admin_users`/`requirePermission` system used since PHASE 1. No new
role, no new permission needed for PHASE 5. The recruiter-facing
*read* path (§8-10) is a completely separate, unauthenticated-by-
design flow (token + optional access code, never an admin session) —
this distinction was already established in the PHASE 3 security flow
and doesn't change here.

## 15. Full editability (PHASE 3 addendum, re-confirmed for documents)

Every operation the addendum required — add, rename, replace, delete,
change visibility — is designed above (§7) using only the columns
migration 034 already has. Re-confirming the PHASE 4 finding: **no
schema change is needed for PHASE 5.** The admin can perform every one
of these through the future Admin UI (§2 of the PHASE 3 report)
without any code change per content update — exactly the requirement.

---

## PHASE 5 — DESIGN/AUDIT SUMMARY

```
1.  Bucket choice ................. Single bucket: candidate-private (every file, no exceptions)
2.  Bucket privacy ................. Created private (public = false); served only via
                                      signed URL, never a bare Storage URL
3.  DB = metadata only ............. Confirmed, unchanged since migration 034
4.  Storage path convention ........ UUID-based, no filename/candidate-name leakage
5.  File size limit ................ 20 MB, enforced at bucket AND application layer
6.  MIME/signature validation ...... Declared MIME + size + magic-byte check, in that order
7.  Upload/delete/replace/rename ... All four designed; replace = new path + old cleanup after
                                      confirmation, never delete-then-upload
8.  Public vs private access ....... Both always via API route; "public" means
                                      "any valid share link", never "bare URL"
9.  Signed URL strategy ............ Generated fresh per request, 5-10 min expiry, never cached
10. Authorization / IDOR ........... Admin: requirePermission. Recruiter: share_link_id AND
                                      document_id must both match a live grant
11. Orphan-file handling ........... Upload failure -> cleanup uploaded file before erroring
12. Soft-delete strategy ........... deleted_at only; Storage cleanup is a separate manual step
13. Audit events .................... DOCUMENT_UPLOADED/VIEWED/DOWNLOADED/REPLACED/DELETED/
                                      VISIBILITY_CHANGED, all via existing audit_logs/logAudit()
14. Admin-only management .......... candidate_profile.manage, existing RBAC, no new permission
15. Full editability ............... Confirmed: no schema change needed, every operation
                                      already supported by migration 034's existing columns

Blocking Issues:
None identified.

Still NOT done (correctly, per this phase's scope):
No bucket created. No upload code written. No document uploaded.
No mock data. Recruiter document flow not activated.
```

**PHASE 5 STATUS: DESIGN COMPLETE, awaiting explicit approval before
any bucket is created or any code is written.**

---

## PHASE 5 FINAL REVIEW

Per the advisor's Aug 12 2026 correction (single `candidate-private`
bucket, no `candidate-public`), applied throughout this document
(§1-2 and the storage-path section). Re-checked every other section
for any dependency on the removed second bucket — none found; every
other point (§3-15) was already bucket-agnostic by design (they
describe metadata, size limits, validation, operations, signed-URL
behavior, authorization, cleanup, audit, RBAC, and editability — none
of which differ based on how many buckets exist).

**Full-editability re-confirmation** (the advisor's explicit
requirement, restated this message): every operation listed —
add ➕, rename ✏️, replace 🔄, visibility toggle 👁️, download
enable/disable 📥, delete 🗑️, deleted-file recovery ♻️, type/description
edit 📄 — maps onto columns `candidate_documents` already has
(`title`, `visibility`, `allow_download`, `storage_path`,
`document_type`, `description`, `deleted_at`). "Recovery" specifically
(♻️, new emphasis this message) means: clearing `deleted_at` back to
`null` on a soft-deleted row, restoring it — no schema change needed
for this either, since soft-delete was already designed as reversible
(§12), not a point of no return, as long as the Storage object itself
hasn't yet been through the separate manual cleanup step.

This same full-editability guarantee already extends to
certifications, experience, and projects — confirmed in PHASE 3 (all
three have complete add/edit/remove APIs, already implemented and
audited) and re-confirmed in PHASE 4 (schema supports it with no
change needed). Nothing new required there; restated here only
because the advisor's message grouped documents and these other
content types together as one requirement.

```
PHASE 5 FINAL REVIEW

1. Bucket design (single, private) ....... PASS (corrected this review)
2. All 15 original design points ......... PASS (bucket-agnostic, no other change needed)
3. Full editability -- documents .......... PASS (add/rename/replace/visibility/download/
                                             delete/recover/type-description, all
                                             mapped to existing columns)
4. Full editability -- certifications/
   experience/projects ................... PASS (already implemented + audited, PHASE 3/4)
5. No bucket created ...................... CONFIRMED
6. No file uploaded ........................ CONFIRMED
7. No mock data ............................ CONFIRMED
8. Not pushed ............................... CONFIRMED

Blocking Issues:
None.

PHASE 5 FINAL STATUS: PASS.
```

Still nothing built. Awaiting the advisor's explicit go-ahead before
creating the `candidate-private` bucket or writing any upload code.
