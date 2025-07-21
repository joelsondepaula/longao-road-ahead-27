import { Button } from "@/components/ui/button";
import { Download, FileText, Image, Video, BarChart3, Users } from "lucide-react";

const PressKit = () => {
  const mediaResources = [
    {
      title: "Fotos Oficiais",
      description: "Pack com 20+ fotos em alta resolução da jornada",
      icon: Image,
      size: "15 MB",
      format: "JPG/PNG"
    },
    {
      title: "Vídeos Promocionais", 
      description: "Teasers e highlights da aventura",
      icon: Video,
      size: "120 MB",
      format: "MP4"
    },
    {
      title: "Press Release",
      description: "Comunicado oficial para imprensa",
      icon: FileText,
      size: "2 MB",
      format: "PDF"
    },
    {
      title: "Dados & Métricas",
      description: "Relatório completo de alcance e engajamento",
      icon: BarChart3,
      size: "5 MB", 
      format: "PDF"
    }
  ];

  const socialStats = [
    { platform: "Instagram", followers: "15K+", engagement: "8.5%" },
    { platform: "YouTube", subscribers: "5K+", views: "250K+" },
    { platform: "TikTok", followers: "3K+", views: "180K+" },
    { platform: "Facebook", followers: "2K+", reach: "50K+" }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Kit de <span className="text-trust-blue">Imprensa</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Materiais exclusivos para jornalistas, influenciadores e parceiros de mídia
          </p>
        </div>

        {/* Media Resources */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mediaResources.map((resource, index) => (
            <div key={index} className="p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center justify-center w-12 h-12 bg-trust-blue/10 rounded-lg mb-4 group-hover:bg-trust-blue/20 transition-colors">
                <resource.icon className="w-6 h-6 text-trust-blue" />
              </div>
              
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {resource.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {resource.description}
              </p>
              
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                <span>{resource.size}</span>
                <span>{resource.format}</span>
              </div>
              
              <Button size="sm" className="w-full bg-trust-blue hover:bg-trust-blue/90 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>

        {/* Social Media Stats */}
        <div className="bg-gradient-to-r from-trust-blue/5 to-success-green/5 rounded-2xl p-8 border border-trust-blue/20 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
              Alcance nas Redes Sociais
            </h3>
            <p className="text-muted-foreground">
              Audiência ativa e engajada em múltiplas plataformas
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {socialStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-card/50 rounded-xl border border-border/50">
                <div className="font-heading font-bold text-lg text-trust-blue mb-1">
                  {stat.platform}
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{stat.followers} seguidores</div>
                  {stat.engagement && <div>{stat.engagement} engajamento</div>}
                  {stat.views && <div>{stat.views} visualizações</div>}
                  {stat.reach && <div>{stat.reach} alcance</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact for Press */}
        <div className="text-center bg-card border border-border rounded-xl p-8">
          <Users className="w-12 h-12 text-trust-blue mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            Contato para Imprensa
          </h3>
          <p className="text-muted-foreground mb-6">
            Para entrevistas, materiais exclusivos ou coberturas especiais
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-trust-blue hover:bg-trust-blue/90 text-white">
              Agendar Entrevista
            </Button>
            <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white">
              Solicitar Materiais
            </Button>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>📧 imprensa@reidolongao.com</p>
            <p>📱 +55 (83) 9999-9999</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressKit;