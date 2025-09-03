import React from "react"
import { IconType } from "react-icons"

type FabTypes = {
    className?: string,
    icon: IconType,
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export  default function FAB({className= "", icon : Icon , ...props}: FabTypes) {
    return (
        <button
        className={"bg-black ring-2 ring-[#2e2e2e] hover:bg-gray-900 transition-colors rounded-full p-3 fixed bottom-4 right-4 cursor-pointer" + " " + className}
         {...props}>
            <Icon size={18}/>            
        </button>
    )
}