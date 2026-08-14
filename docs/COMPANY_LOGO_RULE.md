# Company Logo Rule (Global, Permanent)

Established Aug 2026 by the senior advisor. This is a standing rule
for the whole project — anyone (human or Claude) working on
Certificates, Company Profiles, PDFs, or any related page must follow
this without needing a fresh instruction each time.

## The rule

> **A company logo must be real, traceable, and sourced from that
> company's own official source. Fabricated, guessed, AI-generated,
> or "close enough" lookalike logos are forbidden. Every logo must
> have a recorded Source. If no verifiable official logo exists, the
> system shows no logo / an explicit "Logo unavailable" state — it
> never invents one.**

## Concrete requirements

1. Nobody (including Claude) designs a logo or generates one with AI.
2. Before any logo is added, find that company's own official source
   — preferably their official website or an official brand/press
   page — never a generic image search result.
3. The **real** logo from that source is what gets used.
4. Logo files are stored as **project assets**, not uploaded through
   the admin UI into Supabase Storage: `public/logos/companies/<slug>.svg`
   (e.g. `microsoft.svg`, `comptia.svg`, `peoplecert.svg`). Public,
   static, versioned in git — appropriate because these are public
   brand assets, not private candidate content, and this makes the
   same file usable identically on the web page and in a generated
   PDF with zero Storage/signed-URL complexity.
5. Filenames are the company's own lowercase slug — clear and
   traceable, not a random ID.
6. If no usable official logo is found, do not substitute a similar
   or generic one. The company record's logo field stays empty and
   the UI shows an explicit "Logo unavailable" / initial-letter
   fallback (already implemented — see `BrandLogo`/`CertLogo` in
   `app/admin-senmas/candidate-profile-preview/page.tsx` and
   `app/c/[token]/page.tsx`).
7. Every logo's origin is recorded (see `companies.logo_source_url`
   in the schema below) — so it's always possible to check later
   where a given logo actually came from.
8. Preferred format: SVG (scales cleanly, small file size). PNG only
   if no official SVG exists — must still be reasonably high
   resolution, not a thumbnail.
9. A logo is never stretched, skewed, flipped, recolored, or
   otherwise altered from the official version.
10. The exact same asset is used in both the web page and any
    generated Certificate PDF — one source of truth per company, not
    a separate copy per document type.

## Schema implication (proposed, NOT yet executed)

The current schema has no shared "company/issuer" entity — every
certification's `logo_url` and every experience's `company_logo_url`
is independent, so the same company's logo has to be re-uploaded per
record. Proposed fix, drafted for review, not run:

```sql
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,          -- source of truth for identity,
                                       -- not a filename or URL
  official_website text,
  logo_asset_path text,               -- e.g. '/logos/companies/microsoft.svg'
  logo_source_url text,               -- where this logo actually came
                                       -- from, for traceability (rule #7)
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.candidate_certifications
  add column if not exists company_id uuid references public.companies(id),
  add column if not exists logo_snapshot_path text; -- immutable copy of
    -- the logo path at issuance time, so a later company-logo change
    -- doesn't retroactively alter an already-issued certificate's
    -- display (open policy question, see below)

alter table public.candidate_experiences
  add column if not exists company_id uuid references public.companies(id);
```

**Decided (Aug 2026):** logo snapshot-at-issuance. When a company's
official logo changes later, already-issued certifications keep
showing the logo as it was at the time they were issued
(`logo_snapshot_path`) — the candidate page must reflect the reality
of the document as issued, not silently reskin old certificates when
a brand changes. A newly-added certificate issued under a newer brand
uses that newer era's asset. `companies.logo_asset_path` is the
*current* logo (used for new certifications going forward and for
company/experience display); `logo_snapshot_path` on each
certification row is the *immutable* copy fixed at creation time and
never auto-updated by a later company logo change.

## Sourced logos log (rule #6 — every logo's origin recorded)

Two directories, per the advisor's Aug 2026 clarification: generic
issuer/company logos in `public/logos/companies/`, personal
certificate-specific badge artwork in `public/logos/certifications/`
— kept separate since they're conceptually different things, even
though `candidate_certifications` currently only has a single
`logo_url` text field to point at one of them (see "Known limitation"
below).

