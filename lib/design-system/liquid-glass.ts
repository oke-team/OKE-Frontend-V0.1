/**
 * Liquid Glass Design System
 * Inspiré par Apple Vision Pro et ClickUp
 * Effets subtils et élégants pour l'interface OKÉ
 */

export const liquidGlass = {
  // Base glass effects - plus subtils et élégants
  effects: {
    // Glass de base (très subtil)
    subtle: {
      background: 'rgba(248, 250, 252, 0.8)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid rgba(226, 232, 240, 0.8)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
    },
    
    // Glass avec accent de couleur (pour éléments interactifs)
    colored: {
      primary: {
        background: 'rgba(239, 246, 255, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(147, 197, 253, 0.5)',
        boxShadow: '0 1px 3px rgba(94, 114, 255, 0.08)',
      },
      success: {
        background: 'rgba(240, 253, 244, 0.6)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(134, 239, 172, 0.5)',
        boxShadow: '0 1px 3px rgba(34, 197, 94, 0.08)',
      },
      warning: {
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        boxShadow: '0 4px 12px rgba(245, 158, 11, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
      }
    },
    
    // Elevated glass (pour menus dropdown, modals)
    elevated: {
      background: 'rgba(255, 255, 255, 0.95)', // Augmenté de 0.85 à 0.95 pour moins de transparence
      backdropFilter: 'blur(20px) saturate(200%)',
      WebkitBackdropFilter: 'blur(20px) saturate(200%)',
      border: '1px solid rgba(255, 255, 255, 0.5)', // Légèrement plus opaque
      boxShadow: `
        0 0 0 1px rgba(0, 0, 0, 0.04),
        0 8px 32px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.9)
      `,
    },
    
    // Header glass (fixe en haut)
    header: {
      background: 'rgba(255, 255, 255, 0.75)',
      backdropFilter: 'blur(20px) saturate(150%)',
      WebkitBackdropFilter: 'blur(20px) saturate(150%)',
      borderBottom: '1px solid rgba(229, 231, 235, 0.3)',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    }
  },
  
  // Hover states
  hover: {
    subtle: {
      background: 'rgba(255, 255, 255, 0.7)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      transform: 'translateY(-1px)',
    },
    colored: {
      primary: {
        background: 'linear-gradient(135deg, rgba(94, 114, 255, 0.12) 0%, rgba(209, 80, 218, 0.12) 100%)',
        border: '1px solid rgba(94, 114, 255, 0.3)',
        boxShadow: '0 6px 16px rgba(94, 114, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
      }
    }
  },
  
  // Animations
  transitions: {
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    medium: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
    spring: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    }
  },
  
  // Mobile adaptations
  mobile: {
    // Bottom sheet style
    bottomSheet: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(30px) saturate(180%)',
      WebkitBackdropFilter: 'blur(30px) saturate(180%)',
      borderTop: '1px solid rgba(229, 231, 235, 0.3)',
      borderRadius: '24px 24px 0 0',
      boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.15)',
    },
    
    // Modal fullscreen
    modal: {
      background: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(40px)',
      WebkitBackdropFilter: 'blur(40px)',
    }
  }
};

// Helper function pour appliquer les effets
export const applyLiquidGlass = (variant: 'subtle' | 'primary' | 'success' | 'warning' | 'elevated' | 'header' = 'subtle') => {
  if (variant === 'primary' || variant === 'success' || variant === 'warning') {
    return liquidGlass.effects.colored[variant];
  }
  if (variant === 'elevated' || variant === 'header') {
    return liquidGlass.effects[variant];
  }
  return liquidGlass.effects.subtle;
};

// Classe CSS helpers
export const liquidGlassClasses = {
  subtle: 'liquid-glass-subtle',
  primary: 'liquid-glass-primary',
  success: 'liquid-glass-success',
  warning: 'liquid-glass-warning',
  elevated: 'liquid-glass-elevated',
  header: 'liquid-glass-header',
};