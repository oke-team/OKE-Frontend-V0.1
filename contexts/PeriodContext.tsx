'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type PeriodType = 'exercise' | 'situation' | 'custom';

export interface Period {
  id: string;
  type: PeriodType;
  label: string;
  startDate: Date;
  endDate: Date;
  isCurrent?: boolean;
}

interface PeriodContextType {
  currentPeriod: Period;
  periods: Period[];
  setPeriod: (period: Period) => void;
  addCustomPeriod: (period: Period) => void;
  isWithinPeriod: (date: Date) => boolean;
}

const PeriodContext = createContext<PeriodContextType | undefined>(undefined);

// Périodes par défaut
const defaultPeriods: Period[] = [
  {
    id: '2025',
    type: 'exercise',
    label: 'Exercice 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    isCurrent: true,
  },
  {
    id: '2024',
    type: 'exercise',
    label: 'Exercice 2024',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: '2023',
    type: 'exercise',
    label: 'Exercice 2023',
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-12-31'),
  },
  {
    id: 'q4-2024',
    type: 'situation',
    label: 'Situation T4 2024',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: 'q3-2024',
    type: 'situation',
    label: 'Situation T3 2024',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-09-30'),
  },
  {
    id: 'h2-2024',
    type: 'situation',
    label: 'Situation S2 2024',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-12-31'),
  },
  {
    id: 'jan-2025',
    type: 'custom',
    label: 'Janvier 2025',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-01-31'),
  },
  {
    id: 'last-30-days',
    type: 'custom',
    label: '30 derniers jours',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  },
];

export const PeriodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [periods, setPeriods] = useState<Period[]>(defaultPeriods);
  const [currentPeriod, setCurrentPeriod] = useState<Period>(
    defaultPeriods.find(p => p.isCurrent) || defaultPeriods[0]
  );

  // Sauvegarder la période sélectionnée dans le localStorage
  useEffect(() => {
    const savedPeriodId = localStorage.getItem('selectedPeriodId');
    if (savedPeriodId) {
      const savedPeriod = periods.find(p => p.id === savedPeriodId);
      if (savedPeriod) {
        setCurrentPeriod(savedPeriod);
      }
    }
  }, [periods]);

  const setPeriod = useCallback((period: Period) => {
    setCurrentPeriod(period);
    localStorage.setItem('selectedPeriodId', period.id);
  }, []);

  const addCustomPeriod = useCallback((period: Period) => {
    setPeriods(prev => [...prev, { ...period, type: 'custom' }]);
  }, []);

  const isWithinPeriod = useCallback((date: Date) => {
    return date >= currentPeriod.startDate && date <= currentPeriod.endDate;
  }, [currentPeriod]);

  return (
    <PeriodContext.Provider
      value={{
        currentPeriod,
        periods,
        setPeriod,
        addCustomPeriod,
        isWithinPeriod,
      }}
    >
      {children}
    </PeriodContext.Provider>
  );
};

export const usePeriod = () => {
  const context = useContext(PeriodContext);
  if (!context) {
    throw new Error('usePeriod must be used within a PeriodProvider');
  }
  return context;
};