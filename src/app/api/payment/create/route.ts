/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeInput, isValidEmail, isValidPhone, errorResponse } from "@/lib/security";
import { getRazorpayClient } from "@/lib/razorpay";

export async function POST(req: Request) {
    try {
        // Rate limiting: 5 requests per minute per IP
        const ip = req.headers.get("x-forwarded-for") || "unknown";
        const limiter = rateLimit(ip, 5, 60000);
        if (!limiter.success) {
            return errorResponse("Too many requests. Please wait a moment.", 429);
        }

        const body = await req.json();
        const name = sanitizeInput(body.name || "");
        const email = sanitizeInput(body.email || "");
        const phone = sanitizeInput(body.phone || "");

        // Validation
        if (!name || !email || !phone) {
            return errorResponse("All fields are required.");
        }
        if (!isValidEmail(email)) {
            return errorResponse("Invalid email address.");
        }
        if (!isValidPhone(phone)) {
            return errorResponse("Invalid phone number. Use Indian format.");
        }

        // Check for duplicate registration
        const { data: existing } = await supabaseAdmin
            .from("hackathon_registrations")
            .select("id, payment_status")
            .eq("email", email)
            .single();

        if (existing && existing.payment_status === "success") {
            return errorResponse("This email is already registered and paid.");
        }

        const publicKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
        if (!publicKey) {
            return errorResponse("Payment configuration error. Please contact support.", 500);
        }

        const razorpay = getRazorpayClient();

        // Logical receipt ID for our own tracking (stored as Razorpay receipt)
        const receiptId = `genesis_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        // Amount is in paise for Razorpay (₹129 → 12900)
        const amountInPaise = 129 * 100;

        const order = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: receiptId,
            notes: {
                email,
                name,
                phone,
            },
        });

        const razorpayOrderId = order.id as string;

        // Upsert pending registration in Supabase
        if (existing) {
            await supabaseAdmin
                .from("hackathon_registrations")
                .update({
                    full_name: name,
                    phone,
                    order_id: razorpayOrderId,
                    payment_status: "pending",
                })
                .eq("email", email);
        } else {
            await supabaseAdmin.from("hackathon_registrations").insert({
                full_name: name,
                email,
                phone,
                order_id: razorpayOrderId,
                payment_status: "pending",
            });
        }

        return NextResponse.json({
            key: publicKey,
            razorpayOrderId,
            amount: amountInPaise,
            currency: "INR",
        });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        console.error("Payment Create Error:", err?.response?.data || err.message || err);
        return errorResponse("Failed to create payment. Please try again.", 500);
    }
}
