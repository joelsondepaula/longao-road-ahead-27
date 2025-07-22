export interface RoutePoint {
  name: string;
  x: number;
  y: number;
  km: number;
}

export interface CanvasProps {
  progress: number;
  currentKm: number;
  totalDistance: number;
  isPlaying: boolean;
}

export interface InfoOverlayProps {
  currentKm: number;
  totalDistance: number;
  progress: number;
  isPlaying: boolean;
}