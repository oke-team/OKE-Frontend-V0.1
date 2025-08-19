'use client';

import { useState, useEffect, useCallback } from 'react';
import { defaultZone2Widgets, availableWidgets, widgetConfigs } from '@/lib/dashboard/widget-data';

interface WidgetState {
  activeWidgets: string[];
}

const STORAGE_KEY = 'oke-dashboard-widgets';

export function useWidgetManager() {
  // Tous les widgets possibles (sauf notifications qui est toujours visible)
  const allWidgets = [...defaultZone2Widgets, ...availableWidgets];
  
  const [activeWidgets, setActiveWidgets] = useState<string[]>(defaultZone2Widgets);
  const [isManaging, setIsManaging] = useState(false);

  // Charger l'état depuis localStorage au montage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setActiveWidgets(parsed.activeWidgets || defaultZone2Widgets);
      } catch (e) {
        console.error('Failed to parse stored widget state:', e);
      }
    }
  }, []);

  // Sauvegarder l'état dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ activeWidgets }));
  }, [activeWidgets]);

  // Ajouter un widget
  const addWidget = useCallback((widgetId: string) => {
    setActiveWidgets(prev => [...prev, widgetId]);
  }, []);

  // Retirer un widget
  const removeWidget = useCallback((widgetId: string) => {
    setActiveWidgets(prev => prev.filter(id => id !== widgetId));
  }, []);

  // Réorganiser les widgets
  const reorderWidgets = useCallback((newOrder: string[]) => {
    setActiveWidgets(newOrder);
  }, []);

  // Réinitialiser aux valeurs par défaut
  const resetToDefault = useCallback(() => {
    setActiveWidgets(defaultZone2Widgets);
  }, []);

  // Obtenir les widgets disponibles (tous les widgets sauf les actifs)
  const getAvailableWidgets = useCallback(() => {
    return allWidgets.filter(id => !activeWidgets.includes(id));
  }, [activeWidgets, allWidgets]);

  return {
    activeWidgets,
    availableWidgets: getAvailableWidgets(),
    isManaging,
    setIsManaging,
    addWidget,
    removeWidget,
    reorderWidgets,
    resetToDefault
  };
}