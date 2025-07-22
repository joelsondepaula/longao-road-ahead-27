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
    start: 'hsl(222.2, 84%, 4.9%)',
    middle: 'hsl(217.2, 32.6%, 17.5%)', 
    end: 'hsl(215, 20.2%, 25%)'
  },
  grid: 'hsla(217, 32%, 18%, 0.3)',
  route: {
    base: 'hsla(45, 100%, 50%, 0.4)',
    progress: 'hsl(0, 84%, 60%)',
    progressShadow: 'hsla(0, 84%, 60%, 0.6)'
  },
  cities: {
    start: 'hsl(142, 76%, 36%)',
    end: 'hsl(45, 85%, 47%)',
    intermediate: 'hsl(215, 20%, 65%)'
  },
  cyclist: {
    main: 'hsl(0, 84%, 60%)',
    pulse: 'hsla(0, 84%, 60%, 0.3)'
  },
  text: {
    primary: 'hsl(210, 40%, 98%)',
    secondary: 'hsla(210, 40%, 98%, 0.8)',
    accent: 'hsl(45, 85%, 47%)'
  },
  info: {
    background: 'hsla(222, 84%, 5%, 0.9)',
    border: 'hsla(45, 85%, 47%, 0.3)'
  }
};

export const ANIMATION_CONFIG = {
  duration: 15000,
  restartDelay: 4000,
  resetDelay: 2000
};