import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Projects from "@/components/home/projects";
import Services from "@/components/home/services";

export default function HomePage() {
    return (
        <div>
            <Header/>
            <Hero />
            <Projects/>
            <hr />
            <Services/>
            <Footer/>
        </div>
    )
}