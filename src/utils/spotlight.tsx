"use client"

import { RefObject } from "react"


export function attachSpotlightTo(ref: RefObject<HTMLDivElement | null>){

    if(!ref.current) return;

    const element = ref.current;

    const overlayDiv = element.querySelector<HTMLDivElement>("div.spotlight");

    if(!overlayDiv) {
        return;
    }

    const handleMouseEnter = () => {
        overlayDiv.style.display = "block";
        overlayDiv.style.opacity = ".2";
    }

    const handleMouseLeave = () => {
        overlayDiv.style.opacity = "0";
    }

    const handleMouseMove = (e : MouseEvent) => {

        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        overlayDiv.style.left = `${x}px`;
        overlayDiv.style.top = `${y}px`;
        overlayDiv.style.transform = "translate(-50%, -50%)";
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);

    return () => {
        element.removeEventListener("mouseenter", handleMouseEnter)
        element.removeEventListener("mouseleave", handleMouseLeave)
        element.removeEventListener("mousemove", handleMouseMove)
    }
}
