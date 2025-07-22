import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, MapPin, Trophy, Clock, Bike } from 'lucide-react';

const Journey3DMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKm, setCurrentKm] = useState(0);
  const animationRef = useRef<number>();

  const totalDistance = 2530; // km
  const recordDistance = 500;
  const recordTime = "24h36min";

  // Coordenadas da jornada (simplificadas para animação)
  const routePoints = [
    { x: 0.1, y: 0.2, name: "João Pessoa", km: 0 },
    { x: 0.15, y: 0.3, name: "Recife", km: 120 },
    { x: 0.2, y: 0.4, name: "Salvador", km: 512 },
    { x: 0.3, y: 0.5, name: "Vitória", km: 1200 },
    { x: 0.5, y: 0.7, name: "Rio de Janeiro", km: 2530 }
  ];

  const drawRoute = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const width = canvas.width;
    const height = canvas.height;

    // Limpar canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Criar gradiente de fundo (simulando terreno)
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(0.5, '#334155');
    gradient.addColorStop(1, '#475569');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Desenhar linhas de grade (simulando elevação)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;
    
    for (let i = 0; i < 10; i++) {
      const y = (height / 10) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
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
    ctx.lineWidth = 4;
    ctx.beginPath();
    
    routePoints.forEach((point, index) => {
      const x = point.x * width;
      const y = point.y * height;
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Desenhar progresso da rota
    if (progress > 0) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 6;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      
      let totalLength = 0;
      const segmentLengths: number[] = [];
      
      // Calcular comprimentos dos segmentos
      for (let i = 0; i < routePoints.length - 1; i++) {
        const dx = (routePoints[i + 1].x - routePoints[i].x) * width;
        const dy = (routePoints[i + 1].y - routePoints[i].y) * height;
        const length = Math.sqrt(dx * dx + dy * dy);
        segmentLengths.push(length);
        totalLength += length;
      }
      
      const targetLength = totalLength * progress;
      let currentLength = 0;
      
      ctx.moveTo(routePoints[0].x * width, routePoints[0].y * height);
      
      for (let i = 0; i < segmentLengths.length; i++) {
        if (currentLength + segmentLengths[i] <= targetLength) {
          // Segmento completo
          ctx.lineTo(routePoints[i + 1].x * width, routePoints[i + 1].y * height);
          currentLength += segmentLengths[i];
        } else {
          // Segmento parcial
          const ratio = (targetLength - currentLength) / segmentLengths[i];
          const x = routePoints[i].x + (routePoints[i + 1].x - routePoints[i].x) * ratio;
          const y = routePoints[i].y + (routePoints[i + 1].y - routePoints[i].y) * ratio;
          ctx.lineTo(x * width, y * height);
          break;
        }
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    // Desenhar pontos de referência
    routePoints.forEach((point, index) => {
      const x = point.x * width;
      const y = point.y * height;
      
      // Círculo do ponto
      ctx.fillStyle = index === 0 ? '#22c55e' : index === routePoints.length - 1 ? '#fbbf24' : '#64748b';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Borda branca
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Nome da cidade
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(point.name, x, y - 15);
    });

    // Desenhar ciclista em movimento no centro da tela
    if (progress > 0) {
      const currentPoint = getCurrentPosition();
      const x = currentPoint.x * width;
      const y = currentPoint.y * height;
      
      // Ciclista principal com efeito brilhante
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
      
      // Rastro do ciclista usando a mesma função getCurrentPosition
      const trailLength = 15;
      for (let i = 1; i <= trailLength; i++) {
        const trailProgress = Math.max(0, progress - (i * 0.008));
        if (trailProgress > 0) {
          // Temporariamente salvar progress atual
          const originalProgress = progress;
          setProgress(trailProgress);
          const trailPoint = getCurrentPosition();
          setProgress(originalProgress);
          
          const trailX = trailPoint.x * width;
          const trailY = trailPoint.y * height;
          
          const alpha = (1 - i / trailLength) * 0.6;
          ctx.fillStyle = `rgba(239, 68, 68, ${alpha})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 4 * (1 - i / trailLength), 0, 2 * Math.PI);
          ctx.fill();
        }
      }
      
      // Animação de pulso maior e mais visível
      const pulseRadius = 25 + Math.sin(Date.now() * 0.008) * 8;
      ctx.strokeStyle = '#ef444460';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Segundo pulso menor
      const pulseRadius2 = 15 + Math.sin(Date.now() * 0.012) * 5;
      ctx.strokeStyle = '#ef444480';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius2, 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const getCurrentPosition = () => {
    if (progress === 0) return routePoints[0];
    if (progress === 1) return routePoints[routePoints.length - 1];
    
    const totalSegments = routePoints.length - 1;
    const segmentProgress = progress * totalSegments;
    const currentSegment = Math.floor(segmentProgress);
    const segmentRatio = segmentProgress - currentSegment;
    
    if (currentSegment >= routePoints.length - 1) {
      return routePoints[routePoints.length - 1];
    }
    
    const start = routePoints[currentSegment];
    const end = routePoints[currentSegment + 1];
    
    return {
      x: start.x + (end.x - start.x) * segmentRatio,
      y: start.y + (end.y - start.y) * segmentRatio,
      name: '',
      km: 0
    };
  };

  const startAnimation = () => {
    setIsPlaying(true);
    const startTime = Date.now();
    const duration = 12000; // 12 segundos para ver melhor a animação

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      setProgress(animationProgress);
      setCurrentKm(Math.floor(totalDistance * animationProgress));

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Reiniciar automaticamente após 2 segundos
        setTimeout(() => {
          setProgress(0);
          setCurrentKm(0);
          setTimeout(() => {
            startAnimation();
          }, 1000);
        }, 2000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Loop de renderização
    const render = () => {
      drawRoute(ctx, canvas);
      requestAnimationFrame(render);
    };
    render();

    // Iniciar animação automaticamente
    const timer = setTimeout(() => {
      startAnimation();
    }, 1000);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] bg-slate-900 rounded-2xl overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Overlay 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/20 pointer-events-none" />
      
      {/* Estatísticas em tempo real - apenas visualização */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <Card className="p-4 bg-background/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Bike className="w-6 h-6 text-road-yellow" />
              <div className="text-left">
                <div className="text-2xl font-bold text-road-yellow">
                  {currentKm.toLocaleString()} km
                </div>
                <div className="text-sm text-muted-foreground">
                  de {totalDistance.toLocaleString()} km total
                </div>
              </div>
            </div>
            
            {/* Progresso visual */}
            <div className="text-right">
              <div className="text-lg font-semibold text-foreground">
                {Math.round(progress * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">
                Concluído
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-road-yellow to-premium-gold h-2 rounded-full transition-all duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          {/* Estatísticas especiais - aparecem quando passa dos 500km */}
          {currentKm >= recordDistance && (
            <div className="flex items-center justify-center gap-6 animate-fade-in">
              <div className="flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-premium-gold" />
                <span>{recordDistance} km em {recordTime}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-road-yellow" />
                <span>Pedalada contínua</span>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Legenda */}
      <div className="absolute top-6 left-6 z-10">
        <Card className="p-3 bg-background/90 backdrop-blur-sm">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>João Pessoa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-road-yellow rounded-full"></div>
              <span>Cristo Redentor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span>O Rei do Longão</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Título da animação */}
      <div className="absolute top-6 right-6 z-10">
        <Card className="p-3 bg-background/90 backdrop-blur-sm">
          <div className="text-sm font-semibold text-center">
            <div className="text-road-yellow">Flyover 3D</div>
            <div className="text-xs text-muted-foreground">João Pessoa → Rio</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Journey3DMap;