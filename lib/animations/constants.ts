/**
 * Constantes d'animation pour assurer la cohérence
 */

// Durées standardisées
export const DURATIONS = {
  instant: 0,
  fast: 0.15,
  normal: 0.2,
  medium: 0.25,
  slow: 0.3,
  slower: 0.5,
  slowest: 1
} as const;

// Easings standardisés
export const EASINGS = {
  // Cubic bezier pour transitions fluides
  smooth: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeInOut: [0.4, 0, 0.2, 1] as const,
  
  // Spring animations
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20
  },
  springSmooth: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 40
  }
} as const;

// Delays pour stagger animations
export const STAGGER_DELAYS = {
  fast: 0.02,
  normal: 0.05,
  slow: 0.1,
  slower: 0.15
} as const;

// Configurations d'animation par défaut
export const DEFAULT_TRANSITION = {
  duration: DURATIONS.normal,
  ease: EASINGS.smooth
} as const;

export const DEFAULT_SPRING = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30
} as const;

// Configurations pour différents types d'éléments
export const TRANSITIONS = {
  page: {
    duration: DURATIONS.medium,
    ease: EASINGS.smooth
  },
  modal: {
    duration: DURATIONS.normal,
    ease: EASINGS.smooth
  },
  dropdown: {
    duration: DURATIONS.fast,
    ease: EASINGS.easeOut
  },
  hover: {
    duration: DURATIONS.fast,
    ease: EASINGS.easeOut
  },
  tap: {
    duration: DURATIONS.instant,
    ease: 'linear' as const
  }
} as const;