
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-road.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-road-white mb-6 leading-tight">
          Do ponto mais oriental das <span className="text-road-yellow">Américas</span> ao <span className="text-road-yellow">fim do mundo</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-road-white/90 mb-8 max-w-4xl mx-auto leading-relaxed">
          Uma jornada de mais de <strong className="text-road-yellow">8.000 km</strong>, de João Pessoa até Ushuaia – 
          pedalando 200 km por dia, cruzando países e paisagens extremas, para provar que os limites estão apenas na nossa mente.
        </p>

        {/* Stats Preview */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-road-white/20">
            <div className="text-2xl md:text-3xl font-heading font-bold text-road-yellow">8.000km</div>
            <div className="text-sm text-road-white/80 uppercase tracking-wider">Distância Total</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-road-white/20">
            <div className="text-2xl md:text-3xl font-heading font-bold text-road-yellow">40 dias</div>
            <div className="text-sm text-road-white/80 uppercase tracking-wider">Jornada</div>
          </div>
          <div className="bg-black/30 backdrop-blur-sm rounded-xl px-6 py-4 border border-road-white/20">
            <div className="text-2xl md:text-3xl font-heading font-bold text-road-yellow">12 países</div>
            <div className="text-sm text-road-white/80 uppercase tracking-wider">Atravessados</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark hover:shadow-premium font-semibold text-lg px-10 py-6 transition-all duration-300 group"
            onClick={() => scrollToSection('patrocinadores')}
          >
            <span className="group-hover:scale-105 transition-transform">Seja um Patrocinador</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-road-white text-road-white hover:bg-road-white hover:text-asphalt-dark font-semibold text-lg px-10 py-6 transition-all duration-300"
            onClick={() => scrollToSection('desafio')}
          >
            Conheça a jornada
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-road-white animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
