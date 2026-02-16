/* eslint-disable @typescript-eslint/no-explicit-any */
import Razorpay from "razorpay";

// Lazily create Razorpay instance to avoid crashing during build
export function getRazorpayClient() {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
        throw new Error("Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables.");
    }

    return new (Razorpay as any)({
        key_id: keyId,
        key_secret: keySecret,
    });
}

