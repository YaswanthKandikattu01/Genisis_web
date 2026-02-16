"use client";

import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Globe } from "lucide-react";

const values = [
    { icon: Target, title: "Accessibility First", desc: "We believe AI should be accessible to everyone. No technical expertise required." },
    { icon: Users, title: "Community Driven", desc: "Built with feedback from thousands of beta users across 120+ countries." },
    { icon: Lightbulb, title: "Education Focused", desc: "Every feature is designed to help users learn, grow, and understand." },
    { icon: Globe, title: "Global Impact", desc: "Making world-class AI available regardless of geography or background." },
];

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            {/* Hero */}
            <section className="py-20 md:py-28 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-heading mb-6"
                >
                    About <span className="gradient-text">Genesis</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="section-subheading mx-auto"
                >
                    We&apos;re on a mission to democratize access to artificial intelligence
                    and make AI truly understandable for everyone.
                </motion.p>
            </section>

            {/* Story */}
            <section className="pb-20 max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="glass-card"
                >
                    <h2 className="text-2xl font-bold mb-6">Our Story</h2>
                    <div className="space-y-4 text-sm text-neutral-400 leading-relaxed">
                        <p>
                            Genesis was born from a simple observation: AI tools are incredibly powerful,
                            but they&apos;re not designed for beginners. We set out to change that.
                        </p>
                        <p>
                            Our team of AI researchers, engineers, and educators came together to build
                            an LLM platform that prioritizes clarity, safety, and accessibility above all else.
                        </p>
                        <p>
                            Today, Genesis serves over 50,000 users across 120+ countries, helping students,
                            professionals, and curious minds explore the power of AI — without the intimidation.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Values */}
            <section className="pb-32">
                <h2 className="section-heading text-center mb-16">
                    Our <span className="gradient-text">Values</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                                <v.icon size={22} className="text-primary-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{v.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
