import type { Metadata } from "next";

import Contact from "@/components/contact/contact";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import JsonLd from "@/components/seo/json-ld";
import { contactPage, pageMetadata, structuredData } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Hire Me",
  description:
    "Get in touch with Muhammad Asim, a full-stack web developer in Rouen, France. Open to new React, Next.js and Supabase projects via email, LinkedIn or GitHub.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData(contactPage())} />
      <Header />

      <main>
        <Contact />
      </main>

      <Footer />
    </div>
  );
}