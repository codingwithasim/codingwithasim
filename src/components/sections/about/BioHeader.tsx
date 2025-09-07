import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { FaFacebookF } from "react-icons/fa";
import { LuCodeXml, LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";

type ContactMethod = {
  name: string,
  icon: IconType,
  href: string
}

export default function AboutHeader(){

    const contactMethods: ContactMethod[] = [
        {
          name: 'Instagram',
          icon: LuInstagram,
          href: 'https://www.instagram.com/CodingWithAsim/',
        },
        {
          name: 'LinkedIn',
          icon: LuLinkedin,
          href: 'https://www.linkedin.com/in/CodingWithAsim/',
        },
        {
          name: 'GitHub',
          icon: LuGithub,
          href: 'https://github.com/asim-muhammad',
        },
        {
          name: 'X',
          icon: RiTwitterXFill,
          href: "https://x.com/CodingWithAsim"
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
            <div className="size-36 grid place-items-center overflow-clip bg-[#252525] rounded-full relative">
              <Image fill src="/assets/profile.jpeg" alt="Muhammad Asim" />
              <div className="inset-0 absolute rounded-full">

              </div>
            </div>
            <h5>Hi there! I’m Muhammad Asim</h5>
            <span className="text-[#7e7e7e] max-w-2xl text-center">
            A passionate full-stack developer with 2+ years of experience crafting digital experiences that blend beautiful design with powerful functionality.
            </span>
          </div>


          <nav >
            <ul className="flex gap-2 justify-center py-8">
              {contactMethods.map(({icon: Icon, ...social}, index) => (
                    <li key={index} >
                      <Link href={social.href} target="_blank" className="size-12 grid place-items-center rounded-full border border-dark-800 hover:border-dark-700 transition-colors hover:bg-[#181818] mb-3 cursor-pointer">
                        <Icon size={18} />
                      </Link>
                    </li>
                  )
                )
              }
            </ul>
          </nav>

          <Badge variant="secondary" className="place-self-center py-1.5 flex gap-2">
          <div className="size-1.5 bg-white animate-pulse rounded-full"></div>

          Currently Taking on Projects
          </Badge>
        </div>
      </section>
    )
}