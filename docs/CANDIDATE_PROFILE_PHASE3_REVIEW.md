# CertCoach — Private Candidate Profile: PHASE 3 Report

Status: review + local-only fixes complete. **Still nothing executed
against production, still nothing pushed.**

---

## 1. Existing APIs — Review

Reviewed all 9 draft admin routes
(`app/api/admin/candidate/{profile,skills,certifications,experiences,projects}`)
against the finalized architecture (post PHASE 1/2 corrections).

**Finding (real incompatibility, fixed locally this phase):** none of
the 9 routes called `logAudit()` — a direct conflict with the
"reuse the existing `audit_logs` system" requirement that's been the
architecture since PHASE 1. This wasn't a hypothetical gap; it's
exactly the kind of drift PHASE 3's "review, don't assume" step
exists to catch.

**Fix applied (local only):** every write path (`POST`/`PATCH`/`DELETE`
on all 5 resources, `PUT` on the profile) now calls `logAudit()` with
a specific action per resource and operation:
`PROFILE_UPDATED`; `CANDIDATE_SKILL_ADDED/UPDATED/REMOVED`;
`CANDIDATE_CERTIFICATION_ADDED/UPDATED/REMOVED`;
`CANDIDATE_EXPERIENCE_ADDED/UPDATED/REMOVED`;
`CANDIDATE_PROJECT_ADDED/UPDATED/REMOVED`. This goes beyond the
advisor's explicit minimum event list (which only named
`PROFILE_UPDATED` for this category) — matching the granularity
already used elsewhere in this project (e.g.
`INSTRUCTOR_CODE_CREATED/UPDATED/DISABLED`), on the reasoning that
more real audit coverage of admin mutations is strictly better than
less, never a duplication of a system.

Everything else about the 9 routes held up on review:
- All gated by `requirePermission(..., 'candidate_profile.manage')` —
  the existing RBAC, no second system.
- All use `getSupabaseAdmin()` (service-role key), consistent with
  the zero-public-RLS-policy pattern in migration 034.
- None reference the removed `candidate_access_logs` table or the
  reverted `candidate_profiles` singleton index — both PHASE 1/2
  corrections were already consistent here, nothing to fix.

**1. Existing APIs: PASS** (after the local audit-logging fix above).

## 2. Admin UI Architecture (design only — nothing built this phase)

Mirrors the existing `/admin-senmas` pattern exactly (same
`AdminShell`/`requirePermission`-gated nav-item convention already
used for Team & Rollen, Audit Logs, Auszahlungen):

```
/admin-senmas/candidate-profile               -> Profile (form: display_name,
                                                 title, bio, location,
                                                 availability, links)
/admin-senmas/candidate-profile/skills        -> list + add/edit/remove,
                                                  grouped by category
/admin-senmas/candidate-profile/certifications-> list + add/edit/remove
/admin-senmas/candidate-profile/experience    -> list + add/edit/remove
/admin-senmas/candidate-profile/projects      -> list + add/edit/remove
/admin-senmas/candidate-profile/documents     -> upload + visibility toggle
                                                  + list (PHASE 5, blocked
                                                  on Storage)
/admin-senmas/candidate-profile/share-links   -> create/revoke per-company
                                                  links (PHASE 7, blocked
                                                  on share-link API)
/admin-senmas/candidate-profile/access-logs   -> read view over the
                                                  EXISTING audit_logs
                                                  table, filtered to
                                                  candidate-portal event
                                                  types -- not a new page
                                                  backed by a new table
```

