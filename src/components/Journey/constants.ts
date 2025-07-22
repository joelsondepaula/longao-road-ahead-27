import { RoutePoint } from './types';

export const ROUTE_COORDINATES: RoutePoint[] = [
  { name: "João Pessoa", x: 0.1, y: 0.2, km: 0 },
  { name: "Recife", x: 0.15, y: 0.3, km: 120 },
  { name: "Salvador", x: 0.2, y: 0.45, km: 512 },
  { name: "Vitória", x: 0.35, y: 0.65, km: 1200 },
  { name: "Rio de Janeiro", x: 0.5, y: 0.8, km: 2530 }
];

export const COLORS = {
  background: {
    start: '#0f172a',
    middle: '#1e293b', 
    end: '#334155'
  },
  grid: 'rgba(71, 85, 105, 0.15)',
  route: {
    base: 'rgba(251, 191, 36, 0.4)',
    progress: '#ef4444',
    progressShadow: 'rgba(239, 68, 68, 0.6)'
  },
  cities: {
    start: '#22c55e',
    end: '#f59e0b',
    intermediate: '#64748b'
  },
  cyclist: {
    main: '#ef4444',
    pulse: 'rgba(239, 68, 68, 0.2)'
  },
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    accent: '#f59e0b'
  },
  info: {
    background: 'rgba(15, 23, 42, 0.8)',
    border: 'rgba(245, 158, 11, 0.3)'
  }
};

export const ANIMATION_CONFIG = {
  duration: 15000,
  restartDelay: 4000,
  resetDelay: 2000
};