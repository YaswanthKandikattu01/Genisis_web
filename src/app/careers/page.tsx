"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Trophy, Users, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const benefits = [
    "Competitive salary: ₹10–16 LPA",
    "100% Remote work culture",
    "Equity participation (ESOPs)",
    "Learning & development budget",
    "Flexible working hours",
    "Health insurance for you + family",
];

export default function CareersPage() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* ─── HERO ─── */}
            <section className="py-20 md:py-28 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                >
                    <Sparkles size={16} className="text-primary-400" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-primary-300">
                        We&apos;re Hiring
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="section-heading mb-6"
                >
                    Build the Future <span className="gradient-text">With Us</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="section-subheading mx-auto"
                >
                    Join a team of builders creating the world&apos;s most accessible AI platform.
                    Apply exclusively via the hackathon below.
                </motion.p>
            </section>

            {/* ─── OPEN ROLE ─── */}
            <section className="pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                    <div className="flex flex-wrap gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider">
                            Active
                        </span>
                        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider">
                            Remote
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Software Development Engineer – 1
                    </h2>
                    <p className="text-neutral-400 mb-8 max-w-2xl leading-relaxed">
                        We&apos;re looking for talented engineers to build and scale Genesis Labs.
                        You&apos;ll work on LLM integration, API development, and full-stack product features.
                    </p>

                    <div className="flex flex-wrap gap-6 mb-10 text-sm">
                        <div className="flex items-center gap-2 text-neutral-300">
                            <Briefcase size={16} className="text-primary-400" /> Full-Time
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                            <MapPin size={16} className="text-primary-400" /> Remote (India)
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                            <DollarSign size={16} className="text-primary-400" /> ₹10–16 LPA
                        </div>
                        <div className="flex items-center gap-2 text-neutral-300">
                            <Users size={16} className="text-primary-400" /> Freshers Welcome
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/hackathon" className="btn-white flex items-center justify-center gap-2">
                            <Trophy size={16} /> Apply via Hackathon
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ─── BENEFITS ─── */}
            <section className="pb-32">
                <h2 className="text-2xl font-bold mb-10 text-center">
                    Why Join <span className="gradient-text">Genesis</span>?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                    {benefits.map((b, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="glass-card flex items-center gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                            <span className="text-sm text-neutral-300">{b}</span>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── HOW TO APPLY ─── */}
            <section className="pb-32">
                <div className="max-w-2xl mx-auto text-center glass p-10 md:p-14 rounded-[2rem]">
                    <h2 className="text-2xl font-bold mb-6">How to Apply</h2>
                    <div className="grid grid-cols-1 gap-8 text-left max-w-md mx-auto">
                        <div className="space-y-3 p-6 glass border border-primary/20 rounded-2xl">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                <Trophy size={18} className="text-primary" />
                            </div>
                            <h3 className="font-semibold text-lg text-white">Exclusive Track: Genesis Hackathon</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed pb-2">
                                We are exclusively hiring our next SDE-1 through the Genesis Hackathon 2026. 
                                Secure your spot, build a live project, and prove your skills to get a direct offer!
                            </p>
                            <Link href="/hackathon" className="text-primary text-sm font-semibold flex items-center gap-2 hover:text-primary-300 transition-colors">
                                Go to Hackathon Page <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
