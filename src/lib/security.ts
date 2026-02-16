import { NextResponse } from "next/server";
import crypto from "crypto";

// Verify Cashfree webhook signature
export function verifyCashfreeWebhook(
    rawBody: string,
    timestamp: string,
    signature: string
): boolean {
    const secretKey = process.env.CASHFREE_SECRET_KEY || "";
    const body = timestamp + rawBody;
    const expectedSignature = crypto
        .createHmac("sha256", secretKey)
        .update(body)
        .digest("base64");
    return expectedSignature === signature;
}

// Sanitize input strings
export function sanitizeInput(input: string): string {
    return input
        .replace(/[<>]/g, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+=/gi, "")
        .trim();
}

// Validate email
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Validate phone (Indian format)
export function isValidPhone(phone: string): boolean {
    return /^(\+91[\-\s]?)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ""));
}

// CSRF token generation
export function generateCSRFToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

// Admin auth check
export function verifyAdminAuth(authHeader: string | null): boolean {
    if (!authHeader) return false;
    const token = authHeader.replace("Bearer ", "");
    return token === process.env.ADMIN_SECRET_KEY;
}

// JSON error response helper
export function errorResponse(message: string, status: number = 400) {
    return NextResponse.json({ error: message }, { status });
}
