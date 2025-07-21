import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bike, ChevronUp, Navigation as NavIcon } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: "Início", href: "#hero" },
    { label: "A Jornada", href: "#desafio" },
    { label: "Patrocínio", href: "#patrocinadores", highlight: true },
    { label: "Mídia", href: "#midia" },
    { label: "Apoio", href: "#apoio" },
    { label: "Contato", href: "#contato" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      const showTop = window.scrollY > 500;
      const progress = Math.min(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100,
        100
      );
      
      setIsScrolled(scrolled);
      setShowBackToTop(showTop);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-asphalt-dark/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-road-yellow to-premium-gold transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-1 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('#hero')}
              className="flex items-center space-x-2 group"
            >
              <Bike className={`w-8 h-8 transition-colors ${
                isScrolled ? 'text-road-yellow' : 'text-road-yellow'
              } group-hover:scale-110 transition-transform`} />
              <span className={`font-bold text-xl transition-colors ${
                isScrolled ? 'text-foreground' : 'text-road-white'
              }`}>
                O Rei do <span className="text-road-yellow">Longão</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark hover:shadow-lg font-semibold transform hover:scale-105'
                      : isScrolled 
                        ? 'text-foreground hover:text-road-yellow hover:bg-muted/50'
                        : 'text-road-white hover:text-road-yellow hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`${
                  isScrolled ? 'text-foreground hover:text-road-yellow' : 'text-road-white hover:text-road-yellow'
                }`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border shadow-lg">
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-200 mx-4 ${
                      item.highlight
                        ? 'bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark font-semibold'
                        : 'text-foreground hover:text-road-yellow hover:bg-muted/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-6 right-6 z-40 bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14 group"
        >
          <ChevronUp size={24} className="group-hover:scale-110 transition-transform" />
        </Button>
      )}

      {/* Quick Navigation Hint */}
      {!isScrolled && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
          <div className="bg-black/20 backdrop-blur-sm rounded-full p-2 border border-road-white/20">
            <NavIcon className="w-5 h-5 text-road-white/70" />
          </div>
        </div>
      )}

      {/* Spacer for fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;