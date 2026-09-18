import Link from "next/link";
import { IconType } from "react-icons";

import { FaInstagram } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { LuLinkedin } from "react-icons/lu";
import { VscTwitter } from "react-icons/vsc";

type SocialMedia = {
  name: string;
  url: string;
  icon: IconType;
};

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About me", href: "#about" },
];

const socialMediaLinks: SocialMedia[] = [
  {
    name: "Github",
    url: "https://github.com/codingwithasim",
    icon: FiGithub,
  },
  {
    name: "Instagram",
    url: "https://instagram.com/codingwithasim",
    icon: FaInstagram,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/codingwithasim",
    icon: LuLinkedin,
  },
  {
    name: "X",
    url: "https://x.com/codingwithasim",
    icon: VscTwitter,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-zinc-950 transition-colors dark:text-zinc-50"
            >
              Muhammad Asim
              <span className="text-zinc-400 dark:text-zinc-600">.</span>
            </Link>

            <p className="mt-3 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
              Full-stack web developer building modern web applications with
              React, Next.js, TypeScript and Supabase.
            </p>
          </div>

          {/* Navigation + Socials */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
            <nav className="flex items-center gap-6 text-sm">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-zinc-500 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-5">
              {socialMediaLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="text-zinc-400 transition-colors hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-zinc-50"
                  >
                    <Icon size={19} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t border-zinc-100 pt-6 text-xs text-zinc-400 dark:border-zinc-800/80 dark:text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Muhammad Asim. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}