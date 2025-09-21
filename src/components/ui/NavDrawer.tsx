import Link from "next/link"
import { useEffect } from "react"

type NavDrawerProps = {
    open: boolean,
    onClose: ()=> void
}

export default function NavDrawer({open, onClose}: NavDrawerProps) {

    const navItems = [
        {
            name: "Home",
            href: "/"
        },
        {
            name: "Projects",
            href: "/projects"
        },
        {
            name: "Services",
            href: "/services"
        },
        {
            name: "About",
            href: "/about"
        },
        {
            name: "Uses",
            href: "/uses"
        }
    ]

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [open])

    return (
        <div 
            className={`fixed top-16 overflow-y-scroll overscroll-none inset-0 z-50 bg-background/30 backdrop-blur-sm md:hidden ${!open && "hidden"}`} 
            onClick={()=> open && onClose()}>
            <nav className="h-full w-full" onClick={(e) => e.stopPropagation()}>
                <ul className={`h-full w-full bg-background px-4`}>
                    {
                        navItems.map((nav, index) => {
                            return (
                                <li
                                    onClick={onClose}
                                    key={index}>
                                    <Link href={nav.href} className="block p-2 px-3 hover:bg-muted/50 rounded-md text-foreground">
                                        {nav.name}
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
        </div>
    )
}
