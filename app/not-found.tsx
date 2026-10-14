import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Footer from "@/components/home/footer";
import Header from "@/components/home/header";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="flex min-h-[80vh] items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Error 404
          </p>

          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl">
            This page
            <br />
            <span className="text-muted-foreground">doesn&apos;t work.</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Ironic, I know. The page you&apos;re looking for doesn&apos;t
            exist or has moved. Everything else here actually works, promise.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              Back to home
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted"
            >
              Start a project
              <ArrowUpRight className="size-5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
