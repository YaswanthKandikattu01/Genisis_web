"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
    Trophy,
    Calendar,
    Target,
    Code,
    AlertTriangle,
    ArrowRight,
    Clock,
    Users,
    CheckCircle2,
    ChevronDown,
} from "lucide-react";

const timeline = [
    { step: "Register & Pay", desc: "Complete the ₹129 registration fee via secure Razorpay gateway.", icon: "💳" },
    { step: "Confirmation", desc: "Receive an automated email with rules and important dates.", icon: "📧" },
    { step: "Assessment + Live Project", desc: "Work on 1 real-world project to showcase practical skills and problem-solving.", icon: "🧪" },
    { step: "DSA Round 1", desc: "Technical interview covering fundamental data structures & algorithms.", icon: "🧮" },
    { step: "HR Interview", desc: "Cultural fit, behavioral assessment, and expectations alignment.", icon: "🤝" },
    { step: "Offer & Rewards", desc: "Top 1–2: Apple Mac M4 laptops + placement (₹10–25 LPA). Top 3–10: Apple iPad Pro.", icon: "🎉" },
];

const faqs = [
    { q: "Who can participate?", a: "Anyone! Freshers and experienced professionals are both welcome. There are no prerequisites." },
    { q: "Is the ₹129 fee refundable?", a: "No. The registration fee is non-refundable as per our terms. Refunds are only issued if the event is cancelled by Genesis." },
    { q: "Can I use AI tools during the assessment?", a: "Absolutely not. Use of ChatGPT, Gemini, Copilot, or any AI coding assistant is strictly prohibited and will result in immediate disqualification." },
    { q: "When will I receive the assessment?", a: "Assessment/test links will be sent to your registered email 1 day before March 1st, 2026. The test will be conducted on March 1st, 2026." },
    { q: "What is the salary range?", a: "Top 1–2 candidates will receive placement opportunities with ₹10–25 LPA based on performance. Top 3–10 will receive Apple iPad Pro." },
    { q: "When will winners be announced?", a: "Winners will be announced on March 8th, 2026 at 5:30 PM IST exactly." },
];

declare global {
    // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
    var Razorpay: any | undefined;
}

function loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof window === "undefined") {
            return resolve(false);
        }

        if (window.Razorpay) {
            return resolve(true);
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
}

