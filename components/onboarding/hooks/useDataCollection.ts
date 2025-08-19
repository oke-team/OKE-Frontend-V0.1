/**
 * Hook pour gérer la collecte de données d'entreprise
 */

import { useState, useCallback, useRef } from 'react';
import { 
  collectCompanyData,
  type DataCollectionNotification,
  type CollectedCompanyData
} from '@/lib/services/onboarding/pappersService';

export interface DataCollectionState {
  isCollecting: boolean;
  isComplete: boolean;
  hasError: boolean;
  progress: number;
  notifications: DataCollectionNotification[];
  collectedData: CollectedCompanyData | null;
  error: string | null;
}

export function useDataCollection() {
  const [state, setState] = useState<DataCollectionState>({
    isCollecting: false,
    isComplete: false,
    hasError: false,
    progress: 0,
    notifications: [],
    collectedData: null,
    error: null
  });

  const abortControllerRef = useRef<AbortController>();
  const notificationsRef = useRef<DataCollectionNotification[]>([]);

  // Mise à jour des notifications avec animations
  const addNotification = useCallback((notification: DataCollectionNotification) => {
    notificationsRef.current = [...notificationsRef.current, notification];
    
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, notification],
      progress: Math.round((notificationsRef.current.filter(n => n.status === 'success').length / 5) * 100)
    }));
  }, []);

  // Met à jour une notification existante
  const updateNotification = useCallback((notificationId: string, updates: Partial<DataCollectionNotification>) => {
    notificationsRef.current = notificationsRef.current.map(notification =>
      notification.id === notificationId
        ? { ...notification, ...updates, timestamp: Date.now() }
        : notification
    );
    
    setState(prev => ({
      ...prev,
      notifications: [...notificationsRef.current],
      progress: Math.round((notificationsRef.current.filter(n => n.status === 'success').length / 5) * 100)
    }));
  }, []);

  // Lance la collecte de données
  const startDataCollection = useCallback(async (siren: string) => {
    // Annule toute collecte en cours
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    notificationsRef.current = [];

    // Réinitialise l'état
    setState({
      isCollecting: true,
      isComplete: false,
      hasError: false,
      progress: 0,
      notifications: [],
      collectedData: null,
      error: null
    });

    try {
      // Lance la collecte avec callback de progression
      const collectedData = await collectCompanyData(siren, (notification) => {
        // Vérifie si ce n'est pas annulé
        if (abortControllerRef.current?.signal.aborted) {
          return;
        }

        // Trouve la notification existante ou crée une nouvelle
        const existingNotification = notificationsRef.current.find(n => n.id === notification.id);
        
        if (existingNotification) {
          updateNotification(notification.id, notification);
        } else {
          addNotification(notification);
        }
      });

      // Finalise la collecte si pas annulée
      if (!abortControllerRef.current?.signal.aborted) {
        setState(prev => ({
          ...prev,
          isCollecting: false,
          isComplete: true,
          progress: 100,
          collectedData
        }));
      }

    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          isCollecting: false,
          hasError: true,
          error: error.message
        }));
      }
    }
  }, [addNotification, updateNotification]);

  // Annule la collecte en cours
  const cancelDataCollection = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setState(prev => ({
      ...prev,
      isCollecting: false,
      error: 'Collecte annulée par l\'utilisateur'
    }));
  }, []);

  // Remet à zéro l'état
  const resetDataCollection = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    notificationsRef.current = [];
    
    setState({
      isCollecting: false,
      isComplete: false,
      hasError: false,
      progress: 0,
      notifications: [],
      collectedData: null,
      error: null
    });
  }, []);

  // Relance la collecte en cas d'erreur
  const retryDataCollection = useCallback((siren: string) => {
    resetDataCollection();
    // Petit délai pour laisser l'état se réinitialiser
    setTimeout(() => {
      startDataCollection(siren);
    }, 100);
  }, [resetDataCollection, startDataCollection]);

  // Efface les erreurs
  const clearError = useCallback(() => {
    setState(prev => ({
      ...prev,
      error: null,
      hasError: false
    }));
  }, []);

  // Marque une notification comme lue/vue
  const markNotificationAsRead = useCallback((notificationId: string) => {
    updateNotification(notificationId, { 
      timestamp: Date.now() 
    });
  }, [updateNotification]);

  // Récupère les statistiques de collecte
  const getCollectionStats = useCallback(() => {
    if (!state.collectedData) {
      return null;
    }

    return {
      completion_rate: state.collectedData.collection_summary.completion_rate,
      total_documents: state.collectedData.documents_count.total_documents,
      data_sources_count: Object.values(state.collectedData.data_sources).filter(Boolean).length,
      collection_time: state.notifications.length > 0 
        ? Math.round((Date.now() - state.notifications[0].timestamp) / 1000)
        : 0
    };
  }, [state.collectedData, state.notifications]);

  // Récupère les notifications par statut
  const getNotificationsByStatus = useCallback((status: DataCollectionNotification['status']) => {
    return state.notifications.filter(n => n.status === status);
  }, [state.notifications]);

  // Vérifie si toutes les étapes sont terminées
  const isAllStepsComplete = useCallback(() => {
    const requiredSteps = ['insee', 'pappers', 'documents', 'comptes', 'finalization'];
    const completedSteps = state.notifications
      .filter(n => n.status === 'success')
      .map(n => n.id);
    
    return requiredSteps.every(step => completedSteps.includes(step));
  }, [state.notifications]);

  return {
    // État principal
    state,

    // Actions de collecte
    startDataCollection,
    cancelDataCollection,
    resetDataCollection,
    retryDataCollection,
    clearError,

    // Actions sur les notifications
    markNotificationAsRead,
    
    // Utilitaires et stats
    getCollectionStats,
    getNotificationsByStatus,
    isAllStepsComplete
  };
}