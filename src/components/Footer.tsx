import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
    Company: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
    ],
    Legal: [
        { name: "Terms & Conditions", href: "/terms" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Refund Policy", href: "/refunds" },
    ],
    Product: [
        { name: "Genesis AI", href: "/genesis" },
        { name: "Features", href: "/features" },
        { name: "Hackathon 2026", href: "/hackathon" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative border-t border-white/[0.04] bg-surface/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold">Genesis</span>
                        </Link>
                        <p className="text-neutral-500 text-sm leading-relaxed max-w-sm mb-6">
                            The world&apos;s most accessible AI platform. Built for beginners,
                            powered by advanced language models.
                        </p>
                        <p className="text-[11px] text-neutral-600 leading-relaxed">
                            Genesis Hackathon is an independent hiring initiative.
                            Final job offers are subject to internal evaluation and verification.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-5">
                                {category}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-neutral-600">
                        © 2026 Genesis AI Platform. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-xs text-neutral-600">Built with ❤️ for the future</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
