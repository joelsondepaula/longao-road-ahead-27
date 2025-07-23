import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bike } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#sobre" },
    { label: "Desafio", href: "#desafio" },
    { label: "Mídia", href: "#midia" },
    { label: "Apoio", href: "#apoio" },
    
    { label: "Contato", href: "#contato" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-asphalt-dark/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Bike className="w-8 h-8 text-road-yellow" />
            <span className="text-road-white font-bold text-xl">
              O Rei do <span className="text-road-yellow">Longão</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-road-white hover:text-road-yellow transition-colors duration-300 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold"
              onClick={() => scrollToSection('#apoio')}
            >
              Apoie o Projeto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-road-white hover:text-road-yellow"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-asphalt-dark/95 backdrop-blur-sm border-t border-road-yellow/20">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-2 text-road-white hover:text-road-yellow hover:bg-road-white/5 transition-colors duration-300"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 pt-2">
                <Button 
                  className="w-full bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold"
                  onClick={() => scrollToSection('#apoio')}
                >
                  Apoie o Projeto
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;