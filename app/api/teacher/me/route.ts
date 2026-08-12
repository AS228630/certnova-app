import { NextRequest, NextResponse } from 'next/server';
import { requireTeacher } from '@/lib/teacher/requireTeacher';

/** Lightweight identity check used by the Teacher Portal guard —
 * confirms this session belongs to an active teacher, without pulling
 * the full dashboard payload. */
export async function GET(req: NextRequest) {
  const auth = await requireTeacher(req.headers.get('authorization')?.replace(/^Bearer\s+/i, ''));
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  return NextResponse.json({ teacherId: auth.teacherId, teacherName: auth.teacherName });
}
