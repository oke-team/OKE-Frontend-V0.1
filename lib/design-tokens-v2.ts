/**
 * Design Tokens V2 - Système de Design OKÉ
 * 
 * Version unifiée et cohérente des tokens de design pour l'application OKÉ.
 * Basé sur le design Liquid Glass inspiré d'Apple Vision Pro avec les couleurs officielles.
 * 
 * @version 2.0.0
 * @author Design System Lead
 */

// ============================================================================
// COULEURS FONDAMENTALES
// ============================================================================

/**
 * Palette de couleurs officielle OKÉ
 * Orange principal : #FAA016
 * Violet secondaire : #4C34CE
 */
export const colors = {
  // Couleur primaire - Orange OKÉ
  primary: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#FAA016", // Couleur principale officielle
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  
  // Couleur secondaire - Violet OKÉ
  secondary: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#4C34CE", // Couleur secondaire officielle
    600: "#3730a3",
    700: "#312e81",
    800: "#1e1b4b",
    900: "#1e1b4b",
    950: "#0f0e2e",
  },
  
  // Palette neutre étendue
  neutral: {
    0: "#ffffff",
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
    1000: "#000000",
  },
  
  // Couleurs sémantiques
  semantic: {
    success: "#10b981",
    successLight: "rgba(16, 185, 129, 0.1)",
    warning: "#f59e0b",
    warningLight: "rgba(245, 158, 11, 0.1)",
    error: "#ef4444",
    errorLight: "rgba(239, 68, 68, 0.1)",
    info: "#FAA016",
    infoLight: "rgba(59, 130, 246, 0.1)",
  },
  
  // Couleurs Glass morphism
  glass: {
    white: {
      5: "colors.glass.white[5]",
      10: "colors.glass.white[10]",
      15: "colors.glass.white[15]",
      20: "colors.glass.white[20]",
      30: "rgba(255, 255, 255, 0.3)",
    },
    black: {
      5: "rgba(0, 0, 0, 0.05)",
      10: "rgba(0, 0, 0, 0.1)",
      15: "rgba(0, 0, 0, 0.15)",
      20: "rgba(0, 0, 0, 0.2)",
      30: "rgba(0, 0, 0, 0.3)",
      80: "colors.glass.black[80]",
    },
    primary: {
      10: "rgba(250, 160, 22, 0.1)",
      20: "rgba(250, 160, 22, 0.2)",
      30: "rgba(250, 160, 22, 0.3)",
    },
    secondary: {
      10: "rgba(76, 52, 206, 0.1)",
      20: "rgba(76, 52, 206, 0.2)",
      30: "rgba(76, 52, 206, 0.3)",
    },
  },
};

// ============================================================================
// ESPACEMENT
// ============================================================================

/**
 * Système d'espacement basé sur une échelle de 4px
 * Utilisation cohérente pour padding, margin, gap
 */
export const spacing = {
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
  11: "44px", // Touch target minimum
  12: "48px",
  14: "56px",
  16: "64px",
  20: "80px",
  24: "96px",
  28: "112px",
  32: "128px",
  40: "160px",
  48: "192px",
  56: "224px",
  64: "256px",
  72: "288px",
  80: "320px",
  96: "384px",
};

// ============================================================================
// TYPOGRAPHIE
// ============================================================================

export const typography = {
  // Familles de polices
  fontFamily: {
    sans: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"SF Mono", Monaco, Inconsolata, "Fira Code", monospace',
  },
  
  // Tailles de police avec hauteurs de ligne optimisées
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
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: "0px",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
};

// ============================================================================
// OMBRES
// ============================================================================

export const shadows = {
  // Ombres standards
  none: "none",
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  
  // Ombres Glass
  glass: {
    xs: "0 2px 4px 0 rgba(0, 0, 0, 0.02)",
    sm: "0 2px 8px 0 rgba(0, 0, 0, 0.04)",
    md: "0 8px 32px 0 rgba(0, 0, 0, 0.08)",
    lg: "0 16px 48px 0 rgba(0, 0, 0, 0.12)",
    xl: "0 24px 64px 0 rgba(0, 0, 0, 0.16)",
  },
  
  // Ombres Glow (avec couleurs OKÉ)
  glow: {
    primary: {
      sm: "0 0 20px rgba(250, 160, 22, 0.15)",
      md: "0 0 40px rgba(250, 160, 22, 0.2)",
      lg: "0 0 60px rgba(250, 160, 22, 0.25)",
    },
    secondary: {
      sm: "0 0 20px rgba(76, 52, 206, 0.15)",
      md: "0 0 40px rgba(76, 52, 206, 0.2)",
      lg: "0 0 60px rgba(76, 52, 206, 0.25)",
    },
    inner: "inset 0 0 20px rgba(250, 160, 22, 0.1)",
  },
};

// ============================================================================
// EFFETS DE FLOU
// ============================================================================

export const blur = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "40px",
};

