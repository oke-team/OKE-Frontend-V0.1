import { useEffect, useState } from 'react';

/**
 * Hook unifié pour la gestion du responsive
 * Centralise toute la logique de détection de breakpoints
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Throttle resize events for better performance
    let timeoutId: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', throttledResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => {
      window.removeEventListener('resize', throttledResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Breakpoints alignés avec Tailwind
  const breakpoints = {
    xs: windowSize.width < 475,
    sm: windowSize.width >= 475 && windowSize.width < 640,
    md: windowSize.width >= 640 && windowSize.width < 768,
    lg: windowSize.width >= 768 && windowSize.width < 1024,
    xl: windowSize.width >= 1024 && windowSize.width < 1280,
    '2xl': windowSize.width >= 1280,
  };

  // Helpers pratiques
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;
  
  // Orientation
  const isLandscape = windowSize.width > windowSize.height;
  const isPortrait = !isLandscape;

  // Current breakpoint
  let current: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'xs';
  if (breakpoints['2xl']) current = '2xl';
  else if (breakpoints.xl) current = 'xl';
  else if (breakpoints.lg) current = 'lg';
  else if (breakpoints.md) current = 'md';
  else if (breakpoints.sm) current = 'sm';

  return {
    // Dimensions
    width: windowSize.width,
    height: windowSize.height,
    
    // Breakpoints
    ...breakpoints,
    current,
    
    // Device types
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet: isMobile || isTablet,
    isTabletOrDesktop: isTablet || isDesktop,
    
    // Orientation
    isLandscape,
    isPortrait,
    
    // Touch device detection
    isTouchDevice: typeof window !== 'undefined' && 'ontouchstart' in window,
  };
};

// Hook pour détecter les préférences de mouvement réduit
export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

// Hook pour détecter le thème système
export const usePrefersColorScheme = () => {
  const [prefersDark, setPrefersDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersDark ? 'dark' : 'light';
};