import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Medal, Heart, Bike, Plane, Star, Shield, Zap, TrendingUp, Users, Globe, Camera, Target } from "lucide-react";
import { useState, useEffect } from "react";
import hostdimeLogo from "@/assets/hostdime-logo.svg";
import telyLogo from "@/assets/tely-logo.png";

const Support = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    impressions: 0,
    followers: 0,
    exposure: 50,
    countries: 0
  });
  const impactMetrics = [{
    key: 'impressions',
    target: 50,
    suffix: 'K+',
    label: 'Impressões mensais',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-trust-blue to-trust-blue/70'
  }, {
    key: 'followers',
    target: 5,
    suffix: 'K+',
    label: 'Seguidores engajados',
    icon: <Users className="w-6 h-6" />,
    color: 'from-success-green to-success-green/70'
  }, {
    key: 'exposure',
    target: 50,
    suffix: '-60',
    label: 'Dias de exposição',
    icon: <Globe className="w-6 h-6" />,
    color: 'from-energy-orange to-energy-orange/70'
  }, {
    key: 'countries',
    target: 3,
    suffix: '',
    label: 'Países alcançados',
    icon: <Target className="w-6 h-6" />,
    color: 'from-premium-gold to-premium-gold/70'
  }];
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCounts(prev => ({
        impressions: Math.min(prev.impressions + 1, 50),
        followers: Math.min(prev.followers + 1, 5),
        exposure: Math.min(prev.exposure + 1, 50),
        countries: Math.min(prev.countries + 1, 3)
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
    level: "Master",
    icon: <Bike className="w-8 h-8" />,
    title: "Patrocínio Master",
    price: "Fornecimento",
    originalPrice: "de uma Bike Gravel",
    color: "premium-gold",
    gradient: "from-premium-gold/30 via-road-yellow/20 to-premium-gold/30",
    borderGradient: "from-premium-gold via-road-yellow to-premium-gold",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Exposição de maior destaque: bike, uniforme, vídeos e conteúdo diário"
    }, {
      icon: <Award className="w-4 h-4" />,
      text: "Marca destacada como 'Bike oficial do desafio'"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Direito de uso de imagem para campanhas da marca"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Evidenciaremos a qualidade e resistência da bike"
    }, {
      icon: <Zap className="w-4 h-4" />,
      text: "Versatilidade da gravel para cicloturismo e uso urbano"
    }],
    highlight: true,
    badge: "EXCLUSIVO"
  }, {
    level: "Ouro",
    icon: <Crown className="w-8 h-8" />,
    title: "Cota Ouro",
    price: "Passagem Aérea",
    originalPrice: "Ushuaia + João Pessoa/Recife",
    color: "premium-gold",
    gradient: "from-premium-gold/20 via-road-yellow/15 to-premium-gold/20",
    borderGradient: "from-premium-gold via-road-yellow to-premium-gold",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Nome/logo da marca na camisa do desafio"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Menções em posts semanais"
    }, {
      icon: <Zap className="w-4 h-4" />,
      text: "Destaque em stories e agradecimentos"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Menção em conteúdos de encerramento da jornada"
    }],
    highlight: false,
    badge: "POPULAR"
  }, {
    level: "Prata",
    icon: <Star className="w-6 h-6" />,
    title: "Cota Prata",
    price: "R$ 2.000",
    originalPrice: "Investimento único",
    color: "premium-silver",
    gradient: "from-slate-200/20 via-slate-300/15 to-slate-200/20",
    borderGradient: "from-slate-300 via-slate-400 to-slate-300",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Marca estampada na camisa do desafio"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Agradecimentos e menções pontuais em stories e reels"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Inclusão em postagens de parceiros e apoiadores"
    }]
  }, {
    level: "Bronze",
    icon: <Medal className="w-6 h-6" />,
    title: "Cota Bronze",
    price: "R$ 1.000",
    originalPrice: "Investimento único",
    color: "premium-bronze",
    gradient: "from-orange-200/20 via-orange-300/15 to-orange-200/20",
    borderGradient: "from-orange-300 via-orange-400 to-orange-300",
    benefits: [{
      icon: <Star className="w-4 h-4" />,
      text: "Menção em postagens de agradecimento"
    }, {
      icon: <Camera className="w-4 h-4" />,
      text: "Nome reconhecido na descrição de vídeos"
    }]
  }];
  const currentPartners = [{
    name: "HostDime",
    category: "Hospedagem",
    logo: hostdimeLogo
  }, {
    name: "Tely",
    category: "Tecnologia",
    logo: telyLogo
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
      <div className="absolute inset-0 opacity-5 bg-gray-50">
        
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Faça Parte desta <span className="text-road-yellow">Jornada</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Seja um patrocinador e potencialize sua marca através de uma aventura épica que 
            inspirará milhares de pessoas pelo Brasil e além.
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {impactMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg group hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${metric.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {metric.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {animatedCounts[metric.key as keyof typeof animatedCounts]}{metric.suffix}
                </div>
                <p className="text-muted-foreground font-medium">{metric.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sponsorship Levels */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {sponsorshipLevels.map((level, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden group transition-all duration-300 hover:scale-105 ${
                level.highlight 
                  ? 'border-2 border-dashed border-road-yellow shadow-2xl' 
                  : 'border border-muted hover:border-road-yellow/50'
              }`}
            >
              {level.badge && (
                <div className="absolute -top-2 -right-2 z-10">
                  <Badge className={`${level.highlight ? 'bg-road-yellow text-asphalt-dark' : 'bg-premium-gold text-white'} font-bold`}>
                    {level.badge}
                  </Badge>
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${level.gradient} opacity-50`} />
              
              <CardHeader className="relative z-10 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${level.borderGradient} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                    <div className={`text-${level.color}`}>
                      {level.icon}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-foreground text-xl">{level.title}</CardTitle>
                <div className="space-y-1">
                  <div className={`text-2xl font-bold text-${level.color}`}>{level.price}</div>
                  <div className="text-sm text-muted-foreground">{level.originalPrice}</div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 space-y-3">
                {level.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start gap-3">
                    <div className={`text-${level.color} mt-0.5 flex-shrink-0`}>
                      {benefit.icon}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{benefit.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Partners */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            Parceiros <span className="text-road-yellow">Atuais</span>
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {currentPartners.map((partner, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center h-12">
                    {partner.logo ? (
                      <img 
                        src={partner.logo} 
                        alt={`${partner.name} logo`}
                        className={`max-h-12 max-w-full object-contain ${
                          partner.name === 'Tely' ? 'bg-gray-100 p-2 rounded' : ''
                        }`}
                      />
                    ) : (
                      <div className="text-road-yellow">
                        {partner.icon}
                      </div>
                    )}
                  </div>
                  <h4 className="font-semibold text-foreground">{partner.name}</h4>
                  <p className="text-sm text-muted-foreground">{partner.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>;
};
export default Support;