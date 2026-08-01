import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, getSupabaseAdmin } from '@/lib/admin/requireAdmin';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function fmtEuro(cents: number | null): string {
  return '€ ' + (((cents ?? 0) / 100)).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function csvEscape(v: string): string {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { id } = await params;
  const format = req.nextUrl.searchParams.get('format') === 'csv' ? 'csv' : 'pdf';
  const supabase = getSupabaseAdmin();

  const { data: coupon, error: couponError } = await supabase
    .from('teacher_coupons')
    .select('*')
    .eq('id', id)
    .single();
  if (couponError || !coupon) {
    return NextResponse.json({ error: 'coupon_not_found' }, { status: 404 });
  }

  const { data: subs, error: subsError } = await supabase
    .from('subscriptions')
    .select('user_id, plan, status, amount_paid_cents, teacher_commission_cents, bonus_days_granted, created_at')
    .eq('teacher_coupon_id', id)
    .order('created_at', { ascending: true });
  if (subsError) {
    return NextResponse.json({ error: subsError.message }, { status: 500 });
  }

  const userIds = [...new Set((subs ?? []).map((s) => s.user_id))];
  const profileMap = new Map<string, { full_name: string | null; email: string | null }>();
  if (userIds.length) {
    const { data: profiles } = await supabase.from('profiles').select('id, full_name, email').in('id', userIds);
    for (const p of profiles ?? []) profileMap.set(p.id, { full_name: p.full_name, email: p.email });
  }

  const rows = (subs ?? []).map((s) => {
    const profile = profileMap.get(s.user_id);
    return {
      date: new Date(s.created_at).toLocaleDateString('de-DE'),
      student: profile?.full_name || '—',
      email: profile?.email || '—',
      plan: s.plan,
      status: s.status,
      amount: fmtEuro(s.amount_paid_cents),
      commission: fmtEuro(s.teacher_commission_cents),
      bonusDays: String(s.bonus_days_granted ?? 0),
    };
  });

  const totalRevenue = (subs ?? []).reduce((sum, s) => sum + (s.amount_paid_cents ?? 0), 0);
  const totalCommission = (subs ?? []).reduce((sum, s) => sum + (s.teacher_commission_cents ?? 0), 0);

  if (format === 'csv') {
    const header = ['Datum', 'Student', 'E-Mail', 'Plan', 'Status', 'Betrag', 'Provision', 'Bonustage'];
    const lines = [header.join(',')];
    for (const r of rows) {
      lines.push([r.date, r.student, r.email, r.plan, r.status, r.amount, r.commission, r.bonusDays].map(csvEscape).join(','));
    }
    lines.push('');
    lines.push(`Gesamt,,,,,${fmtEuro(totalRevenue)},${fmtEuro(totalCommission)},`);
    const csv = '\uFEFF' + lines.join('\n'); // BOM so Excel opens umlauts/€ correctly

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${coupon.code}-Bericht.csv"`,
        'Cache-Control': 'no-store',
      },
    });
  }

  // PDF
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('Dozenten-Provisionsbericht', 14, 18);
  doc.setFontSize(10);
  doc.text(`Dozent: ${coupon.teacher_name}   Code: ${coupon.code}   Provision: ${Math.round(coupon.commission_rate * 100)}%`, 14, 26);
  doc.text(`Erstellt am: ${new Date().toLocaleDateString('de-DE')}`, 14, 32);

  autoTable(doc, {
    startY: 38,
    head: [['Datum', 'Student', 'E-Mail', 'Plan', 'Status', 'Betrag', 'Provision']],
    body: rows.map((r) => [r.date, r.student, r.email, r.plan, r.status, r.amount, r.commission]),
    styles: { fontSize: 8 },
    headStyles: { fillColor: [124, 58, 237] },
    foot: [['', '', '', '', 'Gesamt', fmtEuro(totalRevenue), fmtEuro(totalCommission)]],
    footStyles: { fillColor: [230, 230, 230], textColor: [20, 20, 20], fontStyle: 'bold' },
  });

  const pdfBytes = doc.output('arraybuffer');
  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${coupon.code}-Bericht.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
