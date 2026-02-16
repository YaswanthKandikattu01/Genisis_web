"use client";

import { motion } from "framer-motion";
import { Bot, Zap, Globe, Shield, Lightbulb, Code, BookOpen, Lock, Cpu, BarChart3 } from "lucide-react";

const features = [
    { icon: Bot, title: "Natural Language Understanding", desc: "Ask questions in plain English. No prompts, no formatting — just natural conversation." },
    { icon: Lightbulb, title: "Beginner-Friendly Explanations", desc: "Every answer is crafted to be understandable by anyone, regardless of technical background." },
    { icon: Globe, title: "Multi-Domain Knowledge", desc: "From STEM to humanities, business to creative arts — Genesis covers 100+ domains." },
    { icon: Code, title: "Code Assistance", desc: "Write, debug, and understand code with step-by-step explanations in 50+ languages." },
    { icon: Shield, title: "Content Safety", desc: "Advanced moderation ensures all responses are appropriate, accurate, and bias-free." },
    { icon: Zap, title: "Real-Time Processing", desc: "Sub-second response times with optimized inference and edge computing." },
    { icon: BookOpen, title: "Learning Paths", desc: "Structured learning recommendations tailored to your skill level and interests." },
    { icon: Lock, title: "Privacy First", desc: "Zero data retention. Your conversations are never stored or used for training." },
    { icon: Cpu, title: "API Access", desc: "Integrate Genesis into your applications with our developer-friendly REST API." },
    { icon: BarChart3, title: "Usage Analytics", desc: "Track your learning progress with detailed insights and usage statistics." },
];

export default function FeaturesPage() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <section className="py-20 md:py-28 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-heading mb-6"
                >
                    Powerful <span className="gradient-text">Features</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="section-subheading mx-auto"
                >
                    Everything you need from an AI assistant, designed to be simple yet incredibly capable.
                </motion.p>
            </section>

            <section className="pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="glass-card group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                <f.icon size={22} className="text-primary-400" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
