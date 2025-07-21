
import { Card } from "@/components/ui/card";
import { User, MapPin, Trophy } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "2.530 km",
      description: "João Pessoa até o Cristo Redentor em 14 dias"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "500 km",
      description: "Em 24h36 de pedalada contínua"
    }
  ];

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

          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 border-l-4 border-l-road-yellow hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-3">
                  <div className="text-road-yellow mr-3">
                    {achievement.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{achievement.title}</h3>
                </div>
                <p className="text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
