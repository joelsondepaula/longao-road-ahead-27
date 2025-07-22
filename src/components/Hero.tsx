
import { Button } from "@/components/ui/button";
import { ChevronDown, Youtube, Instagram, Activity, Play, ExternalLink } from "lucide-react";
import heroImage from "@/assets/hero-road.jpg";
import tiktokLogo from "@/assets/tiktok-logo.svg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@oreidolongao",
      color: "text-destructive hover:text-destructive/80",
      bgColor: "bg-destructive/20 hover:bg-destructive/30",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/oreidolongao/?e=a1773c69-a632-4e86-8869-f6cfa1f8bee0&g=5",
      color: "text-primary hover:text-primary/80",
      bgColor: "bg-primary/20 hover:bg-primary/30",
    },
    {
      name: "Reportagem na TV",
      icon: Play,
      url: "https://www.instagram.com/reel/C72d7yzpHNB/?igsh=bHYyeDg2MGM0czBo",
      color: "text-primary hover:text-primary/80",
      bgColor: "bg-primary/30 hover:bg-primary/40",
      featured: true,
    },
    {
      name: "TikTok",
      icon: () => <img src={tiktokLogo} alt="TikTok" className="h-5 w-5" />,
      url: "https://www.tiktok.com/@sebastianestevan",
      color: "text-trust-blue hover:text-trust-blue/80",
      bgColor: "bg-trust-blue/20 hover:bg-trust-blue/30",
    },
    {
      name: "Strava",
      icon: Activity,
      url: "https://strava.app.link/2i3JiIN9bVb",
      color: "text-energy-orange hover:text-energy-orange/80",
      bgColor: "bg-energy-orange/20 hover:bg-energy-orange/30",
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight drop-shadow-lg">
          Do ponto mais oriental das <span className="text-primary">Américas</span> ao <span className="text-primary">fim do mundo</span>
        </h1>
        
        <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/95 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
          Uma jornada de mais de <strong className="text-primary font-bold">8.000 km</strong>, de João Pessoa até Ushuaia – 
          pedalando 200 km por dia, cruzando países e paisagens extremas, para provar que os limites estão apenas na nossa mente.
        </p>

        {/* Stats Preview */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="bg-card/80 backdrop-blur-md rounded-xl px-6 py-4 border border-primary/30 shadow-lg">
            <div className="text-2xl md:text-3xl font-heading font-bold text-primary">8.000km</div>
            <div className="text-sm text-card-foreground/90 uppercase tracking-wider font-medium">Distância Total</div>
          </div>
          <div className="bg-card/80 backdrop-blur-md rounded-xl px-6 py-4 border border-primary/30 shadow-lg">
            <div className="text-2xl md:text-3xl font-heading font-bold text-primary">40 dias</div>
            <div className="text-sm text-card-foreground/90 uppercase tracking-wider font-medium">Jornada</div>
          </div>
          <div className="bg-card/80 backdrop-blur-md rounded-xl px-6 py-4 border border-primary/30 shadow-lg">
            <div className="text-2xl md:text-3xl font-heading font-bold text-primary">12 países</div>
            <div className="text-sm text-card-foreground/90 uppercase tracking-wider font-medium">Atravessados</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-premium-gold to-primary text-primary-foreground hover:shadow-xl hover:scale-105 font-semibold text-lg px-10 py-6 transition-all duration-300 group shadow-lg"
            onClick={() => scrollToSection('patrocinadores')}
          >
            <span className="group-hover:scale-105 transition-transform">Seja um Patrocinador</span>
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-card/80 backdrop-blur-md border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-lg px-10 py-6 transition-all duration-300 shadow-lg"
            onClick={() => scrollToSection('desafio')}
          >
            Conheça a jornada
          </Button>
        </div>

        {/* Redes Sociais integradas no Hero */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-md rounded-full border border-primary/30 shadow-lg">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-card-foreground uppercase tracking-wider">
                O Rei do Longão nas Redes
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
                className={`group relative flex items-center gap-3 px-4 py-3 bg-card/80 backdrop-blur-md rounded-xl border border-primary/20 ${social.bgColor} transition-all duration-300 hover:scale-105 hover:border-primary/50 shadow-lg ${
                  social.featured ? 'ring-2 ring-primary/50' : ''
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <social.icon className={`h-5 w-5 ${social.color} transition-colors duration-200`} />
                <span className="text-card-foreground font-medium text-sm group-hover:text-primary transition-colors duration-200">
                  {social.name}
                </span>
                <ExternalLink className="h-3 w-3 text-card-foreground/60 group-hover:text-card-foreground transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-foreground animate-bounce">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;
