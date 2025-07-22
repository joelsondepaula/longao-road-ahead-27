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
  return <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      
    </section>;
};
export default PressKit;