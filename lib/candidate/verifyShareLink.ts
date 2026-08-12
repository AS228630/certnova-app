import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { hashShareToken } from '@/lib/candidate/shareLinkAuth';

type ShareLink = {
  id: string;
  candidate_id: string;
  company_name: string;
  expires_at: string | null;
  revoked_at: string | null;
  require_access_code: boolean;
  max_views: number | null;
  access_count: number;
  allow_download: boolean;
};

type Result = { ok: true; link: ShareLink } | { ok: false; status: number; error: string };

/**
 * The single point where every public-facing candidate route
 * verifies a token. Checked fresh on every request — never cached —
 * per spec section 62: a revoked link must stop working immediately,
 * not "eventually" or "after a cache expires".
 */
export async function verifyShareToken(rawToken: string | undefined | null): Promise<Result> {
  if (!rawToken) return { ok: false, status: 400, error: 'TOKEN_REQUIRED' };

  const supabase = getSupabaseAdmin();
  const { data: link, error } = await supabase
    .from('share_links')
    .select('id, candidate_id, company_name, expires_at, revoked_at, require_access_code, max_views, access_count, allow_download')
    .eq('token_hash', hashShareToken(rawToken))
    .maybeSingle();

  if (error) return { ok: false, status: 500, error: error.message };
  if (!link) return { ok: false, status: 404, error: 'LINK_NOT_FOUND' };
  if (link.revoked_at) return { ok: false, status: 410, error: 'LINK_REVOKED' };
  if (link.expires_at && new Date(link.expires_at) < new Date()) return { ok: false, status: 410, error: 'LINK_EXPIRED' };
  if (link.max_views !== null && link.access_count >= link.max_views) return { ok: false, status: 410, error: 'LINK_VIEW_LIMIT_REACHED' };

  return { ok: true, link };
}