// ============================================================================
// BREAKPOINTS RESPONSIVE
// ============================================================================

export const breakpoints = {
  xs: "475px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "1920px",
};

// ============================================================================
// ANIMATIONS
// ============================================================================

export const animations = {
  // Durées d'animation
  duration: {
    instant: "75ms",
    fast: "150ms",
    normal: "200ms",
    medium: "300ms",
    slow: "500ms",
    slower: "700ms",
    slowest: "1000ms",
  },
  
  // Courbes d'accélération
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  
  // Transitions prédéfinies
  transition: {
    default: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    fast: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "all 500ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ============================================================================
// Z-INDEX
// ============================================================================

export const zIndex = {
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
};

// ============================================================================
// COMPOSANTS PRÉDÉFINIS
// ============================================================================

/**
 * Styles prédéfinis pour les composants Glass
 */
export const glassStyles = {
  // Container Glass standard
  container: {
    default: {
      background: colors.glass.white[5],
      border: `1px solid ${colors.glass.white[10]}`,
      backdropFilter: `blur(${blur.md})`,
      borderRadius: borderRadius.xl,
      boxShadow: shadows.glass.md,
    },
    hover: {
      background: colors.glass.white[10],
      border: `1px solid ${colors.glass.white[15]}`,
      boxShadow: shadows.glass.lg,
    },
    active: {
      background: colors.glass.white[15],
      border: `1px solid ${colors.glass.white[20]}`,
    },
  },
  
  // Modal Glass
  modal: {
    overlay: {
      background: colors.glass.black[80],
      backdropFilter: `blur(${blur.sm})`,
    },
    content: {
      background: colors.glass.white[10],
      border: `1px solid ${colors.glass.white[20]}`,
      backdropFilter: `blur(${blur.xl})`,
      borderRadius: borderRadius["2xl"],
      boxShadow: shadows.glass.xl,
    },
  },
  
  // Button Glass
  button: {
    primary: {
      background: colors.glass.primary[20],
      border: `1px solid ${colors.primary[500]}`,
      color: colors.neutral[0],
      backdropFilter: `blur(${blur.md})`,
    },
    secondary: {
      background: colors.glass.secondary[20],
      border: `1px solid ${colors.secondary[500]}`,
      color: colors.neutral[0],
      backdropFilter: `blur(${blur.md})`,
    },
    ghost: {
      background: colors.glass.white[5],
      border: `1px solid ${colors.glass.white[10]}`,
      color: colors.neutral[100],
      backdropFilter: `blur(${blur.sm})`,
    },
  },
  
  // Card Glass
  card: {
    default: {
      background: colors.glass.white[5],
      border: `1px solid ${colors.glass.white[10]}`,
      backdropFilter: `blur(${blur.md})`,
      borderRadius: borderRadius.lg,
      boxShadow: shadows.glass.sm,
    },
    elevated: {
      background: colors.glass.white[10],
      border: `1px solid ${colors.glass.white[15]}`,
      backdropFilter: `blur(${blur.lg})`,
      borderRadius: borderRadius.xl,
      boxShadow: shadows.glass.md,
    },
  },
};

// ============================================================================
// HELPERS ET UTILITAIRES
// ============================================================================

/**
 * Fonction helper pour obtenir une valeur de token
 */
export const getToken = (path: string): any => {
  const keys = path.split('.');
  let result: any = { colors, spacing, typography, borderRadius, shadows, blur, animations, zIndex };
  
  for (const key of keys) {
    if (result[key] !== undefined) {
      result = result[key];
    } else {
      console.warn(`Token not found: ${path}`);
      return undefined;
    }
  }
  
  return result;
};

/**
 * Classes Tailwind correspondantes aux tokens
 */
export const tailwindClasses = {
  // Couleurs
  primaryColor: "text-[#FAA016]",
  primaryBg: "bg-[#FAA016]",
  primaryBorder: "border-[#FAA016]",
  secondaryColor: "text-[#4C34CE]",
  secondaryBg: "bg-[#4C34CE]",
  secondaryBorder: "border-[#4C34CE]",
  
  // Glass effects
  glassContainer: "backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-glass",
  glassButton: "backdrop-blur-md bg-white/10 border border-white/20 rounded-lg hover:bg-white/15 transition-all",
  glassCard: "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl shadow-glass-sm",
  
  // Animations
  fadeIn: "animate-fade-in",
  slideIn: "animate-slide-in",
  scaleIn: "animate-scale-in",
  
  // Responsive
  responsiveContainer: "px-4 sm:px-6 lg:px-8 max-w-screen-2xl mx-auto",
  responsiveGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
  
  // Touch targets
  touchTarget: "min-h-[44px] min-w-[44px]",
};

// ============================================================================
// EXPORT PAR DÉFAUT
// ============================================================================

const designTokensV2 = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  blur,
  breakpoints,
  animations,
  zIndex,
  glassStyles,
  getToken,
  tailwindClasses,
};

export default designTokensV2;