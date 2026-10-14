import type { Metadata } from "next";

import { faqs } from "@/components/home/faq";
import HomePage from "@/components/home/home-page";
import { projects } from "@/components/home/projects";
import JsonLd from "@/components/seo/json-ld";
import { faqPage, pageMetadata, profilePage, projectWork, structuredData } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/" });

export default function Home() {
  return (
    <>
      <JsonLd data={structuredData(profilePage(), faqPage(faqs), ...projects.map(projectWork))} />
      <HomePage/>
    </>
  );
}
