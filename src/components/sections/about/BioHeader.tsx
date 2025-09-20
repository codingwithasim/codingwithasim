'use client';

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF } from "react-icons/fa";
import { LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { useLanguage } from "@/contexts/LanguageContext";

type ContactMethod = {
  name: string,
  icon: IconType,
  href: string
}

export default function AboutHeader(){
    const { t } = useLanguage();

    const contactMethods: ContactMethod[] = [
        {
          name: 'Instagram',
          icon: LuInstagram,
          href: 'https://www.instagram.com/CodingWithAsim/',
        },
        {
          name: 'LinkedIn',
          icon: LuLinkedin,
          href: 'https://www.linkedin.com/in/codingwithasim/',
        },
        {
          name: 'GitHub',
          icon: LuGithub,
          href: 'https://github.com/codingwithasim',
        },
        {
          name: 'X',
          icon: RiTwitterXFill,
          href: "https://x.com/codingwithasim"
        },
        {
          name: 'Facebook',
          icon: FaFacebookF,
          href: "https://www.facebook.com/profile.php?id=61580246404401"
        }
      ];


    return (
        <section className="pt-32 pb-16 relative">
          <div className="flex flex-col relative">
          <div className="grid place-items-center gap-4">
            <div className="size-36 grid place-items-center overflow-clip bg-muted rounded-full relative">
              <Image fill src="/assets/profile.jpeg" alt="Muhammad Asim" />
              <div className="inset-0 absolute rounded-full">

              </div>
            </div>
            <h5>{t('about.header.greeting')}</h5>
            <span className="text-muted-foreground max-w-2xl text-center">
            {t('about.header.description')}
            </span>
          </div>


          <nav >
            <ul className="flex gap-2 justify-center py-8">
              {contactMethods.map(({icon: Icon, ...social}, index) => (
                    <li key={index} >
                      <Link href={social.href} target="_blank" className="size-12 grid place-items-center rounded-full border border-border hover:border-muted-foreground transition-colors hover:bg-muted mb-3 cursor-pointer">
                        <Icon size={18} />
                      </Link>
                    </li>
                  )
                )
              }
            </ul>
          </nav>

          <Badge variant="secondary" className="place-self-center py-1.5 flex gap-2">
          <div className="size-1.5 bg-foreground animate-pulse rounded-full"></div>

          {t('about.header.status')}
          </Badge>
        </div>
      </section>
    )
}