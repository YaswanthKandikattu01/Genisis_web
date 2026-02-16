"use client";

import { motion } from "framer-motion";
import { XCircle, RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function FailureContent() {
    const searchParams = useSearchParams();
    const reason = searchParams.get("reason") || "unknown";

    const reasonMessages: Record<string, string> = {
        payment_failed: "Your payment could not be processed. No amount was deducted.",
        missing_order: "Order information is missing. Please try registering again.",
        verification_error: "We couldn't verify your payment. If your account was charged, it will be refunded automatically.",
        unknown: "Something unexpected happened. Please try again.",
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-[2rem] p-12 md:p-16 max-w-lg text-center"
            >
                <div className="w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-8">
                    <XCircle size={36} className="text-red-400" />
                </div>

                <h1 className="text-3xl font-bold mb-4">Payment Failed</h1>
                <p className="text-neutral-400 mb-10 leading-relaxed">
                    {reasonMessages[reason] || reasonMessages.unknown}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/hackathon" className="btn-white flex-1 flex items-center justify-center gap-2">
                        <RefreshCw size={16} /> Try Again
                    </Link>
                    <Link href="/" className="btn-secondary flex-1 flex items-center justify-center gap-2">
                        Go Home <ArrowRight size={16} />
                    </Link>
                </div>

                <p className="text-xs text-neutral-600 mt-8">
                    If you were charged, contact support@genesis-ai.com with your details.
                </p>
            </motion.div>
        </div>
    );
}

export default function PaymentFailurePage() {
    return (
        <Suspense fallback={
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-neutral-500">Loading...</div>
            </div>
        }>
            <FailureContent />
        </Suspense>
    );
}
