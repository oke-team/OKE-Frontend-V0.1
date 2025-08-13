'use client';

import { useState, useEffect, useCallback } from 'react';

interface VirtualKeyboardState {
  isVisible: boolean;
  height: number;
  isTransitioning: boolean;
}

interface UseVirtualKeyboardReturn extends VirtualKeyboardState {
  onInputFocus: () => void;
  onInputBlur: () => void;
  adjustedViewportHeight: string;
}

export const useVirtualKeyboard = (): UseVirtualKeyboardReturn => {
  const [keyboardState, setKeyboardState] = useState<VirtualKeyboardState>({
    isVisible: false,
    height: 0,
    isTransitioning: false
  });

  const [baseViewportHeight, setBaseViewportHeight] = useState(0);
  const [currentViewportHeight, setCurrentViewportHeight] = useState(0);

  useEffect(() => {
    // Initialiser la hauteur de base du viewport
    const initialHeight = window.innerHeight;
    setBaseViewportHeight(initialHeight);
    setCurrentViewportHeight(initialHeight);

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      
      // Débounce pour éviter les appels multiples pendant l'animation
      resizeTimeout = setTimeout(() => {
        const newHeight = window.innerHeight;
        const heightDifference = baseViewportHeight - newHeight;
        
        // Si la différence est significative (>150px), probablement le clavier
        const isKeyboardVisible = heightDifference > 150;
        const keyboardHeight = isKeyboardVisible ? heightDifference : 0;

        setCurrentViewportHeight(newHeight);
        setKeyboardState(prev => ({
          ...prev,
          isVisible: isKeyboardVisible,
          height: keyboardHeight,
          isTransitioning: false
        }));
      }, 100);

      // Marquer comme en transition pendant le redimensionnement
      setKeyboardState(prev => ({
        ...prev,
        isTransitioning: true
      }));
    };

    // Écouter les changements de taille de viewport
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        setBaseViewportHeight(window.innerHeight);
        handleResize();
      }, 500); // Délai pour l'orientation change
    });

    // Visual Viewport API (support moderne)
    if ('visualViewport' in window) {
      const visualViewport = window.visualViewport!;
      
      const handleVisualViewportChange = () => {
        const heightDifference = window.innerHeight - visualViewport.height;
        const isKeyboardVisible = heightDifference > 150;
        
        setKeyboardState({
          isVisible: isKeyboardVisible,
          height: heightDifference,
          isTransitioning: false
        });
      };

      visualViewport.addEventListener('resize', handleVisualViewportChange);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        visualViewport.removeEventListener('resize', handleVisualViewportChange);
        clearTimeout(resizeTimeout);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [baseViewportHeight]);

  const onInputFocus = useCallback(() => {
    // Marquer le début de la transition lors du focus
    setKeyboardState(prev => ({
      ...prev,
      isTransitioning: true
    }));
  }, []);

  const onInputBlur = useCallback(() => {
    // Gérer la fermeture du clavier
    setTimeout(() => {
      setKeyboardState(prev => ({
        ...prev,
        isVisible: false,
        height: 0,
        isTransitioning: false
      }));
    }, 300); // Délai pour l'animation de fermeture
  }, []);

  // Calcul de la hauteur ajustée du viewport
  const adjustedViewportHeight = keyboardState.isVisible
    ? `${currentViewportHeight}px`
    : '100vh';

  return {
    ...keyboardState,
    onInputFocus,
    onInputBlur,
    adjustedViewportHeight
  };
};

export default useVirtualKeyboard;