import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeInput, isValidEmail, errorResponse } from "@/lib/security";

export async function POST(req: Request) {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const limiter = rateLimit(`contact_${ip}`, 3, 60000);
    if (!limiter.success) {
        return errorResponse("Too many requests. Please wait.", 429);
    }

    const body = await req.json();
    const firstName = sanitizeInput(body.firstName || "");
    const lastName = sanitizeInput(body.lastName || "");
    const email = sanitizeInput(body.email || "");
    const message = sanitizeInput(body.message || "");

    if (!firstName || !lastName || !email || !message) {
        return errorResponse("All fields are required.");
    }
    if (!isValidEmail(email)) {
        return errorResponse("Invalid email address.");
    }

    const { error } = await supabaseAdmin.from("contact_messages").insert({
        first_name: firstName,
        last_name: lastName,
        email,
        message,
    });

    if (error) {
        console.error("Contact form error:", error);
        return errorResponse("Failed to submit. Please try again.", 500);
    }

    return NextResponse.json({ success: true });
}
