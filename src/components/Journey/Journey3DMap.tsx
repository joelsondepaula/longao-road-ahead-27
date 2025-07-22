import React, { useState, useRef, useEffect } from 'react';
import Canvas from './Canvas';
import InfoOverlay from './InfoOverlay';
import { ANIMATION_CONFIG } from './constants';
import { easeInOutQuad } from './utils';

const Journey3DMap = () => {
  const [progress, setProgress] = useState(0);
  const [currentKm, setCurrentKm] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number>();

  const totalDistance = 2530;

  const startAnimation = () => {
    setIsPlaying(true);
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const linearProgress = Math.min(elapsed / ANIMATION_CONFIG.duration, 1);
      
      // Aplicar easing para movimento mais natural
      const easedProgress = easeInOutQuad(linearProgress);
      
      setProgress(easedProgress);
      setCurrentKm(Math.floor(totalDistance * easedProgress));

      if (linearProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        // Reiniciar automaticamente
        setTimeout(() => {
          setProgress(0);
          setCurrentKm(0);
          setTimeout(() => {
            startAnimation();
          }, ANIMATION_CONFIG.resetDelay);
        }, ANIMATION_CONFIG.restartDelay);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
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
    <div className="relative w-full h-[650px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700/30">
      <Canvas 
        progress={progress}
        currentKm={currentKm}
        totalDistance={totalDistance}
        isPlaying={isPlaying}
      />
      
      <InfoOverlay
        currentKm={currentKm}
        totalDistance={totalDistance}
        progress={progress}
        isPlaying={isPlaying}
      />
    </div>
  );
};

export default Journey3DMap;