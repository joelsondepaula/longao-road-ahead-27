import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Medal, Heart, Bike, Plane } from "lucide-react";

const Support = () => {
  const sponsorshipLevels = [
    {
      level: "Master",
      icon: <Crown className="w-6 h-6" />,
      title: "Patrocínio Master – Bike Gravel",
      color: "from-purple-600 to-purple-800",
      benefits: [
        "Exposição máxima da marca",
        "Uso da imagem da marca",
        "Destaque como 'Bike oficial do desafio'",
        "Evidência da qualidade e versatilidade da gravel"
      ],
      highlight: true
    },
    {
      level: "Ouro",
      icon: <Plane className="w-6 h-6" />,
      title: "Cota Ouro – Passagem aérea Ushuaia → João Pessoa/Recife",
      color: "from-yellow-500 to-yellow-600",
      benefits: [
        "Nome na camisa oficial",
        "Menções semanais nas redes",
        "Agradecimentos especiais",
        "Destaque em todos os vídeos"
      ]
    },
    {
      level: "Prata",
      icon: <Award className="w-6 h-6" />,
      title: "Cota Prata – R$ 2.000",
      color: "from-gray-400 to-gray-600",
      benefits: [
        "Nome na camisa",
        "Menções pontuais em stories e reels",
        "Presença em relatórios de viagem",
        "Logo em materiais digitais"
      ]
    },
    {
      level: "Bronze",
      icon: <Medal className="w-6 h-6" />,
      title: "Cota Bronze – R$ 1.000",
      color: "from-orange-600 to-orange-800",
      benefits: [
        "Agradecimentos nas postagens",
        "Presença como apoiador",
        "Menções em vídeos",
        "Reconhecimento público"
      ]
    }
  ];

  return (
    <section id="apoio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-road-yellow mr-3" />
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Apoie esse <span className="text-road-yellow">desafio!</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Para realizar essa jornada, conto com o apoio de marcas, empresas e pessoas 
              que acreditam no poder da superação.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {sponsorshipLevels.map((level, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg ${
                  level.highlight ? 'border-purple-500 shadow-md' : 'border-road-yellow/30'
                }`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${level.color}`} />
                
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-full bg-gradient-to-r ${level.color} text-white`}>
                      {level.icon}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${level.highlight ? 'border-purple-500 text-purple-600' : 'border-road-yellow text-road-yellow'}`}
                    >
                      {level.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{level.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-road-yellow rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${
                      level.highlight 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90'
                    }`}
                  >
                    Escolher {level.level}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Spontaneous Donations */}
          <Card className="bg-gradient-to-r from-road-yellow/10 to-road-yellow/5 border-road-yellow/50">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-road-yellow mr-2" />
                <CardTitle className="text-xl">Doações Espontâneas</CardTitle>
              </div>
              <p className="text-muted-foreground">
                Qualquer valor é bem-vindo e receberá reconhecimento nas redes sociais
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark">
                  PIX: oreidolongao@gmail.com
                </Button>
                <Button className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90">
                  Fazer Doação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Support;