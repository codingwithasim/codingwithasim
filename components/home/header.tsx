"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ArrowUpRight, LoaderCircle, Moon, Sun } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"
import { Button } from "../ui/button"

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="relative z-10 flex min-h-16 items-center border-b bg-background px-3 py-3 sm:px-6">
      {/* Navigation */}
      <div className="absolute left-1/2 top-1/2 max-w-[calc(100%-5rem)] -translate-x-1/2 -translate-y-1/2">
        <NavigationMenu>
          <NavigationMenuList className="gap-0 sm:gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/projects"
                className={`${navigationMenuTriggerStyle()} px-2.5 text-xs sm:px-4 sm:text-sm`}
              >
                Projects
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/services"
                className={`${navigationMenuTriggerStyle()} px-2.5 text-xs sm:px-4 sm:text-sm`}
              >
                Services
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/about"
                className={`${navigationMenuTriggerStyle()} px-2.5 text-xs sm:px-4 sm:text-sm`}
              >
                About me
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right-side actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
        <Button
          variant="outline"
          size="icon"
          className="size-9 cursor-pointer rounded-full"
          onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }}
          aria-label="Toggle theme"
        >
          {mounted ? (
            resolvedTheme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )
          ) : (
            <LoaderCircle className="size-4 animate-spin" />
          )}
        </Button>

        {/* Contact */}
        <Link
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted sm:inline-flex"
        >
          Contact me
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </header>
  )
}