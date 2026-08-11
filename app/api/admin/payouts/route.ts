import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

/**
 * Real payout tracking — Phase 5, the last phase of the advisor's
 * priority order. This project has no automated payment-out
 * integration (no Stripe Connect / PayPal Payouts API), matching its
 * current scale — this is a real record-keeping tool: the admin
 * transfers money manually (bank transfer, PayPal, etc.), then
 * records it here, which is what actually closes the loop on the
 * commission_ledger balance. Not a simulation — every number it
 * touches (available balance, what gets marked PAID) is the real
 * ledger, not a display-only mock.
 */

async function computeAvailableCents(supabase: ReturnType<typeof getSupabaseAdmin>, teacherId: string): Promise<number> {
  const [{ data: ledgerRows }, { data: pendingPayouts }] = await Promise.all([
    supabase.from('commission_ledger').select('type, status, commission_amount_cents').eq('teacher_id', teacherId),
    supabase.from('payouts').select('amount_cents').eq('teacher_id', teacherId).eq('status', 'PENDING'),
  ]);

  const earned = (ledgerRows ?? []).filter((l) => l.type === 'EARNED').reduce((s, l) => s + l.commission_amount_cents, 0);
  const reversed = (ledgerRows ?? []).filter((l) => l.type === 'REVERSAL').reduce((s, l) => s + Math.abs(l.commission_amount_cents), 0);
  const paid = (ledgerRows ?? []).filter((l) => l.type === 'EARNED' && l.status === 'PAID').reduce((s, l) => s + l.commission_amount_cents, 0);
  const lockedInPendingPayouts = (pendingPayouts ?? []).reduce((s, p) => s + p.amount_cents, 0);

  return earned - reversed - paid - lockedInPendingPayouts;
}

export async function GET(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'financial.view');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const { data: payouts, error } = await supabase
    .from('payouts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'PAYOUTS_NOT_INSTALLED', detail: error.message }, { status: 503 });
  }

  const teacherIds = [...new Set((payouts ?? []).map((p) => p.teacher_id))];
  let teacherMap = new Map<string, { name: string }>();
  if (teacherIds.length > 0) {
    const { data: teachers } = await supabase.from('teachers').select('id, name').in('id', teacherIds);
    teacherMap = new Map((teachers ?? []).map((t) => [t.id, t]));
  }

  const enriched = (payouts ?? []).map((p) => ({ ...p, teacherName: teacherMap.get(p.teacher_id)?.name ?? '—' }));

  return NextResponse.json({ payouts: enriched });
}

export async function POST(req: NextRequest) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'financial.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  const teacherId = String(body?.teacherId ?? '');
  const amountCents = Number(body?.amountCents);
  const method = ['bank_transfer', 'paypal', 'other'].includes(body?.method) ? body.method : 'bank_transfer';
  const reference = body?.reference ? String(body.reference).trim() : null;

  if (!teacherId) return NextResponse.json({ error: 'TEACHER_ID_REQUIRED' }, { status: 400 });
  if (!Number.isFinite(amountCents) || amountCents <= 0) return NextResponse.json({ error: 'INVALID_AMOUNT' }, { status: 400 });

  const supabase = getSupabaseAdmin();

  const { data: teacher, error: teacherError } = await supabase.from('teachers').select('id, name').eq('id', teacherId).maybeSingle();
  if (teacherError) return NextResponse.json({ error: teacherError.message }, { status: 500 });
  if (!teacher) return NextResponse.json({ error: 'TEACHER_NOT_FOUND' }, { status: 404 });

  // Never trust a client-supplied balance — recompute server-side from
  // the real ledger every time, right before creating the payout.
  const available = await computeAvailableCents(supabase, teacherId);
  if (amountCents > available) {
    return NextResponse.json({ error: 'AMOUNT_EXCEEDS_AVAILABLE_BALANCE', available }, { status: 400 });
  }

  const { data: payout, error } = await supabase
    .from('payouts')
    .insert({ teacher_id: teacherId, amount_cents: amountCents, method, reference, created_by: auth.userId })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'PAYOUT_CREATED',
    resourceType: 'payout',
    resourceId: payout.id,
    metadata: { teacherId, teacherName: teacher.name, amountCents, method, reference },
  });

  return NextResponse.json({ payout }, { status: 201 });
}
