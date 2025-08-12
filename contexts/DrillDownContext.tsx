'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type NavigationLevel = 'dashboard' | 'accounts' | 'timeline';

interface NavigationState {
  level: NavigationLevel;
  selectedCard?: string;
  selectedAccount?: string;
  breadcrumb: Array<{
    level: NavigationLevel;
    label: string;
    data?: any;
  }>;
}

interface DrillDownContextType {
  navigationState: NavigationState;
  navigateToAccounts: (cardId: string, cardLabel: string) => void;
  navigateToTimeline: (accountId: string, accountLabel: string) => void;
  navigateBack: () => void;
  navigateToDashboard: () => void;
  navigateToBreadcrumb: (index: number) => void;
}

const DrillDownContext = createContext<DrillDownContextType | undefined>(undefined);

export const DrillDownProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [navigationState, setNavigationState] = useState<NavigationState>({
    level: 'dashboard',
    breadcrumb: [{ level: 'dashboard', label: 'Tableau de bord' }],
  });

  const navigateToAccounts = useCallback((cardId: string, cardLabel: string) => {
    setNavigationState(prev => ({
      level: 'accounts',
      selectedCard: cardId,
      breadcrumb: [
        ...prev.breadcrumb.slice(0, 1),
        { level: 'accounts', label: cardLabel, data: { cardId } }
      ],
    }));
  }, []);

  const navigateToTimeline = useCallback((accountId: string, accountLabel: string) => {
    setNavigationState(prev => ({
      level: 'timeline',
      selectedCard: prev.selectedCard,
      selectedAccount: accountId,
      breadcrumb: [
        ...prev.breadcrumb.slice(0, 2),
        { level: 'timeline', label: accountLabel, data: { accountId } }
      ],
    }));
  }, []);

  const navigateBack = useCallback(() => {
    setNavigationState(prev => {
      if (prev.breadcrumb.length <= 1) return prev;
      
      const newBreadcrumb = prev.breadcrumb.slice(0, -1);
      const lastItem = newBreadcrumb[newBreadcrumb.length - 1];
      
      return {
        level: lastItem.level,
        selectedCard: lastItem.data?.cardId,
        selectedAccount: undefined,
        breadcrumb: newBreadcrumb,
      };
    });
  }, []);

  const navigateToDashboard = useCallback(() => {
    setNavigationState({
      level: 'dashboard',
      breadcrumb: [{ level: 'dashboard', label: 'Tableau de bord' }],
    });
  }, []);

  const navigateToBreadcrumb = useCallback((index: number) => {
    setNavigationState(prev => {
      const newBreadcrumb = prev.breadcrumb.slice(0, index + 1);
      const targetItem = newBreadcrumb[index];
      
      return {
        level: targetItem.level,
        selectedCard: targetItem.data?.cardId,
        selectedAccount: targetItem.level === 'timeline' ? targetItem.data?.accountId : undefined,
        breadcrumb: newBreadcrumb,
      };
    });
  }, []);

  return (
    <DrillDownContext.Provider
      value={{
        navigationState,
        navigateToAccounts,
        navigateToTimeline,
        navigateBack,
        navigateToDashboard,
        navigateToBreadcrumb,
      }}
    >
      {children}
    </DrillDownContext.Provider>
  );
};

export const useDrillDown = () => {
  const context = useContext(DrillDownContext);
  if (!context) {
    throw new Error('useDrillDown must be used within a DrillDownProvider');
  }
  return context;
};