import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { ArrowUpRight } from "lucide-react";


export default function Header() {
    return (
        <header className="relative z-10 flex min-h-16 items-center border-b bg-background px-4 py-3 sm:px-6">
            {/* Navigation */}
            <div className="mx-auto min-w-0 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
                <NavigationMenu>
                    <NavigationMenuList className="gap-0 sm:gap-1">
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="/projects"
                            >
                                Projects
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="/services"
                            >
                                Services
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink
                                className={navigationMenuTriggerStyle()}
                                href="/about"
                            >
                                About me
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            {/* Contact */}
            <Link
                href="#contact"
                className="ml-auto hidden items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted sm:inline-flex"
            >
                Contact me
                <ArrowUpRight className="size-4" />
            </Link>
        </header>
    )
}