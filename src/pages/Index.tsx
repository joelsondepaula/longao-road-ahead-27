
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Challenge from "@/components/Challenge";
import Media from "@/components/Media";
import Support from "@/components/Support";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <div id="hero">
          <Hero />
        </div>
        <About />
        <Challenge />
        <Media />
        <Support />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
