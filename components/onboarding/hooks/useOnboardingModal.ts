/**
 * Hook pour gérer l'ouverture/fermeture du modal d'onboarding
 */

import { useState, useCallback } from 'react';
import { hasActiveOnboardingSession } from '@/lib/services/onboarding/onboardingStorage';

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Vérifie s'il y a une session en cours
  const hasActiveSession = useCallback(() => {
    return hasActiveOnboardingSession();
  }, []);

  // Ouvre le modal
  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  // Ferme le modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Reprendre une session existante
  const resumeSession = useCallback(() => {
    if (hasActiveSession()) {
      setIsOpen(true);
    }
  }, [hasActiveSession]);

  return {
    isOpen,
    hasActiveSession,
    openModal,
    closeModal,
    resumeSession
  };
}