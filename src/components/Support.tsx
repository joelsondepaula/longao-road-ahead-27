import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Medal, Heart, Bike, Plane, Star, Shield, Zap, TrendingUp, Users, Globe, Camera, Target } from "lucide-react";
import { useState, useEffect } from "react";
const Support = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    impressions: 0,
    followers: 0,
    exposure: 0,
    countries: 0
  });
  const impactMetrics = [{
    key: 'impressions',
    target: 500,
    suffix: 'K+',
    label: 'Impressões mensais',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-trust-blue to-trust-blue/70'
  }, {
    key: 'followers',
    target: 25,
    suffix: 'K+',
    label: 'Seguidores engajados',
    icon: <Users className="w-6 h-6" />,
    color: 'from-success-green to-success-green/70'
  }, {
    key: 'exposure',
    target: 40,
    suffix: '',
    label: 'Dias de exposição',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-energy-orange to-energy-orange/70'
  }, {
    key: 'countries',
    target: 12,
    suffix: '',
    label: 'Países alcançados',
    icon: <Target className="w-6 h-6" />,
    color: 'from-premium-gold to-premium-gold/70'
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCounts(prev => ({
        impressions: Math.min(prev.impressions + 10, 500),
        followers: Math.min(prev.followers + 1, 25),
        exposure: Math.min(prev.exposure + 1, 40),
        countries: Math.min(prev.countries + 1, 12)
      }));
    }, 50);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);
  const sponsorshipLevels = [{
    level: "Ouro",
    icon: <Crown className="w-8 h-8" />,
    title: "Patrocinador Ouro",
    price: "R$ 15.000",
    originalPrice: "2 vagas disponíveis",
    color: "premium-gold",
    gradient: "from-premium-gold/20 via-road-yellow/15 to-premium-gold/20",
    borderGradient: "from-premium-gold via-road-yellow to-premium-gold",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Logo destacado em todas as peças visuais"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Menções em posts diários nas redes sociais"
    }, {
      icon: <Zap className="w-4 h-4" />,
      text: "Entrevistas exclusivas durante a jornada"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Relatório completo de impacto e métricas"
    }],
    highlight: true,
    badge: "DESTAQUE"
  }, {
    level: "Prata",
    icon: <Star className="w-6 h-6" />,
    title: "Patrocinador Prata",
    price: "R$ 8.000",
    originalPrice: "5 vagas disponíveis",
    color: "premium-silver",
    gradient: "from-slate-200/20 via-slate-300/15 to-slate-200/20",
    borderGradient: "from-slate-300 via-slate-400 to-slate-300",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Logo em materiais de divulgação"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Posts semanais nas redes sociais"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Relatório de métricas mensais"
    }, {
      icon: <Zap className="w-4 h-4" />,
      text: "Direitos de uso de imagens da jornada"
    }]
  }, {
    level: "Bronze",
    icon: <Medal className="w-6 h-6" />,
    title: "Patrocinador Bronze",
    price: "R$ 3.000",
    originalPrice: "10 vagas disponíveis",
    color: "premium-bronze",
    gradient: "from-orange-200/20 via-orange-300/15 to-orange-200/20",
    borderGradient: "from-orange-300 via-orange-400 to-orange-300",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Logo no site oficial"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Menções em posts quinzenais"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Relatório final da jornada"
    }, {
      icon: <Award className="w-4 h-4" />,
      text: "Certificado de apoio"
    }]
  }];
  const currentPartners = [{
    name: "Seu Logo Aqui",
    category: "Equipamentos",
    icon: <Bike className="w-8 h-8" />
  }, {
    name: "Sua Marca",
    category: "Nutrição",
    icon: <Heart className="w-8 h-8" />
  }, {
    name: "Empresa Parceira",
    category: "Tecnologia",
    icon: <Zap className="w-8 h-8" />
  }, {
    name: "Patrocinador",
    category: "Logística",
    icon: <Plane className="w-8 h-8" />
  }];
  return <section id="apoio" className="py-24 bg-gradient-to-br from-background via-slate-50 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-road-yellow to-premium-gold rounded-full" />
              <Heart className="w-8 h-8 text-road-yellow animate-pulse" />
              <div className="w-16 h-1 bg-gradient-to-l from-transparent via-road-yellow to-premium-gold rounded-full" />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
              Seja Parte Desta{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-road-yellow via-premium-gold to-energy-orange animate-fade-in">
                Jornada Épica
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
              Conecte sua marca a uma história de superação, determinação e inspiração. Mais de{" "}
              <span className="font-bold text-road-yellow">5.000 pessoas</span> acompanhando cada pedalada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-gradient-to-r from-road-yellow to-premium-gold text-asphalt-dark hover:shadow-2xl hover:scale-105 font-bold px-8 py-4 text-lg transition-all duration-300 group">
                <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Fale Conosco
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark font-bold px-8 py-4 text-lg transition-all duration-300 group">
                <Camera className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Press Kit
              </Button>
            </div>
          </div>

          {/* Enhanced Sponsorship Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {sponsorshipLevels.map((level, index) => <Card key={index} className={`
                  group relative overflow-hidden transition-all duration-700 hover:scale-105 hover:-translate-y-3
                  ${level.highlight ? 'lg:scale-110 lg:-translate-y-4 border-2 shadow-2xl' : 'border hover:shadow-xl'}
                  bg-gradient-to-br ${level.gradient} backdrop-blur-sm
                `}>
                {/* Animated border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${level.borderGradient} p-[2px] rounded-xl`}>
                  <div className="h-full w-full bg-background rounded-[10px]" />
                </div>

                {/* Highlight badge */}
                {level.highlight && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-road-yellow to-premium-gold text-asphalt-dark font-bold px-4 py-1 text-sm shadow-lg">
                      {level.badge}
                    </Badge>
                  </div>}

                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-road-yellow/0 via-road-yellow/5 to-road-yellow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <CardHeader className="pb-4 relative z-10 text-center">
                  <div className={`
                    mx-auto mb-4 p-4 rounded-2xl transition-all duration-500 group-hover:scale-110
                    ${level.highlight ? 'bg-road-yellow/20' : 'bg-gradient-to-br from-muted/50 to-muted/30'}
                  `}>
                    <div className={level.highlight ? 'text-road-yellow' : `text-${level.color}`}>
                      {level.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold mb-2">
                    {level.title}
                  </CardTitle>
                  
                  <div className="mb-2">
                    <div className={`text-4xl font-bold ${level.highlight ? 'bg-gradient-to-r from-road-yellow to-premium-gold bg-clip-text text-transparent' : `text-${level.color}`}`}>
                      {level.price}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {level.originalPrice}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <ul className="space-y-4 mb-8">
                    {level.benefits.map((benefit, i) => <li key={i} className="flex items-start gap-3 group/item">
                        <div className={`p-1 rounded-lg ${level.highlight ? 'bg-road-yellow/20 text-road-yellow' : 'bg-muted/50'} group-hover/item:scale-110 transition-transform duration-300`}>
                          {benefit.icon}
                        </div>
                        <span className="text-sm text-muted-foreground leading-relaxed font-medium">
                          {benefit.text}
                        </span>
                      </li>)}
                  </ul>
                  
                  <Button className={`
                      w-full font-bold py-3 transition-all duration-300 group-hover:scale-105
                      ${level.highlight ? 'bg-gradient-to-r from-road-yellow to-premium-gold text-asphalt-dark hover:shadow-xl' : `bg-${level.color} text-white hover:opacity-90`}
                    `}>
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          {/* Enhanced Current Partners */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center mb-12 font-heading">
              Parceiros <span className="text-road-yellow">Atuais</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {currentPartners.map((partner, index) => <Card key={index} className="group p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20 border border-muted/30">
                  <div className="text-center">
                    <div className="w-full h-20 bg-gradient-to-br from-muted/30 to-muted/50 rounded-xl flex items-center justify-center mb-4 group-hover:from-road-yellow/20 group-hover:to-premium-gold/20 transition-all duration-300">
                      <div className="text-muted-foreground group-hover:text-road-yellow transition-colors duration-300">
                        {partner.icon}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-foreground mb-1">
                      {partner.name}
                    </div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {partner.category}
                    </div>
                  </div>
                </Card>)}
            </div>
          </div>

          {/* Enhanced Impact Metrics */}
          <Card className="bg-gradient-to-br from-slate-900/5 via-background to-slate-900/5 border-2 border-muted/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/5 via-transparent to-success-green/5" />
            
            <CardHeader className="text-center pb-8 relative z-10">
              <CardTitle className="text-3xl font-bold mb-4 font-heading">
                Impacto <span className="text-road-yellow">Garantido</span>
              </CardTitle>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Métricas reais de alcance e engajamento que sua marca terá
              </p>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {impactMetrics.map((metric, index) => <div key={metric.key} className="text-center group">
                    <div className={`
                      inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 
                      bg-gradient-to-br ${metric.color} text-white
                      group-hover:scale-110 transition-transform duration-300
                    `}>
                      {metric.icon}
                    </div>
                    <div className={`
                      text-4xl font-bold mb-2 font-heading
                      bg-gradient-to-r ${metric.color} bg-clip-text text-transparent
                    `}>
                      {animatedCounts[metric.key as keyof typeof animatedCounts]}{metric.suffix}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {metric.label}
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Spontaneous Donations */}
          <Card className="mt-12 bg-gradient-to-r from-road-yellow/10 via-premium-gold/5 to-road-yellow/10 border-2 border-road-yellow/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-road-yellow/5 via-transparent to-premium-gold/5" />
            
            <CardHeader className="text-center relative z-10">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-road-yellow/20 rounded-xl mr-3">
                  <Heart className="w-8 h-8 text-road-yellow" />
                </div>
                <CardTitle className="text-2xl font-bold">Doações Espontâneas</CardTitle>
              </div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Qualquer valor é bem-vindo e receberá reconhecimento especial nas redes sociais
              </p>
            </CardHeader>
            
            <CardContent className="text-center relative z-10">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" size="lg" className="border-2 border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark font-bold transition-all duration-300">
                  PIX: oreidolongao@gmail.com
                </Button>
                <Button size="lg" className="bg-gradient-to-r from-road-yellow to-premium-gold text-asphalt-dark hover:shadow-xl font-bold transition-all duration-300">
                  Fazer Doação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Support;