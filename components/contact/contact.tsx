"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

import { siteConfig } from "@/lib/site";

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}?subject=New%20project%20inquiry`,
    icon: Mail,
    primary: true,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.socials.linkedin,
    icon: FaLinkedin,
    primary: false,
  },
  {
    label: "GitHub",
    value: "See what I'm building",
    href: siteConfig.socials.github,
    icon: FaGithub,
    primary: false,
  },
  {
    label: "Instagram",
    value: "Follow me on Instagram",
    href: siteConfig.socials.instagram,
    icon: FaInstagram,
    primary: false,
  },
];

export default function Contact() {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Get in touch
          </p>

          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl md:text-7xl ">
            Let&apos;s build
            <br />
            <span className="text-muted-foreground">
              something together.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Tell me a bit about your project: what you need, when you need it,
            and a budget range if you have one. I&apos;ll get back to you
            within 24 hours with questions or next steps. And if I&apos;m not
            the right fit, I&apos;ll tell you honestly.
          </p>
        </div>

        {/* Contact links */}
        <div className="mt-20 border-t border-border">
          {contactLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group px-2 flex items-center justify-between border-b border-border py-7 transition-colors duration-300 hover:bg-muted/30 sm:py-8"
              >
                <div className="flex items-center gap-5">
                  <div className="flex size-11 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-all duration-500 group-hover:scale-105 group-hover:bg-muted group-hover:text-foreground">
                    <Icon className="size-[19px]" />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      {item.label}
                    </p>

                    <p className="mt-1 text-lg font-medium tracking-tight sm:text-xl">
                      {item.value}
                    </p>
                  </div>
                </div>

                <ArrowUpRight
                  className="size-5 text-muted-foreground transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground"
                  strokeWidth={1.5}
                />
              </Link>
            );
          })}
        </div>

        {/* Bottom information */}
        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <MapPin className="size-4 text-muted-foreground" />
              Based in
            </div>

            <p className="text-muted-foreground">
              Rouen, France 🇫🇷 · working with clients everywhere
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium">
              Currently
            </p>

            <p className="text-muted-foreground">
              Taking on new projects 🚀
            </p>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium">
              Languages
            </p>

            <p className="text-muted-foreground">
              English & Français
            </p>
          </div>
        </div>

        {/* Personality / closing */}
        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-end">
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            No complicated forms. No twelve-step sales funnel. 🙂
            <br />
            Just send me a message.
          </p>

          <p className="text-sm text-muted-foreground">
            Usually building something.
          </p>
        </div>
      </div>
    </section>
  );
}