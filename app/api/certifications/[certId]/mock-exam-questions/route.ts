import { NextRequest, NextResponse } from "next/server";
import { resolveEntitlement } from "@/lib/entitlements";
import { hasPracticeBank, getPracticeQuestions } from "@/lib/server/practiceBank";

// Per the agreed Free/Premium rule: Exam Simulation gives Guest AND Free
// accounts the first 10 questions of the real bank for this
// certification (never a shared/generic bank) — only a confirmed active
// Premium subscription unlocks the full, timed simulation. Enforced here
// server-side: an unentitled request's response body never contains
// question 11 onward, so there is nothing for the client to reveal
// regardless of its own UI state.
const FREE_QUESTION_LIMIT = 10;

export async function POST(req: NextRequest, { params }: { params: Promise<{ certId: string }> }) {
  const { certId } = await params;

  if (!hasPracticeBank(certId)) {
    return NextResponse.json({ error: "no_practice_bank" }, { status: 404 });
  }

  const { accessToken, locale } = (await req.json().catch(() => ({}))) as {
    accessToken?: string;
    locale?: string;
  };

  const { isPro } = await resolveEntitlement(accessToken);

  const allQuestions = getPracticeQuestions(certId, locale ?? "de");
  const totalCount = allQuestions.length;
  const questions = isPro ? allQuestions : allQuestions.slice(0, FREE_QUESTION_LIMIT);

  return NextResponse.json({
    questions,
    totalCount,
    freeQuestionLimit: FREE_QUESTION_LIMIT,
    isPro,
  });
}
