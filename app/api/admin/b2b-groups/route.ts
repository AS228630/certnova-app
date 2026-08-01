import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();

  const { data: groups, error: groupsError } = await supabase
    .from('b2b_groups')
    .select('*')
    .order('created_at', { ascending: false });
  if (groupsError) return NextResponse.json({ error: groupsError.message }, { status: 500 });

  const { data: redemptions, error: redemptionsError } = await supabase
    .from('b2b_redemptions')
    .select('group_id');
  if (redemptionsError) return NextResponse.json({ error: redemptionsError.message }, { status: 500 });

  const usedCounts = new Map<string, number>();
  for (const r of redemptions ?? []) {
    usedCounts.set(r.group_id, (usedCounts.get(r.group_id) ?? 0) + 1);
  }

  const enriched = (groups ?? []).map((g) => ({ ...g, usedLicenses: usedCounts.get(g.id) ?? 0 }));
  return NextResponse.json({ groups: enriched });
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => null);
  const name = String(body?.name ?? '').trim();
  const type = body?.type === 'bildungseinrichtung' ? 'bildungseinrichtung' : 'unternehmen';
  const code = String(body?.code ?? '').trim().toUpperCase();
  const totalLicenses = Number(body?.totalLicenses);
  const plan = body?.plan === 'yearly' ? 'yearly' : 'monthly';
  const validUntil = body?.validUntil ? String(body.validUntil) : null;

  if (!name || !code || !Number.isFinite(totalLicenses) || totalLicenses <= 0) {
    return NextResponse.json({ error: 'name, code and a positive totalLicenses are required' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from('b2b_groups')
    .insert({ name, type, code, total_licenses: totalLicenses, plan, valid_until: validUntil })
    .select()
    .single();

  if (error) {
    const status = error.code === '23505' ? 409 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
  return NextResponse.json({ group: data }, { status: 201 });
}
