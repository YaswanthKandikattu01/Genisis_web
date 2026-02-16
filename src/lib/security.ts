import { NextResponse } from "next/server";
import crypto from "crypto";

// Verify Razorpay webhook signature using webhook secret
export function verifyRazorpayWebhook(rawBody: string, signature: string): boolean {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
    if (!secret || !signature) return false;

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody)
        .digest("hex");

    return expectedSignature === signature;
}

// Verify Razorpay payment signature from Checkout
export function verifyRazorpayPaymentSignature(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
): boolean {
    const secret = process.env.RAZORPAY_KEY_SECRET || "";
    if (!secret) return false;

    const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

    return expectedSignature === razorpaySignature;
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
