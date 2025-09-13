import { Metadata } from "next";
import { servicesSchema } from "../structured-data";

export const metadata: Metadata = {
  title: "Services - Muhammad Asim | Full Stack Development & Web Solutions",
  description: "Professional web development services including landing pages, ecommerce solutions, full-stack applications, and custom web development. Get your project built with modern technologies.",
  keywords: ["web development services", "landing page development", "ecommerce development", "full-stack development", "React development", "Next.js development", "custom web applications"],
  openGraph: {
    title: "Web Development Services - Muhammad Asim",
    description: "Professional web development services for businesses. Landing pages, ecommerce, and custom applications built with modern technologies.",
    type: "website",
    images: ["/assets/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://codingwithasim.vercel.app/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(servicesSchema),
        }}
      />
      {children}
    </>
  );
}