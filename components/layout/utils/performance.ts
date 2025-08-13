/**
 * Performance utilities for the OKÉ Header System
 * Optimizations for rendering, animations, and memory management
 */

import { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { MotionVariants, AnimationConfig } from '../types';

// Debounce utility for search and resize events
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
}

// Throttle utility for scroll and animation events
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const lastRun = useRef<number>(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    },
    [callback, delay]
  );
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  { threshold = 0, root = null, rootMargin = '0%' }: IntersectionObserverInit = {}
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setEntry(entry),
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin]);

  return entry;
}

// Optimized animation variants for common header animations
export const optimizedVariants: Record<string, MotionVariants> = {
  // Container animations with stagger
  staggerContainer: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  },

  // Item animations optimized for performance
  staggerItem: {
    initial: { 
      opacity: 0, 
      y: -10,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.8
      }
    },
    exit: { 
      opacity: 0, 
      y: -5,
      scale: 0.95,
      transition: {
        duration: 0.15,
        ease: 'easeOut'
      }
    }
  },

  // Dropdown animations
  dropdown: {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: -10
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.6
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -5,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1]
      }
    }
  },

  // Button hover with minimal repaints
  buttonHover: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 17
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        type: 'spring',
        stiffness: 600,
        damping: 15
      }
    }
  },

  // Slide animations for mobile panels
  slidePanel: {
    initial: { x: '-100%' },
    animate: { 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  }
};

// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startMeasurement(name: string): () => void {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      this.addMetric(name, duration);
    };
  }

  private addMetric(name: string, value: number): void {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetrics(name: string): { avg: number; min: number; max: number } | null {
    const values = this.metrics.get(name);
    if (!values || values.length === 0) return null;

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max };
  }

  clearMetrics(name?: string): void {
    if (name) {
      this.metrics.delete(name);
    } else {
      this.metrics.clear();
    }
  }
}

// Memory management utilities
export class MemoryManager {
  private static cleanupCallbacks: Set<() => void> = new Set();

  static addCleanup(callback: () => void): void {
    this.cleanupCallbacks.add(callback);
  }

  static removeCleanup(callback: () => void): void {
    this.cleanupCallbacks.delete(callback);
  }

  static cleanup(): void {
    this.cleanupCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('Memory cleanup callback failed:', error);
      }
    });
    this.cleanupCallbacks.clear();
  }

  static getMemoryUsage(): number | null {
    if ('memory' in performance && 'usedJSHeapSize' in (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return null;
  }
}

// React hooks for performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const monitor = useMemo(() => PerformanceMonitor.getInstance(), []);
  
  useEffect(() => {
    const endMeasurement = monitor.startMeasurement(`${componentName}-render`);
    return endMeasurement;
  });

  const measureInteraction = useCallback((interactionName: string) => {
    return monitor.startMeasurement(`${componentName}-${interactionName}`);
  }, [monitor, componentName]);

  const getMetrics = useCallback(() => {
    return monitor.getMetrics(`${componentName}-render`);
  }, [monitor, componentName]);

  return { measureInteraction, getMetrics };
}

// Optimized resize observer
export function useOptimizedResize(callback: () => void, delay: number = 150) {
  const debouncedCallback = useDebounce(callback, delay);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver(debouncedCallback);
    resizeObserver.observe(document.body);
    
    return () => resizeObserver.disconnect();
  }, [debouncedCallback]);
}

// Prefers reduced motion detection
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

// Animation configuration with accessibility
export function getAnimationConfig(
  prefersReducedMotion: boolean,
  baseConfig: AnimationConfig
): AnimationConfig {
  if (prefersReducedMotion) {
    return {
      ...baseConfig,
      duration: 0.1,
      ease: 'linear'
    };
  }
  return baseConfig;
}

// Optimized context selectors to prevent unnecessary re-renders
export function createOptimizedSelector<T, R>(
  selector: (state: T) => R,
  equalityFn?: (a: R, b: R) => boolean
) {
  let previousResult: R;
  let previousArgs: T;

  return (state: T): R => {
    if (state === previousArgs) {
      return previousResult;
    }

    const result = selector(state);
    
    if (equalityFn && previousResult !== undefined) {
      if (equalityFn(result, previousResult)) {
        return previousResult;
      }
    } else if (result === previousResult) {
      return previousResult;
    }

    previousArgs = state;
    previousResult = result;
    return result;
  };
}

// Viewport detection with performance optimization
export function useViewportSize() {
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  const updateViewport = useThrottle(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setViewport('mobile');
    } else if (width < 1024) {
      setViewport('tablet');
    } else {
      setViewport('desktop');
    }
  }, 100);

  useEffect(() => {
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, [updateViewport]);

  return viewport;
}

// Export performance constants
export const PERFORMANCE_THRESHOLDS = {
  RENDER_TIME_WARNING: 16, // 16ms for 60fps
  RENDER_TIME_ERROR: 33,   // 33ms for 30fps
  MEMORY_WARNING: 50 * 1024 * 1024, // 50MB
  MEMORY_ERROR: 100 * 1024 * 1024,  // 100MB
} as const;

export const ANIMATION_DEFAULTS = {
  FAST: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  MEDIUM: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  SLOW: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  SPRING_FAST: { type: 'spring', stiffness: 400, damping: 25 },
  SPRING_MEDIUM: { type: 'spring', stiffness: 300, damping: 30 },
  SPRING_SLOW: { type: 'spring', stiffness: 200, damping: 35 }
} as const;

// Performance utilities are now complete