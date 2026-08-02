# Private CV documents

Put the real PDF files here with these exact names:

- `lebenslauf.pdf`
- `zeugnisse.pdf`
- `zertifikate.pdf`
- `arbeitsnachweise.pdf`

This folder is **not** in `/public` and is never served as a static
file — the only way to download a file from here is through
`/api/cv-download/<key>`, which requires the HR passcode to have been
verified first (see `app/api/cv-access/route.ts`).

Until a file is uploaded here, its download button on `/cv` will
correctly show "not available yet" instead of a broken or fake link.

**Do not commit real personal documents to this git repository** —
even in a private repo, that's more copies of sensitive PII than
necessary. Upload these files directly on the server (or wire this up
to a private Supabase Storage bucket later) rather than via `git push`.
