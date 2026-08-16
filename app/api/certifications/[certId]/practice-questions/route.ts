import { NextRequest, NextResponse } from "next/server";
import { resolveEntitlement } from "@/lib/entitlements";
import { canAccess } from "@/lib/entitlementPolicy";
import { getSectionRange } from "@/lib/practiceSections";
import { hasPracticeBank, getPracticeQuestions, getPracticeTopics } from "@/lib/server/practiceBank";

// Free/guest users are only entitled to "Teil 1" of any question bank —
// this is the actual enforcement point (server-side), not just a UI
// affordance: an unentitled request never receives section 2+ in the
// response body at all, regardless of what the client's own state
// thinks it's allowed to show. Section boundaries are computed with the
// exact same getSectionRange helper the practice UI already uses, so
// "Teil 1" here always matches "Teil 1" on screen.
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
  const [, freeSectionEnd] = getSectionRange(totalCount, 0);

  const questions = canAccess(isPro, "practice_questions_full") ? allQuestions : allQuestions.slice(0, freeSectionEnd);

  return NextResponse.json({
    questions,
    topics: getPracticeTopics(certId),
    totalCount,
    freeSectionEnd,
    isPro,
  });
}
