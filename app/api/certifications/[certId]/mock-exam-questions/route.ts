import { NextRequest, NextResponse } from "next/server";
import { resolveEntitlement } from "@/lib/entitlements";
import { canAccess } from "@/lib/entitlementPolicy";
import { hasPracticeBank, getPracticeQuestions } from "@/lib/server/practiceBank";
import { practiceQuestionsSchema } from "@/lib/apiSchemas";

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

  const rawBody = await req.json().catch(() => ({}));
  const parseResult = practiceQuestionsSchema.safeParse(rawBody);
  const { accessToken, locale } = parseResult.success ? parseResult.data : {};

  const { isPro } = await resolveEntitlement(accessToken);

  const allQuestions = getPracticeQuestions(certId, locale ?? "de");
  const totalCount = allQuestions.length;
  const questions = canAccess(isPro, "exam_simulation_full") ? allQuestions : allQuestions.slice(0, FREE_QUESTION_LIMIT);

  return NextResponse.json({
    questions,
    totalCount,
    freeQuestionLimit: FREE_QUESTION_LIMIT,
    isPro,
  });
}
