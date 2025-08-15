/**
 * Variants d'animation centralisés pour Framer Motion
 * Assure la cohérence des animations dans toute l'application
 */

// Animations de base
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 }
};

export const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

// Animations de scale
export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 }
};

export const scaleInCenter = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0 }
};

export const popIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20
    }
  },
  exit: { opacity: 0, scale: 0.8 }
};

// Animations de rotation
export const rotateIn = {
  initial: { opacity: 0, rotate: -180 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 180 }
};

// Container pour stagger animations
export const staggerContainer = {
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
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.02
    }
  }
};

export const staggerSlow = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Animations pour les listes
export const listItem = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.2
    }
  },
  exit: { opacity: 0, x: -20 }
};

// Animations pour modals et overlays
export const modalOverlay = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.2
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
};

export const modalContent = {
  initial: { 
    opacity: 0, 
    scale: 0.95,
    y: 20
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.15
    }
  }
};

// Animations pour bottom sheets (mobile)
export const bottomSheet = {
  initial: { y: '100%' },
  animate: { 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    y: '100%',
    transition: {
      duration: 0.2
    }
  }
};

// Animations pour dropdowns
export const dropdown = {
  initial: { 
    opacity: 0, 
    y: -10,
    scaleY: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.15
    }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    scaleY: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

// Animations pour accordions
export const accordion = {
  initial: { height: 0, opacity: 0 },
  animate: { 
    height: 'auto', 
    opacity: 1,
    transition: {
      height: {
        duration: 0.3
      },
      opacity: {
        duration: 0.2,
        delay: 0.1
      }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    transition: {
      height: {
        duration: 0.2
      },
      opacity: {
        duration: 0.1
      }
    }
  }
};

// Animations pour les boutons et interactions
export const buttonTap = {
  tap: { scale: 0.98 },
  hover: { scale: 1.02 }
};

export const buttonPress = {
  tap: { scale: 0.95 },
  hover: { scale: 1.05 }
};

// Animations pour loading states
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity
    }
  }
};

export const spin = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Animations pour skeleton loaders
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};