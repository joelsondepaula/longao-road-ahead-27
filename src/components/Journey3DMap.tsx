import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, Line, Sphere } from '@react-three/drei';
import { Card } from '@/components/ui/card';
import { Bike, MapPin, Trophy, Clock } from 'lucide-react';
import * as THREE from 'three';

// Coordenadas reais das cidades (latitude, longitude)
const routeCoordinates = [
  { name: "João Pessoa", lat: -7.1195, lng: -34.8450, km: 0 },
  { name: "Recife", lat: -8.0476, lng: -34.8770, km: 120 },
  { name: "Salvador", lat: -12.9714, lng: -38.5014, km: 512 },
  { name: "Vitória", lat: -20.3155, lng: -40.3128, km: 1200 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, km: 2530 }
];

// Converter coordenadas geográficas para posições 3D
const convertToPosition = (lat: number, lng: number): [number, number, number] => {
  const radius = 5;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
};

// Componente da Terra com textura
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        color="#2563eb"
        roughness={0.8}
        metalness={0.1}
      />
      {/* Continentes simplificados */}
      <mesh>
        <sphereGeometry args={[5.01, 32, 32]} />
        <meshBasicMaterial 
          color="#22c55e" 
          transparent 
          opacity={0.3}
          wireframe
        />
      </mesh>
    </mesh>
  );
};

// Componente da rota
const Route = ({ progress }: { progress: number }) => {
  const positions = routeCoordinates.map(coord => convertToPosition(coord.lat, coord.lng));
  
  // Criar curva suave entre os pontos
  const curve = new THREE.CatmullRomCurve3(
    positions.map(pos => new THREE.Vector3(...pos))
  );
  
  const points = curve.getPoints(100);
  
  return (
    <>
      {/* Linha da rota */}
      <Line
        points={points}
        color="#fbbf24"
        lineWidth={3}
        transparent
        opacity={0.8}
      />
      
      {/* Parte percorrida */}
      {progress > 0 && (
        <Line
          points={points.slice(0, Math.floor(points.length * progress))}
          color="#ef4444"
          lineWidth={5}
          transparent
          opacity={1}
        />
      )}
    </>
  );
};

// Componente do ciclista
const Cyclist = ({ progress }: { progress: number }) => {
  const cyclistRef = useRef<THREE.Group>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);
  
  useEffect(() => {
    const positions = routeCoordinates.map(coord => convertToPosition(coord.lat, coord.lng));
    const curve = new THREE.CatmullRomCurve3(
      positions.map(pos => new THREE.Vector3(...pos))
    );
    
    const point = curve.getPoint(progress);
    setPosition([point.x, point.y, point.z]);
  }, [progress]);

  useFrame((state) => {
    if (cyclistRef.current) {
      const time = state.clock.getElapsedTime();
      cyclistRef.current.position.y += Math.sin(time * 10) * 0.02;
    }
  });

  if (progress === 0) return null;

  return (
    <group ref={cyclistRef} position={position}>
      {/* Ciclista principal */}
      <Sphere args={[0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </Sphere>
      
      {/* Efeito de brilho */}
      <Sphere args={[0.15]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#ef4444" transparent opacity={0.3} />
      </Sphere>
      
      {/* Rastro */}
      <Sphere args={[0.2]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#fbbf24" transparent opacity={0.1} />
      </Sphere>
    </group>
  );
};

// Componente das cidades
const Cities = () => {
  return (
    <>
      {routeCoordinates.map((city, index) => {
        const position = convertToPosition(city.lat, city.lng);
        const isStart = index === 0;
        const isEnd = index === routeCoordinates.length - 1;
        
        return (
          <group key={city.name} position={position}>
            <Sphere args={[0.05]}>
              <meshStandardMaterial 
                color={isStart ? "#22c55e" : isEnd ? "#fbbf24" : "#64748b"} 
                emissive={isStart ? "#22c55e" : isEnd ? "#fbbf24" : "#64748b"}
                emissiveIntensity={0.3}
              />
            </Sphere>
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.15}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {city.name}
            </Text>
          </group>
        );
      })}
    </>
  );
};

// Componente principal da cena 3D
const Scene3D = ({ progress }: { progress: number }) => {
  return (
    <Canvas style={{ width: '100%', height: '100%', background: 'radial-gradient(circle, #1e1b4b 0%, #0f0a19 100%)' }}>
      <PerspectiveCamera makeDefault position={[12, 8, 12]} fov={50} />
      
      {/* Iluminação */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Cena */}
      <Earth />
      <Route progress={progress} />
      <Cyclist progress={progress} />
      <Cities />
      
      {/* Estrelas */}
      <Stars />
    </Canvas>
  );
};

// Componente das estrelas
const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005;
    }
  });
  
  const starPositions = new Float32Array(1000 * 3);
  for (let i = 0; i < 1000; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
  }
  
  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="white" size={0.5} />
    </points>
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
    const duration = 15000; // 15 segundos para visualizar melhor

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min(elapsed / duration, 1);
      
      setProgress(animationProgress);
      setCurrentKm(Math.floor(totalDistance * animationProgress));

      if (animationProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Reiniciar automaticamente após 3 segundos
        setTimeout(() => {
          setProgress(0);
          setCurrentKm(0);
          setTimeout(() => {
            startAnimation();
          }, 1000);
        }, 3000);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Iniciar automaticamente após 1 segundo
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
    <div className="relative w-full h-[700px] bg-gradient-to-b from-slate-900 to-black rounded-2xl overflow-hidden">
      {/* Cena 3D */}
      <div className="absolute inset-0">
        <Scene3D progress={progress} />
      </div>
      
      {/* Overlay com informações */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Estatísticas em tempo real */}
        <div className="absolute bottom-6 left-6 right-6 z-10 pointer-events-auto">
          <Card className="p-6 bg-background/95 backdrop-blur-sm border-none shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-road-yellow/20 rounded-full">
                  <Bike className="w-8 h-8 text-road-yellow" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-road-yellow">
                    {currentKm.toLocaleString()} km
                  </div>
                  <div className="text-sm text-muted-foreground">
                    de {totalDistance.toLocaleString()} km total
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {Math.round(progress * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Concluído
                </div>
              </div>
            </div>

            {/* Barra de progresso moderna */}
            <div className="w-full bg-muted rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="h-3 rounded-full bg-gradient-to-r from-road-yellow via-premium-gold to-road-yellow transition-all duration-300 relative"
                style={{ width: `${progress * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Estatísticas especiais */}
            {currentKm >= recordDistance && (
              <div className="flex items-center justify-center gap-8 animate-fade-in">
                <div className="flex items-center gap-2 text-sm bg-premium-gold/10 px-3 py-2 rounded-full">
                  <Trophy className="w-4 h-4 text-premium-gold" />
                  <span className="text-premium-gold font-semibold">{recordDistance} km em {recordTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm bg-road-yellow/10 px-3 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-road-yellow" />
                  <span className="text-road-yellow font-semibold">Pedalada contínua</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Título da visualização */}
        <div className="absolute top-6 left-6 z-10">
          <Card className="p-4 bg-background/95 backdrop-blur-sm border-none shadow-lg">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-road-yellow" />
              <div>
                <div className="text-lg font-bold text-road-yellow">Jornada 3D</div>
                <div className="text-sm text-muted-foreground">João Pessoa → Cristo Redentor</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Status da animação */}
        <div className="absolute top-6 right-6 z-10">
          <Card className="p-3 bg-background/95 backdrop-blur-sm border-none shadow-lg">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-sm font-medium">
                {isPlaying ? 'Em movimento' : 'Preparando...'}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Journey3DMap;