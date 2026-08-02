import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY ?? '');
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { userId } = await params;
  const body = await req.json().catch(() => ({}));
  const action = body?.action as 'extend' | 'cancel' | undefined;
  const supabase = getSupabaseAdmin();

  const { data: sub } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (action === 'extend') {
    const days = Number(body?.days);
    if (!Number.isFinite(days) || days <= 0) {
      return NextResponse.json({ error: 'days must be a positive number' }, { status: 400 });
    }
    const base = sub?.current_period_end ? new Date(sub.current_period_end) : new Date();
    const newEnd = new Date(Math.max(base.getTime(), Date.now()) + days * 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('subscriptions')
      .upsert(
        {
          user_id: userId,
          plan: sub?.plan && sub.plan !== 'free' ? sub.plan : 'monthly',
          status: 'active',
          current_period_end: newEnd.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      )
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ subscription: data });
  }

  if (action === 'cancel') {
    // Cancel the real Stripe subscription too (at period end, same as
    // the customer-facing /kuendigen flow — not an abrupt cutoff), not
    // just flipping a flag in our own database.
    if (sub?.stripe_subscription_id) {
      try {
        await getStripe().subscriptions.update(sub.stripe_subscription_id, { cancel_at_period_end: true });
      } catch (err) {
        console.error('Admin cancel: Stripe update failed', err);
        // Continue anyway — still reflect the cancellation locally so the
        // admin isn't stuck if Stripe is unreachable, but log it clearly.
      }
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .update({ status: 'canceled', updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .maybeSingle();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ subscription: data });
  }

  return NextResponse.json({ error: 'unknown_action' }, { status: 400 });
}
