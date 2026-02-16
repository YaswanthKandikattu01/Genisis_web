"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-20">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
            >
                Privacy Policy
            </motion.h1>
            <p className="text-sm text-neutral-500 mb-12">Last updated: February 2026</p>

            <div className="space-y-8">
                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Data Collection</h2>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        We collect the following information during hackathon registration:
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Full Name</li>
                        <li>Email Address</li>
                        <li>Phone Number</li>
                        <li>Payment transaction details</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Data Usage</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>Your data is used solely for hackathon registration, communication, and hiring purposes.</li>
                        <li>We do not sell, rent, or trade your personal information to third parties.</li>
                        <li>We may send you event-related emails including confirmations, assessments, and updates.</li>
                        <li>By registering, you consent to receiving electronic communications from Genesis.</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Data Security</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>All data is stored securely in encrypted databases (Supabase PostgreSQL).</li>
                        <li>Payment information is processed by Razorpay and never stored on our servers.</li>
                        <li>We implement industry-standard security measures including HTTPS, input sanitization, and access controls.</li>
                    </ul>
                </section>

                <section className="glass-card">
                    <h2 className="text-lg font-bold mb-4">Your Rights</h2>
                    <ul className="space-y-2 text-sm text-neutral-400 leading-relaxed list-disc pl-5">
                        <li>You may request deletion of your data by contacting kandikattu.career@gmail.com.</li>
                        <li>You may opt out of promotional emails at any time.</li>
                        <li>Contact us for any data-related queries or concerns.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
