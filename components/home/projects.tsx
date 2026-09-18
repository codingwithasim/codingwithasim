import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Project = {
  id: number
  title: string
  category: string
  description: string
  image: string
  technologies: Array<string>
  link: string
}

type ProjectItemProps = {
  index: number
  project: Project
}

const projects: Array<Project> = [
  {
    id: 1,
    title: "Advanced E-Commerce Platform",
    category: "Full Stack Development",
    description:
      "A high-performance commerce platform with real-time inventory, intelligent search, and seamless payments—built to stay fast when traffic gets heavy.",
    image:
      "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=2070&auto=format&fit=crop",
    technologies: ["Next.js", "TypeScript", "Prisma", "Stripe", "TailwindCSS"],
    link: "#",
  },
  {
    id: 2,
    title: "Enterprise Dashboard System",
    category: "Data Visualization",
    description:
      "An analytics platform that turns complex datasets into clear, interactive insights with real-time updates and automated reporting.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    technologies: ["React", "D3.js", "GraphQL", "Node.js", "AWS"],
    link: "#",
  },
  {
    id: 3,
    title: "Multi-platform Mobile Application",
    category: "Mobile Development",
    description:
      "A productivity-focused mobile experience with offline support, push notifications, and reliable cloud synchronization across devices.",
    image:
      "https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=2050&auto=format&fit=crop",
    technologies: ["React Native", "Firebase", "Redux", "Jest", "TypeScript"],
    link: "#",
  },
]

export default function Projects() {
  return (
    <section id="projects" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Selected work
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            Things I&apos;ve
            <span className="text-muted-foreground"> built.</span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            A collection of projects where design, engineering, and a
            questionable amount of coffee came together 😎
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, index) => {
            return (
              <ProjectItem
                key={project.id}
                index={index}
                project={project}
              />
            )
          })}
        </div>
        
      </div>
    </section>
  )
}

function ProjectItem({index, project}: ProjectItemProps){
  return (
    <article
      className={cn(
        "group grid items-center gap-8 md:gap-12 lg:grid-cols-2 lg:gap-20",
        index % 2 === 1 && "lg:[&>*:first-child]:order-2"
      )}
    >
      {/* Image */}
      <Link
        href={project.link}
        className="group/image relative block overflow-hidden rounded-2xl border bg-muted"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/image:bg-black/10" />

          {/* Project number */}
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
              {String(project.id).padStart(2, "0")}
            </span>
          </div>

          {/* View icon */}
          <div className="absolute bottom-5 right-5 flex size-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100">
            <ArrowUpRight className="size-5" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="max-w-xl">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-border" />

          <span className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {project.category}
          </span>
        </div>

        <h3 className="text-3xl font-medium tracking-tight sm:text-4xl">
          {project.title}
        </h3>

        <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <Badge
              key={technology}
              variant="secondary"
              className="rounded-full px-3 py-1 font-normal"
            >
              {technology}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Link
          href={project.link}
          className="group/link mt-8 inline-flex items-center gap-2 text-sm font-medium"
        >
          View project
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          <span className="absolute mt-6 h-px w-0 bg-foreground transition-all duration-300 group-hover/link:w-24" />
        </Link>
      </div>
    </article>
  )
}