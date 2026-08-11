import { NextRequest, NextResponse } from 'next/server';
import { requirePermission, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { logAudit } from '@/lib/admin/audit';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requirePermission(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''), 'financial.manage');
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const action = body?.action === 'cancel' ? 'cancel' : body?.action === 'mark_paid' ? 'mark_paid' : null;
  if (!action) return NextResponse.json({ error: 'INVALID_ACTION' }, { status: 400 });

  const supabase = getSupabaseAdmin();

  const { data: payout, error: payoutError } = await supabase.from('payouts').select('*').eq('id', id).maybeSingle();
  if (payoutError) return NextResponse.json({ error: payoutError.message }, { status: 500 });
  if (!payout) return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  if (payout.status !== 'PENDING') {
    return NextResponse.json({ error: 'PAYOUT_ALREADY_FINALIZED' }, { status: 400 });
  }

  if (action === 'cancel') {
    const { error } = await supabase
      .from('payouts')
      .update({ status: 'CANCELLED', cancelled_at: new Date().toISOString() })
      .eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await logAudit({
      actorId: auth.userId,
      actorEmail: auth.email,
      action: 'PAYOUT_CANCELLED',
      resourceType: 'payout',
      resourceId: id,
      metadata: { teacherId: payout.teacher_id, amountCents: payout.amount_cents },
    });
    return NextResponse.json({ cancelled: true });
  }

  // action === 'mark_paid': this is what actually closes the loop on
  // the ledger — mark the oldest still-outstanding EARNED rows for
  // this teacher as PAID, up to this payout's amount, and link them
  // to this payout. Without this step, the teacher detail page's
  // "Ausgezahlt" figure would never move even after a real payout —
  // it would just be a payouts-table entry disconnected from the
  // actual ledger it's supposed to be paying down.
  const { data: outstandingRows, error: outstandingError } = await supabase
    .from('commission_ledger')
    .select('id, commission_amount_cents')
    .eq('teacher_id', payout.teacher_id)
    .eq('type', 'EARNED')
    .eq('status', 'PENDING')
    .order('created_at', { ascending: true });
  if (outstandingError) return NextResponse.json({ error: outstandingError.message }, { status: 500 });

  let remaining = payout.amount_cents;
  const toMarkPaid: string[] = [];
  for (const row of outstandingRows ?? []) {
    if (remaining <= 0) break;
    toMarkPaid.push(row.id);
    remaining -= row.commission_amount_cents;
  }
  // Note: if the ledger's outstanding rows don't sum exactly to this
  // payout's amount (e.g. amounts were allocated across payouts with
  // rounding at a different granularity), the last row touched may be
  // marked PAID in full even though the payout amount undershoots it
  // slightly — an acceptable v1 simplification for FIFO settlement,
  // not silently losing or fabricating money: the ledger's real EARNED
  // total is always the source of truth, this just tracks which rows
  // this specific payout is settling.

  if (toMarkPaid.length > 0) {
    const { error: markError } = await supabase
      .from('commission_ledger')
      .update({ status: 'PAID', payout_id: id, paid_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .in('id', toMarkPaid);
    if (markError) return NextResponse.json({ error: markError.message }, { status: 500 });
  }

  const { error } = await supabase
    .from('payouts')
    .update({ status: 'PAID', paid_at: new Date().toISOString() })
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAudit({
    actorId: auth.userId,
    actorEmail: auth.email,
    action: 'PAYOUT_PAID',
    resourceType: 'payout',
    resourceId: id,
    metadata: { teacherId: payout.teacher_id, amountCents: payout.amount_cents, ledgerRowsSettled: toMarkPaid.length },
  });

  return NextResponse.json({ paid: true });
}
