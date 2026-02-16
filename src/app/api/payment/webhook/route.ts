import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { verifyRazorpayWebhook } from "@/lib/security";
import { sendRegistrationConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
    try {
        const rawBody = await req.text();
        const signature = req.headers.get("x-razorpay-signature") || "";

        // Verify webhook signature from Razorpay
        const isValid = verifyRazorpayWebhook(rawBody, signature);
        if (!isValid) {
            console.error("⚠️ Invalid Razorpay webhook signature");
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        const event = JSON.parse(rawBody);
        const paymentEntity = event?.payload?.payment?.entity;
        const orderId = paymentEntity?.order_id as string | undefined;
        const paymentStatus = paymentEntity?.status as string | undefined;

        if (!orderId) {
            return NextResponse.json({ error: "Missing order ID" }, { status: 400 });
        }

        if (paymentStatus === "captured") {
            // Idempotent: check if already marked success
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
                        transaction_id: String(paymentEntity.id),
                        payment_date: new Date().toISOString(),
                    })
                    .eq("order_id", orderId);

                // Queue confirmation email
                if (existing.full_name && existing.email) {
                    sendRegistrationConfirmation(existing.full_name, existing.email);
                }
                console.log(`✅ Webhook: Payment success for ${orderId}`);
            }
        } else if (paymentStatus === "failed") {
            await supabaseAdmin
                .from("hackathon_registrations")
                .update({ payment_status: "failed" })
                .eq("order_id", orderId);

            console.log(`❌ Webhook: Payment failed for ${orderId}`);
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
