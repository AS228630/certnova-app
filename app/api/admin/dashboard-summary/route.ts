import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';

/**
 * Real Dashboard summary — replaces the hardcoded arrays that used to
 * live in app/admin-senmas/page.tsx (€24.680,00, 1.847 Studenten, etc.
 * were literal mock values, never actually read from the database).
 *
 * Everything below is computed from tables that already exist and are
 * already used by the real /dozenten-codes, /studenten, /b2b-gruppen
 * admin pages — no schema change, no new migration.
 *
 * One honest limitation, on purpose (see docs/admin-dashboard-plan.md
 * and the Aug 11 2026 chat with the senior advisor): `subscriptions`
 * is one row per user (unique user_id), updated in place on renewal —
 * it is not a transaction ledger. So "Umsatz" figures below are a
 * best-effort read of amount_paid_cents by updated_at, not a precise
 * accounting record. A dedicated `transactions`/`payments` table is
 * needed for that; not built yet, so this must not be oversold as
 * exact — the admin note in the JSON response says so explicitly.
 *
 * Likewise there is no `payouts` or `audit_logs` table yet, so
 * "Offene Auszahlungen" and "Letzte Aktivitäten" are reported as
 * unavailable / derived-from-real-events-only rather than invented.
 */

function monthBounds(offsetMonths: number) {
  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offsetMonths, 1));
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + offsetMonths + 1, 1));
  return { start, end };
}

function percentageChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

