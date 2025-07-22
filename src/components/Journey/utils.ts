import { RoutePoint } from './types';
import { ROUTE_COORDINATES } from './constants';

export const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const getCurrentPosition = (progress: number): RoutePoint => {
  if (progress <= 0) return ROUTE_COORDINATES[0];
  if (progress >= 1) return ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1];
  
  const totalSegments = ROUTE_COORDINATES.length - 1;
  const segmentProgress = progress * totalSegments;
  const currentSegment = Math.floor(segmentProgress);
  const segmentRatio = segmentProgress - currentSegment;
  
  if (currentSegment >= totalSegments) {
    return ROUTE_COORDINATES[ROUTE_COORDINATES.length - 1];
  }
  
  const start = ROUTE_COORDINATES[currentSegment];
  const end = ROUTE_COORDINATES[currentSegment + 1];
  
  return {
    x: start.x + (end.x - start.x) * segmentRatio,
    y: start.y + (end.y - start.y) * segmentRatio,
    name: '',
    km: 0
  };
};

export const drawBackground = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number
): void => {
  // Gradiente de fundo
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#0f172a');
  gradient.addColorStop(0.5, '#1e293b');
  gradient.addColorStop(1, '#334155');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Grade sutil
  ctx.strokeStyle = 'rgba(71, 85, 105, 0.15)';
  ctx.lineWidth = 1;
  
  // Linhas horizontais
  for (let i = 1; i < 8; i++) {
    const y = (height / 8) * i;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  
  // Linhas verticais
  for (let i = 1; i < 10; i++) {
    const x = (width / 10) * i;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
};