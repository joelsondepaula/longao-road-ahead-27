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
        <Card className="p-3 bg-slate-900/95 backdrop-blur-md border border-amber-500/20 shadow-xl rounded-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-amber-400 font-heading">Jornada Épica</div>
              <div className="text-xs text-slate-300">João Pessoa → Rio de Janeiro</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Status indicator */}
      <div className="absolute top-4 right-4 pointer-events-none z-10">
        <Card className="p-2 bg-slate-900/95 backdrop-blur-md border border-amber-500/20 shadow-xl rounded-xl">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isPlaying 
                ? 'bg-emerald-400 animate-pulse' 
                : 'bg-amber-400'
            }`} />
            <span className="text-xs font-medium text-slate-200">
              {isPlaying ? 'Em movimento' : 'Pausado'}
            </span>
          </div>
        </Card>
      </div>

      {/* Info compacta na parte inferior */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 pointer-events-none z-10">
        <Card className="px-6 py-3 bg-slate-900/95 backdrop-blur-md border border-amber-500/20 shadow-2xl rounded-2xl">
          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-amber-400">
                {currentKm.toLocaleString()}
              </div>
              <div className="text-xs text-slate-300">
                km percorridos
              </div>
            </div>
            
            <div className="w-px h-8 bg-slate-600" />
            
            <div>
              <div className="text-2xl font-bold text-amber-400">
                {Math.round(progress * 100)}%
              </div>
              <div className="text-xs text-slate-300">
                concluído
              </div>
            </div>
            
            <div className="w-px h-8 bg-slate-600" />
            
            <div>
              <div className="text-sm font-medium text-slate-200">
                {totalDistance.toLocaleString()} km
              </div>
              <div className="text-xs text-slate-300">
                total
              </div>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="mt-3 w-full h-1 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default InfoOverlay;