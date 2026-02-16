"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
            >
                Terms & Conditions
            </motion.h1>
            <p className="text-sm text-neutral-500 mb-12">Last updated: February 2026</p>

            <div className="prose prose-invert prose-sm max-w-none space-y-8">
                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">1. Registration & Payment</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Registration fee of ₹129 is <strong className="text-white">non-refundable</strong> under any circumstances except event cancellation by Genesis.</li>
                        <li>Each participant may register only once with a unique email address.</li>
                        <li>Payment is processed securely via Cashfree Payment Gateway.</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">2. Selection Process</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Selection is subject to internal evaluation and performance in assessments and interviews.</li>
                        <li>Genesis reserves the right to modify the selection process at any time.</li>
                        <li>Final job offers are contingent on background verification and document validation.</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">3. Assessment Rules</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Use of AI tools (ChatGPT, Gemini, GitHub Copilot, etc.) during assessments is <strong className="text-red-400">strictly prohibited</strong>.</li>
                        <li>Any malpractice detected leads to immediate disqualification without refund.</li>
                        <li>Assessment must be completed within the 45-hour window from the start time.</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">4. Company Rights</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Genesis reserves the right to cancel, postpone, or modify the hackathon at any time.</li>
                        <li>In case of event cancellation, full refund will be issued within 7 business days.</li>
                        <li>Genesis is not liable for any indirect or consequential damages.</li>
                    </ul>
                </section>

                <div className="glass-card bg-yellow-500/[0.03] border-yellow-500/10">
                    <p className="text-xs text-neutral-500 leading-relaxed">
                        <strong className="text-yellow-400">Disclaimer:</strong> Genesis Hackathon is an independent hiring initiative.
                        Final job offers are subject to internal evaluation and verification.
                    </p>
                </div>
            </div>
        </div>
    );
}
