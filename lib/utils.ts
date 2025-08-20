import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fonction utilitaire pour combiner les classes CSS de manière intelligente
 * Combine clsx pour la logique conditionnelle et tailwind-merge pour éviter les conflits Tailwind
 * 
 * @example
 * cn("px-2 py-1", condition && "bg-primary", "text-white")
 * cn(["px-2", "py-1"], { "bg-primary": isActive }, "text-white")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Génère une classe pour l'effet Glass/Glassmorphism
 * 
 * @param blur - Niveau de flou (xs, sm, md, lg, xl, 2xl, 3xl)
 * @param opacity - Opacité du fond (0-100)
 * @param color - Couleur de base (white, black, primary, etc.)
 * @returns Classes Tailwind pour l'effet glass
 * 
 * @example
 * glassEffect() // Effet glass par défaut
 * glassEffect("lg", 20) // Flou large avec 20% d'opacité
 */
export function glassEffect(
  blur: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" = "md",
  opacity: number = 10,
  color: "white" | "black" | "primary" = "white"
) {
  const blurClass = `backdrop-blur-${blur}`;
  const bgColor = {
    white: `bg-white/${opacity}`,
    black: `bg-black/${opacity}`,
    primary: `bg-primary/${opacity}`,
  };

  return cn(
    blurClass,
    bgColor[color],
    "border border-white/10",
    "shadow-glass",
    "transition-all duration-300"
  );
}

/**
 * Génère des variantes de couleurs pour les boutons et composants
 * 
 * @param variant - Type de variante (solid, outline, ghost, glass)
 * @param color - Couleur du thème (primary, secondary, accent, etc.)
 * @returns Classes Tailwind pour la variante
 */
export function colorVariant(
  variant: "solid" | "outline" | "ghost" | "glass" = "solid",
  color: "primary" | "secondary" | "accent" | "neutral" | "destructive" = "primary"
) {
  const variants = {
    solid: {
      primary: "bg-primary text-white hover:bg-primary-600 active:bg-primary-700",
      secondary: "bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700",
      accent: "bg-accent-pink text-white hover:opacity-90 active:opacity-80",
      neutral: "bg-neutral-700 text-white hover:bg-neutral-800 active:bg-neutral-900",
      destructive: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    },
    outline: {
      primary: "border-2 border-primary text-primary hover:bg-primary-50 dark:hover:bg-primary-950",
      secondary: "border-2 border-secondary text-secondary hover:bg-secondary-50 dark:hover:bg-secondary-950",
      accent: "border-2 border-accent-pink text-accent-pink hover:bg-accent-pink/10",
      neutral: "border-2 border-neutral-300 text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900",
      destructive: "border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950",
    },
    ghost: {
      primary: "text-primary hover:bg-primary-50 dark:hover:bg-primary-950",
      secondary: "text-secondary hover:bg-secondary-50 dark:hover:bg-secondary-950",
      accent: "text-accent-pink hover:bg-accent-pink/10",
      neutral: "text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900",
      destructive: "text-red-500 hover:bg-red-50 dark:hover:bg-red-950",
    },
    glass: {
      primary: "backdrop-blur-md bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
      secondary: "backdrop-blur-md bg-secondary/10 text-secondary border border-secondary/20 hover:bg-secondary/20",
      accent: "backdrop-blur-md bg-accent-pink/10 text-accent-pink border border-accent-pink/20 hover:bg-accent-pink/20",
      neutral: "backdrop-blur-md bg-white/10 text-neutral-700 border border-white/20 hover:bg-white/20 dark:text-neutral-200",
      destructive: "backdrop-blur-md bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20",
    },
  };

  return variants[variant][color];
}

/**
 * Génère des tailles standardisées pour les composants
 * 
 * @param size - Taille du composant
 * @param type - Type de composant (button, input, etc.)
 * @returns Classes Tailwind pour la taille
 */
