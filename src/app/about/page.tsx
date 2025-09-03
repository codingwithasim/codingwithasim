import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { LuCodeXml, LuDownload, LuGithub, LuInstagram, LuLinkedin } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";

type ContactMethod = {
  name: string,
  icon: IconType,
  href: string
}

export default function About() {
  const experience = [
    {
      year: '2023 - Present',
      company: 'Freelance Developer',
      role: 'Full-Stack Developer',
      description: 'Building scalable web applications and developer tools for clients worldwide.',
      achievements: ['Reduced build times by 48%', 'Improved Core Web Vitals by 35%', 'Delivered 12+ projects']
    },
    {
      year: '2021 - 2023',
      company: 'TechCorp',
      role: 'Senior Frontend Developer',
      description: 'Led frontend development for enterprise applications serving 100k+ users.',
      achievements: ['Led team of 5 developers', 'Implemented performance monitoring', 'Reduced bundle size by 40%']
    },
    {
      year: '2019 - 2021',
      company: 'StartupXYZ',
      role: 'Full-Stack Developer',
      description: 'Built and scaled web applications from MVP to production.',
      achievements: ['Built 3 core products', 'Improved API response time by 60%', 'Implemented CI/CD pipeline']
    }
  ];

  const interests = [
    'Open Source Development',
    'Performance Optimization',
    'Developer Experience',
    'Web Standards',
    'System Architecture',
    'Machine Learning'
  ];

  const currentFocus = [
    'Building developer tools',
    'Performance optimization',
    'Open source contributions',
    'Technical writing',
    'Learning Rust and WebAssembly'
  ];

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
    }
  ];

  const techSkills = [
    { name: "Web basics", level: 80 },
    { name: "React", level: 75 },
    { name: "Next.js", level: 70 },
    { name: "Tailwind CSS", level: 70 },
    { name: "Node.js", level: 65 },
    { name: "Git/GitHub", level: 75 },
  ];
  

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <div className="grid place-items-center gap-4">
            <div className="size-16 grid place-items-center bg-[#252525] rounded-full relative">
              <LuCodeXml size={22} />
              <div className="inset-0 absolute rounded-full border-2 border-transparent border-t-[#a3a3a3] animate-[spin_5s_infinite]">

              </div>
            </div>
            <span>Hi, I'm Muhammad Asim</span>
            <span className="text-[#7e7e7e] max-w-2xl text-center">
            A passionate full-stack developer with 2+ years of experience crafting digital experiences that blend beautiful design with powerful functionality. I turn complex problems into elegant, user-friendly solutions.
            </span>
          </div>


          <nav >
            <ul className="flex gap-2 justify-center py-8">
              {contactMethods.map(({icon: Icon, ...social}, index) => (
                    <li key={index} >
                      <Link href={social.href} target="_blank" className="size-12 grid place-items-center rounded-full border border-gray-700 hover:border-gray-600 transition-colors hover:bg-[#181818] mb-3 cursor-pointer">
                        <Icon size={18} />
                      </Link>
                    </li>
                  )
                )
              }
            </ul>
          </nav>
        </div>
      </section>

      <div className="container-custom flex flex-col pb-24">
        {/* Bio Section */}

        <div className="grid grid-cols-1 md:grid-cols-2">
            <Card className="border-[#464646] border-b-0 rounded-b-none md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none bg-black">
              <CardTitle className="px-6 py-12">
                Who I Am
              </CardTitle>
              <CardContent className="text-justify text-gray-200 flex flex-col gap-8">
                <p>
                  I'm <span className="font-semibold">Muhammad Asim</span>, a web developer with <span className="font-semibold">2+ years of experience</span> building applications that developers love to use. My journey began with curiosity about how things work in Android, which led me to discover web development.
                </p>
                
                <p>
                   I've worked with <span className="font-semibold">HTML, CSS, JavaScript, PHP</span>, and taught myself modern frameworks like <span className="font-semibold">React, Next.js, Tailwind, and Node.js</span>. I focus on creating software that balances <span className="font-semibold">technical performance with user needs</span>, ensuring every project is <span className="font-semibold">fast, maintainable, and user-friendly</span>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#464646] rounded-t-none md:rounded-r-lg md:rounded-l-none bg-black">
              <CardTitle className="px-6 py-12">
                Technical Expertise
              </CardTitle>
              <CardContent className="text-justify">
                <ul className="flex f flex-col">
                    {
                      techSkills.map(skill => {
                        return (
                          <li key={skill.name} className="py-3 flex flex-col text-sm gap-4 group">
                            <div className="flex items-center gap-4">
                              <span className="text-gray-300 group-hover:text-white w-[180px]">{skill.name}</span>
                              <Progress indicatorStyle="bg-[#717171] group-hover:bg-white transition-colors" value={skill.level} max={100}/>
                              <span className="text-gray-300 group-hover:text-white w-[100px]">{skill.level}%</span>
                            </div>
                          </li>
                        )
                      })
                    }
                </ul>
              </CardContent>
            </Card>
        </div>
        

          <h4 className="place-self-center py-12 pt-18"> Building with Purpose</h4>


        <div className="grid grid-cols-1 md:grid-cols-2  relative">
            

            <Card className="border-[#464646] order-1 md:order-0 rounded-t-none  md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none bg-black">
              <CardContent className="text-justify text-gray-200 py-12  md:py-24">
                <span className="text-xl font-[300]">
                  Code with Intention
                </span>
                
                <p className=" text-gray-300 font-[250] mt-2  ">
                  I believe great software isn’t just about clean code — it’s about solving real problems for real people. Every project I build focuses on performance, simplicity, and user experience, so that the end result is something both developers and users enjoy using.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#464646] h-28 md:h-full rounded-b-none border-b-0 md:rounded-r-lg md:rounded-l-none bg-black md:border-b overflow-hidden">
              <CardContent className="text-justify h-full relative">
              <Image src={"/assets/overlay.jpg"} fill alt="" className="object-cover absolute top-0 bottom-0 left-0 right-0 z-99"/>
              </CardContent>
            </Card>
        </div>

        {/* Interests & Current Focus */}
        {/* <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Interests</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <span key={index} className="badge badge-secondary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Current Focus</h2>
              <div className="space-y-3">
                {currentFocus.map((focus, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                    <span className="text-white/70">{focus}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="text-center border-t border-b border-[#303030] py-12">
          <div className=" max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-white mb-4">
              Ready to work together?
            </h4>
            <p className="text-white/70 mb-6">
              Let's discuss your project and see how I can help bring your ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/contact">
                  Get in Touch
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="/resume">
                  <LuDownload/>
                  Download Resume
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}