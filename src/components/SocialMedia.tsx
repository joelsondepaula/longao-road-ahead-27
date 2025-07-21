import { Youtube, Instagram, Clock, Activity, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SocialMedia = () => {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@oreidolongao",
      description: "Canal oficial do desafio",
      gradient: "from-red-500 to-red-600",
      hoverGradient: "hover:from-red-600 hover:to-red-700",
      iconColor: "text-white",
      bgGradient: "bg-gradient-to-br from-red-50 to-red-100",
      borderColor: "border-red-200",
      shadowColor: "shadow-red-200/50",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/oreidolongao/?e=a1773c69-a632-4e86-8869-f6cfa1f8bee0&g=5",
      description: "Acompanhe nossa jornada",
      gradient: "from-pink-500 to-purple-600",
      hoverGradient: "hover:from-pink-600 hover:to-purple-700",
      iconColor: "text-white",
      bgGradient: "bg-gradient-to-br from-pink-50 to-purple-100",
      borderColor: "border-pink-200",
      shadowColor: "shadow-pink-200/50",
    },
    {
      name: "TV Correio",
      icon: Play,
      url: "https://www.instagram.com/reel/C72d7yzpHNB/?igsh=bHYyeDg2MGM0czBo",
      description: "Matéria João Pessoa → Rio",
      gradient: "from-accent to-yellow-500",
      hoverGradient: "hover:from-yellow-500 hover:to-accent",
      iconColor: "text-white",
      bgGradient: "bg-gradient-to-br from-yellow-50 to-accent/20",
      borderColor: "border-accent",
      shadowColor: "shadow-accent/50",
      featured: true,
      badge: "DESTAQUE TV"
    },
    {
      name: "TikTok",
      icon: Clock,
      url: "https://www.tiktok.com/@sebastianestevan",
      description: "Conteúdo rápido e dinâmico",
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700",
      iconColor: "text-white",
      bgGradient: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      shadowColor: "shadow-blue-200/50",
    },
    {
      name: "Strava",
      icon: Activity,
      url: "https://strava.app.link/2i3JiIN9bVb",
      description: "Atividades diárias e estatísticas",
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "hover:from-orange-600 hover:to-red-600",
      iconColor: "text-white",
      bgGradient: "bg-gradient-to-br from-orange-50 to-red-100",
      borderColor: "border-orange-200",
      shadowColor: "shadow-orange-200/50",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/20 to-accent/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--accent))_0%,transparent_50%)] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--primary))_0%,transparent_50%)] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header com maior destaque */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Siga Nossa Aventura
            </span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-6">
            Redes Sociais
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Acompanhe cada pedalada, cada quilômetro, cada momento épico da jornada mais desafiadora do Brasil
          </p>
        </div>

        {/* Grid de redes sociais com maior destaque */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
          {socialLinks.map((social, index) => (
            <Card 
              key={social.name} 
              className={`group relative transition-all duration-500 hover:scale-110 hover:-translate-y-2 ${social.bgGradient} border-2 ${social.borderColor} ${social.shadowColor} hover:shadow-2xl ${
                social.featured ? 'md:col-span-2 lg:col-span-1 ring-4 ring-accent/30 scale-105' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {social.badge && (
                <div className="absolute -top-3 -right-3 z-10">
                  <div className="bg-gradient-to-r from-accent to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {social.badge}
                  </div>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Ícone com maior destaque */}
                  <div className={`relative p-6 rounded-full bg-gradient-to-br ${social.gradient} ${social.hoverGradient} transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xl`}>
                    <social.icon className={`h-10 w-10 ${social.iconColor}`} />
                    <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Conteúdo */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl group-hover:text-accent transition-colors duration-200">
                      {social.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {social.description}
                    </p>
                  </div>
                  
                  {/* CTA melhorado */}
                  <Button
                    asChild
                    size="lg"
                    className={`w-full bg-gradient-to-r ${social.gradient} ${social.hoverGradient} text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300 font-semibold text-base`}
                  >
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      Acessar Agora
                      <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action final */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent/10 to-accent/20 rounded-2xl border border-accent/30 backdrop-blur-sm">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
            <span className="text-lg font-semibold text-accent-foreground">
              Atualizações em tempo real • Conteúdo exclusivo • Bastidores da jornada
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;