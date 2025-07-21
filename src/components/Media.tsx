import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Newspaper } from "lucide-react";

const Media = () => {
  // Placeholder media items - can be updated with real content later
  const mediaItems = [
    {
      type: "video",
      title: "Preparação para o Desafio Ushuaia",
      description: "Conheça os bastidores da preparação para esta jornada épica",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      type: "article",
      title: "Ciclista prepara expedição de 8.000 km",
      description: "Matéria sobre os desafios e motivações do projeto",
      thumbnail: "https://images.unsplash.com/photo-1553978297-833d24102943?w=400&h=300&fit=crop",
      link: "#"
    },
    {
      type: "video",
      title: "Treinos e Equipamentos",
      description: "Como se preparar para longas distâncias no ciclismo",
      thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
      link: "#"
    }
  ];

  return (
    <section id="midia" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Newspaper className="w-8 h-8 text-road-yellow mr-3" />
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Na <span className="text-road-yellow">Mídia</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Acompanhe as matérias, entrevistas e conteúdos sobre o projeto O Rei do Longão
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mediaItems.map((item, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-l-4 border-l-road-yellow">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-road-yellow/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-asphalt-dark" />
                      </div>
                    </div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-road-yellow transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark transition-colors duration-300"
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {item.type === "video" ? "Assistir" : "Ler matéria"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Quer divulgar o projeto? Entre em contato!
            </p>
            <Button 
              variant="outline" 
              className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark"
            >
              Contato para Imprensa
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Media;
