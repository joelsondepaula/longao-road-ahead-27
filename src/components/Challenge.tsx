import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Route, Calendar, Target, Heart, Bike, Zap, Camera, Globe } from "lucide-react";
const Challenge = () => {
  const stats = [{
    icon: <MapPin className="w-8 h-8" />,
    label: "Percurso",
    value: "João Pessoa-PB até Ushuaia-ARG",
    highlight: true,
    gradient: "from-success-green to-trust-blue"
  }, {
    icon: <Route className="w-6 h-6" />,
    label: "Distância",
    value: "Cerca de 8.000 km",
    number: "8.000",
    unit: "km"
  }, {
    icon: <Bike className="w-6 h-6" />,
    label: "Média diária",
    value: "200 km pedalando",
    number: "200",
    unit: "km/dia"
  }, {
    icon: <Calendar className="w-6 h-6" />,
    label: "Duração estimada",
    value: "50 a 60 dias",
    number: "50-60",
    unit: "dias"
  }];
  const objectives = [{
    icon: <Target className="w-6 h-6" />,
    text: "Superar limites pessoais e inspirar pessoas",
    emoji: "🎯"
  }, {
    icon: <Heart className="w-6 h-6" />,
    text: "Estimular a mobilidade ativa e o turismo",
    emoji: "❤️"
  }, {
    icon: <Route className="w-6 h-6" />,
    text: "Compartilhar uma jornada real, intensa e transformadora",
    emoji: "🚴‍♂️"
  }];
  const contentTypes = [{
    icon: <Camera className="w-5 h-5" />,
    label: "Vídeos documentários",
    color: "bg-gradient-to-r from-energy-orange/20 to-road-yellow/20 border-energy-orange/40"
  }, {
    icon: <Zap className="w-5 h-5" />,
    label: "Reels e stories",
    color: "bg-gradient-to-r from-trust-blue/20 to-premium-gold/20 border-trust-blue/40"
  }, {
    icon: <Globe className="w-5 h-5" />,
    label: "Posts com paisagens",
    color: "bg-gradient-to-r from-success-green/20 to-road-yellow/20 border-success-green/40"
  }, {
    icon: <Route className="w-5 h-5" />,
    label: "Relatos em tempo real",
    color: "bg-gradient-to-r from-premium-gold/20 to-energy-orange/20 border-premium-gold/40"
  }];
  return <section id="desafio" className="py-16 bg-gradient-to-br from-asphalt-dark via-slate-900 to-asphalt-dark text-road-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf24' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto bg-slate-950">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 animate-fade-in">
              <div className="w-12 h-1 bg-gradient-to-r from-transparent to-road-yellow rounded-full" />
              <span className="text-road-yellow font-semibold text-lg tracking-wider">EXPEDIÇÃO ÉPICA</span>
              <div className="w-12 h-1 bg-gradient-to-l from-transparent to-road-yellow rounded-full" />
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading">
              O <span className="text-transparent bg-clip-text bg-gradient-to-r from-road-yellow via-premium-gold to-energy-orange animate-fade-in">Desafio</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-road-white/90 max-w-4xl mx-auto leading-relaxed animate-fade-in">
              Uma expedição épica através do continente, documentando cada quilômetro, 
              cada paisagem e cada superação ao longo desta 
              <span className="text-road-yellow font-semibold"> jornada transformadora</span>.
            </p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => <Card key={index} className={`
                  group relative overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2
                  ${stat.highlight ? 'md:col-span-2 lg:col-span-1 bg-gradient-to-br from-success-green/10 to-trust-blue/10 border-2 border-road-yellow/50' : 'bg-gradient-to-br from-road-white/5 to-road-white/10 border border-road-yellow/30 hover:border-road-yellow/60'}
                  backdrop-blur-sm shadow-2xl hover:shadow-road-yellow/20
                `}>
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-road-yellow/0 via-road-yellow/5 to-road-yellow/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-slate-900" />
                
                <CardHeader className="pb-4 relative z-10 bg-slate-900">
                  <div className={`
                    text-road-yellow mx-auto mb-4 p-3 rounded-2xl transition-all duration-300
                    ${stat.highlight ? 'bg-road-yellow/20' : 'bg-road-yellow/10 group-hover:bg-road-yellow/20'}
                  `}>
                    {stat.icon}
                  </div>
                  <CardTitle className="text-road-white/80 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="relative z-10 bg-slate-900">
                  {stat.number ? <div className="text-center">
                      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-road-yellow to-premium-gold bg-clip-text text-transparent mb-1">
                        {stat.number}
                      </div>
                      <div className="text-road-yellow/80 text-sm font-medium">{stat.unit}</div>
                    </div> : <p className="text-road-yellow font-bold text-lg text-center leading-tight">{stat.value}</p>}
                </CardContent>
              </Card>)}
          </div>

          {/* Enhanced Content & Objectives */}
          <div className="grid lg:grid-cols-2 gap-12 items-start bg-slate-950">
            {/* Content Card */}
            <Card className="group bg-gradient-to-br from-road-white/5 to-road-white/10 border border-road-yellow/30 hover:border-road-yellow/60 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm shadow-2xl bg-slate-950">
              <CardHeader className="pb-6 bg-slate-900">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-road-yellow to-premium-gold bg-clip-text text-transparent flex items-center">
                  <div className="p-2 bg-road-yellow/20 rounded-xl mr-3">
                    <Calendar className="w-6 h-6 text-road-yellow" />
                  </div>
                  Conteúdo Diário
                </CardTitle>
                <p className="text-road-white/70 mt-2">Documentação completa da jornada em múltiplos formatos</p>
              </CardHeader>
              
              <CardContent className="space-y-4 bg-slate-900">
                {contentTypes.map((content, index) => <div key={index} className={`
                      ${content.color} rounded-xl p-4 border transition-all duration-300 hover:scale-105
                      flex items-center gap-3 group/item
                    `}>
                    <div className="text-road-yellow group-hover/item:scale-110 transition-transform duration-300">
                      {content.icon}
                    </div>
                    <span className="text-road-white font-medium">{content.label}</span>
                  </div>)}
              </CardContent>
            </Card>

            {/* Objectives Card */}
            <Card className="group bg-gradient-to-br from-road-white/5 to-road-white/10 border border-road-yellow/30 hover:border-road-yellow/60 transition-all duration-500 hover:scale-[1.02] backdrop-blur-sm shadow-2xl bg-slate-950">
              <CardHeader className="pb-6 bg-slate-900">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-road-yellow to-premium-gold bg-clip-text text-transparent flex items-center">
                  <div className="p-2 bg-road-yellow/20 rounded-xl mr-3">
                    <Heart className="w-6 h-6 text-road-yellow" />
                  </div>
                  Motivações & Impacto
                </CardTitle>
                <p className="text-road-white/70 mt-2">Os propósitos que movem esta expedição transformadora</p>
              </CardHeader>
              
              <CardContent className="space-y-6 bg-slate-900">
                {objectives.map((objective, index) => <div key={index} className="group/objective flex items-start space-x-4 p-4 rounded-xl bg-gradient-to-r from-road-yellow/5 to-premium-gold/5 border border-road-yellow/20 hover:border-road-yellow/40 transition-all duration-300 hover:scale-105 bg-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl group-hover/objective:scale-125 transition-transform duration-300">
                        {objective.emoji}
                      </span>
                      <div className="text-road-yellow mt-1 group-hover/objective:scale-110 transition-transform duration-300">
                        {objective.icon}
                      </div>
                    </div>
                    <p className="text-road-white/90 leading-relaxed font-medium">{objective.text}</p>
                  </div>)}
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 bg-slate-900">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-road-yellow/20 to-premium-gold/20 border border-road-yellow/40 rounded-full">
              <Bike className="w-5 h-5 text-road-yellow animate-pulse" />
              <span className="text-road-yellow font-semibold">Acompanhe cada quilômetro dessa jornada épica</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Challenge;