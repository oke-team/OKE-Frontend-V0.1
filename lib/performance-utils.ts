/**
 * Utilitaires pour optimiser les performances sur mobile et les appareils moins puissants
 */

export const isLowEndDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Détection basée sur les capacités du navigateur
  const connection = (navigator as unknown as { connection?: NetworkInformation; mozConnection?: NetworkInformation; webkitConnection?: NetworkInformation }).connection || 
    (navigator as unknown as { connection?: NetworkInformation; mozConnection?: NetworkInformation; webkitConnection?: NetworkInformation }).mozConnection || 
    (navigator as unknown as { connection?: NetworkInformation; mozConnection?: NetworkInformation; webkitConnection?: NetworkInformation }).webkitConnection;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory;
  const hardwareConcurrency = navigator.hardwareConcurrency;
  
  // Critères pour un appareil peu performant
  const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  const isLowMemory = deviceMemory && deviceMemory < 4;
  const isLowCPU = hardwareConcurrency && hardwareConcurrency < 4;
  const isSmallScreen = window.innerWidth < 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return isSlowConnection || isLowMemory || isLowCPU || (isSmallScreen && prefersReducedMotion);
};

export const getOptimalAnimationSettings = () => {
  const isLowEnd = isLowEndDevice();
  
  return {
    shouldReduceMotion: isLowEnd,
    duration: isLowEnd ? 0.15 : 0.3,
    staggerDelay: isLowEnd ? 0.03 : 0.1,
    ease: 'easeOut',
    // Désactive certains effets coûteux sur les appareils peu performants
    disableBlur: isLowEnd,
    disableParticles: isLowEnd,
    reduceOpacity: isLowEnd ? 0.8 : 1
  };
};

export const performanceVariants = {
  // Variantes pour les éléments de liste
  listItem: {
    hidden: { opacity: 0, y: 10 },
    visible: (isLowEnd: boolean) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isLowEnd ? 0.1 : 0.2,
        ease: 'easeOut'
      }
    })
  },
  
  // Variantes pour les cartes
  card: {
    hidden: { opacity: 0, y: 15 },
    visible: (isLowEnd: boolean) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: isLowEnd ? 0.15 : 0.3,
        ease: 'easeOut'
      }
    })
  },
  
  // Variantes pour les containers avec stagger
  container: {
    hidden: { opacity: 0 },
    visible: (isLowEnd: boolean) => ({
      opacity: 1,
      transition: {
        staggerChildren: isLowEnd ? 0.02 : 0.05,
        delayChildren: isLowEnd ? 0.1 : 0.2
      }
    })
  }
};

/**
 * Hook pour utiliser les paramètres d'animation optimisés
 */
export const useOptimizedAnimations = () => {
  const settings = getOptimalAnimationSettings();
  
  return {
    ...settings,
    // Fonction helper pour créer des transitions optimisées
    createTransition: (baseDelay: number = 0) => ({
      duration: settings.duration,
      delay: baseDelay * settings.staggerDelay,
      ease: settings.ease
    }),
    
    // Classes CSS conditionnelles
    getPerformanceClasses: (baseClasses: string) => {
      let classes = baseClasses;
      
      if (settings.disableBlur) {
        classes += ' disable-blur-mobile';
      }
      
      if (settings.shouldReduceMotion) {
        classes += ' motion-reduce:transform-none motion-reduce:transition-none';
      }
      
      return classes;
    }
  };
};

/**
 * Détecte si l'utilisateur préfère les animations réduites
 */
export const usePrefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};