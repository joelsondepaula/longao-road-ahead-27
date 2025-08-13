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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-road-yellow/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-road-white text-center">
            Entre em Contato
          </DialogTitle>
          <p className="text-road-white/80 text-center">
            Preencha o formulário abaixo e responderemos o mais breve possível
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Contact Options */}
          <div className="grid grid-cols-3 gap-3">
            <a
              href="mailto:oreidolongao@gmail.com"
              className="flex flex-col items-center p-3 bg-road-white/10 rounded-lg border border-road-yellow/30 hover:bg-road-white/20 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 text-road-yellow group-hover:scale-110 transition-transform" />
              <span className="text-xs text-road-white mt-1">Email</span>
            </a>
            <a
              href="https://wa.me/5583964532580"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 bg-road-white/10 rounded-lg border border-road-yellow/30 hover:bg-road-white/20 transition-all duration-300 group"
            >
              <MessageCircle className="w-5 h-5 text-road-yellow group-hover:scale-110 transition-transform" />
              <span className="text-xs text-road-white mt-1">WhatsApp</span>
            </a>
            <a
              href="https://instagram.com/oreidolongao"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-3 bg-road-white/10 rounded-lg border border-road-yellow/30 hover:bg-road-white/20 transition-all duration-300 group"
            >
              <Instagram className="w-5 h-5 text-road-yellow group-hover:scale-110 transition-transform" />
              <span className="text-xs text-road-white mt-1">Instagram</span>
            </a>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-road-yellow/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-road-white/70">Ou preencha o formulário</span>
            </div>
          </div>

          {/* Contact Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-road-white">Nome *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Seu nome" 
                          {...field} 
                          className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 focus:border-road-yellow"
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
                      <FormLabel className="text-road-white">Email *</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu@email.com" 
                          type="email"
                          {...field} 
                          className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 focus:border-road-yellow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-road-white">Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(83) 9 9999-9999" 
                          {...field} 
                          className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 focus:border-road-yellow"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-road-white">Tipo de Contato *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-road-white/10 border-road-yellow/30 text-road-white focus:border-road-yellow">
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contactTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-road-white">Assunto *</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ex: Proposta de Patrocínio, Parceria, etc." 
                        {...field} 
                        className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 focus:border-road-yellow"
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
                    <FormLabel className="text-road-white">Mensagem *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Conte-nos sobre sua proposta, interesse ou como gostaria de apoiar o projeto..."
                        className="bg-road-white/10 border-road-yellow/30 text-road-white placeholder:text-road-white/60 min-h-[100px] focus:border-road-yellow"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-road-yellow to-yellow-500 text-asphalt-dark hover:from-road-yellow/90 hover:to-yellow-500/90 font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Enviando...
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

          <div className="text-center">
            <p className="text-xs text-road-white/60">
              Responderemos em até 24 horas úteis
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;