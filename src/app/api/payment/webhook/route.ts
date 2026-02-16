import { NextResponse, NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/db";
import { verifyRazorpayWebhook } from "@/lib/security";
import { sendRegistrationConfirmation, sendPaymentFailureEmail } from "@/lib/email";

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

        // Fetch existing registration once to use for both success and failure flows
        const { data: existing } = await supabaseAdmin
            .from("hackathon_registrations")
            .select("payment_status, full_name, email")
            .eq("order_id", orderId)
            .single();

        if (paymentStatus === "captured") {
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
                if (existing.email) {
                    sendRegistrationConfirmation(existing.full_name || "Participant", existing.email);
                }
                console.log(`✅ Webhook: Payment success for ${orderId}`);
            }
        } else if (paymentStatus === "failed") {
            if (existing && existing.payment_status !== "success") {
                await supabaseAdmin
                    .from("hackathon_registrations")
                    .update({ payment_status: "failed" })
                    .eq("order_id", orderId);

                if (existing.email) {
                    sendPaymentFailureEmail(existing.full_name || null, existing.email);
                }
            }

            console.log(`❌ Webhook: Payment failed for ${orderId}`);
        }

        return NextResponse.json({ status: "ok" });
    } catch (error) {
        console.error("Webhook Error:", error);
        return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
    }
}
