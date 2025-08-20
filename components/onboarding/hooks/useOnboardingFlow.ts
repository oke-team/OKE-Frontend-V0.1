/**
 * Hook principal pour gérer le flux d'onboarding
 */

import { useState, useCallback, useEffect } from 'react';
import { 
  OnboardingFormData, 
  OnboardingSession,
  createOnboardingSession,
  getOnboardingSession,
  updateCurrentStep,
  updatePersonalInfo,
  updateCountry,
  updateSelectedCompany,
  updateCollectedData,
  updateBranding,
  completeOnboardingSession,
  clearOnboardingSession
} from '@/lib/services/onboarding/onboardingStorage';

export interface OnboardingStepConfig {
  id: number;
  title: string;
  subtitle: string;
  canSkip: boolean;
  isCompleted: boolean;
}

const STEPS_CONFIG: Omit<OnboardingStepConfig, 'isCompleted'>[] = [
  {
    id: 0,
    title: 'Informations personnelles',
    subtitle: 'Créez votre compte utilisateur',
    canSkip: false
  },
  {
    id: 1,
    title: 'Pays de votre entreprise',
    subtitle: 'Sélectionnez votre pays',
    canSkip: false
  },
  {
    id: 2,
    title: 'Collecte des données',
    subtitle: 'Récupération des informations',
    canSkip: false
  },
  {
    id: 3,
    title: 'Logo et finalisation',
    subtitle: 'Personnalisez votre profil',
    canSkip: true
  }
];

export function useOnboardingFlow() {
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialisation de la session
  useEffect(() => {
    const existingSession = getOnboardingSession();
    
    // Vérifier si on a des données pré-remplies depuis l'AuthWidget
    const savedData = typeof window !== 'undefined' ? localStorage.getItem('onboardingData') : null;
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Créer une nouvelle session avec les données pré-remplies
      const newSession = createOnboardingSession();
      
      // Mettre à jour avec les données personnelles
      if (parsedData.personalInfo) {
        updatePersonalInfo(parsedData.personalInfo);
      }
      
      // Commencer directement à l'étape 2 (Pays) - index 1
      updateCurrentStep(1);
      setCurrentStep(1);
      
      // Nettoyer le localStorage
      localStorage.removeItem('onboardingData');
      
      const updatedSession = getOnboardingSession();
      setSession(updatedSession);
    } else if (existingSession) {
      setSession(existingSession);
      setCurrentStep(existingSession.current_step);
    } else {
      const newSession = createOnboardingSession();
      setSession(newSession);
      setCurrentStep(0);
    }
  }, []);

  // Configuration des étapes avec état de completion
  const stepsConfig: OnboardingStepConfig[] = STEPS_CONFIG.map(step => ({
    ...step,
    isCompleted: currentStep > step.id
  }));

  // Navigation entre étapes
  const goToStep = useCallback((stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < STEPS_CONFIG.length) {
      setCurrentStep(stepIndex);
      updateCurrentStep(stepIndex);
      
      // Met à jour la session locale
      if (session) {
        const updatedSession = { ...session, current_step: stepIndex };
        setSession(updatedSession);
      }
    }
  }, [session]);

  const nextStep = useCallback(() => {
    const next = currentStep + 1;
    if (next < STEPS_CONFIG.length) {
      goToStep(next);
    }
  }, [currentStep, goToStep]);

  const previousStep = useCallback(() => {
    const prev = currentStep - 1;
    if (prev >= 0) {
      goToStep(prev);
    }
  }, [currentStep, goToStep]);

  // Mise à jour des données de formulaire
  const updateFormData = useCallback((
    section: keyof OnboardingFormData,
    data: any
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      switch (section) {
        case 'personal_info':
          updatePersonalInfo(data);
          break;
        case 'country':
          updateCountry(data);
          break;
        case 'company':
          updateSelectedCompany(data);
          break;
        case 'collected_data':
          updateCollectedData(data);
          break;
        case 'branding':
          updateBranding(data);
          break;
      }
      
      // Recharge la session mise à jour
      const updatedSession = getOnboardingSession();
      if (updatedSession) {
        setSession(updatedSession);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validation d'étape
  const validateCurrentStep = useCallback((): boolean => {
    if (!session) return false;

    switch (currentStep) {
      case 0: // Informations personnelles
        const { prenom, nom, email, password } = session.form_data.personal_info;
        return Boolean(prenom.trim() && nom.trim() && email.trim() && password.trim());

      case 1: // Pays
        return Boolean(session.form_data.country.code);

      case 2: // Collecte de données
        return Boolean(session.form_data.collected_data?.completed);

      case 3: // Logo et finalisation
        return true; // Cette étape est optionnelle

      default:
        return false;
    }
  }, [session, currentStep]);

  // Peut passer à l'étape suivante
  const canProceed = useCallback((): boolean => {
    return validateCurrentStep() && currentStep < STEPS_CONFIG.length - 1;
  }, [validateCurrentStep, currentStep]);

  // Peut revenir en arrière
  const canGoBack = useCallback((): boolean => {
    return currentStep > 0;
  }, [currentStep]);

  // Finalisation du processus
  const completeOnboarding = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      completeOnboardingSession();
      
      // Met à jour l'état local
      if (session) {
        const completedSession = { ...session, completed: true };
        setSession(completedSession);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la finalisation');
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  // Abandon du processus
  const cancelOnboarding = useCallback(() => {
    clearOnboardingSession();
    setSession(null);
    setCurrentStep(0);
    setError(null);
  }, []);

  // Redémarrage du processus
  const restartOnboarding = useCallback(() => {
    clearOnboardingSession();
    const newSession = createOnboardingSession();
    setSession(newSession);
    setCurrentStep(0);
    setError(null);
  }, []);

  // Gestion d'erreurs
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Statistiques de progression
  const progress = {
    current: currentStep + 1,
    total: STEPS_CONFIG.length,
    percentage: Math.round(((currentStep + 1) / STEPS_CONFIG.length) * 100),
    isComplete: session?.completed || false
  };

  // État du formulaire par section
  const formState = {
    personalInfo: session?.form_data.personal_info || null,
    country: session?.form_data.country || null,
    company: session?.form_data.company || null,
    collectedData: session?.form_data.collected_data || null,
    branding: session?.form_data.branding || null
  };

  return {
    // État
    session,
    currentStep,
    stepsConfig,
    isLoading,
    error,
    progress,
    formState,

    // Actions de navigation
    goToStep,
    nextStep,
    previousStep,
    canProceed,
    canGoBack,

    // Actions de données
    updateFormData,
    validateCurrentStep,

    // Actions de session
    completeOnboarding,
    cancelOnboarding,
    restartOnboarding,
    clearError
  };
}