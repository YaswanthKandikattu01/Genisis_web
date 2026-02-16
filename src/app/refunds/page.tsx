"use client";

import { motion } from "framer-motion";

export default function RefundsPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
            >
                Refund & Cancellation Policy
            </motion.h1>
            <p className="text-sm text-neutral-500 mb-12">Last updated: February 2026</p>

            <div className="space-y-8">
                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Refund Policy</h2>
                    <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>
                            The registration fee of <strong className="text-white">₹129 is non-refundable</strong> after
                            successful payment confirmation.
                        </li>
                        <li>
                            Refunds will only be processed if the hackathon event is <strong className="text-white">cancelled
                                by Genesis</strong>. In such cases, a full refund will be issued to the original payment method
                            within <strong className="text-white">7 business days</strong>.
                        </li>
                        <li>
                            If payment fails or is not captured, no amount is deducted. Contact support if
                            your account was charged without registration confirmation.
                        </li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Cancellation Policy</h2>
                    <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>
                            Participants may withdraw from the hackathon at any time, but <strong className="text-white">no
                                refund will be issued</strong> for voluntary withdrawal.
                        </li>
                        <li>
                            Genesis reserves the right to disqualify and remove any participant who violates
                            the assessment rules without refund.
                        </li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">How to Request a Refund</h2>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        If you believe you are eligible for a refund, please email{" "}
                        <strong className="text-primary-400">support@genesis-ai.com</strong>{" "}
                        with your registered email, transaction ID, and reason for the request.
                        Our team will respond within 48 hours.
                    </p>
                </section>
            </div>
        </div>
    );
}