export function sizeVariant(
  size: "xs" | "sm" | "md" | "lg" | "xl" = "md",
  type: "button" | "input" | "card" = "button"
) {
  const sizes = {
    button: {
      xs: "px-2 py-1 text-xs rounded-md",
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-6 py-3 text-lg rounded-xl",
      xl: "px-8 py-4 text-xl rounded-2xl",
    },
    input: {
      xs: "px-2 py-1 text-xs rounded-md",
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-5 py-2.5 text-lg rounded-xl",
      xl: "px-6 py-3 text-xl rounded-2xl",
    },
    card: {
      xs: "p-2 rounded-lg",
      sm: "p-3 rounded-xl",
      md: "p-4 rounded-2xl",
      lg: "p-6 rounded-2xl",
      xl: "p-8 rounded-3xl",
    },
  };

  return sizes[type][size];
}

/**
 * Applique un effet de lueur (glow) sur un élément
 * 
 * @param color - Couleur de la lueur
 * @param intensity - Intensité de la lueur (sm, md, lg)
 * @returns Classes Tailwind pour l'effet de lueur
 */
export function glowEffect(
  color: "primary" | "secondary" | "accent" | "white" = "primary",
  intensity: "sm" | "md" | "lg" = "md"
) {
  const colors = {
    primary: "94, 114, 255", // RGB pour primary
    secondary: "209, 80, 218", // RGB pour secondary
    accent: "255, 107, 157", // RGB pour accent-pink
    white: "255, 255, 255",
  };

  const intensities = {
    sm: "0 0 20px",
    md: "0 0 40px",
    lg: "0 0 60px",
  };

  return {
    boxShadow: `${intensities[intensity]} rgba(${colors[color]}, 0.3)`,
  };
}

/**
 * Applique un gradient moderne
 * 
 * @param direction - Direction du gradient
 * @param from - Couleur de départ
 * @param to - Couleur d'arrivée
 * @param via - Couleur intermédiaire (optionnel)
 * @returns Classes Tailwind pour le gradient
 */
export function gradient(
  direction: "to-t" | "to-tr" | "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" = "to-r",
  from: string = "primary-400",
  to: string = "secondary-400",
  via?: string
) {
  const baseGradient = `bg-gradient-${direction} from-${from} to-${to}`;
  return via ? `${baseGradient} via-${via}` : baseGradient;
}

/**
 * Génère des classes pour l'animation d'entrée
 * 
 * @param animation - Type d'animation
 * @param delay - Délai avant l'animation (en ms)
 * @returns Classes Tailwind pour l'animation
 */
export function animateIn(
  animation: "fade" | "slide" | "scale" | "bounce" = "fade",
  delay: number = 0
) {
  const animations = {
    fade: "animate-fade-in",
    slide: "animate-slide-in",
    scale: "animate-scale-in",
    bounce: "animate-bounce",
  };

  const delayClass = delay > 0 ? `animation-delay-${delay}` : "";
  
  return cn(animations[animation], delayClass);
}

/**
 * Retourne les classes pour un conteneur responsive
 * 
 * @param maxWidth - Largeur maximale du conteneur
 * @returns Classes Tailwind pour le conteneur
 */
export function container(maxWidth: "sm" | "md" | "lg" | "xl" | "2xl" | "full" = "2xl") {
  const widths = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return cn("mx-auto px-4 sm:px-6 lg:px-8", widths[maxWidth]);
}

/**
 * Gère les états de focus accessibles
 * 
 * @param color - Couleur du focus ring
 * @returns Classes Tailwind pour le focus
 */
export function focusRing(color: "primary" | "secondary" | "accent" = "primary") {
  const colors = {
    primary: "focus:ring-primary",
    secondary: "focus:ring-secondary",
    accent: "focus:ring-accent-pink",
  };

  return cn(
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    colors[color],
    "dark:focus:ring-offset-neutral-900"
  );
}

