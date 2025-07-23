import { useEffect, useState } from "react";
import { MapPin, Calendar, Users, Target } from "lucide-react";
const Stats = () => {
  const [animatedKm, setAnimatedKm] = useState(0);
  const [animatedFollowers, setAnimatedFollowers] = useState(0);
  const targetKm = 8000;
  const targetFollowers = 5000;
  useEffect(() => {
    const animateNumber = (target: number, setter: (value: number) => void, duration: number = 2000) => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(target * progress);
        setter(current);
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      animate();
    };
    const timer = setTimeout(() => {
      animateNumber(targetKm, setAnimatedKm);
      animateNumber(targetFollowers, setAnimatedFollowers, 2500);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  const stats = [{
    icon: Target,
    label: "Distância Total",
    value: `~${animatedKm.toLocaleString()} km`,
    color: "text-premium-gold",
    bgColor: "bg-premium-gold/10"
  }, {
    icon: MapPin,
    label: "Países",
    value: "3",
    color: "text-trust-blue",
    bgColor: "bg-trust-blue/10"
  }, {
    icon: Calendar,
    label: "Dias de Jornada",
    value: "50 - 60",
    color: "text-success-green",
    bgColor: "bg-success-green/10"
  }, {
    icon: Users,
    label: "Seguidores",
    value: `${animatedFollowers.toLocaleString()}+`,
    color: "text-energy-orange",
    bgColor: "bg-energy-orange/10"
  }];
  return <section className="py-16 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            A Jornada em <span className="text-premium-gold">Números</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais que uma aventura, um projeto que inspira e conecta pessoas através do esporte
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => <div key={stat.label} className="text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 group" style={{
          animationDelay: `${index * 150}ms`,
          animation: 'fade-in 0.6s ease-out forwards'
        }}>
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${stat.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className={`text-2xl md:text-3xl font-heading font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>)}
        </div>
        
        <div className="text-center mt-12">
          
        </div>
      </div>
    </section>;
};
export default Stats;