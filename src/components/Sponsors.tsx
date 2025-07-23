import { Button } from "@/components/ui/button";
import { Shield, Star, Award, Crown, Mail, Download } from "lucide-react";
const Sponsors = () => {
  const sponsorTiers = [{
    title: "Patrocinador Ouro",
    icon: Crown,
    color: "premium-gold",
    bgGradient: "bg-gradient-to-br from-premium-gold/20 to-road-yellow/10",
    borderColor: "border-premium-gold/30",
    benefits: ["Logo destacado em todas as peças visuais", "Menções em posts diários nas redes sociais", "Entrevistas exclusivas durante a jornada", "Relatório completo de impacto e métricas"],
    investment: "R$ 15.000",
    available: 2
  }, {
    title: "Patrocinador Prata",
    icon: Star,
    color: "premium-silver",
    bgGradient: "bg-gradient-to-br from-premium-silver/20 to-muted/10",
    borderColor: "border-premium-silver/30",
    benefits: ["Logo em materiais de divulgação", "Posts semanais nas redes sociais", "Relatório de métricas mensais", "Direitos de uso de imagens da jornada"],
    investment: "R$ 8.000",
    available: 5
  }, {
    title: "Patrocinador Bronze",
    icon: Award,
    color: "premium-bronze",
    bgGradient: "bg-gradient-to-br from-premium-bronze/20 to-muted/10",
    borderColor: "border-premium-bronze/30",
    benefits: ["Logo no site oficial", "Menções em posts quinzenais", "Relatório final da jornada", "Certificado de apoio"],
    investment: "R$ 3.000",
    available: 10
  }];
  const currentPartners = [{
    name: "Seu Logo Aqui",
    category: "Equipamentos"
  }, {
    name: "Sua Marca",
    category: "Nutrição"
  }, {
    name: "Empresa Parceira",
    category: "Tecnologia"
  }, {
    name: "Patrocinador",
    category: "Logística"
  }];
  return <section id="patrocinadores" className="py-16 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Seja Parte Desta <span className="text-premium-gold">Jornada Épica</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
            Conecte sua marca a uma história de superação, determinação e inspiração. 
            Mais de <strong>5.000 pessoas</strong> acompanhando cada pedalada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-premium-gold to-road-yellow text-asphalt-dark hover:shadow-premium font-semibold px-8 py-4 text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Fale Conosco
            </Button>
            
          </div>
        </div>

        {/* Sponsor Tiers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sponsorTiers.map((tier, index) => <div key={tier.title} className={`p-8 rounded-2xl ${tier.bgGradient} border-2 ${tier.borderColor} hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}>
              {index === 0 && <div className="absolute top-4 right-4 bg-premium-gold text-asphalt-dark text-xs font-bold px-3 py-1 rounded-full">
                  DESTAQUE
                </div>}
              
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-${tier.color}/20 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <tier.icon className={`w-8 h-8 text-${tier.color}`} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {tier.title}
                </h3>
                <div className={`text-3xl font-heading font-bold text-${tier.color} mb-1`}>
                  {tier.investment}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tier.available} vagas disponíveis
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {tier.benefits.map((benefit, idx) => <li key={idx} className="flex items-start">
                    <Shield className={`w-4 h-4 text-${tier.color} mt-1 mr-3 flex-shrink-0`} />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {benefit}
                    </span>
                  </li>)}
              </ul>

              <Button className={`w-full bg-${tier.color} text-asphalt-dark hover:bg-${tier.color}/90 font-semibold`}>
                Escolher Plano
              </Button>
            </div>)}
        </div>

        {/* Current Partners */}
        <div className="text-center">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {currentPartners.map((partner, index) => (
              <div key={index} className="p-6 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground mb-2">{partner.name}</div>
                  <div className="text-sm text-muted-foreground">{partner.category}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="mt-16 p-8 bg-gradient-to-r from-trust-blue/10 to-success-green/10 rounded-2xl border border-trust-blue/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Impacto Garantido
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-heading font-bold text-trust-blue mb-1">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">
                Impressões mensais
              </div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-success-green mb-1">
                5K+
              </div>
              <div className="text-sm text-muted-foreground">
                Seguidores engajados
              </div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-energy-orange mb-1">
                40
              </div>
              <div className="text-sm text-muted-foreground">
                Dias de exposição
              </div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-premium-gold mb-1">3</div>
              <div className="text-sm text-muted-foreground">
                Países alcançados
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Sponsors;