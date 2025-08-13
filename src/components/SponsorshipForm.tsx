import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send, Loader2, Crown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const sponsorshipFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  company: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  phone: z.string().optional(),
  sponsorshipLevel: z.string().min(1, "Selecione um nível de patrocínio"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type SponsorshipFormData = z.infer<typeof sponsorshipFormSchema>;

const SponsorshipForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<SponsorshipFormData>({
    resolver: zodResolver(sponsorshipFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      sponsorshipLevel: "",
      message: "",
    },
  });

  const onSubmit = async (data: SponsorshipFormData) => {
    setIsSubmitting(true);
    try {
      const emailData = {
        ...data,
        subject: `Proposta de Patrocínio - ${data.sponsorshipLevel} - ${data.company}`,
        message: `Empresa: ${data.company}\nNível de Patrocínio: ${data.sponsorshipLevel}\n\nMensagem:\n${data.message}`,
      };

      const { data: result, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailData
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Proposta enviada!",
        description: "Obrigado pelo interesse! Entraremos em contato em breve para discutir os detalhes.",
      });
      
      form.reset();
    } catch (error) {
      console.error('Error sending sponsorship email:', error);
      toast({
        title: "Erro ao enviar proposta",
        description: "Tente novamente ou entre em contato diretamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sponsorshipLevels = [
    { value: "master", label: "Master - Fornecimento de Bike Gravel" },
    { value: "ouro", label: "Cota Ouro - Passagem Aérea" },
    { value: "prata", label: "Cota Prata - R$ 2.000" },
    { value: "bronze", label: "Cota Bronze - R$ 1.000" },
    { value: "custom", label: "Proposta Customizada" },
  ];

  return (
    <Card className="bg-gradient-to-br from-road-yellow/10 to-road-yellow/5 border-road-yellow/30">
      <CardHeader className="text-center">
        <div className="text-road-yellow mx-auto mb-4">
          <Crown className="w-12 h-12" />
        </div>
        <CardTitle className="text-road-white text-2xl">
          Quero ser um Patrocinador
        </CardTitle>
        <p className="text-road-white/80">
          Faça parte desta jornada épica e potencialize sua marca
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
                    <FormLabel className="text-road-white">Nome do Responsável</FormLabel>
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
                        placeholder="contato@empresa.com" 
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
            
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-road-white">Empresa</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Nome da empresa" 
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
            </div>
            
            <FormField
              control={form.control}
              name="sponsorshipLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-road-white">Nível de Patrocínio</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-road-white/10 border-road-yellow/30 text-road-white">
                        <SelectValue placeholder="Selecione o nível de patrocínio" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sponsorshipLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                      placeholder="Conte-nos sobre sua empresa, objetivos com o patrocínio e como podemos trabalhar juntos..."
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
              className="w-full bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90 font-semibold text-lg py-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Enviando Proposta...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Proposta de Patrocínio
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SponsorshipForm;