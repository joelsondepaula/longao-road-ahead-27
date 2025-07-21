import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Target, Zap } from "lucide-react";

const CTA = () => {
  const urgencyIndicators = [
    {
      icon: Clock,
      label: "Jornada em andamento",
      value: "31% concluída",
      color: "text-road-yellow"
    },
    {
      icon: Users,
      label: "Pessoas acompanhando",
      value: "25K+",
      color: "text-trust-blue"
    },
    {
      icon: Target,
      label: "Vagas de patrocínio",
      value: "Limitadas",
      color: "text-energy-orange"
    }
  ];

  const quickActions = [
    {
      title: "Patrocínio Ouro",
      description: "Máxima exposição e ROI garantido",
      price: "R$ 15.000",
      highlight: true,
      cta: "Reservar Agora"
    },
    {
      title: "Apoio Individual",
      description: "Seja parte desta jornada histórica",
      price: "A partir de R$ 50",
      highlight: false,
      cta: "Apoiar Projeto"
    },
    {
      title: "Parceria de Mídia",
      description: "Cobertura exclusiva e conteúdo",
      price: "Consulte valores",
      highlight: false,
      cta: "Falar Conosco"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-asphalt-dark to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,193,7,0.1),transparent_70%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Urgency Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-road-yellow/20 rounded-full border border-road-yellow/30 mb-6">
            <Zap className="w-4 h-4 text-road-yellow mr-2 animate-pulse" />
            <span className="text-sm font-medium text-road-yellow">
              Oportunidade Limitada • Jornada em Andamento
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-road-white mb-4">
            Não Perca Esta <span className="text-road-yellow">Oportunidade Única</span>
          </h2>
          
          <p className="text-lg md:text-xl text-road-white/80 max-w-3xl mx-auto">
            Uma jornada que está acontecendo AGORA. Conecte sua marca a uma história épica 
            que já impacta milhares de pessoas diariamente.
          </p>
        </div>

        {/* Urgency Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {urgencyIndicators.map((indicator, index) => (
            <Card key={index} className="bg-black/40 border-road-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <indicator.icon className={`w-8 h-8 ${indicator.color} mx-auto mb-3`} />
                <div className={`text-2xl font-heading font-bold ${indicator.color} mb-1`}>
                  {indicator.value}
                </div>
                <div className="text-sm text-road-white/70">
                  {indicator.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <Card key={index} className={`relative ${
              action.highlight 
                ? 'bg-gradient-to-br from-premium-gold/20 to-road-yellow/10 border-premium-gold/50 ring-2 ring-premium-gold/30' 
                : 'bg-black/40 border-road-white/20'
            } backdrop-blur-sm hover:shadow-xl transition-all duration-300 group`}>
              {action.highlight && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-premium-gold text-asphalt-dark font-bold">
                  DESTAQUE
                </Badge>
              )}
              
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-heading font-bold text-road-white mb-2">
                  {action.title}
                </h3>
                
                <p className="text-road-white/70 mb-4 leading-relaxed">
                  {action.description}
                </p>
                
                <div className={`text-2xl font-heading font-bold mb-6 ${
                  action.highlight ? 'text-premium-gold' : 'text-road-yellow'
                }`}>
                  {action.price}
                </div>
                
                <Button 
                  size="lg"
                  className={`w-full font-semibold group-hover:scale-105 transition-transform ${
                    action.highlight
                      ? 'bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark hover:shadow-premium'
                      : 'bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90'
                  }`}
                >
                  {action.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-road-white/10 to-road-white/5 rounded-2xl p-8 border border-road-white/20 backdrop-blur-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-road-white mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-road-white/80 mb-6">
              Fale diretamente conosco e descubra como sua marca pode fazer parte desta jornada histórica
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                variant="outline"
                className="border-road-white text-road-white hover:bg-road-white hover:text-asphalt-dark font-semibold"
              >
                Agendar Conversa
              </Button>
              <Button 
                size="lg"
                className="bg-road-white text-asphalt-dark hover:bg-road-white/90 font-semibold"
              >
                WhatsApp Direto
              </Button>
            </div>
            
            <div className="mt-6 text-sm text-road-white/60">
              📞 Resposta em até 2 horas • 💬 Atendimento 24/7
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;