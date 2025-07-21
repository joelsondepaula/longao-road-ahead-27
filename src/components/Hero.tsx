
import { Button } from "@/components/ui/button";
import { ChevronDown, Youtube, Instagram, Clock, Activity, Play, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-road.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@oreidolongao",
      color: "text-red-400 hover:text-red-300",
      bgColor: "bg-red-500/20 hover:bg-red-500/30",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/oreidolongao/?e=a1773c69-a632-4e86-8869-f6cfa1f8bee0&g=5",
      color: "text-pink-400 hover:text-pink-300",
      bgColor: "bg-pink-500/20 hover:bg-pink-500/30",
    },
    {
      name: "Reportagem na TV",
      icon: Play,
      url: "https://www.instagram.com/reel/C72d7yzpHNB/?igsh=bHYyeDg2MGM0czBo",
      color: "text-road-yellow hover:text-yellow-300",
      bgColor: "bg-road-yellow/20 hover:bg-road-yellow/30",
      featured: true,
    },
    {
      name: "TikTok",
      icon: Clock,
      url: "https://www.tiktok.com/@sebastianestevan",
      color: "text-blue-400 hover:text-blue-300",
      bgColor: "bg-blue-500/20 hover:bg-blue-500/30",
    },
    {
      name: "Strava",
      icon: Activity,
      url: "https://strava.app.link/2i3JiIN9bVb",
      color: "text-orange-400 hover:text-orange-300",
      bgColor: "bg-orange-500/20 hover:bg-orange-500/30",
    },
  ];

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

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
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
            className="bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark hover:shadow-premium font-semibold text-lg px-10 py-6 transition-all duration-300"
            onClick={() => scrollToSection('desafio')}
          >
            Conheça a jornada
          </Button>
        </div>

        {/* Redes Sociais integradas no Hero */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-road-white/20">
              <div className="w-2 h-2 bg-road-yellow rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-road-white uppercase tracking-wider">
                Siga a Aventura
              </span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex items-center gap-3 px-4 py-3 bg-black/30 backdrop-blur-sm rounded-xl border border-road-white/20 ${social.bgColor} transition-all duration-300 hover:scale-105 hover:border-road-white/40 ${
                  social.featured ? 'ring-2 ring-road-yellow/50' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <social.icon className={`h-5 w-5 ${social.color} transition-colors duration-200`} />
                <span className="text-road-white font-medium text-sm group-hover:text-road-yellow transition-colors duration-200">
                  {social.name}
                </span>
                <ExternalLink className="h-3 w-3 text-road-white/60 group-hover:text-road-white transition-colors duration-200" />
              </a>
            ))}
          </div>
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
