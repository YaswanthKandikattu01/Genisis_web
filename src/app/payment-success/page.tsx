"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-[2rem] p-12 md:p-16 max-w-lg text-center"
            >
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={36} className="text-green-400" />
                </div>

                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-neutral-400 mb-8 leading-relaxed">
                    Your registration for Genesis Labs Hackathon 2026 is confirmed.
                    A confirmation email has been sent to your registered address.
                </p>

                {orderId && (
                    <div className="glass rounded-xl p-4 mb-8 text-left">
                        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Order ID</div>
                        <div className="text-sm font-mono text-neutral-300 break-all">{orderId}</div>
                    </div>
                )}

                <div className="glass rounded-xl p-5 mb-10 text-left space-y-3">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                        <Mail size={14} className="text-primary" /> What&apos;s Next?
                    </h3>
                    <ul className="text-sm text-neutral-500 space-y-2">
                        <li>• Check your email for confirmation</li>
                        <li>• Assessment link will be sent on the scheduled date</li>
                        <li>• Prepare — no AI tools allowed!</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/" className="btn-white flex-1 flex items-center justify-center gap-2">
                        Go Home <ArrowRight size={16} />
                    </Link>
                    <Link href="/hackathon" className="btn-secondary flex-1">
                        View Details
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="text-neutral-500">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
