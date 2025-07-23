import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Video, BarChart3, Users } from "lucide-react";
const PressKit = () => {
  const mediaResources = [{
    title: "Fotos Oficiais",
    description: "Pack com 20+ fotos em alta resolução da jornada",
    icon: Image,
    size: "15 MB",
    format: "JPG/PNG"
  }, {
    title: "Vídeos Promocionais",
    description: "Teasers e highlights da aventura",
    icon: Video,
    size: "120 MB",
    format: "MP4"
  }, {
    title: "Press Release",
    description: "Comunicado oficial para imprensa",
    icon: FileText,
    size: "2 MB",
    format: "PDF"
  }, {
    title: "Dados & Métricas",
    description: "Relatório completo de alcance e engajamento",
    icon: BarChart3,
    size: "5 MB",
    format: "PDF"
  }];
  const socialStats = [{
    platform: "Instagram",
    followers: "15K+",
    engagement: "8.5%"
  }, {
    platform: "YouTube",
    subscribers: "5K+",
    views: "250K+"
  }, {
    platform: "TikTok",
    followers: "3K+",
    views: "180K+"
  }, {
    platform: "Facebook",
    followers: "2K+",
    reach: "50K+"
  }];
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Press Kit</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Recursos oficiais para imprensa e mídia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mediaResources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <div key={index} className="bg-card p-6 rounded-lg border">
                <div className="flex items-center gap-3 mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                  <h3 className="font-semibold">{resource.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                  <span>{resource.format}</span>
                  <span>{resource.size}</span>
                </div>
                <Button size="sm" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            );
          })}
        </div>

        <div className="bg-card p-8 rounded-lg border">
          <div className="flex items-center gap-2 mb-6">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-semibold">Métricas das Redes Sociais</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialStats.map((stat, index) => (
              <div key={index} className="text-center">
                <h4 className="font-semibold text-lg mb-2">{stat.platform}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  {stat.followers && <p>Seguidores: <span className="font-medium text-foreground">{stat.followers}</span></p>}
                  {stat.subscribers && <p>Inscritos: <span className="font-medium text-foreground">{stat.subscribers}</span></p>}
                  {stat.engagement && <p>Engajamento: <span className="font-medium text-foreground">{stat.engagement}</span></p>}
                  {stat.views && <p>Visualizações: <span className="font-medium text-foreground">{stat.views}</span></p>}
                  {stat.reach && <p>Alcance: <span className="font-medium text-foreground">{stat.reach}</span></p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default PressKit;