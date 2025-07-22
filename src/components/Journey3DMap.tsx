import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Bike, MapPin, Trophy, Clock } from 'lucide-react';

// Coordenadas das cidades para a animação 2D
const routeCoordinates = [
  { name: "João Pessoa", x: 0.1, y: 0.2, km: 0 },
  { name: "Recife", x: 0.15, y: 0.3, km: 120 },
  { name: "Salvador", x: 0.2, y: 0.45, km: 512 },
  { name: "Vitória", x: 0.35, y: 0.65, km: 1200 },
  { name: "Rio de Janeiro", x: 0.5, y: 0.8, km: 2530 }
];

// Componente Canvas 2D moderno
const ModernCanvas = ({ progress }: { progress: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas;
      
      // Limpar canvas com gradiente de fundo
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Desenhar grade moderna
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      
      // Linhas horizontais
      for (let i = 0; i < 8; i++) {
        const y = (height / 8) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Linhas verticais
      for (let i = 0; i < 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1;

      // Desenhar rota base
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 5;
      ctx.beginPath();
      
      routeCoordinates.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Desenhar progresso da rota
      if (progress > 0) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        
        let drawnProgress = 0;
        for (let i = 0; i < routeCoordinates.length - 1; i++) {
          const start = routeCoordinates[i];
          const end = routeCoordinates[i + 1];
          const segmentProgress = 1 / (routeCoordinates.length - 1);
          
          if (drawnProgress + segmentProgress <= progress) {
            // Desenhar segmento completo
            if (i === 0) {
              ctx.moveTo(start.x * width, start.y * height);
            }
            ctx.lineTo(end.x * width, end.y * height);
            drawnProgress += segmentProgress;
          } else {
            // Desenhar segmento parcial
            const partialProgress = (progress - drawnProgress) / segmentProgress;
            const x = start.x + (end.x - start.x) * partialProgress;
            const y = start.y + (end.y - start.y) * partialProgress;
            
            if (i === 0) {
              ctx.moveTo(start.x * width, start.y * height);
            }
            ctx.lineTo(x * width, y * height);
            break;
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Desenhar cidades
      routeCoordinates.forEach((city, index) => {
        const x = city.x * width;
        const y = city.y * height;
        
        // Círculo da cidade
        const isStart = index === 0;
        const isEnd = index === routeCoordinates.length - 1;
        
        ctx.fillStyle = isStart ? '#22c55e' : isEnd ? '#fbbf24' : '#64748b';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Nome da cidade
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 3;
        ctx.fillText(city.name, x, y - 15);
        ctx.shadowBlur = 0;
      });

      // Desenhar ciclista animado
      if (progress > 0) {
        const currentPosition = getCurrentPosition(progress);
        const x = currentPosition.x * width;
        const y = currentPosition.y * height;
        
        // Efeito de rastro
        const trailLength = 10;
        for (let i = 1; i <= trailLength; i++) {
          const trailProgress = Math.max(0, progress - (i * 0.01));
          if (trailProgress > 0) {
            const trailPos = getCurrentPosition(trailProgress);
            const trailX = trailPos.x * width;
            const trailY = trailPos.y * height;
            
            const alpha = (1 - i / trailLength) * 0.6;
            ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
            ctx.beginPath();
            ctx.arc(trailX, trailY, 3 * (1 - i / trailLength), 0, 2 * Math.PI);
            ctx.fill();
          }
        }
        
        // Ciclista principal
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Efeito de pulso
        const time = Date.now() * 0.005;
        const pulseRadius = 20 + Math.sin(time) * 8;
        ctx.strokeStyle = '#ef444450';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
        ctx.stroke();
      }
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [progress]);

  const getCurrentPosition = (currentProgress: number) => {
    if (currentProgress <= 0) return routeCoordinates[0];
    if (currentProgress >= 1) return routeCoordinates[routeCoordinates.length - 1];
    
    const totalSegments = routeCoordinates.length - 1;
    const segmentProgress = currentProgress * totalSegments;
    const currentSegment = Math.floor(segmentProgress);
    const segmentRatio = segmentProgress - currentSegment;
    
    if (currentSegment >= totalSegments) {
      return routeCoordinates[routeCoordinates.length - 1];
    }
    
    const start = routeCoordinates[currentSegment];
    const end = routeCoordinates[currentSegment + 1];
    
    return {
      x: start.x + (end.x - start.x) * segmentRatio,
      y: start.y + (end.y - start.y) * segmentRatio,
      name: '',
      km: 0
    };
  };

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full rounded-2xl"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

const Journey3DMap = () => {
  const [progress, setProgress] = useState(0);
  const [currentKm, setCurrentKm] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number>();

  const totalDistance = 2530;
  const recordDistance = 500;
  const recordTime = "24h36min";

  const startAnimation = () => {
    setIsPlaying(true);
    const startTime = Date.now();
    const duration = 12000; // 12 segundos

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      setProgress(animationProgress);
      setCurrentKm(Math.floor(totalDistance * animationProgress));

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Reiniciar automaticamente
        setTimeout(() => {
          setProgress(0);
          setCurrentKm(0);
          setTimeout(() => {
            startAnimation();
          }, 1000);
        }, 3000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-b from-slate-900 to-black rounded-2xl overflow-hidden shadow-2xl">
      {/* Canvas animado */}
      <ModernCanvas progress={progress} />
      
      {/* Overlay com efeito de profundidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/30 pointer-events-none rounded-2xl" />
      
      {/* Interface moderna */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Estatísticas em tempo real */}
        <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-auto">
          <Card className="p-6 bg-background/95 backdrop-blur-sm border-none shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-road-yellow to-premium-gold rounded-full">
                  <Bike className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-road-yellow">
                    {currentKm.toLocaleString()} km
                  </div>
                  <div className="text-sm text-muted-foreground">
                    de {totalDistance.toLocaleString()} km total
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(progress * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Concluído
                </div>
              </div>
            </div>

            {/* Barra de progresso moderna */}
            <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-road-yellow via-premium-gold to-road-yellow transition-all duration-300 relative"
                style={{ width: `${progress * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Estatísticas especiais */}
            {currentKm >= recordDistance && (
              <div className="flex items-center justify-center gap-8 animate-fade-in">
                <div className="flex items-center gap-2 text-sm bg-premium-gold/10 px-4 py-2 rounded-full border border-premium-gold/20">
                  <Trophy className="w-4 h-4 text-premium-gold" />
                  <span className="text-premium-gold font-semibold">{recordDistance} km em {recordTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-road-yellow/10 px-4 py-2 rounded-full border border-road-yellow/20">
                  <Clock className="w-4 h-4 text-road-yellow" />
                  <span className="text-road-yellow font-semibold">Pedalada contínua</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Título */}
        <div className="absolute top-6 left-6 z-10">
          <Card className="p-4 bg-background/95 backdrop-blur-sm border-none shadow-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-road-yellow" />
              <div>
                <div className="text-lg font-bold text-road-yellow">Jornada Interativa</div>
                <div className="text-sm text-muted-foreground">João Pessoa → Cristo Redentor</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Status */}
        <div className="absolute top-6 right-6 z-10">
          <Card className="p-3 bg-background/95 backdrop-blur-sm border-none shadow-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-sm font-medium">
                {isPlaying ? 'Em movimento' : 'Preparando...'}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journey3DMap;