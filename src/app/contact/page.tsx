"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send, Github, Twitter } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setSubmitted(true);
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                {/* Left */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="section-heading mb-8"
                    >
                        Get in <span className="gradient-text">Touch</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-neutral-400 mb-12 leading-relaxed"
                    >
                        Have questions about Genesis or the Hackathon? Our team is here to help.
                        Expect a response within 24 hours.
                    </motion.p>

                    <div className="space-y-8">
                        {[
                            { icon: Mail, title: "Email", desc: "support@genesis-ai.com" },
                            { icon: MessageCircle, title: "Live Chat", desc: "Available 10 AM – 6 PM IST" },
                            { icon: MapPin, title: "Office", desc: "Remote-First | HQ: Bengaluru, India" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex items-center gap-6 group"
                            >
                                <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <item.icon size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <p className="text-neutral-500 text-sm">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass p-10 md:p-12 rounded-[2rem]"
                >
                    {submitted ? (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                                <Send size={24} className="text-green-400" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                            <p className="text-neutral-500 text-sm">
                                We&apos;ll get back to you within 24 hours.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                            First Name
                                        </label>
                                        <input
                                            required
                                            className="input-field"
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                            Last Name
                                        </label>
                                        <input
                                            required
                                            className="input-field"
                                            placeholder="Doe"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                        Email Address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        className="input-field"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2 block">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="input-field resize-none"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <button
                                    disabled={submitting}
                                    type="submit"
                                    className="btn-white w-full flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {submitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
