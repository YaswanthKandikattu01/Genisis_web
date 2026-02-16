"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Sparkles, MessageSquare, Brain, Shield, BookOpen, ChevronDown, HelpCircle } from "lucide-react";

const capabilities = [
    { icon: Brain, title: "Multi-Domain Q&A", desc: "From science to coding, history to mathematics — Genesis handles questions across every subject." },
    { icon: BookOpen, title: "Beginner Explanations", desc: "Complex topics broken down into digestible, easy-to-understand explanations with examples." },
    { icon: Shield, title: "Safe & Moderated", desc: "Enterprise-grade content moderation ensures safe, appropriate responses for users of all ages." },
    { icon: MessageSquare, title: "Conversational", desc: "Natural dialogue flow with context awareness. Ask follow-ups just like you would with a tutor." },
];

const roadmap = [
    { q: "Q1 2026", title: "Public Beta", desc: "Open access with multi-domain Q&A and beginner mode." },
    { q: "Q2 2026", title: "Pro Features", desc: "Advanced reasoning, code execution, and file uploads." },
    { q: "Q3 2026", title: "API Launch", desc: "Developer API for integrating Genesis into your applications." },
    { q: "Q4 2026", title: "Enterprise", desc: "Team dashboards, SSO, and custom model fine-tuning." },
];

const faqs = [
    { q: "Is Genesis free to use?", a: "Yes! Genesis offers a free tier with generous usage limits. Premium plans will be available for power users." },
    { q: "How is Genesis different from ChatGPT?", a: "Genesis is specifically designed for beginners. Our responses are simpler, more structured, and include visual aids. We focus on education and accessibility." },
    { q: "What domains does Genesis cover?", a: "Science, Technology, Mathematics, History, Literature, Programming, Art, Music, and more. We're constantly expanding our capabilities." },
    { q: "Is my data safe?", a: "Absolutely. We don't store your conversations. All interactions are encrypted end-to-end. See our Privacy Policy for full details." },
];

export default function GenesisPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* ─── HERO ─── */}
            <section className="text-center py-20 md:py-32">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
                >
                    <Sparkles size={16} className="text-accent" />
                    <span className="text-sm font-semibold uppercase tracking-wider text-accent-300">
                        Our Product
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="section-heading mb-6"
                >
                    Meet <span className="gradient-text">Genesis Labs</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="section-subheading mx-auto mb-6"
                >
                    Your beginner-friendly AI assistant that answers questions across every
                    domain with clear, jargon-free explanations.
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-neutral-500 max-w-xl mx-auto"
                >
                    Genesis Labs is a Large Language Model (LLM) built with accessibility at its core.
                    Unlike traditional AI assistants, Genesis Labs prioritizes simplicity — making AI
                    technology available to everyone, regardless of technical background.
                </motion.p>
            </section>

            {/* ─── CAPABILITIES ─── */}
            <section className="pb-32">
                <div className="text-center mb-16">
                    <h2 className="section-heading mb-6">Core <span className="gradient-text">Capabilities</span></h2>
                    <p className="section-subheading mx-auto">What makes Genesis different.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <cap.icon size={22} className="text-primary-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{cap.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{cap.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── ROADMAP ─── */}
            <section className="pb-32">
                <div className="text-center mb-16">
                    <h2 className="section-heading mb-6">Product <span className="gradient-text">Roadmap</span></h2>
                </div>
                <div className="max-w-3xl mx-auto space-y-6">
                    {roadmap.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card flex gap-6 items-start"
                        >
                            <div className="flex-shrink-0 w-20 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary-400">
                                {item.q}
                            </div>
                            <div>
                                <h3 className="font-bold mb-1">{item.title}</h3>
                                <p className="text-sm text-neutral-500">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="pb-32 max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="section-heading mb-6">FAQ</h2>
                </div>
                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass rounded-xl overflow-hidden">
                            <button
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-medium text-sm flex items-center gap-2">
                                    <HelpCircle size={16} className="text-primary-400" /> {faq.q}
                                </span>
                                <ChevronDown
                                    size={18}
                                    className={`text-neutral-500 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                                />
                            </button>
                            {openFaq === i && (
                                <div className="px-5 pb-5">
                                    <p className="text-sm text-neutral-500 leading-relaxed">{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
