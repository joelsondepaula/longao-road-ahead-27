
import { User } from "lucide-react";
import Journey3DMap from "./Journey3DMap";

const About = () => {
  return (
    <section id="sobre" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <User className="w-8 h-8 text-road-yellow mr-3" />
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Quem é <span className="text-road-yellow">O Rei do Longão</span>
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Sou um ciclista apaixonado por desafios extremos. Já percorri grandes distâncias 
            testando meus limites e agora encaro minha maior aventura: cruzar o continente até Ushuaia.
          </p>

          {/* Mapa 3D da Jornada */}
          <Journey3DMap />
        </div>
      </div>
    </section>
  );
};

export default About;
