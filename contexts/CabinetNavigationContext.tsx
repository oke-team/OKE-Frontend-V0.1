'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CabinetNavigationContextType {
  isDashboardCabinet: boolean;
  toggleDashboardMode: () => void;
  setDashboardMode: (isCabinet: boolean) => void;
}

const CabinetNavigationContext = createContext<CabinetNavigationContextType | undefined>(undefined);

export const useCabinetNavigation = () => {
  const context = useContext(CabinetNavigationContext);
  if (context === undefined) {
    throw new Error('useCabinetNavigation must be used within a CabinetNavigationProvider');
  }
  return context;
};

interface CabinetNavigationProviderProps {
  children: ReactNode;
}

export const CabinetNavigationProvider: React.FC<CabinetNavigationProviderProps> = ({ children }) => {
  // État persisté dans localStorage
  const [isDashboardCabinet, setIsDashboardCabinet] = useState(false);

  // Initialiser depuis localStorage au montage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('dashboard-cabinet-mode');
      if (saved) {
        setIsDashboardCabinet(JSON.parse(saved));
      }
    }
  }, []);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-cabinet-mode', JSON.stringify(isDashboardCabinet));
    }
  }, [isDashboardCabinet]);

  const toggleDashboardMode = () => {
    setIsDashboardCabinet(prev => !prev);
  };

  const setDashboardMode = (isCabinet: boolean) => {
    setIsDashboardCabinet(isCabinet);
  };

  const value = {
    isDashboardCabinet,
    toggleDashboardMode,
    setDashboardMode,
  };

  return (
    <CabinetNavigationContext.Provider value={value}>
      {children}
    </CabinetNavigationContext.Provider>
  );
};