import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { verifyAdminAuth, errorResponse } from "@/lib/security";

export async function POST(req: Request) {
    const authHeader = req.headers.get("authorization");
    if (!verifyAdminAuth(authHeader)) {
        return errorResponse("Unauthorized", 401);
    }

    const { id, status } = await req.json();

    if (!id || !status) {
        return errorResponse("Missing id or status");
    }

    const validStatuses = [
        "Registered",
        "Assessment Cleared",
        "Interview Round 1",
        "Interview Round 2",
        "HR Round",
        "Selected",
        "Rejected",
    ];

    if (!validStatuses.includes(status)) {
        return errorResponse("Invalid status value");
    }

    const { error } = await supabaseAdmin
        .from("hackathon_registrations")
        .update({ candidate_status: status })
        .eq("id", id);

    if (error) {
        console.error("Update status error:", error);
        return errorResponse("Failed to update status", 500);
    }

    return NextResponse.json({ success: true });
}
