/**
 * Animations pour les transitions entre étapes du tunnel d'onboarding
 */

import { Variants } from 'framer-motion';

// Animation de slide horizontal pour les étapes (optimisée mobile)
export const stepSlideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200, // Distance réduite sur mobile
    opacity: 0,
    scale: 0.98 // Scale moins agressive
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 200 : -200, // Distance réduite sur mobile
    opacity: 0,
    scale: 0.98 // Scale moins agressive
  })
};

// Transition fluide avec easing personnalisé (optimisée mobile)
export const stepTransition = {
  x: { type: "spring", stiffness: 280, damping: 25 }, // Moins rebondissant
  opacity: { duration: 0.25 }, // Plus rapide
  scale: { duration: 0.25, ease: "easeOut" } // Plus rapide
};

// Version mobile des transitions avec animations réduites
export const mobileStepTransition = {
  x: { type: "tween", duration: 0.2, ease: "easeOut" }, // Plus simple sur mobile
  opacity: { duration: 0.2 },
  scale: { duration: 0.2, ease: "easeOut" }
};

// Animation pour l'apparition du modal (optimisée mobile)
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.98, // Scale réduite
    y: 10 // Mouvement réduit
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3, // Plus rapide
      ease: "easeOut",
      staggerChildren: 0.05 // Stagger réduit
    }
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: -10,
    transition: {
      duration: 0.2, // Plus rapide
      ease: "easeIn"
    }
  }
};

// Version fullscreen pour mobile
export const mobileModalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      staggerChildren: 0.03
    }
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
      ease: "easeIn"
    }
  }
};

// Animation pour le backdrop du modal
export const backdropVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

// Animation pour les éléments enfants du modal
export const modalChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0
  }
};

// Animation de bounce subtile pour les boutons (optimisée mobile)
export const buttonHoverVariants: Variants = {
  rest: {
    scale: 1
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.15, // Plus rapide
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95, // Plus visible sur mobile
    transition: {
      duration: 0.08, // Très rapide
      ease: "easeOut"
    }
  }
};

// Version mobile des boutons (plus de feedback tactile)
export const mobileButtonVariants: Variants = {
  rest: {
    scale: 1
  },
  tap: {
    scale: 0.92, // Feedback tactile plus fort
    transition: {
      duration: 0.05,
      ease: "easeOut"
    }
  }
};

// Animation pour les champs de formulaire (optimisée mobile)
export const formFieldVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10 // Mouvement réduit
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05, // Délai réduit
      duration: 0.25, // Plus rapide
      ease: "easeOut"
    }
  }),
  error: {
    x: [-3, 3, -3, 3, 0], // Shake réduit
    transition: {
      duration: 0.3, // Plus rapide
      ease: "easeInOut"
    }
  }
};

// Animation de fade pour le contenu des étapes
export const contentFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.05
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Animation spéciale pour les notifications de progression
export const notificationSlideVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      delay: index * 0.2,
      duration: 0.4,
      ease: "easeOut"
    }
  }),
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Animation pour les icônes de succès (coche verte)
export const successIconVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    rotate: -90
  },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      duration: 0.6
    }
  }
};

// Animation pour les spinners de loading
export const spinnerVariants: Variants = {
  spinning: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

// Animation de pulsation pour les éléments en attente
export const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animation de révélation pour les cartes d'entreprise
export const companyCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.1,
      duration: 0.3,
      ease: "easeOut"
    }
  }),
  hover: {
    y: -2,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: "easeOut"
    }
  }
};

// Animation pour la progression du tunnel
export const progressBarVariants: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

// Animation Liquid Glass pour les conteneurs
export const liquidGlassVariants: Variants = {
  rest: {
    backdropFilter: "blur(20px)",
    backgroundColor: "colors.glass.white[5]"
  },
  hover: {
    backdropFilter: "blur(24px)",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

// Paramètres d'animation globaux
export const animationConfig = {
  // Durées standard
  durations: {
    fast: 0.15,      // Plus rapide
    normal: 0.25,    // Plus rapide
    slow: 0.4,       // Plus rapide
    verySlow: 0.6    // Plus rapide
  },
  
  // Durées mobile (encore plus rapides)
  mobileDurations: {
    fast: 0.1,
    normal: 0.2,
    slow: 0.3,
    verySlow: 0.4
  },
  
  // Easing curves
  easing: {
    smooth: "easeOut",
    bounce: [0.68, -0.55, 0.265, 1.55],
    spring: { type: "spring", stiffness: 280, damping: 25 }, // Moins rebondissant
    mobileSpring: { type: "spring", stiffness: 250, damping: 20 } // Version mobile
  },
  
  // Délais de stagger
  stagger: {
    fast: 0.03,      // Plus rapide
    normal: 0.05,    // Plus rapide
    slow: 0.1        // Plus rapide
  }
} as const;

// Détection mobile simplifiée pour les animations
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Hook pour obtenir les bonnes animations selon le device
export const getDeviceVariants = (desktopVariants: Variants, mobileVariants?: Variants) => {
  const mobile = isMobileDevice();
  return mobile && mobileVariants ? mobileVariants : desktopVariants;
};

// Paramètres d'optimisation pour mobile
export const mobileOptimization = {
  // Réduire les animations si l'utilisateur préfère
  respectReducedMotion: true,
  
  // Désactiver certaines animations sur mobile lent
  disableComplexAnimations: false,
  
  // Réduire la fréquence d'images par seconde sur mobile
  reduceFPS: false
};