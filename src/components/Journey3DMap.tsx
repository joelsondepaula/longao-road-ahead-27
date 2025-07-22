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
      className="absolute inset-0 w-full h-full rounded-3xl"
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
    <div className="relative w-full h-[650px] bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-3xl overflow-hidden shadow-2xl border border-slate-700/30">
      {/* Canvas animado */}
      <ModernCanvas progress={progress} />
      
      {/* Overlay com efeito de profundidade - mais sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20 pointer-events-none rounded-3xl" />
      
      {/* Interface moderna com melhor spacing */}
      <div className="absolute inset-0 pointer-events-none p-4">
        
        {/* Header com título e status - melhor posicionamento */}
        <div className="flex justify-between items-start mb-4">
          <Card className="p-4 bg-background/98 backdrop-blur-md border border-slate-200/20 shadow-xl rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-road-yellow to-premium-gold rounded-xl">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold text-road-yellow font-heading">Jornada Épica</div>
                <div className="text-xs text-muted-foreground">João Pessoa → Cristo Redentor</div>
              </div>
            </div>
          </Card>

          <Card className="p-3 bg-background/98 backdrop-blur-md border border-slate-200/20 shadow-xl rounded-2xl">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs font-medium text-foreground">
                {isPlaying ? 'Em movimento' : 'Aguardando...'}
              </span>
            </div>
          </Card>
        </div>

        {/* Estatísticas principais - layout melhorado */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-auto">
          <Card className="p-6 bg-background/98 backdrop-blur-md border border-slate-200/20 shadow-2xl rounded-3xl">
            
            {/* Cabeçalho das estatísticas */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-4 bg-gradient-to-r from-road-yellow to-premium-gold rounded-2xl shadow-lg">
                    <Bike className="w-8 h-8 text-white" />
                  </div>
                  {isPlaying && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse border-2 border-white" />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-4xl font-bold text-road-yellow font-heading">
                    {currentKm.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    de {totalDistance.toLocaleString()} km total
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="text-3xl font-bold text-foreground font-heading">
                  {Math.round(progress * 100)}%
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  Concluído
                </div>
              </div>
            </div>

            {/* Barra de progresso aprimorada */}
            <div className="relative mb-6">
              <div className="w-full bg-muted/60 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-road-yellow via-premium-gold to-energy-orange transition-all duration-500 ease-out relative"
                  style={{ width: `${progress * 100}%` }}
                >
                  {/* Efeito de brilho na barra */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                  
                  {/* Indicador de posição */}
                  {progress > 0 && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                      <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-road-yellow flex items-center justify-center">
                        <div className="w-2 h-2 bg-road-yellow rounded-full animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Labels da barra de progresso */}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>João Pessoa</span>
                <span className="font-medium text-road-yellow">
                  {currentKm} km
                </span>
                <span>Rio de Janeiro</span>
              </div>
            </div>

            {/* Estatísticas especiais - layout melhorado */}
            {currentKm >= recordDistance && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
                <div className="flex items-center gap-3 bg-gradient-to-r from-premium-gold/10 to-premium-gold/5 px-6 py-3 rounded-2xl border border-premium-gold/20 shadow-lg backdrop-blur-sm">
                  <div className="p-2 bg-premium-gold/20 rounded-xl">
                    <Trophy className="w-5 h-5 text-premium-gold" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-premium-gold">Recorde Histórico</div>
                    <div className="text-xs text-premium-gold/80">{recordDistance} km em {recordTime}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/20 shadow-lg backdrop-blur-sm">
                  <div className="p-2 bg-emerald-500/20 rounded-xl">
                    <Clock className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-emerald-500">Pedalada Contínua</div>
                    <div className="text-xs text-emerald-500/80">Sem paradas</div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Efeito de borda interna sutil */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 pointer-events-none" />
    </div>
  );
};

export default Journey3DMap;