import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Play, Newspaper } from "lucide-react";
const Media = () => {
  // Placeholder media items - can be updated with real content later
  const mediaItems = [{
    type: "video",
    title: "Preparação para o Desafio Ushuaia",
    description: "Conheça os bastidores da preparação para esta jornada épica",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    link: "#"
  }, {
    type: "article",
    title: "Ciclista prepara expedição de 8.000 km",
    description: "Matéria sobre os desafios e motivações do projeto",
    thumbnail: "https://images.unsplash.com/photo-1553978297-833d24102943?w=400&h=300&fit=crop",
    link: "#"
  }, {
    type: "video",
    title: "Treinos e Equipamentos",
    description: "Como se preparar para longas distâncias no ciclismo",
    thumbnail: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400&h=300&fit=crop",
    link: "#"
  }];
  return <section id="midia" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        
      </div>
    </section>;
};
export default Media;