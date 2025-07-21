import { Youtube, Instagram, Clock, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SocialMedia = () => {
  const socialLinks = [
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://www.youtube.com/@oreidolongao",
      description: "Canal oficial do desafio",
      color: "text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
    },
    {
      name: "Instagram - Perfil",
      icon: Instagram,
      url: "https://www.instagram.com/oreidolongao/?e=a1773c69-a632-4e86-8869-f6cfa1f8bee0&g=5",
      description: "Acompanhe nossa jornada",
      color: "text-pink-600",
      bgColor: "bg-pink-50 hover:bg-pink-100",
    },
    {
      name: "Instagram - TV Correio",
      icon: Instagram,
      url: "https://www.instagram.com/reel/C72d7yzpHNB/?igsh=bHYyeDg2MGM0czBo",
      description: "Matéria sobre João Pessoa - Rio",
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      featured: true,
    },
    {
      name: "TikTok",
      icon: Clock,
      url: "https://www.tiktok.com/@sebastianestevan",
      description: "Conteúdo rápido e dinâmico",
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
    },
    {
      name: "Strava",
      icon: Activity,
      url: "https://strava.app.link/2i3JiIN9bVb",
      description: "Atividades diárias e estatísticas",
      color: "text-orange-600",
      bgColor: "bg-orange-50 hover:bg-orange-100",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Acompanhe Nossa Jornada
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Siga todas as nossas redes sociais para não perder nenhum momento da aventura épica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {socialLinks.map((social, index) => (
            <Card 
              key={social.name} 
              className={`group transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                social.featured ? 'md:col-span-2 lg:col-span-1 ring-2 ring-accent/50' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-full ${social.bgColor} transition-colors duration-200`}>
                    <social.icon className={`h-6 w-6 ${social.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
                      {social.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {social.description}
                    </p>
                  </div>
                </div>
                
                <Button
                  asChild
                  className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-200"
                  variant="outline"
                >
                  <a 
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Acessar
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-accent-foreground">
              Atualizações em tempo real nas redes sociais
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia;