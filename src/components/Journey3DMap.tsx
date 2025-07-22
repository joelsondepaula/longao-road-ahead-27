import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, RotateCcw, MapPin, Trophy, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Journey3DMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKm, setCurrentKm] = useState(0);
  const [mapboxToken, setMapboxToken] = useState('');
  const [tokenSet, setTokenSet] = useState(false);
  const animationRef = useRef<number>();

  // Coordenadas da jornada: João Pessoa (-7.1195, -34.8450) até Cristo Redentor (-22.9519, -43.2105)
  const startPoint = [-34.8450, -7.1195]; // João Pessoa
  const endPoint = [-43.2105, -22.9519]; // Cristo Redentor
  const totalDistance = 2530; // km
  const recordDistance = 500;
  const recordTime = "24h36min";

  // Gerar pontos intermediários da rota
  const generateRoutePoints = () => {
    const points = [];
    const numPoints = 50;
    
    for (let i = 0; i <= numPoints; i++) {
      const ratio = i / numPoints;
      const lng = startPoint[0] + (endPoint[0] - startPoint[0]) * ratio;
      const lat = startPoint[1] + (endPoint[1] - startPoint[1]) * ratio;
      points.push([lng, lat]);
    }
    
    return points;
  };

  const routePoints = generateRoutePoints();

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken.trim()) return;

    mapboxgl.accessToken = mapboxToken.trim();
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-39, -15], // Centro do Brasil
      zoom: 5,
      pitch: 60,
      bearing: -10,
      antialias: true,
      projection: 'globe'
    });

    map.current.on('load', () => {
      if (!map.current) return;

      // Adicionar terreno 3D
      map.current.addSource('mapbox-dem', {
        type: 'raster-dem',
        url: 'mapbox://mapbox.terrain-rgb',
        tileSize: 512,
        maxzoom: 14
      });

      map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

      // Adicionar linha da rota
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: routePoints
          }
        }
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#FFD700',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });

      // Adicionar marcadores de início e fim
      map.current.addSource('start-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { title: 'João Pessoa' },
          geometry: {
            type: 'Point',
            coordinates: startPoint
          }
        }
      });

      map.current.addLayer({
        id: 'start-point',
        type: 'circle',
        source: 'start-point',
        paint: {
          'circle-color': '#22c55e',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      map.current.addSource('end-point', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: { title: 'Cristo Redentor' },
          geometry: {
            type: 'Point',
            coordinates: endPoint
          }
        }
      });

      map.current.addLayer({
        id: 'end-point',
        type: 'circle',
        source: 'end-point',
        paint: {
          'circle-color': '#FFD700',
          'circle-radius': 8,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff'
        }
      });

      // Adicionar marcador do ciclista (inicialmente invisível)
      map.current.addSource('cyclist', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: startPoint
          }
        }
      });

      map.current.addLayer({
        id: 'cyclist',
        type: 'circle',
        source: 'cyclist',
        paint: {
          'circle-color': '#ef4444',
          'circle-radius': 6,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
          'circle-opacity': 0
        }
      });
    });
  };

  const startAnimation = () => {
    if (!map.current) return;
    
    setIsPlaying(true);
    const startTime = Date.now();
    const duration = 8000; // 8 segundos

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      setProgress(animationProgress);
      setCurrentKm(Math.floor(totalDistance * animationProgress));

      if (animationProgress < 1) {
        // Interpolar posição do ciclista
        const pointIndex = Math.floor(animationProgress * (routePoints.length - 1));
        const currentPoint = routePoints[pointIndex];
        
        if (map.current && currentPoint) {
          // Atualizar posição do ciclista
          const source = map.current.getSource('cyclist') as mapboxgl.GeoJSONSource;
          if (source) {
            source.setData({
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: currentPoint
              }
            });

            // Tornar o ciclista visível
            map.current.setPaintProperty('cyclist', 'circle-opacity', 1);
          }

          // Seguir o ciclista com a câmera
          map.current.easeTo({
            center: currentPoint as [number, number],
            zoom: 6 + animationProgress * 2,
            duration: 100,
            essential: true
          });
        }

        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const resetAnimation = () => {
    pauseAnimation();
    setProgress(0);
    setCurrentKm(0);
    
    if (map.current) {
      // Resetar posição do ciclista
      const source = map.current.getSource('cyclist') as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData({
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: startPoint
          }
        });
        map.current.setPaintProperty('cyclist', 'circle-opacity', 0);
      }

      // Resetar câmera
      map.current.easeTo({
        center: [-39, -15],
        zoom: 5,
        pitch: 60,
        bearing: -10,
        duration: 1000
      });
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setTokenSet(true);
      initializeMap();
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  if (!tokenSet) {
    return (
      <div className="relative w-full h-[600px] bg-muted rounded-2xl flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <MapPin className="w-12 h-12 text-road-yellow mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Mapa 3D da Jornada</h3>
            <p className="text-muted-foreground text-sm">
              Para visualizar o mapa 3D, você precisa inserir seu token público do Mapbox.
              Acesse <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-road-yellow hover:underline">mapbox.com</a> para obter seu token.
            </p>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Token Público Mapbox</Label>
              <Input
                id="mapbox-token"
                type="password"
                placeholder="pk.eyJ1IjoiZXhhbXBsZSI..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleTokenSubmit} className="w-full" disabled={!mapboxToken.trim()}>
              Carregar Mapa 3D
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] bg-muted rounded-2xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Controles de reprodução */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <Card className="p-4 bg-background/90 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={isPlaying ? pauseAnimation : startAnimation}
                className="bg-road-yellow text-asphalt-dark hover:bg-road-yellow/90"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline" onClick={resetAnimation}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-road-yellow">
                {currentKm.toLocaleString()} km
              </div>
              <div className="text-sm text-muted-foreground">
                de {totalDistance.toLocaleString()} km
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

          {/* Estatísticas */}
          {progress > 0.7 && (
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
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>O Rei do Longão</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Journey3DMap;