import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "oreidolongao@gmail.com",
      link: "mailto:oreidolongao@gmail.com",
      action: "Enviar email"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram", 
      value: "@oreidolongao",
      link: "https://instagram.com/oreidolongao",
      action: "Seguir no Instagram"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Localização",
      value: "João Pessoa - PB",
      link: null,
      action: null
    }
  ];

  return (
    <section id="contato" className="py-20 bg-asphalt-dark text-road-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Entre em <span className="text-road-yellow">Contato</span>
            </h2>
            <p className="text-lg md:text-xl text-road-white/80 max-w-2xl mx-auto">
              Quer fazer parte desta jornada épica? Vamos conversar sobre como sua marca 
              pode apoiar este desafio e alcançar milhares de pessoas através do esporte.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((contact, index) => (
              <Card key={index} className="bg-road-white/5 border-road-yellow/30 text-center group hover:bg-road-white/10 transition-all duration-300">
                <CardHeader>
                  <div className="text-road-yellow mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    {contact.icon}
                  </div>
                  <CardTitle className="text-road-white text-lg">{contact.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-road-yellow font-semibold mb-4">{contact.value}</p>
                  {contact.action && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark transition-colors duration-300"
                      onClick={() => contact.link && window.open(contact.link, '_blank')}
                    >
                      {contact.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-road-yellow/20 to-road-yellow/10 border-road-yellow/50 text-center">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-road-white mb-4">
                Pronto para embarcar nesta aventura?
              </h3>
              <p className="text-road-white/80 mb-8 max-w-2xl mx-auto">
                Seja um patrocinador, apoiador ou simplesmente alguém que acredita no poder dos sonhos grandes. 
                Vamos transformar esta jornada em algo inesquecível juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold"
                  onClick={() => window.open('mailto:oreidolongao@gmail.com', '_blank')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Quero ser parceiro
                </Button>
                <Button 
                  variant="outline"
                  className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark"
                  onClick={() => window.open('https://instagram.com/oreidolongao', '_blank')}
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Acompanhar projeto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;