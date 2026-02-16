"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Genesis Labs", href: "/genesis" },
  { name: "Hackathon", href: "/hackathon" },
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`glass rounded-2xl px-6 py-3 flex items-center justify-between transition-all duration-500 ${scrolled ? "shadow-lg shadow-black/20" : ""}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">Gene</span>
              <span className="gradient-text">sis</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${pathname === link.href
                    ? "text-white bg-white/[0.08]"
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/hackathon"
              className="px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-1.5"
            >
              Register Now <ChevronRight size={16} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2 glass rounded-2xl p-4 space-y-1"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium rounded-xl transition-all ${pathname === link.href
                      ? "text-white bg-white/[0.08]"
                      : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/[0.06]">
                <Link
                  href="/hackathon"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-xl text-sm font-semibold text-center"
                >
                  Register for Hackathon
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
