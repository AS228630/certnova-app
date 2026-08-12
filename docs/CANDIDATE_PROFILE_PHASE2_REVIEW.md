# CertCoach — Private Candidate Profile: PHASE 2 Review Report

Status: review complete, migration still **NOT executed, NOT pushed**.
Companion file: `supabase/migrations/034_candidate_profile.sql`
(9 tables, marked "NOT APPROVED, NOT APPLIED" — unchanged this phase
except two fixes described in §4 and §5 below).

This report walks the advisor's exact 12-point PHASE 2 checklist.

---

## 1. Review existing Production schema

Re-confirmed (same method as PHASE 1): no table named
`candidate_*`, `share_link*`, `document_access_*`, or `recruiter*`
exists anywhere in `supabase/migrations/001-033`. The tables this
migration proposes are genuinely new. Existing tables it references
by foreign key — `auth.users` (indirectly, see §7) — are read-only
dependencies, never altered.

## 2. Review Migration 034 draft

Read line-by-line in full. Two real issues found and fixed during
this review (detailed in §4 and §5) — everything else held up.

## 3. Verify every foreign key

| Column | References | On delete | Justification |
|---|---|---|---|
| `candidate_skills.candidate_id` | `candidate_profiles(id)` | CASCADE | a skill has no meaning without its profile |
| `candidate_certifications.candidate_id` | `candidate_profiles(id)` | CASCADE | same |
| `candidate_certifications.certificate_file_id` / `.badge_file_id` | `candidate_documents(id)` | *(default: RESTRICT)* | intentional — blocks hard-deleting a document that a certification still references, rather than silently orphaning the reference. Documents are normally soft-deleted (`deleted_at`), so this only ever fires as a safety net during the later Storage-garbage-collection step |
| `candidate_experiences.candidate_id` | `candidate_profiles(id)` | CASCADE | same reasoning as skills |
| `candidate_projects.candidate_id` | `candidate_profiles(id)` | CASCADE | same |
| `candidate_documents.candidate_id` | `candidate_profiles(id)` | CASCADE | same |
| `share_links.candidate_id` | `candidate_profiles(id)` | CASCADE | a share link has no meaning without a candidate |
| `share_link_documents.share_link_id` | `share_links(id)` | CASCADE | permission row is meaningless once the link is gone |
| `share_link_documents.document_id` | `candidate_documents(id)` | CASCADE | same, from the document side |
| `document_access_codes.share_link_id` | `share_links(id)` | CASCADE | one code belongs to exactly one link |
| `document_access_grants.share_link_id` / `.document_id` | `share_links(id)` / `candidate_documents(id)` | CASCADE | a grant is meaningless once either side is gone |

All 12 foreign keys checked. Every one has a deliberate, justified
`ON DELETE` behavior — none left to an accidental default without
reasoning.

## 4. Verify indexes

**Issue found and fixed:** `share_links` had a redundant explicit
index on `token_hash` — Postgres already creates an index
automatically for any `UNIQUE` constraint, so the explicit
`create index ... share_links_token_hash_idx` was a pure duplicate:
extra write overhead on every insert/update, zero query benefit.
Removed during this review.

Final index list, each tied to a real, expected access pattern:

