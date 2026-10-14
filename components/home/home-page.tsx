import About from "@/components/home/about-me";
import Faq from "@/components/home/faq";
import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Process from "@/components/home/process";
import Projects from "@/components/home/projects";
import Services from "@/components/home/services";

export default function HomePage() {
  return (
    <div>
      <Header />

      <main>
        <Hero />
        <Projects />
        <Services />
        <Process />
        <About />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}