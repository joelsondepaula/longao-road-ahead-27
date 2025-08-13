import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Instagram, MessageCircle, Phone, Send, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: data
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderemos em breve!",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou use nossos outros canais de contato.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp contact info updated
  const contactInfo = [{
    icon: <Mail className="w-6 h-6" />,
    label: "Email",
    value: "oreidolongao@gmail.com",
    link: "mailto:oreidolongao@gmail.com",
    action: "Enviar email"
  }, {
    icon: <Instagram className="w-6 h-6" />,
    label: "Instagram",
    value: "@oreidolongao",
    link: "https://instagram.com/oreidolongao",
    action: "Seguir no Instagram"
  }, {
    icon: <MessageCircle className="w-6 h-6" />,
    label: "WhatsApp",
    value: "Fale conosco agora",
    link: "https://wa.me/5583964532580",
    action: "Enviar mensagem"
  }];
  return <section id="contato" className="py-20 bg-asphalt-dark text-road-white">
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

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Contact Form */}
            <Card className="bg-road-white/5 border-road-yellow/30">
              <CardHeader>
                <CardTitle className="text-road-white text-2xl">Envie sua Mensagem</CardTitle>
                <p className="text-road-white/80">
                  Preencha o formulário abaixo e responderemos o mais breve possível.
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-road-white">Nome</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu nome" 
                                {...field} 
                                className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-road-white">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="seu@email.com" 
                                type="email"
                                {...field} 
                                className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-road-white">Telefone (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(83) 9 9999-9999" 
                              {...field} 
                              className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-road-white">Assunto</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Patrocínio, Parceria, Apoio" 
                              {...field} 
                              className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-road-white">Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Conte-nos sobre sua proposta, interesse ou como gostaria de apoiar o projeto..."
                              className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-bold text-road-white mb-4">
                  Outros Canais de Contato
                </h3>
                <p className="text-road-white/80">
                  Prefere outro meio? Use qualquer um dos canais abaixo:
                </p>
              </div>
              
              <div className="grid gap-4">
                {contactInfo.map((contact, index) => (
                  <Card key={index} className="bg-road-white/5 border-road-yellow/30 group hover:bg-road-white/10 transition-all duration-300">
                    <CardContent className="p-4 flex items-center space-x-4">
                      <div className="text-road-yellow group-hover:scale-110 transition-transform duration-300">
                        {contact.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-road-white font-semibold">{contact.label}</h4>
                        <p className="text-road-yellow text-sm">{contact.value}</p>
                      </div>
                      {contact.action && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => contact.link && window.open(contact.link, '_blank')} 
                          className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark transition-colors duration-300"
                        >
                          {contact.action}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-road-yellow/20 to-road-yellow/10 border-road-yellow/50 text-center">
            <CardContent className="py-12 bg-zinc-800">
              <h3 className="text-2xl font-bold text-road-white mb-4">
                Pronto para embarcar nesta aventura?
              </h3>
              <p className="text-road-white/80 mb-8 max-w-2xl mx-auto">
                Seja um patrocinador, apoiador ou simplesmente alguém que acredita no poder dos sonhos grandes. 
                Vamos transformar esta jornada em algo inesquecível juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold" onClick={() => window.open('mailto:oreidolongao@gmail.com', '_blank')}>
                  <Mail className="w-4 h-4 mr-2" />
                  Quero ser parceiro
                </Button>
                <Button variant="outline" className="border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark" onClick={() => window.open('https://instagram.com/oreidolongao', '_blank')}>
                  <Instagram className="w-4 h-4 mr-2" />
                  Acompanhar projeto
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Contact;