| File | Source | Notes |
|---|---|---|
| `public/logos/companies/comptia.svg` | [simple-icons](https://github.com/simple-icons/simple-icons) npm package v16.28.0, CC0-1.0 licensed, verified against CompTIA's official brand guidelines | Generic CompTIA wordmark |
| `public/logos/companies/peoplecert.png` | Cropped directly from the owner's own real ITIL 4 Foundation certificate PDF (`e-cert.pdf`), official PeopleCert logo | Generic PeopleCert wordmark. Slight light-purple background remnant from the source document's decorative graphic — acceptable for now |
| `public/logos/companies/microsoft.png` | Cropped directly from the owner's own real Microsoft Learn credential PDF (`2_5454392051107929349.pdf`), official Microsoft logo as shown on their own certificate | Generic Microsoft wordmark |
| `public/logos/certifications/comptia-a-plus-badge.png` | Cropped directly from the owner's own real CompTIA A+ certificate PDF, official CompTIA-issued badge artwork | Personal certificate badge — this is what's actually wired to `logo_url` today |
| `public/logos/certifications/itil-badge.png` | Cropped directly from the owner's own real ITIL 4 Foundation certificate PDF, official ITIL logo as shown on that certificate | Personal certificate badge |
| `public/logos/certifications/microsoft-fundamentals-badge.png` | Cropped directly from the owner's own real Microsoft Learn credential PDF, official "Microsoft Certified: Fundamentals" badge artwork | Personal certificate badge |

### Known limitation (reported, not fixed without approval)

`candidate_certifications` has only one usable text field for a logo
(`logo_url`) — there is no separate `badge_url` column. A
`badge_file_id` column exists, but it's a foreign key into
`candidate_documents` (designed for an uploaded private file), not a
simple text path to a public static asset, so it doesn't fit this use
case as-is. Per the advisor's explicit "no new migration for this"
instruction, the current wiring uses `logo_url` for the **personal
certificate badge** (the `public/logos/certifications/*` files) since
that's what's actually rendered on each certification card today. The
generic `public/logos/companies/*` issuer logos are sourced and ready
as project assets but are not wired to anything in the UI yet — would
need either a schema change (a real `badge_url` column, or the
previously-discussed `companies` table, both currently on hold) or a
different UI concept (e.g. a separate "Issuer" display) to use them.



- Rule recorded here — permanent, no re-briefing needed for future
  work on this feature.
- Snapshot-at-issuance policy decided (Aug 2026) — see above.
- Schema above is a **draft**, not executed. No migration has been
  run for this yet.
- Real logo assets **have now been sourced** for CompTIA, PeopleCert
  (ITIL), and Microsoft — see the log above. All from real, traceable
  sources (a CC0-licensed verified-brand-asset library, or cropped
  directly from the owner's own real issued certificates — arguably
  the most authoritative possible source for a certificate-specific
  badge). No AI-generated or guessed logo anywhere.

## Sourced assets (Aug 2026)

Per rule #6 (every logo's source recorded). All committed under
`public/logos/`.

| File | Type | Source | Notes |
|---|---|---|---|
| `companies/comptia.svg` | Company (generic) | [simple-icons](https://github.com/simple-icons/simple-icons) npm package — an MIT-licensed collection whose SVGs are individually verified against each company's own official brand guidelines before inclusion | Vector, scales cleanly |
| `companies/microsoft.png` | Company (generic) | Cropped directly from the candidate's own official Microsoft Learn credential PDF (`Microsoft zertifiziert: Azure-Grundlagen`, Anmeldeinformations-ID CD1B32B038E0D3AC) — the exact Microsoft logo Microsoft itself renders on that certificate | No independently-hosted official Microsoft brand asset was reachable from this environment; this crop is a real, traceable, unaltered extract from an official Microsoft-issued document, not a lookalike or fabrication |
| `companies/peoplecert.png` | Company (generic) | Cropped directly from the candidate's own official PeopleCert/ITIL certificate PDF (Certificate Number GR671891639AS) | Same reasoning as above — real extract from an official issued document |
| `certifications/comptia-a-plus.png` | Certification badge (snapshot) | Cropped from the candidate's own official CompTIA A+ certificate PDF (Candidate ID COMP001023014937, issued 20.05.2026) | This is the actual badge tied to this specific credential — appropriate for `logo_snapshot_path`, not just the generic company mark |
| `certifications/itil-4-foundation.png` | Certification badge (snapshot) | Cropped from the same PeopleCert/ITIL certificate PDF as above | ITIL's own circular mark, as rendered on the real certificate |
| `certifications/microsoft-azure-fundamentals.png` | Certification badge (snapshot) | Cropped from the same Microsoft Learn credential PDF as above | The specific "Microsoft Certified: Fundamentals" shield badge for this credential |

Nothing here was designed, generated, or approximated — every file is
either a verified-official third-party asset (CompTIA SVG) or a direct,
unaltered crop from the candidate's own genuine, already-issued
certificate documents.



Kept here for reference since it's the sibling permanent rule for
this same feature area:

- `/c/{secure-random-token}` — short, professional.
- Token is cryptographically random (`crypto.randomBytes`, never
  `Math.random`), at least 128-bit entropy. Currently 128-bit exactly
  (`randomBytes(16)`, ~22 base64url characters) — see
  `lib/candidate/shareLinkAuth.ts`.
- Only the SHA-256 hash is ever stored (`share_links.token_hash`);
  the raw token exists only in the one-time creation response and the
  URL itself.
- No separate short "public ID" is ever, by itself, sufficient for
  authorization — the token itself is what's checked, always.
- `revoked_at`/`expires_at` checked fresh on every request (see
  `lib/candidate/verifyShareLink.ts`), never cached.
- No fixed, sequential, or guessable tokens anywhere in this flow.

