import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Route, Calendar, Target, Heart, Bike } from "lucide-react";

const Challenge = () => {
  const stats = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Percurso",
      value: "João Pessoa-PB até Ushuaia-ARG"
    },
    {
      icon: <Route className="w-6 h-6" />,
      label: "Distância", 
      value: "Cerca de 8.000 km"
    },
    {
      icon: <Bike className="w-6 h-6" />,
      label: "Média diária",
      value: "200 km pedalando"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Duração estimada",
      value: "50 a 60 dias"
    }
  ];

  const objectives = [
    {
      icon: <Target className="w-5 h-5" />,
      text: "Superar limites pessoais e inspirar outros"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      text: "Estimular a mobilidade ativa e o turismo"
    },
    {
      icon: <Route className="w-5 h-5" />,
      text: "Compartilhar uma jornada real, intensa e transformadora"
    }
  ];

  return (
    <section id="desafio" className="py-20 bg-asphalt-dark text-road-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              O <span className="text-road-yellow">Desafio</span>
            </h2>
            <p className="text-lg md:text-xl text-road-white/80 max-w-3xl mx-auto">
              Uma expedição épica através do continente, documentando cada quilômetro, 
              cada paisagem e cada superação ao longo desta jornada transformadora.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-road-white/5 border-road-yellow/30 text-center">
                <CardHeader className="pb-3">
                  <div className="text-road-yellow mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-road-white text-sm font-medium">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-road-yellow font-bold text-lg">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content & Objectives */}
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="bg-road-white/5 border-road-yellow/30">
              <CardHeader>
                <CardTitle className="text-road-yellow text-xl flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Conteúdo Diário
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Badge variant="outline" className="border-road-yellow text-road-yellow">
                  Vídeos documentários
                </Badge>
                <Badge variant="outline" className="border-road-yellow text-road-yellow">
                  Reels e stories
                </Badge>
                <Badge variant="outline" className="border-road-yellow text-road-yellow">
                  Posts com paisagens
                </Badge>
                <Badge variant="outline" className="border-road-yellow text-road-yellow">
                  Relatos em tempo real
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-road-white/5 border-road-yellow/30">
              <CardHeader>
                <CardTitle className="text-road-yellow text-xl flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Motivações & Impacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-road-yellow mt-1">
                      {objective.icon}
                    </div>
                    <p className="text-road-white/90">{objective.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenge;
