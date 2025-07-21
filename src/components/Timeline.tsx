import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, MapPin, Calendar } from "lucide-react";

const Timeline = () => {
  const timelineEvents = [
    {
      phase: "Preparação",
      status: "completed",
      date: "Jan 2024",
      title: "Planejamento da Rota",
      description: "Definição completa do trajeto de 8.000km através de 12 países",
      details: ["Mapeamento detalhado", "Licenças e documentos", "Estratégia de comunicação"],
      location: "João Pessoa, Brasil"
    },
    {
      phase: "Início",
      status: "completed", 
      date: "Fev 2024",
      title: "Partida Oficial",
      description: "Saída do ponto mais oriental das Américas",
      details: ["Cerimônia de largada", "Primeiros 200km", "Entrada na mídia nacional"],
      location: "Ponta do Seixas, PB"
    },
    {
      phase: "Progresso",
      status: "current",
      date: "Mar 2024",
      title: "Cruzando Fronteiras", 
      description: "Atravessando países da América do Sul",
      details: ["2.500km percorridos", "4 países visitados", "Cobertura internacional"],
      location: "Bolívia"
    },
    {
      phase: "Meio",
      status: "upcoming",
      date: "Abr 2024",
      title: "Metade da Jornada",
      description: "Marco de 4.000km pedalados",
      details: ["Avaliação médica", "Entrevistas especiais", "Renovação de patrocínios"],
      location: "Chile"
    },
    {
      phase: "Final",
      status: "upcoming",
      date: "Mai 2024", 
      title: "Chegada ao Fim do Mundo",
      description: "Ushuaia - O ponto mais austral das Américas",
      details: ["Celebração final", "Documentário completo", "Impacto global"],
      location: "Ushuaia, Argentina"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-success-green" />;
      case 'current':
        return <AlertCircle className="w-5 h-5 text-road-yellow animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'current':
        return 'bg-road-yellow/10 text-road-yellow border-road-yellow/20 animate-pulse';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Cronograma da <span className="text-trust-blue">Jornada</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Acompanhe cada etapa desta aventura épica em tempo real
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <Card className="text-center p-6 bg-gradient-to-br from-success-green/10 to-success-green/5 border-success-green/20">
            <CardContent className="p-0">
              <div className="text-2xl font-heading font-bold text-success-green mb-2">2.500km</div>
              <div className="text-sm text-muted-foreground">Já percorridos</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-road-yellow/10 to-road-yellow/5 border-road-yellow/20">
            <CardContent className="p-0">
              <div className="text-2xl font-heading font-bold text-road-yellow mb-2">5.500km</div>
              <div className="text-sm text-muted-foreground">Ainda faltam</div>
            </CardContent>
          </Card>
          <Card className="text-center p-6 bg-gradient-to-br from-trust-blue/10 to-trust-blue/5 border-trust-blue/20">
            <CardContent className="p-0">
              <div className="text-2xl font-heading font-bold text-trust-blue mb-2">31%</div>
              <div className="text-sm text-muted-foreground">Concluído</div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-success-green via-road-yellow to-muted"></div>

            {/* Timeline Events */}
            <div className="space-y-8">
              {timelineEvents.map((event, index) => (
                <div key={index} className="relative flex items-start ml-16">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[2.125rem] mt-2 flex items-center justify-center w-4 h-4 bg-background border-2 border-current rounded-full">
                    <div className={`w-2 h-2 rounded-full ${
                      event.status === 'completed' ? 'bg-success-green' :
                      event.status === 'current' ? 'bg-road-yellow' : 'bg-muted-foreground'
                    }`}></div>
                  </div>

                  {/* Event Card */}
                  <Card className={`flex-1 ${
                    event.status === 'current' ? 'ring-2 ring-road-yellow/50 shadow-lg' : ''
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(event.status)}
                          <div>
                            <Badge className={getStatusColor(event.status)}>
                              {event.phase}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {event.date}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="space-y-2">
                        {event.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-road-yellow rounded-full mr-3"></div>
                            {detail}
                          </div>
                        ))}
                      </div>

                      {event.status === 'current' && (
                        <div className="mt-4 p-3 bg-road-yellow/10 rounded-lg border border-road-yellow/20">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-road-yellow rounded-full animate-pulse mr-2"></div>
                            <span className="text-sm font-medium text-road-yellow">
                              Em andamento • Atualizações diárias
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-trust-blue/10 to-success-green/10 rounded-2xl p-8 border border-trust-blue/20 max-w-2xl mx-auto">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4">
              Acompanhe em Tempo Real
            </h3>
            <p className="text-muted-foreground mb-6">
              Receba atualizações diárias da jornada diretamente no seu celular
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-trust-blue hover:bg-trust-blue/90 text-white">
                Seguir no Instagram
              </Button>
              <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white">
                Newsletter Diária
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;