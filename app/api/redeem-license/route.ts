import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { checkRateLimit } from '@/lib/rateLimit';
import { redeemLicenseSchema } from '@/lib/apiSchemas';

export async function POST(req: NextRequest) {
  const rawBody = await req.json().catch(() => null);
  const parsed = redeemLicenseSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_request' }, { status: 400 });
  }
  const { code, accessToken } = parsed.data;

  const anon = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '');
  const { data: userData, error: userError } = await anon.auth.getUser(accessToken);
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'not_authenticated' }, { status: 401 });
  }
  const userId = userData.user.id;

  // Requires login, which raises the bar over a fully anonymous
  // endpoint, but a logged-in attacker could still script rapid guesses
  // against b2b_groups.code — cap attempts per user.
  const { allowed } = await checkRateLimit(`redeem-license:${userId}`, 10, 60);
  if (!allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  const admin = getSupabaseAdmin();

  const { data: group } = await admin
    .from('b2b_groups')
    .select('*')
    .ilike('code', code.trim())
    .maybeSingle();

  if (!group || !group.is_active) {
    return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
  }
  if (group.valid_until && new Date(group.valid_until) < new Date()) {
    return NextResponse.json({ error: 'expired' }, { status: 400 });
  }

  const { count: usedCount } = await admin
    .from('b2b_redemptions')
    .select('*', { count: 'exact', head: true })
    .eq('group_id', group.id);

  if ((usedCount ?? 0) >= group.total_licenses) {
    return NextResponse.json({ error: 'no_seats_left' }, { status: 409 });
  }

  // Insert the redemption row first — its unique(group_id, user_id)
  // constraint is what actually prevents the same student redeeming
  // twice (and, combined with the seat count check just above, keeps a
  // reasonable bound on concurrent redemptions racing past the limit;
  // a hard guarantee would need a DB-level transaction/lock, but a
  // handful of seats briefly over-allocated in a race is an acceptable
  // tradeoff here, not a security problem).
  const { error: redeemError } = await admin.from('b2b_redemptions').insert({ group_id: group.id, user_id: userId });
  if (redeemError) {
    if (redeemError.code === '23505') {
      return NextResponse.json({ error: 'already_redeemed' }, { status: 409 });
    }
    return NextResponse.json({ error: redeemError.message }, { status: 500 });
  }

  const periodEnd = group.valid_until ? new Date(group.valid_until) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

  const { error: subError } = await admin.from('subscriptions').upsert(
    {
      user_id: userId,
      plan: group.plan,
      status: 'active',
      current_period_end: periodEnd.toISOString(),
      b2b_group_id: group.id,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );
  if (subError) {
    return NextResponse.json({ error: subError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, groupName: group.name, validUntil: periodEnd.toISOString() });
}
