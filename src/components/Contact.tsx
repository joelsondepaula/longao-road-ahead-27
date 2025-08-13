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
import { Crown } from "lucide-react";
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
  return <section id="contato" className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-road-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-road-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-road-yellow/3 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-road-yellow/10 backdrop-blur-sm rounded-full border border-road-yellow/30 mb-6">
              <div className="w-3 h-3 bg-road-yellow rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-road-yellow uppercase tracking-wider">
                Vamos Conversar
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-road-white via-road-yellow to-road-white bg-clip-text text-transparent">
              Entre em Contato
            </h2>
            <p className="text-xl md:text-2xl text-road-white/80 max-w-3xl mx-auto leading-relaxed">
              Quer fazer parte desta jornada épica? Vamos conversar sobre como sua marca 
              pode apoiar este desafio e alcançar <span className="text-road-yellow font-semibold">milhares de pessoas</span> através do esporte.
            </p>
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Enhanced Contact Form */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-road-yellow via-yellow-500 to-road-yellow rounded-2xl blur opacity-20"></div>
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-road-yellow/30 p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-road-yellow/20 rounded-full mb-4">
                    <Mail className="w-8 h-8 text-road-yellow" />
                  </div>
                  <h3 className="text-2xl font-bold text-road-white mb-2">Envie sua Mensagem</h3>
                  <p className="text-road-white/70">
                    Preencha o formulário abaixo e responderemos o mais breve possível.
                  </p>
                </div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-road-white font-semibold">Nome</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Seu nome completo" 
                                {...field} 
                                className="bg-slate-700/50 border-road-yellow/40 text-road-white placeholder:text-road-white/50 focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/20 transition-all duration-300"
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
                            <FormLabel className="text-road-white font-semibold">Email</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="seu@email.com" 
                                type="email"
                                {...field} 
                                className="bg-slate-700/50 border-road-yellow/40 text-road-white placeholder:text-road-white/50 focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/20 transition-all duration-300"
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
                          <FormLabel className="text-road-white font-semibold">Telefone (opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="(83) 9 9999-9999" 
                              {...field} 
                              className="bg-slate-700/50 border-road-yellow/40 text-road-white placeholder:text-road-white/50 focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/20 transition-all duration-300"
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
                          <FormLabel className="text-road-white font-semibold">Assunto</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Ex: Patrocínio, Parceria, Apoio" 
                              {...field} 
                              className="bg-slate-700/50 border-road-yellow/40 text-road-white placeholder:text-road-white/50 focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/20 transition-all duration-300"
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
                          <FormLabel className="text-road-white font-semibold">Mensagem</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Conte-nos sobre sua proposta, interesse ou como gostaria de apoiar o projeto..."
                              className="bg-slate-700/50 border-road-yellow/40 text-road-white placeholder:text-road-white/50 min-h-[140px] focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/20 transition-all duration-300 resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-road-yellow via-yellow-500 to-road-yellow text-asphalt-dark hover:from-road-yellow/90 hover:via-yellow-500/90 hover:to-road-yellow/90 font-bold py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Enviando mensagem...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Enhanced Contact Info */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl font-bold text-road-white mb-6 bg-gradient-to-r from-road-white to-road-yellow bg-clip-text text-transparent">
                  Outros Canais de Contato
                </h3>
                <p className="text-xl text-road-white/80 mb-8 leading-relaxed">
                  Prefere outro meio? <span className="text-road-yellow">Use qualquer um dos canais abaixo</span> e entraremos em contato rapidamente:
                </p>
              </div>
              
              <div className="grid gap-6">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-road-yellow/50 to-yellow-500/50 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="relative bg-slate-800/60 backdrop-blur-sm border border-road-yellow/30 rounded-2xl p-6 group-hover:bg-slate-800/80 transition-all duration-300">
                      <div className="flex items-center space-x-6">
                        <div className="text-road-yellow group-hover:scale-110 transition-transform duration-300 bg-road-yellow/20 p-4 rounded-full">
                          {contact.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-road-white font-bold text-xl mb-1">{contact.label}</h4>
                          <p className="text-road-yellow text-lg font-semibold">{contact.value}</p>
                        </div>
                        {contact.action && (
                          <Button 
                            variant="outline" 
                            size="lg" 
                            onClick={() => contact.link && window.open(contact.link, '_blank')} 
                            className="border-road-yellow/50 text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                          >
                            {contact.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-road-yellow/30 via-yellow-500/30 to-road-yellow/30 rounded-3xl blur-lg"></div>
            <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border border-road-yellow/50 rounded-3xl p-12 text-center shadow-2xl">
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-road-yellow/20 rounded-full mb-6">
                  <Crown className="w-10 h-10 text-road-yellow" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-road-white mb-6 leading-tight">
                  Pronto para embarcar nesta <span className="text-road-yellow">aventura épica</span>?
                </h3>
                <p className="text-xl text-road-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Seja um patrocinador, apoiador ou simplesmente alguém que acredita no poder dos sonhos grandes. 
                  <span className="text-road-yellow font-semibold"> Vamos transformar esta jornada em algo inesquecível juntos!</span>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  className="bg-gradient-to-r from-road-yellow via-yellow-500 to-road-yellow text-asphalt-dark hover:from-road-yellow/90 hover:via-yellow-500/90 hover:to-road-yellow/90 font-bold px-10 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                  onClick={() => window.open('mailto:oreidolongao@gmail.com', '_blank')}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Quero ser parceiro
                </Button>
                <Button 
                  variant="outline" 
                  className="border-2 border-road-yellow text-road-yellow hover:bg-road-yellow hover:text-asphalt-dark px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                  onClick={() => window.open('https://instagram.com/oreidolongao', '_blank')}
                >
                  <Instagram className="w-5 h-5 mr-2" />
                  Acompanhar projeto
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Contact;