import React, { useRef, useEffect } from 'react';
import { CanvasProps } from './types';
import { ROUTE_COORDINATES, COLORS } from './constants';
import { getCurrentPosition, drawBackground } from './utils';

const Canvas: React.FC<CanvasProps> = ({ progress, currentKm, totalDistance, isPlaying }) => {
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

    const drawRoute = (width: number, height: number) => {
      // Rota base com cor do design system
      ctx.strokeStyle = 'hsla(45, 100%, 50%, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      ROUTE_COORDINATES.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    const drawProgress = (width: number, height: number) => {
      if (progress <= 0) return;

      ctx.strokeStyle = 'hsl(0, 84%, 60%)';
      ctx.lineWidth = 4;
      ctx.shadowColor = 'hsla(0, 84%, 60%, 0.6)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      
      const totalSegments = ROUTE_COORDINATES.length - 1;
      const currentSegmentFloat = progress * totalSegments;
      const currentSegment = Math.floor(currentSegmentFloat);
      const segmentProgress = currentSegmentFloat - currentSegment;
      
      // Desenhar segmentos completos
      for (let i = 0; i < Math.min(currentSegment, totalSegments); i++) {
        const start = ROUTE_COORDINATES[i];
        const end = ROUTE_COORDINATES[i + 1];
        
        if (i === 0) {
          ctx.moveTo(start.x * width, start.y * height);
        }
        ctx.lineTo(end.x * width, end.y * height);
      }
      
      // Desenhar segmento parcial
      if (currentSegment < totalSegments && segmentProgress > 0) {
        const start = ROUTE_COORDINATES[currentSegment];
        const end = ROUTE_COORDINATES[currentSegment + 1];
        
        const partialX = start.x + (end.x - start.x) * segmentProgress;
        const partialY = start.y + (end.y - start.y) * segmentProgress;
        
        if (currentSegment === 0) {
          ctx.moveTo(start.x * width, start.y * height);
        }
        ctx.lineTo(partialX * width, partialY * height);
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawCities = (width: number, height: number) => {
      ROUTE_COORDINATES.forEach((city, index) => {
        const x = city.x * width;
        const y = city.y * height;
        
        const isStart = index === 0;
        const isEnd = index === ROUTE_COORDINATES.length - 1;
        
        // Círculo da cidade com cores do design system
        ctx.fillStyle = isStart 
          ? 'hsl(142, 76%, 36%)' // success-green
          : isEnd 
            ? 'hsl(45, 85%, 47%)' // premium-gold
            : 'hsl(215, 20%, 65%)'; // muted color
        
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Nome da cidade
        ctx.fillStyle = 'hsl(210, 40%, 98%)';
        ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'hsl(222, 84%, 5%)';
        ctx.shadowBlur = 2;
        ctx.fillText(city.name, x, y - 10);
        ctx.shadowBlur = 0;
      });
    };

    const drawCyclist = (width: number, height: number) => {
      if (progress <= 0) return;

      const currentPosition = getCurrentPosition(progress);
      const x = currentPosition.x * width;
      const y = currentPosition.y * height;
      
      // Pulso animado
      const time = Date.now() * 0.003;
      const pulseRadius = 12 + Math.sin(time) * 3;
      ctx.strokeStyle = 'hsla(0, 84%, 60%, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, pulseRadius, 0, 2 * Math.PI);
      ctx.stroke();
      
      // Ciclista
      ctx.fillStyle = 'hsl(0, 84%, 60%)';
      ctx.shadowColor = 'hsl(0, 84%, 60%)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      // Limpar canvas
      ctx.clearRect(0, 0, width, height);
      
      // Desenhar elementos
      drawBackground(ctx, width, height);
      drawRoute(width, height);
      drawProgress(width, height);
      drawCities(width, height);
      drawCyclist(width, height);
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
  }, [progress, currentKm, totalDistance, isPlaying]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full rounded-3xl"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Canvas;