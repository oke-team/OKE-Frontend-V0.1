import { useEffect, useRef, useState } from 'react';

interface PinchZoomOptions {
  minZoom?: number;
  maxZoom?: number;
  onZoomChange?: (zoom: number) => void;
}

export const usePinchZoom = (options: PinchZoomOptions = {}) => {
  const {
    minZoom = 50,
    maxZoom = 400,
    onZoomChange
  } = options;

  const [zoom, setZoom] = useState(100);
  const [isPinching, setIsPinching] = useState(false);
  const lastDistance = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let initialDistance = 0;
    let initialZoom = zoom;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        setIsPinching(true);
        initialDistance = getDistance(e.touches);
        initialZoom = zoom;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance > 0) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, initialZoom * scale));
        
        setZoom(newZoom);
        onZoomChange?.(newZoom);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        setIsPinching(false);
        initialDistance = 0;
      }
    };

    // Wheel zoom pour desktop
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -10 : 10;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom + delta));
        setZoom(newZoom);
        onZoomChange?.(newZoom);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, minZoom, maxZoom, onZoomChange]);

  return {
    containerRef,
    zoom,
    setZoom,
    isPinching
  };
};