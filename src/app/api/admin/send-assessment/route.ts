import { NextResponse } from "next/server";
import { verifyAdminAuth, errorResponse } from "@/lib/security";
import { sendAssessmentEmail } from "@/lib/email";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!verifyAdminAuth(authHeader)) {
    return errorResponse("Unauthorized", 401);
  }

  const { emails, assessmentLink } = await req.json();

  if (!emails || !Array.isArray(emails) || emails.length === 0) {
    return errorResponse("Provide an array of emails");
  }

  let sentCount = 0;

  for (const email of emails) {
    try {
      sendAssessmentEmail(email, assessmentLink || "#");
      sentCount++;
    } catch (error) {
      console.error(`Failed to queue email for ${email}:`, error);
    }
  }

  return NextResponse.json({
    success: true,
    message: `Assessment emails queued for ${sentCount}/${emails.length} participants`,
  });
}
