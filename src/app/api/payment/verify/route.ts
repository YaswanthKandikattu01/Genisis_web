/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";

import { supabaseAdmin } from "@/lib/db";
import { sendRegistrationConfirmation } from "@/lib/email";
import { verifyRazorpayPaymentSignature } from "@/lib/security";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            razorpay_order_id: razorpayOrderId,
            razorpay_payment_id: razorpayPaymentId,
            razorpay_signature: razorpaySignature,
        } = body || {};

        if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
            return NextResponse.json(
                { success: false, error: "Invalid payment data" },
                { status: 400 }
            );
        }

        const isValid = verifyRazorpayPaymentSignature(
            razorpayOrderId,
            razorpayPaymentId,
            razorpaySignature
        );

        if (!isValid) {
            console.error("⚠️ Invalid Razorpay payment signature");
            return NextResponse.json(
                { success: false, error: "Invalid signature" },
                { status: 400 }
            );
        }

        // Idempotent update: only update if not already success
        const { data: existing } = await supabaseAdmin
            .from("hackathon_registrations")
            .select("payment_status, full_name, email")
            .eq("order_id", razorpayOrderId)
            .single();

        if (existing && existing.payment_status !== "success") {
            await supabaseAdmin
                .from("hackathon_registrations")
                .update({
                    payment_status: "success",
                    transaction_id: String(razorpayPaymentId),
                    payment_date: new Date().toISOString(),
                })
                .eq("order_id", razorpayOrderId);

            // Queue confirmation email
            if (existing.full_name && existing.email) {
                sendRegistrationConfirmation(existing.full_name, existing.email);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Payment Verify Error:", error);
        return NextResponse.json(
            { success: false, error: "Verification failed" },
            { status: 500 }
        );
    }
}
