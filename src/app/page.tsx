"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Zap,
  Globe,
  Shield,
  Sparkles,
  Star,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeInOut" as any },
  }),
};

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "1M+", label: "Questions Answered" },
  { value: "120+", label: "Countries" },
  { value: "99.9%", label: "Accuracy Rate" },
];

const features = [
  {
    icon: Bot,
    title: "Beginner First",
    desc: "No prompt engineering needed. Just ask naturally and get clear, jargon-free answers.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Sub-second responses powered by optimized inference pipelines and edge computing.",
  },
  {
    icon: Globe,
    title: "Multi-Domain",
    desc: "From coding to science, history to creative writing — Genesis covers every domain.",
  },
  {
    icon: Shield,
    title: "Safe & Moderated",
    desc: "Enterprise-grade content moderation ensures safe interactions for all ages.",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CS Student",
    text: "Genesis helped me understand complex algorithms in simple terms. It's like having a personal tutor!",
  },
  {
    name: "Rahul Verma",
    role: "Startup Founder",
    text: "The accuracy and speed of Genesis is unmatched. We integrated it into our workflow seamlessly.",
  },
  {
    name: "Ananya Patel",
    role: "Content Creator",
    text: "I use Genesis daily for research and ideation. It's the most intuitive AI I've ever used.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center z-10 max-w-5xl"
        >
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-[0.2em]">
              Now in Private Beta
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8"
          >
            The Future of
            <br />
            <span className="gradient-text">Accessible AI</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Genesis is your beginner-friendly LLM companion. Ask anything, learn
            everything, and experience the power of AI — without the complexity.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/genesis" className="btn-white flex items-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <Link href="/hackathon" className="btn-secondary">
              Join Hackathon 2026
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-24 px-6 border-y border-white/[0.04]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold mb-6"
            >
              <Sparkles size={14} className="text-primary" /> Core Capabilities
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-heading mb-6"
            >
              Built for <span className="gradient-text">Everyone</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="section-subheading mx-auto"
            >
              Simple on the surface. Incredibly powerful underneath.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={22} className="text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{f.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-32 px-6 border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="section-heading mb-6">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="section-subheading mx-auto">
              See what our users are saying about Genesis.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-neutral-400 mb-6 leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass rounded-[2rem] p-12 md:p-20 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-accent/5 pointer-events-none" />
            <h2 className="section-heading mb-6 relative z-10">
              Ready to get started?
            </h2>
            <p className="section-subheading mx-auto mb-10 relative z-10">
              Join 50,000+ users already using Genesis. Or compete in our hackathon for a chance to join the team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/genesis" className="btn-white flex items-center gap-2">
                Try Genesis Free <ArrowRight size={18} />
              </Link>
              <Link href="/hackathon" className="btn-primary">
                Join Hackathon 2026
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
