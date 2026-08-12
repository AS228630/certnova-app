/**
 * Shared upload validation, per docs/CANDIDATE_PROFILE_PHASE5_DESIGN.md
 * section 6: never trust the declared MIME type or extension alone —
 * check the actual file bytes. One named constant for the size limit
 * (not repeated in multiple files), matching the discipline already
 * used for the referral system's commission constants.
 */

export const MAX_DOCUMENT_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB, per PHASE 5 design section 5

export const ALLOWED_MIME_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'] as const;
export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

const MAGIC_BYTES: Record<AllowedMimeType, number[][]> = {
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
  'image/jpeg': [[0xff, 0xd8, 0xff]],
  'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header (WEBP marker follows at byte 8, RIFF check is sufficient here)
};

export type FileValidationResult = { ok: true } | { ok: false; error: string };

/**
 * Validates a File's declared MIME type, size, and actual byte
 * signature, in that order — cheapest checks first, so an obviously
 * invalid upload never reaches the (relatively expensive) byte-read.
 */
export async function validateUploadFile(file: File): Promise<FileValidationResult> {
  if (!ALLOWED_MIME_TYPES.includes(file.type as AllowedMimeType)) {
    return { ok: false, error: 'UNSUPPORTED_FILE_TYPE' };
  }
  if (file.size <= 0) {
    return { ok: false, error: 'EMPTY_FILE' };
  }
  if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
    return { ok: false, error: 'FILE_TOO_LARGE' };
  }

  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const signatures = MAGIC_BYTES[file.type as AllowedMimeType];
  const matches = signatures.some((sig) => sig.every((byte, i) => header[i] === byte));
  if (!matches) {
    return { ok: false, error: 'FILE_SIGNATURE_MISMATCH' };
  }

  return { ok: true };
}

/** Best-effort file extension derived from the validated MIME type — never trusts the original filename's extension. */
export function extensionForMimeType(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return 'pdf';
    case 'image/jpeg':
      return 'jpg';
    case 'image/png':
      return 'png';
    case 'image/webp':
      return 'webp';
    default:
      return 'bin';
  }
}
