import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Award, Medal, Heart, Bike, Plane, Star, Shield, Zap, TrendingUp, Users, Globe, Camera, Target } from "lucide-react";
import { useState, useEffect } from "react";
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
      text: "Menção em posts semanais"
    }, {
      icon: <Zap className="w-4 h-4" />,
      text: "Destaque em stories e agradecimentos"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Menção em conteúdos de equipos e testing da jornada"
    }],
    highlight: true,
    badge: "DESTAQUE"
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
      text: "Apoio reconhecido nas redes sociais"
    }, {
      icon: <Shield className="w-4 h-4" />,
      text: "Presença como apoiador na descrição de vídeos"
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
      <div className="absolute inset-0 opacity-5 bg-gray-50">
        
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
      </div>
    </section>;
};
export default Support;