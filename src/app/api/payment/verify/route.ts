/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import { Cashfree } from "cashfree-pg";
import { supabaseAdmin } from "@/lib/db";
import { sendRegistrationConfirmation } from "@/lib/email";

// Initialize Cashfree
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cashfree = new (Cashfree as any)(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.env.CASHFREE_ENV === "PRODUCTION"
        ? (Cashfree as any).PRODUCTION
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        : (Cashfree as any).SANDBOX,
    process.env.CASHFREE_APP_ID || "",
    process.env.CASHFREE_SECRET_KEY || ""
);

export async function GET(req: NextRequest) {
    const orderId = req.nextUrl.searchParams.get("order_id");

    if (!orderId) {
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/payment-failure?reason=missing_order`
        );
    }

    try {
        // Server-side verification with Cashfree
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await (Cashfree as any).PGOrderFetchPayments(orderId);
        const payments = response?.data || [];

        const successfulPayment = payments.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (p: any) => p.payment_status === "SUCCESS"
        );

        if (successfulPayment) {
            // Idempotent update: only update if not already success
            const { data: existing } = await supabaseAdmin
                .from("hackathon_registrations")
                .select("payment_status, full_name, email")
                .eq("order_id", orderId)
                .single();

            if (existing && existing.payment_status !== "success") {
                await supabaseAdmin
                    .from("hackathon_registrations")
                    .update({
                        payment_status: "success",
                        transaction_id: String(successfulPayment.cf_payment_id),
                        payment_date: new Date().toISOString(),
                    })
                    .eq("order_id", orderId);

                // Queue confirmation email
                sendRegistrationConfirmation(existing.full_name, existing.email);
            }

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?id=${orderId}`
            );
        } else {
            // Update status to failed
            await supabaseAdmin
                .from("hackathon_registrations")
                .update({ payment_status: "failed" })
                .eq("order_id", orderId);

            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/payment-failure?reason=payment_failed`
            );
        }
    } catch (error) {
        console.error("Payment Verify Error:", error);
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/payment-failure?reason=verification_error`
        );
    }
}
