# CertCoach — Private Candidate Profile: PHASE 4 Report

Database/Migration Final Validation & Approval readiness check, per
the advisor's Aug 12 2026 directive. **Still nothing executed, still
nothing pushed.**

---

## Correction found and fixed during this pass

`034_candidate_profile.sql` and `CANDIDATE_PROFILE_PHASE2_REVIEW.md`
both said "9 tables" in several places. Recounted directly against
the file (`grep -c "^create table if not exists"`): **10 tables**,
not 9. The table-name list itself was always complete and correct in
both files — only the summary count was wrong. Fixed in both files
this pass (`9` -> `10` everywhere it appeared). Exactly the kind of
small drift a final validation pass exists to catch before approval,
not a structural problem.

## Final table list (confirmed, 10 total)

1. `candidate_profiles`
2. `candidate_skills`
3. `candidate_certifications`
4. `candidate_experiences`
5. `candidate_projects`
6. `candidate_documents`
7. `share_links`
8. `share_link_documents`
9. `document_access_codes`
10. `document_access_grants`

## Coverage check against the advisor's required entity list

> "Profile + Skills + Certifications + Experience + Projects +
> Documents + Share Links + Access Codes + Grants"

| Required | Table(s) | Covered |
|---|---|---|
| Profile | `candidate_profiles` | ✅ |
| Skills | `candidate_skills` | ✅ |
| Certifications | `candidate_certifications` | ✅ |
| Experience | `candidate_experiences` | ✅ |
| Projects | `candidate_projects` | ✅ |
| Documents | `candidate_documents` | ✅ (metadata only, per the standing "no file content in Postgres" rule) |
| Share Links | `share_links` + `share_link_documents` (per-link document permissions) | ✅ |
| Access Codes | `document_access_codes` | ✅ |
| Grants | `document_access_grants` | ✅ |

Every entity the advisor named has a table. Nothing named is missing;
nothing extra was added beyond what's named (the `candidate_access_logs`
table from the original draft stays removed, per the PHASE 1
decision — access logging still goes through the existing
`audit_logs`).

## Full-editability requirement (from the Aug 12 2026 addendum) — schema check

Re-verified against the actual columns, not just the earlier summary
table in the PHASE 3 addendum:

- `candidate_skills`, `candidate_certifications`,
  `candidate_experiences`, `candidate_projects`: each has its own
  `id`, all business fields nullable-or-not exactly as needed for a
  partial edit, `sort_order` (admin-controlled display order),
  `is_public` (show/hide without deleting), `created_at`/`updated_at`.
  Nothing about the schema blocks add/edit/remove for any of these —
  confirmed, not just assumed.
- `candidate_documents`: `title` (renameable), `visibility`
  (public/private toggle), `allow_download`, `storage_path` (changes
  on replace — a "replace file" operation is an `UPDATE` of
  `storage_path`/`file_name`/`mime_type`/`file_size_bytes` after a new
  Storage upload, not a schema-level operation), `deleted_at`
  (soft-delete for remove). Confirmed the schema already supports
  every operation the addendum listed (add, rename, visibility
  toggle, replace, delete) — no schema change needed when PHASE 5
  builds the actual upload/replace/delete API.
- `candidate_profiles`: every field the admin UI would edit is a
  plain nullable-or-required column, no field is locked at the schema
  level — the "profile fields fully editable" requirement was already
  satisfied, reconfirmed here.

**No schema change required by the full-editability addendum.** It
was a specification clarification, not new scope — confirmed, not
just asserted.

## Risk re-check (final pass before approval)

- **Fully additive:** confirmed again — zero `alter table` on any
  pre-existing CertCoach table (only new tables and their own
  internal deferred-FK additions, e.g. `candidate_certifications`'s
  two FKs to `candidate_documents`, added within this same migration
  file after that table is created).
- **No path from existing code to these tables:** re-confirmed —
  grep across `app/` for any of the 10 table names outside
  `app/api/admin/candidate/*` and this migration file returns
  nothing. Nothing currently running in production can be affected by
  running this migration.
- **Rollback:** unchanged from PHASE 2 — drop the 10 tables, nothing
  else references them.
- **RLS / RBAC / audit:** unchanged from PHASE 2/3 — all 10 tables
  RLS-enabled with zero public policies (service-role only), gated by
  the existing `candidate_profile.manage` permission, every admin
  write already audited (PHASE 3's fix).
- **Storage boundary:** unchanged — `candidate_documents` still holds
  no file content, no bucket exists, nothing in this migration creates
  one.

## PHASE 4 — FINAL VALIDATION

```
Entity coverage (Profile/Skills/Certifications/Experience/
  Projects/Documents/Share Links/Access Codes/Grants) ... PASS
Full-editability schema support ......................... PASS
Table count / naming accuracy ........................... PASS (corrected: 10, not 9)
Additive-only / no existing table touched ............... PASS
No reachable path from current production code .......... PASS
RLS / RBAC / Audit integration .......................... PASS (unchanged from PHASE 2/3)
Rollback plan ............................................ PASS (unchanged from PHASE 2)
Storage boundary .......................................... PASS (still nothing created)

Blocking Issues:
None.

Corrections made this phase:
Table-count documentation error (9 -> 10) fixed in
034_candidate_profile.sql and CANDIDATE_PROFILE_PHASE2_REVIEW.md.
No structural/schema change.

Production Changes:
NONE.
```

**PHASE 4 FINAL STATUS: PASS.**

Migration `034_candidate_profile.sql` is now validated end-to-end
across four review passes (PHASE 1 audit, PHASE 2 line-by-line
review, PHASE 3 architecture consistency, PHASE 4 final validation)
and is ready to run **only once the advisor gives explicit execution
approval** — still not run, still not pushed, per the standing rule
that has held for every migration in this project.
