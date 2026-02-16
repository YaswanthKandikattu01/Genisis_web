import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { verifyAdminAuth, errorResponse } from "@/lib/security";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get("authorization");
    if (!verifyAdminAuth(authHeader)) {
        return errorResponse("Unauthorized", 401);
    }

    const status = req.nextUrl.searchParams.get("status");
    const search = req.nextUrl.searchParams.get("search");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "50");
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
        .from("hackathon_registrations")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

    if (status && status !== "all") {
        query = query.eq("candidate_status", status);
    }

    if (search) {
        query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) {
        console.error("Fetch participants error:", error);
        return errorResponse("Failed to fetch participants", 500);
    }

    return NextResponse.json({
        participants: data || [],
        total: count || 0,
        page,
        limit,
    });
}
