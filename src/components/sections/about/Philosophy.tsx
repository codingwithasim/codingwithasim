import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";


export default function PhilosophySection() {
    return (
        <>
            <h4 className="place-self-center py-12 pt-18"> Building with Purpose</h4>
            <div className="grid grid-cols-1 md:grid-cols-2  relative">


                <Card className="border-dark-800 order-1 md:order-0 rounded-t-none  md:border-b md:border-l md:rounded-l-lg  md:border-r-0 md:rounded-r-none bg-black">
                    <CardContent className="text-justify text-gray-200 py-12  md:py-24">
                        <span className="text-xl font-[300]">
                            Code with Intention
                        </span>

                        <p className=" text-gray-300 font-[250] mt-2  ">
                            I believe great software isn’t just about clean code — it’s about solving real problems for real people. Every project I build focuses on performance, simplicity, and user experience, so that the end result is something both developers and users enjoy using.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-[#464646] h-28 md:h-full rounded-b-none border-b-0 md:rounded-r-lg md:rounded-l-none bg-black md:border-b overflow-hidden">
                    <CardContent className="text-justify h-full relative">
                        <Image src={"/assets/overlay.jpg"} fill alt="Dark overlay" loading="lazy" className="object-cover absolute top-0 bottom-0 left-0 right-0" />
                    </CardContent>
                </Card>
            </div>
        </>
    )
}