import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Genesis | Beginner-Friendly AI Platform",
  description:
    "Genesis is a beginner-friendly Large Language Model platform that answers your questions across domains. Join the AI revolution today.",
  keywords: ["AI", "LLM", "Genesis", "Hackathon", "Beginner-Friendly AI"],
  openGraph: {
    title: "Genesis | Beginner-Friendly AI Platform",
    description: "The world's most accessible AI assistant.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050507" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen relative`}>
        {/* Background layers */}
        <div className="fixed inset-0 bg-surface -z-50" />
        <div className="fixed inset-0 bg-grid -z-40 opacity-100" />
        <div className="fixed inset-0 bg-radial-top -z-30" />
        <div className="fixed inset-0 bg-radial-accent -z-30" />

        <Navbar />
        <main className="pt-28 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
