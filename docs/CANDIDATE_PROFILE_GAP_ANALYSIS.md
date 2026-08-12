# CertCoach — Candidate Profile: Gap Analysis vs. the 63-point PHASE 5 spec

Purpose: an honest point-by-point comparison of what's actually built
against the advisor's Aug 12 2026 detailed executive document, so
nothing is assumed done that isn't, and nothing already done gets
rebuilt from scratch.

Legend: ✅ DONE · 🟡 PARTIAL · ❌ NOT DONE · ⏸ CORRECTLY DEFERRED (a
later phase, per the advisor's own earlier phase order)

---

## 1-21. Foundations (architecture, data rules, migration, storage, security, RBAC, audit)

| # | Requirement | Status |
|---|---|---|
| 1 | Real production page, not a static mockup | ✅ Admin-side is fully real (DB + API + Storage). Public-facing version is ⏸ PHASE 7. |
| 2 | Every UI element has a real data source, nothing hardcoded | ✅ Confirmed — no hardcoded name/skills/stats anywhere in candidate-profile-preview or karriere-dokumente. |
| 3 | Reference image is a design target, not data to copy | ✅ Screenshot values never entered as real content. |
| 4 | Architecture: UI → API → Auth → Postgres+Storage split | ✅ Exactly this shape throughout. |
| 5 | Don't touch/duplicate migration 034, no second RBAC/audit system | ✅ 034 untouched; 035 and 036 are separate additive files, reviewed individually. |
| 6 | Single `candidate-private` bucket, private | ✅ Live (migration 035). |
| 7 | UUID-based storage path, no candidate name in path | ✅ `candidate/{candidateId}/documents/{documentId}/{uuid}.ext` |
| 8 | DB = metadata only, no file bytes | ✅ |
| 9-10 | Upload order (upload → verify → metadata → audit) + orphan cleanup | ✅ Implemented exactly this order, both directions (upload-then-DB and DB-then-old-file-cleanup for replace). |
| 11 | 20MB limit, client + server + bucket | 🟡 Server + bucket: ✅. Client-side pre-check before upload: ❌ (the admin form doesn't reject an oversized file before sending — the server correctly rejects it, but the round trip isn't avoided). |
| 12 | MIME + extension + real file signature check | ✅ `lib/candidate/fileValidation.ts` |
| 13 | Rename changes display name only, never document_id | ✅ |
| 14-15 | Two-step delete (soft, then separate Storage cleanup) + restore | ✅ `storage_deleted_at` distinction, restore refuses once permanently gone. |
| 16 | Replace = upload new → verify → update → delete old (never reverse) | ✅ |
| 17-18 | Visibility never means public Storage; signed URLs only, 5-10 min | ✅ (admin view/download endpoint is 10 min; recruiter-facing signed URLs are ⏸ PHASE 8, not built) |
| 19 | IDOR: share_link_id/document_id must be verified to actually match | ⏸ PHASE 7/8 — no share-link-facing endpoint exists yet, so there's nothing to IDOR-test yet. Admin endpoints only check RBAC, not per-candidate ownership (moot today, single-candidate system). |
| 20 | Reuse admin_users/requireAdmin/requirePermission, no new RBAC | ✅ |
| 21 | Reuse audit_logs/logAudit(), no new audit table/table | ✅ All 21+ event types listed are implemented and firing. |

## 22-39. The page itself, section by section

| # | Section | Status |
|---|---|---|
| 22 | Component breakdown matching the reference | 🟡 Built as one page with inline sections, not as the named component tree (ProfileHeader, CandidateSidebar, etc. as separate files) — functionally equivalent, structurally different. Not a blocker, but noted since the spec asked for it explicitly. |
| 23 | Dynamic header (privacy mode, share status, created date) | 🟡 Header shows created date and a static privacy notice; "share status" doesn't exist yet since share_links aren't built (⏸ PHASE 7). |
| 24 | Photo via signed URL, not a permanent URL | ✅ |
| 25-27 | Real computed Erfahrung/Projekte/Technologien, no fake numbers | ✅ |
| 28 | Availability from `candidate_profiles.availability` | ✅ |
| 29 | Positions from real data, not hardcoded | ✅ (migration 036, `desired_positions` — drafted, **not yet executed**) |
| 30 | Skills UI grouped by category, real data | ✅ |
| 31 | Certification fields: id/name/issuer/issue_date/expiry_date/credential_id/verification_url/document_id/**logo**/**status** | 🟡 Everything except **logo** and **status** exists. Those two fields aren't in the schema — flagged below as a real gap, not silently skipped. |
| 32 | Certificate logo: real asset or professional placeholder, never fake | ❌ Not built at all — current cards show no logo/icon. |
| 33-35 | Add/Edit/Delete/**Replace**/**Hide**/**Show**/**Reorder** for skills, certifications, experience, projects | 🟡 Add + Delete: ✅ for all four. **Edit** (updating an existing entry's fields): ❌ — current UI only supports add/remove, not editing in place. **Replace**: N/A for these (no file attached to skills/experience the way documents have). **Hide/Show** (the `is_public` toggle): ❌ — the API supports it, but no UI control exists to flip it. **Reorder** (`sort_order`): ❌ — column exists, no UI. |
| 36 | Documents: add/rename/delete/replace/restore/visibility, no developer needed | ✅ Fully built and owner-tested (upload, rename, replace, soft-delete, restore, permanent-delete, visibility toggle all confirmed working). |
| 37 | Confidential documents: real access-code flow | ⏸ PHASE 8, not built — correctly still shows only a count + honest "not yet active" notice, never a fake unlock button. |
| 38 | Public documents section, dynamic | ✅ |
| 39 | Top Technologies with real (not fake) percentages | ❌ Correctly **omitted** rather than faked — no proficiency-percentage field exists in the schema. Matches the spec's own instruction ("don't fake it") exactly, but it does mean this section of the reference design isn't reproduced. |

## 40-45. Design system, typography, spacing, responsive, accessibility

| # | Requirement | Status |
|---|---|---|
| 40 | Exact design tokens as centralized variables | 🟡 **Real mismatch found**: this message's color hex values are slightly different from the ones used (e.g. background `#020B14` here vs `#020817` currently used, primary `#EF233C` vs `#EF1B2D`, blue `#2EA3FF` vs `#1683FF`, etc. — this document appears to be a refined palette). Colors are also inline constants in the page file, not centralized design tokens shared across components. **Needs an update pass.** |
| 41 | Typography scale | ❌ Not formalized as a scale — current text sizes are ad hoc Tailwind classes, not mapped to the specified H1/H2/H3/Body/Small sizes. |
| 42 | Border radius tokens | 🟡 Roughly matches (cards ~12px via `rounded-xl`/`rounded-2xl`) but not as named tokens. |
| 43 | 4/8/12/16/20/24/32/40/48 spacing scale only | 🟡 Mostly consistent (Tailwind's default scale aligns closely) but not verified line-by-line. |
| 44 | Responsive: desktop 2-column, tablet collapsible, mobile stacked | 🟡 Desktop/mobile breakpoint exists (`lg:grid-cols-[300px_1fr]`) and stacks correctly on mobile. Tablet-specific "collapsible sidebar" behavior: ❌ not built — it just stacks at the same breakpoint as mobile. |
| 45 | WCAG 2.2 AA (keyboard nav, focus states, labels, contrast, screen-reader semantics) | ❌ Not audited or built for. Real gap. |

## 46-51. Loading/error/empty states, edit-mode separation, optimistic-UI ban

| # | Requirement | Status |
|---|---|---|
| 46 | Per-section skeletons | 🟡 A single page-level loading spinner exists; no per-section skeleton components (ProfileSkeleton, SkillsSkeleton, etc.) |
| 47 | Real error messages, never `undefined`/raw stack traces | ✅ Every fetch has a caught, human-readable German error message. |
| 48 | Empty states with real copy + admin "add" affordance | ✅ ("Noch keine Zertifizierungen hinzugefügt.", etc., with the add form always visible above the list) |
| 49 | Separate public view route vs. admin edit route | 🟡 Admin edit (`karriere-dokumente`) and admin-only preview (`candidate-profile-preview`) are separate pages, but the *real* public route (token-gated, no admin login) doesn't exist yet — ⏸ PHASE 7. |
| 50 | Admin never needs code/DB access for a routine content change | ✅ True for everything currently built (profile, skills, certs, experience, projects, documents). |
| 51 | No optimistic UI for delete/replace/upload — wait for backend success first | ✅ Every destructive/upload action already waits for the API response before refreshing the UI. |

## 52-63. API surface, security testing, storage testing, audit testing, performance

| # | Requirement | Status |
|---|---|---|
| 52 | Full REST surface per resource, including document sub-actions | 🟡 Functionally complete but under different paths (`/api/admin/candidate/...` instead of `/api/candidates/[id]/...`) — reasonable given this is a single-candidate system with a fixed admin permission gate rather than a per-candidate-id public API, but noted as a structural difference from what this message specifies. |
| 53 | Auth → admin → permission → ownership → object-auth → validation → DB/Storage → audit, in that order | 🟡 Auth → permission → validation → DB/Storage → audit: ✅. "Candidate ownership" and "object authorization" steps are moot today (single candidate, no share links yet) — will matter starting PHASE 7. |
| 54 | Service role key never reaches the browser | ✅ Always server-side only, matching this project's convention everywhere. |
| 55 | Don't break existing RLS | ✅ Confirmed in every PHASE 1-5 review. |
| 56-59 | Real hands-on tests: profile/skill/cert/experience/project/document CRUD, security (IDOR), Storage, audit | 🟡 Document upload/view/download/replace/soft-delete/restore/permanent-delete: owner-tested, confirmed working. Skill/certification/experience/project add+delete: built, **not yet owner-tested**. Edit/hide-show/reorder for those four: not built yet (see #33-35), so can't be tested. IDOR/security tests: ⏸ nothing to test yet (PHASE 7/8 surface doesn't exist). Audit: events fire correctly (code-reviewed), not independently verified against a live `audit_logs` query. |
| 60-61 | No bulk file download on page load, metadata first | ✅ The combined profile GET never fetches file bytes; documents only get a signed URL on explicit view/download. |
| 62 | One parallel server-side query per page load, not one per component | ✅ `Promise.all` in the combined GET, unchanged since PHASE 2. |
| 63 | Mock data only in isolated dev tools, never production | ✅ Confirmed zero mock data anywhere in this feature. |

---

## Summary: real, concrete gaps to close (not just "phase not started yet")

These are the items that are genuinely missing right now, as opposed
to correctly deferred to PHASE 7/8:

1. **Edit-in-place for skills/certifications/experience/projects** — only add/remove exist.
2. **Hide/Show (`is_public`) toggle in the UI** for those same four resources — the API already supports it.
3. **Reorder (`sort_order`)** — no drag/reorder UI for any of the four.
4. **Certificate logo** — no field, no UI, no placeholder system.
5. **Certificate `status`** field (e.g. active/expired) — not in the schema.
6. **Design tokens refined this message** (background/primary/blue/etc. hex values changed) — not yet applied; current page uses the earlier palette.
7. **Typography scale** — not formalized.
8. **Tablet-specific responsive behavior** — currently mobile and tablet share the same stacked layout.
9. **Accessibility (WCAG 2.2 AA)** — not addressed at all yet.
10. **Per-section skeleton loading states** — only one page-level spinner exists.
11. **Client-side file-size pre-check** on upload (server already enforces it correctly).
12. Migration 036 (`desired_positions`) is drafted but **not yet executed** in production.

Everything else in the 63-point document is either already done, or
correctly still waiting on PHASE 7 (share links) / PHASE 8
(confidential-document access codes), which this document itself
didn't ask to start yet.
