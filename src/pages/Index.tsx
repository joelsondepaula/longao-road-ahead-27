
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Timeline from "@/components/Timeline";
import About from "@/components/About";
import Challenge from "@/components/Challenge";
import Sponsors from "@/components/Sponsors";
import Media from "@/components/Media";
import PressKit from "@/components/PressKit";
import CTA from "@/components/CTA";
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
        <Stats />
        <Timeline />
        <About />
        <div id="desafio">
          <Challenge />
        </div>
        <div id="patrocinadores">
          <Sponsors />
        </div>
        <div id="midia">
          <Media />
        </div>
        <PressKit />
        <CTA />
        <div id="apoio">
          <Support />
        </div>
        <div id="contato">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