function inRange(iso: string | null, start: Date, end: Date): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  return t >= start.getTime() && t < end.getTime();
}

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const supabase = getSupabaseAdmin();
  const dbCheckStart = Date.now();

  const [usersRes, subsRes, couponsRes, groupsRes, redemptionsRes, profilesRes] = await Promise.all([
    supabase.auth.admin.listUsers({ page: 1, perPage: 200 }),
    supabase
      .from('subscriptions')
      .select('user_id, plan, status, amount_paid_cents, teacher_commission_cents, teacher_coupon_id, applied_coupon_code, created_at, updated_at'),
    supabase.from('teacher_coupons').select('*').order('created_at', { ascending: false }),
    supabase.from('b2b_groups').select('*').order('created_at', { ascending: false }),
    supabase.from('b2b_redemptions').select('group_id'),
    supabase.from('profiles').select('id, full_name'),
  ]);

  const dbLatencyMs = Date.now() - dbCheckStart;
  const dbOk = !usersRes.error && !subsRes.error;

  if (usersRes.error) return NextResponse.json({ error: usersRes.error.message }, { status: 500 });
  if (subsRes.error) return NextResponse.json({ error: subsRes.error.message }, { status: 500 });

  const users = usersRes.data.users;
  const subs = subsRes.data ?? [];
  const coupons = couponsRes.data ?? [];
  const groups = groupsRes.data ?? [];
  const redemptions = redemptionsRes.data ?? [];
  const profileMap = new Map((profilesRes.data ?? []).map((p) => [p.id, p.full_name as string | null]));

  // ---- Revenue & sales (best-effort from subscriptions, see caveat above) ----
  const { start: curStart, end: curEnd } = monthBounds(0);
  const { start: prevStart, end: prevEnd } = monthBounds(-1);

  const curSubs = subs.filter((s) => inRange(s.updated_at, curStart, curEnd));
  const prevSubs = subs.filter((s) => inRange(s.updated_at, prevStart, prevEnd));

  const revenueCurrentCents = curSubs.reduce((sum, s) => sum + (s.amount_paid_cents ?? 0), 0);
  const revenuePrevCents = prevSubs.reduce((sum, s) => sum + (s.amount_paid_cents ?? 0), 0);
  const salesCurrent = curSubs.filter((s) => (s.amount_paid_cents ?? 0) > 0).length;
  const salesPrev = prevSubs.filter((s) => (s.amount_paid_cents ?? 0) > 0).length;

  // ---- Students ----
  const activeStudents = subs.filter((s) => s.status === 'active').length;

  // ---- Teacher coupons (real per-coupon stats, same calc as /dozenten-codes) ----
  const couponStats = new Map<string, { count: number; revenueCents: number; commissionCents: number }>();
  for (const s of subs) {
    if (!s.teacher_coupon_id) continue;
    const entry = couponStats.get(s.teacher_coupon_id) ?? { count: 0, revenueCents: 0, commissionCents: 0 };
    entry.count += 1;
    entry.revenueCents += s.amount_paid_cents ?? 0;
    entry.commissionCents += s.teacher_commission_cents ?? 0;
    couponStats.set(s.teacher_coupon_id, entry);
  }
  const enrichedCoupons = coupons
    .map((c) => ({ ...c, stats: couponStats.get(c.id) ?? { count: 0, revenueCents: 0, commissionCents: 0 } }))
    .sort((a, b) => b.stats.revenueCents - a.stats.revenueCents);
  const activeCoupons = coupons.filter((c) => c.is_active).length;

  // ---- B2B groups (real used-license count from redemptions) ----
  const usedByGroup = new Map<string, number>();
  for (const r of redemptions) usedByGroup.set(r.group_id, (usedByGroup.get(r.group_id) ?? 0) + 1);
  const enrichedGroups = groups.map((g) => ({ ...g, usedLicenses: usedByGroup.get(g.id) ?? 0 }));

  // ---- Recent students preview ----
  const recentStudents = [...users]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 5)
    .map((u) => {
      const sub = subs.find((s) => s.user_id === u.id);
      return {
        id: u.id,
        name: profileMap.get(u.id) ?? u.email ?? '—',
        email: u.email ?? '—',
        plan: sub?.plan ?? 'free',
        active: sub?.status === 'active',
      };
    });

  // ---- Recent activity — merged from real row timestamps, not invented ----
  type Activity = { type: string; text: string; sub: string; time: string };
  const activities: Activity[] = [];
  for (const c of coupons.slice(0, 5)) {
    activities.push({ type: 'coupon', text: 'Dozenten-Code erstellt', sub: `Code "${c.code}" (${c.teacher_name})`, time: c.created_at });
  }
  for (const g of groups.slice(0, 5)) {
    activities.push({ type: 'b2b', text: 'Gruppen-Lizenz erstellt', sub: `${g.total_licenses} Lizenzen für "${g.name}"`, time: g.created_at });
  }
  for (const s of [...subs].sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)).slice(0, 5)) {
    if ((s.amount_paid_cents ?? 0) > 0) {
      activities.push({ type: 'payment', text: 'Zahlung erhalten', sub: `€${((s.amount_paid_cents ?? 0) / 100).toFixed(2)}`, time: s.updated_at });
    }
  }
  activities.sort((a, b) => (a.time < b.time ? 1 : -1));

  // ---- Revenue chart, last 7 days, grouped by real date ----
  const days: { date: string; revenueCents: number; commissionCents: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayStart = new Date(dateStr + 'T00:00:00Z');
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
    const daySubs = subs.filter((s) => inRange(s.updated_at, dayStart, dayEnd));
    days.push({
      date: dateStr,
      revenueCents: daySubs.reduce((sum, s) => sum + (s.amount_paid_cents ?? 0), 0),
      commissionCents: daySubs.reduce((sum, s) => sum + (s.teacher_commission_cents ?? 0), 0),
    });
  }

  return NextResponse.json({
    kpi: {
      revenue: { currentCents: revenueCurrentCents, previousCents: revenuePrevCents, changePercent: percentageChange(revenueCurrentCents, revenuePrevCents) },
      sales: { current: salesCurrent, previous: salesPrev, changePercent: percentageChange(salesCurrent, salesPrev) },
      activeStudents: { current: activeStudents, changePercent: null }, // no historical snapshot to diff against yet
      teacherCodes: { active: activeCoupons, total: coupons.length, changePercent: null },
      payouts: { available: false, note: 'Keine payouts-Tabelle vorhanden — noch nicht implementiert.' },
    },
    revenueChart: days,
    recentActivity: activities.slice(0, 6),
    teacherCoupons: enrichedCoupons.slice(0, 5),
    students: recentStudents,
    b2bGroups: enrichedGroups.slice(0, 4),
    systemStatus: {
      webServer: { status: 'online' as const },
      database: { status: dbOk ? ('online' as const) : ('down' as const), latencyMs: dbLatencyMs },
      stripe: { status: 'unknown' as const, note: 'Kein Health-Check implementiert.' },
      email: { status: 'unknown' as const, note: 'Kein Health-Check implementiert.' },
      storage: { status: 'unknown' as const, note: 'Kein Health-Check implementiert.' },
    },
    totals: { studentsTotal: users.length },
  });
}
