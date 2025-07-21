import { Button } from "@/components/ui/button";
import { Bike, Instagram, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-asphalt-dark text-road-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Bike className="w-8 h-8 text-road-yellow" />
              <span className="text-xl font-bold">
                O Rei do <span className="text-road-yellow">Longão</span>
              </span>
            </div>
            <p className="text-road-white/80 leading-relaxed">
              Uma jornada épica de mais de 8.000 km, do ponto mais oriental das Américas 
              até o fim do mundo, provando que os limites estão apenas na nossa mente.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-road-yellow">Links Rápidos</h3>
            <div className="space-y-2">
              {[
                { label: "Sobre o Projeto", href: "#sobre" },
                { label: "O Desafio", href: "#desafio" },
                { label: "Como Apoiar", href: "#apoio" },
                { label: "Contato", href: "#contato" }
              ].map((link) => (
                <button
                  key={link.label}
                  onClick={() => document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-road-white/80 hover:text-road-yellow transition-colors duration-300"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-road-yellow">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-road-yellow" />
                <span className="text-road-white/80">oreidolongao@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-road-yellow" />
                <span className="text-road-white/80">@oreidolongao</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-road-yellow" />
                <span className="text-road-white/80">João Pessoa - PB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="border-t border-road-yellow/20 pt-8 mb-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">
              Quer fazer parte desta <span className="text-road-yellow">jornada épica</span>?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold"
                onClick={() => window.open('mailto:oreidolongao@gmail.com', '_blank')}
              >
                <Mail className="w-4 h-4 mr-2" />
                Ser Parceiro
              </Button>
              <Button 
                variant="outline"
                className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark"
                onClick={() => window.open('https://instagram.com/oreidolongao', '_blank')}
              >
                <Instagram className="w-4 h-4 mr-2" />
                Seguir no Instagram
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-road-yellow/20 pt-6 text-center">
          <p className="text-road-white/60 flex items-center justify-center space-x-2">
            <span>© {currentYear} O Rei do Longão. Feito com</span>
            <Heart className="w-4 h-4 text-road-yellow" />
            <span>e muita determinação.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
