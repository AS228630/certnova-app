import { NextRequest, NextResponse } from "next/server";
import { resolveEntitlement } from "@/lib/entitlements";
import { canAccess } from "@/lib/entitlementPolicy";
import { getSectionRange } from "@/lib/practiceSections";
import { hasPracticeBank, getPracticeQuestions, getPracticeTopics } from "@/lib/server/practiceBank";
import { practiceQuestionsSchema } from "@/lib/apiSchemas";

// Free/guest users are only entitled to "Teil 1" of any question bank —
// this is the actual enforcement point (server-side), not just a UI
// affordance: an unentitled request never receives section 2+ in the
// response body at all, regardless of what the client's own state
// thinks it's allowed to show. Section boundaries are computed with the
// exact same getSectionRange helper the practice UI already uses, so
// "Teil 1" here always matches "Teil 1" on screen.
//
// A true Guest (no accessToken at all) additionally gets exactly ONE
// bonus question — the real first question of Teil 2 — per the Stage 5
// spec: "Teil 2 Frage 1 is viewable, Frage 2 triggers the Registration
// Gate". A signed-in Free user (has an accessToken, just isn't Premium)
// does NOT get this bonus — they already have an account, so the
// Premium gate applies immediately at the Teil 1 boundary, same as
// before. This only ever adds a single extra real question already in
// the bank; nothing is fabricated.
export async function POST(req: NextRequest, { params }: { params: Promise<{ certId: string }> }) {
  const { certId } = await params;

  if (!hasPracticeBank(certId)) {
    return NextResponse.json({ error: "no_practice_bank" }, { status: 404 });
  }

  const rawBody = await req.json().catch(() => ({}));
  const parseResult = practiceQuestionsSchema.safeParse(rawBody);
  const { accessToken, locale } = parseResult.success ? parseResult.data : {};

  const { isPro } = await resolveEntitlement(accessToken);
  const isTrueGuest = !accessToken;

  const allQuestions = getPracticeQuestions(certId, locale ?? "de");
  const totalCount = allQuestions.length;
  const [, freeSectionEnd] = getSectionRange(totalCount, 0, certId);
  const guestBonusEnd = Math.min(totalCount, freeSectionEnd + 1);

  const questions = canAccess(isPro, "practice_questions_full")
    ? allQuestions
    : allQuestions.slice(0, isTrueGuest ? guestBonusEnd : freeSectionEnd);

  return NextResponse.json({
    questions,
    topics: getPracticeTopics(certId),
    totalCount,
    freeSectionEnd,
    isPro,
  });
}