/**
 * Formate un nombre selon les conventions françaises
 * Version stable pour éviter les problèmes d'hydratation SSR
 * 
 * @param value - Nombre à formater
 * @param options - Options de formatage
 * @returns Nombre formaté avec espaces pour les milliers et virgule pour les décimales
 * 
 * @example
 * formatNumber(1234.56) // "1 234,56"
 * formatNumber(1234.56, { currency: 'EUR' }) // "1 234,56 €"
 * formatNumber(1234, { decimals: 0 }) // "1 234"
 */
export function formatNumber(
  value: number,
  options: {
    decimals?: number;
    currency?: string;
    showSign?: boolean;
    locale?: string;
  } = {}
) {
  const {
    decimals = 2,
    currency,
    showSign = false
  } = options;

  // Formatage manuel pour éviter les problèmes d'hydratation avec Intl
  const absValue = Math.abs(value);
  const fixed = absValue.toFixed(decimals);
  const [integerPart, decimalPart] = fixed.split('.');
  
  // Ajouter des espaces pour les milliers (formatage français)
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  
  // Construire le nombre complet
  let formattedValue = formattedInteger;
  if (decimals > 0 && decimalPart) {
    formattedValue += ',' + decimalPart; // Virgule française au lieu du point
  }
  
  // Ajouter le signe si nécessaire
  if (showSign || value < 0) {
    formattedValue = (value < 0 ? '-' : '+') + formattedValue;
  }
  
  // Ajouter la devise si spécifiée - toujours € pour la cohérence
  if (currency) {
    formattedValue += ` €`;
  }
  
  return formattedValue;
}

/**
 * Formate un montant monétaire selon les conventions françaises
 * 
 * @param amount - Montant à formater
 * @param currency - Devise (par défaut EUR)
 * @param showDecimals - Afficher les décimales (par défaut true)
 * @returns Montant formaté
 * 
 * @example
 * formatCurrency(1234.56) // "1 234,56 €"
 * formatCurrency(1234, 'EUR', false) // "1 234 €"
 * formatCurrency(-1234.56) // "-1 234,56 €"
 */
export function formatCurrency(
  amount: number,
  currency: string = 'EUR',
  showDecimals: boolean = true
) {
  return formatNumber(amount, {
    decimals: showDecimals ? 2 : 0,
    currency
  });
}

/**
 * Formate un montant avec signe pour les transactions
 * 
 * @param amount - Montant de la transaction
 * @param currency - Devise (par défaut EUR)
 * @param showDecimals - Afficher les décimales (par défaut false pour les entiers)
 * @returns Montant formaté avec signe + ou -
 * 
 * @example
 * formatTransactionAmount(1234.56) // "+1 234,57 €"
 * formatTransactionAmount(-1234.56) // "-1 234,57 €"
 * formatTransactionAmount(1234, 'EUR', false) // "+1 234 €"
 */
export function formatTransactionAmount(
  amount: number,
  currency: string = 'EUR',
  showDecimals: boolean = false
) {
  return formatNumber(amount, {
    decimals: showDecimals ? 2 : 0,
    currency,
    showSign: true
  });
}

/**
 * Formate une date selon les conventions françaises
 * 
 * @param date - Date à formater (string ou Date)
 * @param format - Format de sortie ('short', 'medium', 'long')
 * @returns Date formatée
 * 
 * @example
 * formatDate('2024-12-20') // "20/12/2024"
 * formatDate(new Date(), 'medium') // "20 déc. 2024"
 * formatDate('2024-12-20', 'long') // "20 décembre 2024"
 */
export function formatDate(
  date: string | Date,
  format: 'short' | 'medium' | 'long' = 'short'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Date invalide';
  }

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('fr-FR');
    case 'medium':
      return dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    case 'long':
      return dateObj.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    default:
      return dateObj.toLocaleDateString('fr-FR');
  }
}