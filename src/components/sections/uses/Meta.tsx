import { Card, CardContent, CardTitle } from "@/components/ui/card";


export default function Meta(){
    return (
        <section className=" mx-auto max-w-6xl text-center w-full">
            <Card className="p-12 w-full flex flex-col gap-4 bg-black border-dark-800">
                <CardTitle className="font-[450]">
                    <h4>Always Evolving</h4>
                </CardTitle>
                <CardContent>
                    <p className="max-w-4xl mx-auto text-dark-300">
                        This toolkit is constantly evolving as I discover new technologies and refine my workflow. Each tool has been carefully chosen to enhance productivity and code quality.
                    </p>
                </CardContent>
            </Card>
        </section>
    )
} 