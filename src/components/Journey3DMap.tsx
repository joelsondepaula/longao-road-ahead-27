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

// Componente Canvas 2D moderno com informações integradas
const ModernCanvas = ({ progress, currentKm, totalDistance, recordDistance, recordTime }: { 
  progress: number;
  currentKm: number;
  totalDistance: number;
  recordDistance: number;
  recordTime: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Limpar canvas
      ctx.clearRect(0, 0, width, height);
      
      // Fundo com gradiente
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(0.5, '#1e293b');
      gradient.addColorStop(1, '#334155');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Grade sutil
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
      ctx.lineWidth = 1;
      
      for (let i = 1; i < 8; i++) {
        const y = (height / 8) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      for (let i = 1; i < 10; i++) {
        const x = (width / 10) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Rota base
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.lineWidth = 3;
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

      // Progresso da rota (corrigido para ser mais fluido)
      if (progress > 0) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        
        // Interpolar entre pontos baseado no progresso total
        const totalSegments = routeCoordinates.length - 1;
        const currentSegmentFloat = progress * totalSegments;
        const currentSegment = Math.floor(currentSegmentFloat);
        const segmentProgress = currentSegmentFloat - currentSegment;
        
        // Desenhar segmentos completos
        for (let i = 0; i < Math.min(currentSegment, totalSegments); i++) {
          const start = routeCoordinates[i];
          const end = routeCoordinates[i + 1];
          
          if (i === 0) {
            ctx.moveTo(start.x * width, start.y * height);
          }
          ctx.lineTo(end.x * width, end.y * height);
        }
        
        // Desenhar segmento parcial se necessário
        if (currentSegment < totalSegments && segmentProgress > 0) {
          const start = routeCoordinates[currentSegment];
          const end = routeCoordinates[currentSegment + 1];
          
          const partialX = start.x + (end.x - start.x) * segmentProgress;
          const partialY = start.y + (end.y - start.y) * segmentProgress;
          
          if (currentSegment === 0) {
            ctx.moveTo(start.x * width, start.y * height);
          }
          ctx.lineTo(partialX * width, partialY * height);
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Cidades
      routeCoordinates.forEach((city, index) => {
        const x = city.x * width;
        const y = city.y * height;
        
        const isStart = index === 0;
        const isEnd = index === routeCoordinates.length - 1;
        
        ctx.fillStyle = isStart ? '#22c55e' : isEnd ? '#fbbf24' : '#64748b';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Nome da cidade
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 2;
        ctx.fillText(city.name, x, y - 12);
        ctx.shadowBlur = 0;
      });

      // Ciclista animado (posição mais precisa)
      if (progress > 0) {
        const currentPosition = getCurrentPosition(progress);
        const x = currentPosition.x * width;
        const y = currentPosition.y * height;
        
        // Ciclista
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Pulso animado
        const time = Date.now() * 0.003;
        const pulseRadius = 15 + Math.sin(time) * 5;
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
        ctx.stroke();
      }

      // Info box compacta
      const infoWidth = Math.min(140, width * 0.25);
      const infoHeight = 40;
      const infoX = width - infoWidth - 15;
      const infoY = 15;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(infoX, infoY, infoWidth, infoHeight);

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(infoX, infoY, infoWidth, infoHeight);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${currentKm.toLocaleString()} km`, infoX + infoWidth/2, infoY + 18);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '10px sans-serif';
      ctx.fillText(`${Math.round(progress * 100)}%`, infoX + infoWidth/2, infoY + 32);
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
  }, [progress, currentKm]);

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
    const duration = 15000; // 15 segundos para movimento mais suave

    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      
      // Aplicar easing para movimento mais natural
      const easedProgress = easeInOutQuad(linearProgress);
      
      setProgress(easedProgress);
      setCurrentKm(Math.floor(totalDistance * easedProgress));

      if (linearProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Reiniciar automaticamente
        setTimeout(() => {
          setProgress(0);
          setCurrentKm(0);
          setTimeout(() => {
            startAnimation();
          }, 2000);
        }, 4000);
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
      {/* Canvas animado com informações integradas */}
      <ModernCanvas 
        progress={progress} 
        currentKm={currentKm}
        totalDistance={totalDistance}
        recordDistance={recordDistance}
        recordTime={recordTime}
      />
      
      {/* Header com título e status */}
      <div className="absolute top-4 left-4 right-4 pointer-events-none">
        <div className="flex justify-between items-start">
          <Card className="p-3 bg-background/98 backdrop-blur-md border border-slate-200/20 shadow-xl rounded-xl">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-r from-road-yellow to-premium-gold rounded-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-road-yellow font-heading">Jornada Épica</div>
                <div className="text-xs text-muted-foreground">João Pessoa → Cristo Redentor</div>
              </div>
            </div>
          </Card>

          <Card className="p-2 bg-background/98 backdrop-blur-md border border-slate-200/20 shadow-xl rounded-xl">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="text-xs font-medium text-foreground">
                {isPlaying ? 'Em movimento' : 'Aguardando...'}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journey3DMap;