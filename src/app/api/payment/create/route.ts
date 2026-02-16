/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeInput, isValidEmail, isValidPhone, errorResponse } from "@/lib/security";

import { cashfree } from "@/lib/cashfree";

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

        const orderId = `genesis_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

        // Create Cashfree order
        const orderRequest = {
            order_amount: 129,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: `cust_${Date.now()}`,
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
            },
            order_meta: {
                return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/verify?order_id={order_id}`,
                notify_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
            },
        };

        // Create order using Cashfree SDK
        const response = await cashfree.PGCreateOrder(
            "2023-08-01",
            orderRequest
        );
        const orderData = response.data;

        // Upsert pending registration in Supabase
        if (existing) {
            await supabaseAdmin
                .from("hackathon_registrations")
                .update({
                    full_name: name,
                    phone,
                    order_id: orderId,
                    payment_status: "pending",
                })
                .eq("email", email);
        } else {
            await supabaseAdmin.from("hackathon_registrations").insert({
                full_name: name,
                email,
                phone,
                order_id: orderId,
                payment_status: "pending",
            });
        }

        return NextResponse.json({
            payment_session_id: orderData?.payment_session_id || null,
            order_id: orderId,
        });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        console.error("Payment Create Error:", err?.response?.data || err.message);
        return errorResponse("Failed to create payment. Please try again.", 500);
    }
}
