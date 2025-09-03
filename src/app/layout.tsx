import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NavDrawerWrapper from "@/components/ui/NavDrawerWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Muhammad Asim - Portfolio",
  description: "Full-Stack Web Developer specializing in React, Next.js and modern web technologies",
  keywords: "web developer, full-stack, react, nextjs, javascript, typescript, portfolio",
  authors: [{ name: "Muhammad Asim" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased dark`}>
        <NavDrawerWrapper/>
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
