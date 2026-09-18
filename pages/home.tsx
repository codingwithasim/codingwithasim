import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";

export default function HomePage() {
    return (
        <div>
            <Header/>
            <Hero />
            <Projects/>
            <Footer/>
        </div>
    )
}