import { useCallback, useRef } from 'react';
import { useCabinetNavigation } from '@/contexts/CabinetNavigationContext';

export const useDashboardDoubleClick = () => {
  const { isDashboardCabinet, toggleDashboardMode } = useCabinetNavigation();
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  const handleDashboardClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickCountRef.current === 1) {
      // Premier clic - démarrer un timer
      clickTimeoutRef.current = setTimeout(() => {
        // Si pas de deuxième clic après 300ms, navigation simple
        if (clickCountRef.current === 1) {
          // Redirection vers le dashboard approprié
          if (isDashboardCabinet) {
            window.location.href = '/cabinet-dashboard';
          } else {
            window.location.href = '/dashboard';
          }
        }
        clickCountRef.current = 0;
      }, 300);
    } else if (clickCountRef.current === 2) {
      // Double-clic détecté - basculer le mode
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
      
      toggleDashboardMode();
      
      // Redirection immédiate vers le nouveau mode
      const newMode = !isDashboardCabinet;
      if (newMode) {
        window.location.href = '/cabinet-dashboard';
      } else {
        window.location.href = '/dashboard';
      }
      
      clickCountRef.current = 0;
    }
  }, [isDashboardCabinet, toggleDashboardMode]);

  return {
    handleDashboardClick,
    isDashboardCabinet
  };
};