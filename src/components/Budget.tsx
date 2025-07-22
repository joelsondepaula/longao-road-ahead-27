import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Utensils, Home, Wrench, Camera, Shield, Plane } from "lucide-react";

const Budget = () => {
  const budgetItems = [
    {
      icon: <Utensils className="w-5 h-5" />,
      category: "Alimentação e hospedagem",
      amount: "R$ 6.000",
      description: "Refeições e acomodação durante a jornada",
      color: "bg-blue-500"
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      category: "Equipamentos e peças",
      amount: "R$ 4.000", 
      description: "Manutenção, peças de reposição e equipamentos",
      color: "bg-green-500"
    },
    {
      icon: <Camera className="w-5 h-5" />,
      category: "Produção de conteúdo",
      amount: "R$ 5.000",
      description: "Câmeras, equipamentos de gravação e edição",
      color: "bg-purple-500"
    },
    {
      icon: <Shield className="w-5 h-5" />,
      category: "Seguro e documentação", 
      amount: "R$ 3.000",
      description: "Seguros, vistos e documentações necessárias",
      color: "bg-orange-500"
    },
    {
      icon: <Plane className="w-5 h-5" />,
      category: "Passagem de volta",
      amount: "R$ 3.000",
      description: "Retorno de Ushuaia para o Brasil",
      color: "bg-red-500"
    }
  ];

  const totalAmount = budgetItems.reduce((sum, item) => 
    sum + parseInt(item.amount.replace(/[^\d]/g, '')), 0
  );

  return (
    <section id="orcamento" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <DollarSign className="w-8 h-8 text-road-yellow mr-3" />
              <h2 className="text-3xl md:text-5xl font-bold text-foreground">
                Orçamento <span className="text-road-yellow">Estimado</span>
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Transparência total sobre os custos necessários para realizar esta expedição épica
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {budgetItems.map((item, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className={`absolute top-0 left-0 w-full h-1 ${item.color}`} />
                
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${item.color} text-white`}>
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{item.category}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-2xl font-bold text-road-yellow">
                      {item.amount}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total */}
          <Card className="bg-gradient-to-r from-asphalt-dark to-secondary border-road-yellow/50 text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-road-white flex items-center justify-center">
                <DollarSign className="w-6 h-6 mr-2 text-road-yellow" />
                Total Estimado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl md:text-5xl font-bold text-road-yellow mb-4">
                R$ {totalAmount.toLocaleString('pt-BR')}
              </div>
              <Badge variant="outline" className="border-road-yellow text-road-yellow text-sm">
                Investimento para uma jornada transformadora
              </Badge>
              <p className="text-road-white/80 mt-4 max-w-2xl mx-auto">
                Cada real investido será transformado em conteúdo inspirador, 
                visibilidade para parceiros e uma história de superação que motivará milhares de pessoas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Budget;