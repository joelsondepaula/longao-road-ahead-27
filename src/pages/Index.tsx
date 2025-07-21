
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Challenge from "@/components/Challenge";
import SocialMedia from "@/components/SocialMedia";
import Sponsors from "@/components/Sponsors";
import Media from "@/components/Media";
import PressKit from "@/components/PressKit";
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
        <About />
        <div id="desafio">
          <Challenge />
        </div>
        <SocialMedia />
        <Sponsors />
        <Media />
        <PressKit />
        <div id="apoio">
          <Support />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
