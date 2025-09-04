import { Card } from "@/components/ui/card"
import Image from "next/image"

export default function Hobbies() {
    return (
        <div className="flex flex-col items-center py-24 overflow-hidden">
            <h4>My Hobbies</h4>
            <Card className="flex flex-col items-center py-12 gap-4 w-full max-w-7xl text-center bg-black mt-6 border-dark-800">
            <div className="border-t w-2/3 flex justify-center rounded-md border-b border-dark-800">
            <Image 
                width={300}
                height={42}
                src={"/assets/giphy_2.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                className="opacity-50"
                />

            <Image 
                width={300}
                height={42}
                src={"/assets/giphy.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                />
        
            <Image 
                width={300}
                height={42}
                src={"/assets/giphy_3.gif"} 
                alt="Minecraft logo" 
                loading="lazy"
                className="opacity-50"
                />
            </div>

            <span className="max-w-3xl">
                Outside of coding, you’ll usually find me exploring blocky worlds in Minecraft, still debugging, just with creepers {" "}
                <Image src={"/assets/creeper_head.png"} alt="Creeper head" width={22} height={22} loading="lazy" className="inline-block"/>
                 {" "}instead of console logs.
            </span>
            </Card>
        </div>
    )
}