| Index | Access pattern it serves |
|---|---|
| `candidate_skills(candidate_id)`, same for certifications/experiences/projects/documents | "load everything for this candidate" — the combined profile GET (spec section 60's "one optimized request") |
| `candidate_documents(visibility) where deleted_at is null` | listing public vs. private documents, partial index skips soft-deleted rows for free |
| `share_links(candidate_id)` | admin's "all my share links" list |
| `share_links.token_hash` (via the UNIQUE constraint, no separate index) | the actual per-request lookup: verifying a recruiter's token |
| `document_access_codes(share_link_id)` | code-verification flow: "the code for this link" |
| `document_access_grants(share_link_id)` | "what is this recruiter session allowed to see" |

Not indexed, deliberately: `share_link_documents` and
`document_access_grants` by `document_id` alone (e.g. "which links
can see document X"). At this project's scale (one candidate, a
handful of documents, a handful of share links) a full scan of a
few rows is free — adding a speculative index for a query pattern
that doesn't exist yet would violate this project's own Free-Tier
discipline (documented in `REFERRAL_COMMISSION_MIGRATION_PLAN.md`
section 7: don't add indexes for scale that doesn't exist).

## 5. Verify UNIQUE constraints

- `share_links.token_hash unique` — the one security-critical
  uniqueness in this schema: two links must never hash to the same
  value, and a token lookup must resolve to exactly one link.
  Confirmed present and correct.
- **Gap found, accepted (not fixed at the DB level):**
  `candidate_profiles` has no constraint preventing a second row.
  This is a single-candidate system by design, but the database
  itself doesn't enforce "exactly one row" — that's currently only
  guaranteed by the application layer (`app/api/admin/candidate/profile`'s
  PUT handler always checks for an existing row and updates it
  instead of inserting a second one). Risk is low: only
  `candidate_profile.manage` (SUPER_ADMIN/ADMIN) can write to this
  table at all, and a second row wouldn't corrupt anything
  automatically (every child table's queries always filter by a
  specific `candidate_id`, not "the profile"). Flagged here
  transparently rather than silently accepted — the advisor's call
  whether this needs a DB-level guard (e.g. a generated boolean
  column with a unique partial index) before approval, or whether
  the application-layer guarantee is sufficient for v1.

## 6. Verify RLS / authorization implications

All 9 tables: `enable row level security`, zero policies defined.
Confirmed this means the `authenticated` and `anon` Postgres roles
get **zero** access to any of these tables under any circumstance —
only the service-role key (used exclusively server-side, inside
Next.js API routes) can read or write them. This is the exact same
pattern already used for every other admin-sensitive table in this
project (`teacher_coupons`, `teachers`, `referrals`,
`commission_ledger`, `admin_users`, `payouts`) — no new authorization
model introduced, no gap found.

## 7. Verify candidate ↔ authenticated user relationship

**This needs an explicit design decision recorded, not just a
schema check.** `candidate_profiles` has no `user_id` column linking
it to `auth.users`, unlike `teachers.user_id` in the referral system.

This is deliberate, not an oversight: this is **not** a self-service
login system. There is no "candidate logs in and edits their own
profile" flow, the way a teacher logs into `/portal`. The candidate
*is* the project owner, who already manages this entire system
through the existing `admin_users` / `requireAdmin` /
`requirePermission('candidate_profile.manage')` RBAC — the same
account that manages teachers, payouts, and everything else. Adding
a `candidate_profiles.user_id` would model a relationship that
doesn't exist in this system (a candidate as a distinct authenticated
actor separate from the admin). If this project ever needs
multi-candidate support (several people's professional profiles
managed independently), that would be a real schema change at that
time, not something to speculatively build now.

## 8. Verify document ownership model

Every `candidate_documents` row belongs to exactly one
`candidate_id`. Since this is a single-candidate system, ownership
in practice means "belongs to the one candidate row" — but the
column exists and is enforced (`not null`, foreign key) so nothing
about the schema itself assumes single-candidacy; only the
application's current usage does (per §7). No gap found.

## 9. Verify share-link security model

Confirmed present in the schema: hashed token only (§ handled in
migration, real hashing logic is application-layer, a later phase),
`expires_at`, `revoked_at`, `max_views`/`access_count` for view
limits, `require_access_code` toggle, `allow_download` toggle.

