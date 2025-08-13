import { useState, useEffect } from 'react'

/**
 * Hook pour détecter les media queries et breakpoints responsive
 * 
 * @param query - La media query CSS à écouter
 * @returns boolean - true si la media query correspond
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDesktop = useMediaQuery('(min-width: 1024px)')
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Vérifier si nous sommes côté client
    if (typeof window === 'undefined') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    
    // Définir l'état initial
    setMatches(mediaQuery.matches)

    // Fonction de callback pour les changements
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    // Ajouter l'écouteur d'événements
    mediaQuery.addEventListener('change', handleChange)

    // Nettoyage
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}

/**
 * Hook avec breakpoints prédéfinis pour OKE
 */
export function useBreakpoint() {
  const isXs = useMediaQuery('(max-width: 475px)')
  const isSm = useMediaQuery('(max-width: 640px)')
  const isMd = useMediaQuery('(max-width: 768px)')
  const isLg = useMediaQuery('(max-width: 1024px)')
  const isXl = useMediaQuery('(max-width: 1280px)')
  const is2Xl = useMediaQuery('(max-width: 1536px)')

  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isMobile = useMediaQuery('(max-width: 767px)')

  return {
    // Breakpoints exacts
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,
    is2Xl,
    
    // Catégories d'appareils
    isMobile,
    isTablet,
    isDesktop,
    
    // Breakpoint actuel (le plus grand qui correspond)
    current: isXs ? 'xs' : isSm ? 'sm' : isMd ? 'md' : isLg ? 'lg' : isXl ? 'xl' : '2xl'
  }
}

/**
 * Hook pour détecter les préférences utilisateur
 */
export function useUserPreferences() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersColorScheme = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersHighContrast = useMediaQuery('(prefers-contrast: high)')

  return {
    prefersReducedMotion,
    prefersDarkMode: prefersColorScheme,
    prefersHighContrast
  }
}