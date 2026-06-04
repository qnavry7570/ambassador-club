'use client';
import { useState, useEffect } from 'react';

export function useBreakpoint() {
  // null = jeszcze nie wiemy (SSR/hydration), potem ustawiamy prawdziwą szerokość
  const [w, setW] = useState(null);

  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // Jeśli jeszcze nie wiemy — zakładamy mobile (lepiej niż odwrotnie)
  if (w === null) return { isMobile: true, isTablet: true, width: 0 };

  return { isMobile: w < 768, isTablet: w < 1024, width: w };
}
