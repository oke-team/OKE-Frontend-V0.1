import { useMemo } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useResponsive';
import { DURATIONS } from './constants';

/**
 * Hook pour gérer les animations de manière accessible
 * Respecte les préférences utilisateur pour les animations réduites
 */
export const useAnimation = (config: any = {}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) {
      // Pour les utilisateurs préférant moins d'animations
      // On garde une transition minimale pour le feedback
      return {
        ...config,
        duration: DURATIONS.instant,
        delay: 0,
        ease: 'linear',
        // Désactiver les animations spring
        type: undefined,
        stiffness: undefined,
        damping: undefined
      };
    }
    return config;
  }, [config, prefersReducedMotion]);
};

/**
 * Hook pour les variants d'animation accessibles
 */
export const useAnimationVariants = (variants: any) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useMemo(() => {
    if (prefersReducedMotion) {
      // Simplifier les variants pour l'accessibilité
      const reducedVariants: any = {};
      
      Object.keys(variants).forEach(key => {
        if (key === 'initial' || key === 'animate' || key === 'exit') {
          // Garder uniquement l'opacité pour le feedback visuel
          reducedVariants[key] = {
            opacity: variants[key].opacity || 1
          };
        } else {
          reducedVariants[key] = variants[key];
        }
      });
      
      return reducedVariants;
    }
    return variants;
  }, [variants, prefersReducedMotion]);
};

/**
 * Hook pour désactiver les animations si nécessaire
 */
export const useMotionConfig = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return {
    reducedMotion: prefersReducedMotion,
    animationDuration: prefersReducedMotion ? 0 : undefined,
    animationConfig: prefersReducedMotion 
      ? { duration: 0, delay: 0 }
      : undefined
  };
};