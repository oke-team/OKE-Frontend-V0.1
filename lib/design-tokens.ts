/**
 * Design Tokens pour l'application OKE
 * 
 * Ce fichier centralise tous les tokens de design utilisés dans l'application.
 * Il sert de source unique de vérité pour maintenir la cohérence visuelle.
 */

export const designTokens = {
  /**
   * Palette de couleurs
   */
  colors: {
    // Couleurs primaires - Bleu électrique inspiré de Linear
    primary: {
      50: "#f0f4ff",
      100: "#e0e8ff",
      200: "#c7d6ff",
      300: "#a5b9ff",
      400: "#7f94ff",
      500: "#5e72ff", // Couleur principale
      600: "#4a5eff",
      700: "#3b4ded",
      800: "#3142c6",
      900: "#2b3aa1",
      950: "#1a2260",
    },
    
    // Couleurs secondaires - Violet pastel
    secondary: {
      50: "#fdf2fe",
      100: "#fae5fc",
      200: "#f5cbf9",
      300: "#eda8f4",
      400: "#e279ea",
      500: "#d150da", // Couleur principale
      600: "#b432bc",
      700: "#942799",
      800: "#7a237d",
      900: "#662364",
    },
    
    // Accents pastels pour différents éléments
    accent: {
      pink: "#ff6b9d",
      purple: "#c66fbc",
      blue: "#66d9ef",
      green: "#95e1a4",
      yellow: "#feca57",
      orange: "#ff9a76",
    },
    
    // Palette neutre étendue
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      150: "#ededed",
      200: "#e5e5e5",
      250: "#dddddd",
      300: "#d4d4d4",
      350: "#b8b8b8",
      400: "#a3a3a3",
      450: "#8e8e8e",
      500: "#737373",
      550: "#5e5e5e",
      600: "#525252",
      650: "#484848",
      700: "#404040",
      750: "#383838",
      800: "#262626",
      850: "#1e1e1e",
      900: "#171717",
      950: "#0a0a0a",
    },
    
    // Couleurs sémantiques
    semantic: {
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
  },
  
  /**
   * Espacement (basé sur une échelle de 4px)
   */
  spacing: {
    0: "0px",
    px: "1px",
    0.5: "2px",
    1: "4px",
    1.5: "6px",
    2: "8px",
    2.5: "10px",
    3: "12px",
    3.5: "14px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    11: "44px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
    36: "144px",
    40: "160px",
    44: "176px",
    48: "192px",
    52: "208px",
    56: "224px",
    60: "240px",
    64: "256px",
    72: "288px",
    80: "320px",
    96: "384px",
  },
  
  /**
   * Typographie
   */
  typography: {
    // Familles de polices
    fontFamily: {
      sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"SF Mono", Monaco, Inconsolata, "Fira Code", monospace',
    },
    
    // Tailles de police
    fontSize: {
      "2xs": { size: "10px", lineHeight: "14px" },
      xs: { size: "12px", lineHeight: "16px" },
      sm: { size: "14px", lineHeight: "20px" },
      base: { size: "16px", lineHeight: "24px" },
      lg: { size: "18px", lineHeight: "28px" },
      xl: { size: "20px", lineHeight: "30px" },
      "2xl": { size: "24px", lineHeight: "32px" },
      "3xl": { size: "30px", lineHeight: "36px" },
      "4xl": { size: "36px", lineHeight: "40px" },
      "5xl": { size: "48px", lineHeight: "48px" },
      "6xl": { size: "60px", lineHeight: "60px" },
      "7xl": { size: "72px", lineHeight: "72px" },
      "8xl": { size: "96px", lineHeight: "96px" },
      "9xl": { size: "128px", lineHeight: "128px" },
    },
    
    // Poids de police
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    
    // Espacement des lettres
    letterSpacing: {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0em",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    },
  },
  
  /**
   * Border radius
   */
  borderRadius: {
    none: "0px",
    sm: "4px",
    DEFAULT: "8px",
    md: "10px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",
  },
  
  /**
   * Ombres
   */
  shadows: {
    // Ombres standards
    none: "none",
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    
    // Ombres Glass
    glass: {
      sm: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
      DEFAULT: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
      lg: "0 16px 48px 0 rgba(0, 0, 0, 0.12)",
      xl: "0 24px 64px 0 rgba(0, 0, 0, 0.16)",
    },
    
    // Ombres Glow
    glow: {
      sm: "0 0 20px rgba(94, 114, 255, 0.15)",
      DEFAULT: "0 0 40px rgba(94, 114, 255, 0.2)",
      lg: "0 0 60px rgba(94, 114, 255, 0.25)",
      inner: "inset 0 0 20px rgba(94, 114, 255, 0.1)",
    },
  },
  
  /**
   * Effets de flou
   */
  blur: {
    none: "0",
    xs: "2px",
    sm: "4px",
    DEFAULT: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    "2xl": "40px",
    "3xl": "64px",
  },
  
  /**
   * Breakpoints responsive
   */
  breakpoints: {
    xs: "475px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "1920px",
  },
  
  /**
   * Animations
   */
  animations: {
    duration: {
      "75": "75ms",
      "100": "100ms",
      "150": "150ms",
      "200": "200ms",
      "300": "300ms",
      "500": "500ms",
      "700": "700ms",
      "1000": "1000ms",
    },
    
    easing: {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
  
  /**
   * Z-index
   */
  zIndex: {
    auto: "auto",
    0: 0,
    10: 10,
    20: 20,
    30: 30,
    40: 40,
    50: 50,
    dropdown: 1000,
    sticky: 1020,
    banner: 1030,
    overlay: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
    notification: 1080,
    max: 9999,
  },
  
  /**
   * Tokens spécifiques pour les cartes entrepreneur
   */
  cards: {
    // Couleurs spécifiques aux cartes
    colors: {
      background: {
        default: "rgba(255, 255, 255, 0.05)",
        hover: "rgba(255, 255, 255, 0.08)",
        active: "rgba(255, 255, 255, 0.1)",
        glass: "rgba(255, 255, 255, 0.03)",
      },
      border: {
        default: "rgba(255, 255, 255, 0.1)",
        hover: "rgba(255, 255, 255, 0.15)",
        active: "rgba(94, 114, 255, 0.3)",
        focus: "rgba(94, 114, 255, 0.5)",
      },
      accent: {
        violet: "#8b5cf6",
        violetLight: "rgba(139, 92, 246, 0.1)",
        green: "#10b981",
        greenLight: "rgba(16, 185, 129, 0.1)",
        red: "#ef4444",
        redLight: "rgba(239, 68, 68, 0.1)",
      },
    },
    
    // Espacements spécifiques
    spacing: {
      xs: "12px",
      sm: "16px",
      md: "20px",
      lg: "24px",
      xl: "32px",
    },
    
    // Tailles de cartes
    sizes: {
      hero: {
        minHeight: "200px",
        maxHeight: "280px",
      },
      standard: {
        minHeight: "120px",
        maxHeight: "160px",
      },
      compact: {
        minHeight: "80px",
        maxHeight: "100px",
      },
    },
    
    // Transitions spécifiques
    transitions: {
      default: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
      hover: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
      active: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
    
    // Ombres spécifiques
    shadows: {
      default: "0 4px 24px 0 rgba(0, 0, 0, 0.06)",
      hover: "0 8px 32px 0 rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(94, 114, 255, 0.1)",
      active: "0 2px 16px 0 rgba(0, 0, 0, 0.04)",
      glow: {
        violet: "0 0 24px rgba(139, 92, 246, 0.2)",
        green: "0 0 24px rgba(16, 185, 129, 0.2)",
        red: "0 0 24px rgba(239, 68, 68, 0.2)",
      },
    },
    
    // Radius spécifiques
    borderRadius: {
      sm: "12px",
      md: "16px",
      lg: "20px",
      xl: "24px",
    },
  },
};

/**
 * Tokens pour les états des cartes
 */
export const cardStates = {
  normal: {
    background: designTokens.cards.colors.background.default,
    border: designTokens.cards.colors.border.default,
    shadow: designTokens.cards.shadows.default,
    transform: "translateY(0)",
  },
  hover: {
    background: designTokens.cards.colors.background.hover,
    border: designTokens.cards.colors.border.hover,
    shadow: designTokens.cards.shadows.hover,
    transform: "translateY(-2px)",
  },
  pressed: {
    background: designTokens.cards.colors.background.active,
    border: designTokens.cards.colors.border.active,
    shadow: designTokens.cards.shadows.active,
    transform: "translateY(0) scale(0.98)",
  },
  loading: {
    background: designTokens.cards.colors.background.glass,
    border: designTokens.cards.colors.border.default,
    opacity: "0.7",
    pointerEvents: "none",
  },
  disabled: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "rgba(255, 255, 255, 0.05)",
    opacity: "0.5",
    pointerEvents: "none",
  },
};

/**
 * Variantes de cartes
 */
export const cardVariants = {
  hero: {
    className: "min-h-[200px] max-h-[280px] p-6 lg:p-8",
    borderRadius: designTokens.cards.borderRadius.xl,
  },
  standard: {
    className: "min-h-[120px] max-h-[160px] p-4 lg:p-6",
    borderRadius: designTokens.cards.borderRadius.lg,
  },
  compact: {
    className: "min-h-[80px] max-h-[100px] p-3 lg:p-4",
    borderRadius: designTokens.cards.borderRadius.md,
  },
  calculation: {
    className: "min-h-[140px] p-4 lg:p-5",
    borderRadius: designTokens.cards.borderRadius.lg,
  },
};

/**
 * Exemples d'utilisation des tokens
 */
export const usageExamples = {
  // Composant Card avec effet Glass
  glassCard: `
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-glass">
      <!-- Contenu de la carte -->
    </div>
  `,
  
  // Carte entrepreneur avec variante hero
  entrepreneurCardHero: `
    <CardBase 
      variant="hero"
      state="normal"
      accentColor="violet"
      className="relative overflow-hidden"
    >
      <h2 className="text-2xl font-bold">Carte Entrepreneur</h2>
      <p className="text-neutral-400">Contenu principal</p>
    </CardBase>
  `,
  
  // Carte de calcul interactive
  calculationCard: `
    <CardBase 
      variant="calculation"
      state="hover"
      accentColor="green"
      interactive
    >
      <div className="flex justify-between items-center">
        <span>Total</span>
        <span className="text-2xl font-bold">€1,234</span>
      </div>
    </CardBase>
  `,
  
  // Bouton avec gradient
  gradientButton: `
    <button className="bg-gradient-to-r from-primary-400 to-primary-600 text-white px-4 py-2 rounded-lg hover:shadow-glow transition-all">
      Cliquez-moi
    </button>
  `,
  
  // Titre avec effet de texte gradient
  gradientTitle: `
    <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
      Titre avec gradient
    </h1>
  `,
  
  // Layout responsive avec conteneur
  responsiveLayout: `
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Contenu de la grille -->
      </div>
    </div>
  `,
  
  // Input avec focus ring
  inputWithFocus: `
    <input 
      className="w-full px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      placeholder="Entrez votre texte..."
    />
  `,
};

/**
 * Guidelines d'utilisation
 */
export const guidelines = {
  colors: {
    primary: "Utilisé pour les actions principales et éléments de navigation importants",
    secondary: "Utilisé pour les actions secondaires et éléments complémentaires",
    accent: "Utilisé pour attirer l'attention sur des éléments spécifiques",
    neutral: "Utilisé pour le texte, les bordures et les arrière-plans neutres",
    semantic: "Utilisé pour communiquer des états (succès, erreur, warning, info)",
  },
  
  spacing: {
    recommendation: "Utilisez l'échelle d'espacement de 4px pour maintenir la cohérence",
    examples: {
      padding: "p-2 (8px), p-4 (16px), p-6 (24px)",
      margin: "m-2 (8px), m-4 (16px), m-8 (32px)",
      gap: "gap-2 (8px), gap-4 (16px), gap-6 (24px)",
    },
  },
  
  typography: {
    hierarchy: "Respectez la hiérarchie typographique pour améliorer la lisibilité",
    sizes: {
      heading1: "text-4xl ou text-5xl",
      heading2: "text-3xl",
      heading3: "text-2xl",
      body: "text-base",
      small: "text-sm",
      caption: "text-xs",
    },
  },
  
  effects: {
    glass: "Utilisez l'effet glass pour créer de la profondeur et de la modernité",
    glow: "Utilisez l'effet glow pour attirer l'attention de manière subtile",
    gradient: "Utilisez les gradients avec parcimonie pour éviter la surcharge visuelle",
  },
  
  responsive: {
    breakpoints: "Utilisez les breakpoints standards pour assurer une expérience cohérente",
    mobile: "Concevez d'abord pour mobile (mobile-first)",
    testing: "Testez sur tous les breakpoints principaux (sm, md, lg, xl)",
  },
};