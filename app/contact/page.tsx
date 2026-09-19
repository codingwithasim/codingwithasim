import Contact from "@/components/contact/contact";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Contact />
      </main>

      <Footer />
    </div>
  );
}