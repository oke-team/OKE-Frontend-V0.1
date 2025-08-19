// Card Design Tokens - Extension du design system pour les cartes entrepreneur
export const cardTokens = {
  // Tailles de cartes
  sizes: {
    hero: {
      cols: 2,
      rows: 2,
      minHeight: '320px',
      padding: '2rem',
    },
    standard: {
      cols: 1,
      rows: 1,
      minHeight: '160px',
      padding: '1.5rem',
    },
    compact: {
      cols: 1,
      rows: 1,
      minHeight: '120px',
      padding: '1rem',
    },
    calculation: {
      cols: 1,
      rows: 1,
      minHeight: '180px',
      padding: '1.25rem',
    },
  },

  // Couleurs spécifiques aux cartes
  colors: {
    treasury: {
      gradient: 'linear-gradient(135deg, #FAA016 0%, #4C34CE 50%, #4C34CE 100%)',
      glass: 'rgba(94, 114, 255, 0.05)',
      border: 'rgba(139, 92, 246, 0.2)',
      glow: '0 0 40px rgba(139, 92, 246, 0.15)',
    },
    clients: {
      bg: 'rgba(16, 185, 129, 0.05)',
      accent: '#10b981',
      border: 'rgba(16, 185, 129, 0.15)',
    },
    suppliers: {
      bg: 'rgba(245, 158, 11, 0.05)',
      accent: '#f59e0b',
      border: 'rgba(245, 158, 11, 0.15)',
    },
    expenses: {
      bg: 'rgba(239, 68, 68, 0.05)',
      accent: '#ef4444',
      border: 'rgba(239, 68, 68, 0.15)',
    },
    margin: {
      gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
      glass: 'rgba(16, 185, 129, 0.08)',
    },
    result: {
      gradient: 'linear-gradient(135deg, #FAA016 0%, #60a5fa 100%)',
      glass: 'rgba(59, 130, 246, 0.08)',
    },
  },

  // Animations
  animations: {
    cardEntrance: {
      initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    cardHover: {
      y: -4,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    cardTap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  },

  // Shadows et effets
  effects: {
    glass: {
      background: 'colors.glass.white[10]',
      backdropFilter: 'blur(20px)',
      border: '1px solid colors.glass.white[20]',
    },
    darkGlass: {
      background: 'rgba(38, 38, 38, 0.6)',
      backdropFilter: 'blur(24px)',
      border: '1px solid colors.glass.white[10]',
    },
    glow: {
      violet: '0 0 40px rgba(139, 92, 246, 0.15)',
      green: '0 0 40px rgba(16, 185, 129, 0.15)',
      red: '0 0 40px rgba(239, 68, 68, 0.15)',
      blue: '0 0 40px rgba(59, 130, 246, 0.15)',
    },
  },
} as const;

export type CardSize = keyof typeof cardTokens.sizes;
export type CardColor = keyof typeof cardTokens.colors;
export type CardEffect = keyof typeof cardTokens.effects;