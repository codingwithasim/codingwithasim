import { LucideMessageCircleMore } from "lucide-react";


export  default function FAB({className= "", ...props}) {
    return (
        <button
        className={"bg-gray-800 hover:bg-gray-700 transition-colors rounded-md p-4 fixed bottom-4 right-4 cursor-pointer" + " " + className}
         {...props}>
            <LucideMessageCircleMore/>            
        </button>
    )
}