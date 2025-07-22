
import { Card } from "@/components/ui/card";
import { User, MapPin, Trophy, Bike, Clock, Target } from "lucide-react";
import { useEffect, useState } from "react";

const About = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [currentKm, setCurrentKm] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalDistance = 2530;
  const recordDistance = 500;
  const recordTime = "24h36min";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimating) {
          setIsAnimating(true);
          
          // Animação do progresso da jornada
          const duration = 4000; // 4 segundos
          const startTime = Date.now();
          
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setAnimationProgress(progress);
            setCurrentKm(Math.floor(totalDistance * progress));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('journey-animation');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [isAnimating]);

  return (
    <section id="sobre" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <User className="w-8 h-8 text-road-yellow mr-3" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Quem é <span className="text-road-yellow">O Rei do Longão</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12">
            Sou um ciclista apaixonado por desafios extremos. Já percorri grandes distâncias 
            testando meus limites e agora encaro minha maior aventura: cruzar o continente até Ushuaia.
          </p>

          {/* Animação da Jornada */}
          <div id="journey-animation" className="relative bg-gradient-to-r from-muted/30 to-background border border-road-yellow/20 rounded-2xl p-8 mb-8 overflow-hidden">
            {/* Linha da jornada */}
            <div className="relative h-4 bg-muted rounded-full mb-6">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-road-yellow to-premium-gold rounded-full transition-all duration-100 ease-out"
                style={{ width: `${animationProgress * 100}%` }}
              >
                {/* Ciclista animado */}
                <div 
                  className="absolute -top-2 -right-2 transform transition-all duration-100 ease-out"
                  style={{ 
                    opacity: animationProgress > 0 ? 1 : 0,
                    transform: `translateY(-50%) ${animationProgress > 0.5 ? 'scale(1.1)' : 'scale(1)'}` 
                  }}
                >
                  <Bike className="w-8 h-8 text-road-yellow animate-pulse" />
                </div>
              </div>
              
              {/* Marcadores da jornada */}
              <div className="absolute -top-1 left-0 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="absolute -top-1 right-0 w-6 h-6 bg-road-yellow rounded-full border-2 border-background flex items-center justify-center">
                <Target className="w-3 h-3 text-asphalt-dark" />
              </div>
            </div>

            {/* Pontos de referência */}
            <div className="flex justify-between text-sm text-muted-foreground mb-6">
              <span className="font-medium">João Pessoa</span>
              <span className="font-medium">Cristo Redentor</span>
            </div>

            {/* Contador de KM */}
            <div className="text-center mb-6">
              <div className="text-4xl md:text-6xl font-bold text-road-yellow mb-2">
                {currentKm.toLocaleString()} km
              </div>
              <div className="text-muted-foreground">percorridos de {totalDistance.toLocaleString()} km</div>
            </div>

            {/* Destaque do recorde */}
            <div 
              className={`transform transition-all duration-1000 delay-2000 ${
                animationProgress > 0.7 ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
              }`}
            >
              <Card className="bg-gradient-to-r from-premium-gold/10 to-road-yellow/10 border-premium-gold/30 p-6">
                <div className="flex items-center justify-center gap-4">
                  <Trophy className="w-8 h-8 text-premium-gold" />
                  <div className="text-center">
                    <div className="text-2xl font-bold text-premium-gold">{recordDistance} km</div>
                    <div className="text-sm text-muted-foreground">em {recordTime} de pedalada contínua</div>
                  </div>
                  <Clock className="w-8 h-8 text-premium-gold" />
                </div>
              </Card>
            </div>

            {/* Partículas de fundo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-road-yellow/30 rounded-full animate-pulse`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
