import { getSupabaseAdmin } from './requireAdmin';

/**
 * The single, central way any admin API route records a sensitive
 * action. Per the advisor's explicit instruction, this must be
 * append-only (enforced at the DB level too, see migration 032) and
 * must never log secrets, passwords, or full credentials.
 *
 * Never throws: if audit_logs doesn't exist yet (migration 032 not
 * run) or the insert fails for any other reason, this logs to the
 * server console and returns — a missing audit trail must never block
 * the actual admin action it was trying to record. This mirrors the
 * same "fail open, don't break the primary feature" choice already
 * made in requireAdmin.ts's role resolution, for the same reason.
 */
export async function logAudit(entry: {
  actorId: string;
  actorEmail: string;
  action: string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('audit_logs').insert({
      actor_id: entry.actorId,
      actor_email: entry.actorEmail,
      action: entry.action,
      resource_type: entry.resourceType ?? null,
      resource_id: entry.resourceId ?? null,
      metadata: entry.metadata ?? null,
    });
    if (error) {
      console.error('audit log insert failed (non-blocking):', error.message);
    }
  } catch (e) {
    console.error('audit log insert threw (non-blocking):', e);
  }
}
