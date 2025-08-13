import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send, Loader2, MessageCircle, Phone, Instagram } from "lucide-react";
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
  contactType: z.string().min(1, "Selecione o tipo de contato"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  children: React.ReactNode;
  defaultContactType?: string;
}

const ContactModal = ({ children, defaultContactType = "" }: ContactModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      contactType: defaultContactType,
      subject: "",
      message: "",
    },
  });

  // Reset form when contact type changes via props
  React.useEffect(() => {
    if (defaultContactType) {
      form.setValue("contactType", defaultContactType);
    }
  }, [defaultContactType, form]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const emailData = {
        ...data,
        subject: `[${data.contactType}] ${data.subject}`,
        message: `Tipo de Contato: ${data.contactType}\n${data.phone ? `Telefone: ${data.phone}\n` : ''}\nMensagem:\n${data.message}`,
      };

      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Obrigado pelo contato. Responderemos em breve!",
      });
      
      form.reset();
      setOpen(false);
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

  const contactTypes = [
    { value: "patrocinio", label: "Interesse em Patrocínio" },
    { value: "parceria", label: "Proposta de Parceria" },
    { value: "midia", label: "Imprensa / Mídia" },
    { value: "apoio", label: "Apoio / Incentivo" },
    { value: "comercial", label: "Oportunidade Comercial" },
    { value: "geral", label: "Contato Geral" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[95vh] overflow-hidden bg-gradient-to-br from-background via-background/95 to-background border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 pointer-events-none" />
        
        <DialogHeader className="relative z-10 pb-6 border-b border-primary/20">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
              <Mail className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Entre em Contato
          </DialogTitle>
          <p className="text-muted-foreground text-center text-lg font-medium">
            Transforme sua ideia em realidade. Vamos conversar!
          </p>
        </DialogHeader>

        <div className="relative z-10 space-y-8 py-6 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-3 gap-4">
            <a
              href="mailto:oreidolongao@gmail.com"
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-card via-card/90 to-card/80 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="p-3 mb-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Email Direto</span>
              <span className="text-xs text-muted-foreground mt-1">Resposta rápida</span>
            </a>
            <a
              href="https://wa.me/5583964532580"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-card via-card/90 to-card/80 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="p-3 mb-3 bg-gradient-to-br from-green-500/20 to-green-400/10 rounded-xl group-hover:from-green-500/30 group-hover:to-green-400/20 transition-all duration-300">
                <MessageCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-green-500 transition-colors">WhatsApp</span>
              <span className="text-xs text-muted-foreground mt-1">Chat imediato</span>
            </a>
            <a
              href="https://instagram.com/oreidolongao"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-gradient-to-br from-card via-card/90 to-card/80 rounded-2xl border border-border/50 hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="p-3 mb-3 bg-gradient-to-br from-pink-500/20 to-purple-500/10 rounded-xl group-hover:from-pink-500/30 group-hover:to-purple-500/20 transition-all duration-300">
                <Instagram className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <span className="text-sm font-semibold text-foreground group-hover:text-pink-500 transition-colors">Instagram</span>
              <span className="text-xs text-muted-foreground mt-1">Acompanhe a jornada</span>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-6 py-2 text-sm font-medium text-muted-foreground rounded-full border border-border/50 backdrop-blur-sm">
                Ou use o formulário completo
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-card/50 via-card/40 to-card/30 rounded-3xl p-8 border border-border/50 backdrop-blur-sm shadow-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Nome Completo *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Digite seu nome completo" 
                            {...field} 
                            className="h-12 bg-background/60 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-300 hover:border-primary/50"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="seuemail@exemplo.com" 
                            type="email"
                            {...field} 
                            className="h-12 bg-background/60 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-300 hover:border-primary/50"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Telefone / WhatsApp</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="(83) 9 9999-9999" 
                            {...field} 
                            className="h-12 bg-background/60 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-300 hover:border-primary/50"
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactType"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Motivo do Contato *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background/60 border-2 border-border/50 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-300 hover:border-primary/50">
                              <SelectValue placeholder="Selecione o motivo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-2 border-border/50 bg-popover backdrop-blur-sm">
                            {contactTypes.map((type) => (
                              <SelectItem 
                                key={type.value} 
                                value={type.value}
                                className="rounded-lg hover:bg-primary/10 focus:bg-primary/10 transition-colors"
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-destructive text-sm" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Assunto *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ex: Proposta de Patrocínio para Projeto X" 
                          {...field} 
                          className="h-12 bg-background/60 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl transition-all duration-300 hover:border-primary/50"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-foreground font-semibold text-sm tracking-wide">Mensagem Detalhada *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva detalhadamente sua proposta, interesse ou como gostaria de apoiar o projeto. Inclua informações relevantes como orçamento, prazos, expectativas, etc."
                          className="min-h-[140px] bg-background/60 border-2 border-border/50 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl resize-none transition-all duration-300 hover:border-primary/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-sm" />
                    </FormItem>
                  )}
                />
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground hover:from-primary/90 hover:via-primary/80 hover:to-primary/90 font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 rounded-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                        <span className="animate-pulse">Enviando sua mensagem...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6 mr-3" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className="text-center p-6 bg-gradient-to-r from-muted/30 via-muted/20 to-muted/30 rounded-2xl border border-border/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-foreground">
                Compromisso de Resposta
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Garantimos resposta em até <span className="text-primary font-semibold">24 horas úteis</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Para urgências, use WhatsApp ou telefone
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;