Nav entry: one new sidebar item under a `CANDIDATE PROFILE` section in
`lib/admin/navItems.ts` (pattern-only, not added this phase — no UI
code exists yet, this is architecture, not implementation, per the
advisor's explicit "design, don't build" instruction for PHASE 3).

Every page in this design reads from the real APIs listed in §4 below
— no page reads from mock/sample data at any point, including loading
states (skeleton, not fake numbers — same discipline already used
everywhere else in `/admin-senmas`).

**2. Admin UI Architecture: PASS** (design only, matches existing
project conventions, nothing to build yet).

## 3. Security Flow

**Admin-side (profile, skills, certifications, experience, projects,
documents, share-link management) — already fully implemented, not
just designed:**

```
Request -> Bearer token -> requirePermission(token, 'candidate_profile.manage')
        -> resolves role via admin_users (existing RBAC, migration 031)
        -> 403 if role isn't SUPER_ADMIN/ADMIN
        -> getSupabaseAdmin() (service-role key, bypasses RLS by design)
        -> the specific candidate_* table, filtered/written as needed
        -> logAudit() on every write (see section 1)
```

**Recruiter-side (viewing a share link, unlocking confidential docs)
— design only, no code yet, correctly deferred to PHASE 7/8:**

```
GET /candidate/:token (public-facing page, not yet built)
        -> raw token from URL -> SHA-256 -> look up share_links.token_hash
        -> check revoked_at IS NULL, expires_at > now(),
           max_views IS NULL OR access_count < max_views
        -> if valid: increment access_count, update last_accessed_at,
           log PROFILE_VIEWED (actor_id/actor_email null -- anonymous
           recruiter, per the PHASE 2 audit_logs review)
        -> render public profile sections + locked "Confidential
           Documents" section (no document content served yet)

POST /candidate/:token/access-code (not yet built)
        -> verify code against document_access_codes.code_hash
           (Argon2id/bcrypt, application layer -- not written yet)
        -> check failed_attempts < 5, locked_until IS NULL OR < now()
        -> on success: create document_access_grant rows for every
           document in share_link_documents for this link, log
           ACCESS_CODE_SUCCESS
        -> on failure: increment failed_attempts, set locked_until
           after 5 failures, log ACCESS_CODE_FAILED (never logs the
           submitted code itself, per spec section 32)

GET /candidate/:token/documents/:documentId (not yet built)
        -> verify an unrevoked, unexpired document_access_grant exists
           for THIS share_link_id AND THIS document_id specifically
           (the IDOR check spec section 66 requires) -> 403 if not
        -> generate a short-lived (5-10 min) signed URL from Storage
           (PHASE 5, doesn't exist yet)
        -> log DOCUMENT_VIEWED / DOCUMENT_DOWNLOADED
```

**3. Security Flow: PASS** (admin side fully implemented and
consistent; recruiter side is a complete, reviewed design with no
gaps identified, correctly not implemented yet since it depends on
Storage/PHASE 5).

## 4. API Contract (final, for what exists; draft, for what's designed)

### Existing (implemented, gated, audited — this phase's fix included)

| Endpoint | Method | Permission | Key validation | Success | Errors |
|---|---|---|---|---|---|
| `/api/admin/candidate/profile` | GET | `candidate_profile.manage` | — | profile + all sections, or all-empty if no profile yet | 503 if migration not installed |
| `/api/admin/candidate/profile` | PUT | `candidate_profile.manage` | `displayName` required | profile object | 400 missing name |
| `/api/admin/candidate/skills` | POST | `candidate_profile.manage` | `candidateId`, `category`, `name` required | skill, 201 | 400 missing fields |
| `/api/admin/candidate/skills/:id` | PATCH / DELETE | `candidate_profile.manage` | — | skill / deleted:true | 500 on DB error |
| `/api/admin/candidate/certifications[/:id]` | POST / PATCH / DELETE | `candidate_profile.manage` | `candidateId`, `issuer`, `name` required on create | same shape as skills | same |
| `/api/admin/candidate/experiences[/:id]` | POST / PATCH / DELETE | `candidate_profile.manage` | `candidateId`, `roleTitle`, `companyName` required on create | same shape | same |
| `/api/admin/candidate/projects[/:id]` | POST / PATCH / DELETE | `candidate_profile.manage` | `candidateId`, `title` required on create | same shape | same |

Every write endpoint above: audit event per §1, never a raw error
leaking DB internals beyond the message text already used
consistently elsewhere in this codebase (matches existing convention,
not a new information-disclosure risk).

### Designed, not implemented (PHASE 5/7/8 — listed so nothing is
### forgotten, not to pre-approve building them now)

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/admin/candidate/documents` | POST (upload) | `candidate_profile.manage` | PHASE 5 — requires Storage bucket first |
| `/api/admin/candidate/documents/:id` | PATCH (visibility/allow_download) / DELETE (soft) | `candidate_profile.manage` | PHASE 5 |
| `/api/admin/share-links` | GET / POST / DELETE / `:id/revoke` | `candidate_profile.manage` | PHASE 7 |
| `/api/candidate/:token/profile` | GET | none (token-based) | PHASE 7, public-facing |
| `/api/candidate/:token/access-code` | POST | none (token + code) | PHASE 8 |
| `/api/candidate/:token/documents/:id` | GET | none (token + grant check) | PHASE 8, signed URL, PHASE 5 dependency |

**4. API Contracts: PASS** (existing ones are complete and consistent;
future ones are specified at the level PHASE 3 calls for — method,
auth, validation, notes — without being built).

## 5. Audit Log Integration

Confirmed (again, consistent with the PHASE 2 finding): zero schema
changes needed. `audit_logs.action` has no `CHECK` constraint, so
every event name below is just a string value, same table, same
`logAudit()` helper.

**Advisor's required minimum list — all accounted for:**
- `PROFILE_UPDATED` — implemented this phase (§1).
- `DOCUMENT_UPLOADED` / `DOCUMENT_VIEWED` / `DOCUMENT_DOWNLOADED` —
  designed in §3, implemented at PHASE 5/8.
- `SHARE_LINK_CREATED` / `SHARE_LINK_REVOKED` — designed in §3,
  implemented at PHASE 7.
- `ACCESS_CODE_SUCCESS` / `ACCESS_CODE_FAILED` — designed in §3,
  implemented at PHASE 8.

**Additional events implemented this phase** (beyond the advisor's
minimum list, for the skills/certifications/experience/projects CRUD
that minimum list didn't explicitly cover):
`CANDIDATE_SKILL_ADDED/UPDATED/REMOVED`,
`CANDIDATE_CERTIFICATION_ADDED/UPDATED/REMOVED`,
`CANDIDATE_EXPERIENCE_ADDED/UPDATED/REMOVED`,
`CANDIDATE_PROJECT_ADDED/UPDATED/REMOVED`.

**5. Audit Integration: PASS.**

## 6. Storage Boundary

Confirmed: no bucket, no upload code, no Storage policy, no signed-URL
logic exists anywhere in this phase's changes. The 9 routes touched
this phase only ever write to `candidate_skills` /
`candidate_certifications` / `candidate_experiences` /
`candidate_projects` / `candidate_profiles` — none of which store file
content, matching migration 034's metadata-only design.

**6. Storage Boundary: PASS.**

## 7. Migration Readiness

`034_candidate_profile.sql` reviewed again for architectural
consistency with everything decided since PHASE 2 (nothing changed
there this phase — no new tables, no new columns). Still marked
"NOT APPROVED, NOT APPLIED". No `supabase db push`, no SQL executed
against any database, local or production, this phase.

**7. Migration Readiness: PASS** (unchanged from PHASE 2, reconfirmed
current).

---

## PHASE 3 — APPLICATION ARCHITECTURE REVIEW

```
1. Existing APIs ........ PASS  (1 real fix applied: audit logging added to all 9 routes)
2. API Contracts ........ PASS
3. Admin UI Architecture   PASS
4. Authorization ........ PASS
5. Audit Integration .... PASS
6. Migration Readiness .. PASS
7. Storage Boundary ..... PASS

Blocking Issues:
None.

Required Changes:
Already applied (local only, not pushed): added logAudit() calls to
all 9 candidate-profile admin routes (section 1). No further changes
required before PHASE 4, pending the advisor's own review of this
report.

Production Changes:
NONE.
```

`tsc --noEmit`, `eslint`, and `npm run build` all pass with the
section 1 fixes applied. Nothing pushed to GitHub, nothing run
against Supabase.
