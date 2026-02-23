"use client"

import Navigation from "../Navigation";
import NavDrawer from "./NavDrawer";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavDrawerWrapper() {
    const pathname = usePathname();
    const [isOpen, setOpen] = useState(false)

    if (pathname?.startsWith("/tools")) {
        return null;
    }

    return (
        <>
            <Navigation  onMenuClick={()=> setOpen(prev => !prev)}/>
            <NavDrawer open={isOpen} onClose={() => setOpen(false)}/>
        </>
    )
}