**What the schema does NOT and cannot enforce by itself** (correctly
left to the application layer, per the advisor's own architecture —
sections 52-55 of the original spec): actually checking
`expires_at`/`revoked_at`/`max_views` on every request, and the IDOR
protection required by spec section 66 (Company A must never reach
Company B's documents by editing a URL/id) — that check is
"does this specific `document_access_grants` row exist for THIS
share_link_id AND THIS document_id", which only the verification API
route (not yet built — PHASE 7/8 per the advisor's order) can
enforce. Noted here so it isn't forgotten when that phase starts,
not something this migration itself needs to change.

## 10. Verify access-code model

Confirmed: **one access code per share link**, not one per document
— matches the spec's own description (section 19-20: a single code
unlocks the "Confidential Documents" section as a whole for that
recruiter, not a separate code per file). `failed_attempts` +
`locked_until` columns exist for the brute-force protection spec
section 49 requires; the actual rate-limiting logic is, again,
application-layer (a later phase) — the schema just gives it
somewhere to persist state across requests.

## 11. Verify audit_logs integration

Checked the actual existing `audit_logs` schema (migration 032):
`actor_id uuid references auth.users(id)` (nullable),
`actor_email text` (nullable), `action text not null` (no CHECK
constraint), `resource_type text`, `resource_id text`,
`metadata jsonb`, `created_at`.

This already fully supports every candidate-portal event type without
any schema change:
- `actor_id`/`actor_email` stay `null` for anonymous recruiter-
  triggered events (`PROFILE_VIEWED`, `DOCUMENT_VIEWED`,
  `ACCESS_CODE_FAILED`, etc.) — no recruiter is ever a real
  `auth.users` row, so this is the correct representation, not a
  workaround. `logAudit()`'s `actorId` parameter is already typed
  `string | null` (changed for exactly this kind of system-triggered
  event, when the Refund→Reversal webhook handler needed it in an
  earlier phase) — no code change needed there either.
- `metadata jsonb` carries context instead (`company_name`,
  `share_link_id`, etc.) — never the raw token or raw access code,
  per spec section 32, mirroring the same discipline already used for
  `TEACHER_LOGIN_CREATED` (logs the email, never the password).
- `resource_type`/`resource_id` map naturally to `'share_link'`/its id
  or `'candidate_document'`/its id.

No integration gap found — this was the single cleanest part of the
whole review, specifically because PHASE 1 caught the duplicate-table
problem before it was built.

## 12. Final Migration Plan

**Why this migration is safe:**
- 100% additive — 9 new tables, zero existing tables altered, zero
  existing columns touched.
- No second database, no duplicated entity (confirmed twice now,
  PHASE 1 and PHASE 2).
- No second RBAC system, no second audit-log system — both explicitly
  reuse existing, already-approved infrastructure.
- Every table follows this project's established RLS pattern
  (enabled, zero public policies, service-role-only access) — the
  exact same authorization model already running in production for
  six other sensitive tables.
- Every foreign key has a deliberate `ON DELETE` behavior (§3).
- The one security-critical constraint (`share_links.token_hash
  unique`) is present and correct.
- Rollback, if ever needed: drop the 9 new tables — nothing else in
  the database references them (this migration is a pure leaf
  addition), so nothing else breaks.

**What creates zero risk to current CertCoach data:** nothing in this
migration can be reached by any existing code path — no existing API
route, page, or webhook references any of these 9 tables. Running it
changes nothing about how the site currently behaves for students,
teachers, or admins until new application code (a later phase)
starts using it.

**What's intentionally NOT covered by this migration** (unchanged
from PHASE 1, restated for completeness): Storage buckets, signed-URL
/ access-grant verification logic, admin UI, recruiter-facing UI,
rate-limiting/hashing implementation details, and the
`candidate_profiles` single-row guarantee question raised in §5.

**Two changes made during this review**, both already applied to the
draft file: removed the redundant `token_hash` index (§4), and this
report itself, documenting the `user_id` design decision (§7) that
wasn't written down before.

---

**Still not executed. Still not pushed.** Waiting for the senior
architect's PHASE 2 verdict — specifically including a decision on
the `candidate_profiles` single-row question (§5) — before PHASE 3.
