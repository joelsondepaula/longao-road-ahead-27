import React from 'react';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { InfoOverlayProps } from './types';

const InfoOverlay: React.FC<InfoOverlayProps> = ({ 
  currentKm, 
  totalDistance, 
  progress, 
  isPlaying 
}) => {
  return (
    <>
      {/* Header com título */}
      <div className="absolute top-4 left-4 pointer-events-none z-10">
        <Card className="p-3 bg-background/95 backdrop-blur-md border border-road-yellow/30 shadow-xl rounded-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-road-yellow to-premium-gold rounded-lg">
              <MapPin className="w-4 h-4 text-asphalt-dark" />
            </div>
            <div>
              <div className="text-sm font-bold text-road-yellow font-heading">Jornada Épica</div>
              <div className="text-xs text-muted-foreground">João Pessoa → Rio de Janeiro</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 pointer-events-none z-10">
        <Card className="p-2 bg-background/95 backdrop-blur-md border border-road-yellow/30 shadow-xl rounded-xl">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isPlaying 
                ? 'bg-success-green animate-pulse' 
                : 'bg-road-yellow'
            }`} />
            <span className="text-xs font-medium text-foreground">
              {isPlaying ? 'Em movimento' : 'Pausado'}
            </span>
          </div>
        </Card>
      </div>

      {/* Info compacta na parte inferior */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
        <Card className="px-6 py-4 bg-background/95 backdrop-blur-md border border-road-yellow/30 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-road-yellow font-heading">
                {currentKm.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                km percorridos
              </div>
            </div>
            
            <div className="w-px h-8 bg-border" />
            
            <div>
              <div className="text-2xl font-bold text-road-yellow font-heading">
                {Math.round(progress * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                concluído
              </div>
            </div>
            
            <div className="w-px h-8 bg-border" />
            
            <div>
              <div className="text-sm font-medium text-foreground">
                {totalDistance.toLocaleString()} km
              </div>
              <div className="text-xs text-muted-foreground">
                total
              </div>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-road-yellow to-premium-gold transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default InfoOverlay;