export default function HackathonPage() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/payment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok || data.error) {
                alert(data.error || "Unable to initiate payment. Please try again.");
                return;
            }

            const scriptLoaded = await loadRazorpayScript();
            if (!scriptLoaded || typeof window === "undefined" || !window.Razorpay) {
                alert("Unable to load payment gateway. Please check your connection and try again.");
                return;
            }

            const options: {
                key: string;
                amount: number;
                currency: string;
                name: string;
                description: string;
                order_id: string;
                prefill: {
                    name: string;
                    email: string;
                    contact: string;
                };
                notes: Record<string, string>;
                theme: { color: string };
                handler: (response: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => Promise<void>;
                modal: { ondismiss: () => void };
            } = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "Genesis Labs Hackathon 2026",
                description: "Hackathon Registration Fee",
                order_id: data.razorpayOrderId,
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    hackathon: "Genesis Labs Hackathon 2026",
                },
                theme: {
                    color: "#4f46e5",
                },
                handler: async (response) => {
                    try {
                        const verifyRes = await fetch("/api/payment/verify", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyRes.ok && verifyData.success) {
                            window.location.href = `/payment-success?id=${response.razorpay_order_id}`;
                        } else {
                            window.location.href = "/payment-failure?reason=verification_error";
                        }
                    } catch (err) {
                        console.error("Verification Error:", err);
                        window.location.href = "/payment-failure?reason=verification_error";
                    }
                },
                modal: {
                    ondismiss: () => {
                        // User closed the Razorpay modal, no action needed
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* ─── HERO ─── */}
            <section className="text-center py-16 md:py-24">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                    <Trophy size={16} className="text-primary-400" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary-300">
                        Hiring Challenge
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="section-heading mb-6"
                >
                    Genesis Labs <span className="gradient-text">Hackathon 2026</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="section-subheading mx-auto mb-8"
                >
                    Compete for a full-time SDE-1 Remote role with ₹10–25 LPA salary and exciting Apple hardware rewards.
                    Open to freshers. Prove your skills. Land your dream job.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-2 mb-12 text-sm text-neutral-400"
                >
                    <Clock size={16} className="text-accent" />
                    <span>Registration closes February 28, 2026</span>
                </motion.div>

                {/* Quick info pills */}
                <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                    <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-neutral-300">
                        <Target size={14} className="text-primary" /> SDE-1 Role
                    </div>
                    <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-neutral-300">
                        <Users size={14} className="text-accent" /> Freshers Welcome
                    </div>
                    <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-neutral-300">
                        <Calendar size={14} className="text-green-400" /> Remote Position
                    </div>
                </div>
            </section>

            {/* ─── MAIN GRID ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-32">
                {/* Left: Process + Rules (3 cols) */}
                <div className="lg:col-span-3 space-y-12">
                    {/* Process Flow */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Code className="text-primary" size={22} /> Selection Process
                        </h2>
                        <div className="space-y-1">
                            {timeline.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    viewport={{ once: true }}
                                    className="flex gap-4 group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-base group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                                            {item.icon}
                                        </div>
                                        {idx !== timeline.length - 1 && (
                                            <div className="w-px h-full bg-white/[0.06] my-1" />
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <h3 className="font-semibold text-white mb-1">{item.step}</h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Important Dates */}
                    <section className="glass-card p-8">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <Calendar className="text-primary" size={20} /> Important Dates
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Assessment Links Sent</h3>
                                    <p className="text-sm text-neutral-500">February 28, 2026 (1 day before test)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Test Date</h3>
                                    <p className="text-sm text-neutral-500">March 1, 2026</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Winners Announcement</h3>
                                    <p className="text-sm text-neutral-500">March 8, 2026 at 5:30 PM IST</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Strict Rules */}
                    <section className="bg-red-500/[0.04] border border-red-500/10 p-8 rounded-2xl">
                        <h2 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} /> Strict Rules
                        </h2>
                        <ul className="space-y-3 text-sm text-neutral-400 leading-relaxed">
                            <li className="flex gap-2">
                                <span className="text-red-400 mt-0.5">•</span>
                                Use of AI tools (ChatGPT, Gemini, Copilot, etc.) during assessment is <strong className="text-red-300">strictly prohibited</strong>.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-red-400 mt-0.5">•</span>
                                Any malpractice detected via our proctoring system leads to <strong className="text-red-300">immediate disqualification without refund</strong>.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-red-400 mt-0.5">•</span>
                                Registration fee of ₹129 is non-refundable.
                            </li>
                        </ul>
                    </section>

                    {/* FAQ */}
                    <section>
                        <h2 className="text-2xl font-bold mb-8">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <div
                                    key={i}
                                    className="glass rounded-xl overflow-hidden transition-all"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <span className="font-medium text-sm">{faq.q}</span>
                                        <ChevronDown
                                            size={18}
                                            className={`text-neutral-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="px-5 pb-5"
                                        >
                                            <p className="text-sm text-neutral-500 leading-relaxed">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right: Registration Form (2 cols) */}
                <div className="lg:col-span-2">
                    <div className="glass rounded-[2rem] p-8 md:p-10 sticky top-32">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold">Register Now</h2>
                            <div className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20">
                                <span className="text-accent text-sm font-bold">₹129</span>
                            </div>
                        </div>
                        <p className="text-sm text-neutral-500 mb-8">
                            Secure your spot. Limited registrations.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    className="input-field"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                    Email Address
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    className="input-field"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                    Phone Number
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    className="input-field"
                                    value={formData.phone}
                                    onChange={(e) =>
                                        setFormData({ ...formData, phone: e.target.value })
                                    }
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full btn-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                                            Processing...
                                        </span>
                                    ) : (
                                        <>
                                            Proceed to Payment <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-neutral-600 uppercase tracking-widest">
                            <CheckCircle2 size={12} />
                            Secured by Razorpay
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
