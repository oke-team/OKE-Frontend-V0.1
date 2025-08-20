'use client';

import { useState, useEffect } from 'react';

/**
 * Hook pour éviter les problèmes d'hydratation avec le formatage
 * Rend côté client seulement après l'hydratation
 */
export function useIsomorphicFormatting() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
}

/**
 * Hook pour les valeurs monétaires safe pour l'hydratation
 */
export function useSafeNumber(value: number, formatter: (val: number) => string) {
  const isMounted = useIsomorphicFormatting();
  
  // Côté serveur et pendant l'hydratation, on retourne une valeur simple
  if (!isMounted) {
    return `${Math.abs(value)} €`;
  }
  
  // Côté client après hydratation, on utilise le vrai formatage
  return formatter(value);
}