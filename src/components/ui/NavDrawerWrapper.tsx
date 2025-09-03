"use client"

import Navigation from "../Navigation";
import NavDrawer from "./NavDrawer";
import { useState } from "react";

export default function NavDrawerWrapper() {
    const [isOpen, setOpen] = useState(false)

    return (
        <>
            <Navigation  onMenuClick={()=> setOpen(prev => !prev)}/>
            <NavDrawer open={isOpen} onClose={() => setOpen(false)}/>
        </>
    )
}