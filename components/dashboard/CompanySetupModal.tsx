'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

// Import des animations depuis OnboardingModal
import { 
  modalVariants, 
  mobileModalVariants,
  backdropVariants, 
  modalChildVariants,
  stepSlideVariants,
  stepTransition,
  mobileStepTransition,
  getDeviceVariants,
  isMobileDevice 
} from '@/components/onboarding/animations/stepTransitions';

// Import des styles glass
import '@/components/onboarding/styles/onboarding-glass.css';

// Composants UI
import StepIndicator from '@/components/onboarding/ui/StepIndicator';

// Import des étapes
import CountrySelectionStepV2 from '@/components/onboarding/steps/CountrySelectionStepV2';
import CompanySearchStepV2 from '@/components/onboarding/steps/CompanySearchStepV2';
import DataCollectionStepV2 from '@/components/onboarding/steps/DataCollectionStepV2';
import LogoFinalizationStepV2 from '@/components/onboarding/steps/LogoFinalizationStepV2';

interface CompanySetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

interface StepConfig {
  id: number;
  title: string;
  subtitle: string;
  canSkip: boolean;
  isCompleted: boolean;
}

interface FormData {
  country: {
    code: string;
    name: string;
    flag: string;
  } | null;
  company: any | null;
  collectedData: any | null;
  branding: any | null;
}

const STEPS_CONFIG: Omit<StepConfig, 'isCompleted'>[] = [
  {
    id: 0,
    title: 'Pays de votre entreprise',
    subtitle: 'Sélectionnez votre pays',
    canSkip: false
  },
  {
    id: 1,
    title: 'Recherche d\'entreprise',
    subtitle: 'Trouvez votre entreprise',
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

export default function CompanySetupModal({
  isOpen,
  onClose,
  onComplete
}: CompanySetupModalProps) {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    country: { code: 'FR', name: 'France', flag: '🇫🇷' },
    company: null,
    collectedData: null,
    branding: null
  });
  
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Détection des différents types d'écrans
  useEffect(() => {
    const checkScreenTypes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(isMobileDevice());
      setIsLandscape(width > height && height < 600);
      setIsSmallScreen(width < 375 || height < 600);
    };
    
    checkScreenTypes();
    window.addEventListener('resize', checkScreenTypes);
    window.addEventListener('orientationchange', checkScreenTypes);
    
    return () => {
      window.removeEventListener('resize', checkScreenTypes);
      window.removeEventListener('orientationchange', checkScreenTypes);
    };
  }, []);

  // Configuration des étapes avec état de completion
  const stepsConfig: StepConfig[] = STEPS_CONFIG.map(step => ({
    ...step,
    isCompleted: currentStep > step.id
  }));

  // Navigation entre étapes
  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < STEPS_CONFIG.length) {
      setCurrentStep(stepIndex);
    }
  };

  const handleNext = () => {
    setDirection(1);
    const next = currentStep + 1;
    if (next < STEPS_CONFIG.length) {
      goToStep(next);
    }
  };

  const handlePrevious = () => {
    setDirection(-1);
    const prev = currentStep - 1;
    if (prev >= 0) {
      goToStep(prev);
    }
  };

  // Gestion des gestes tactiles pour la navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canProceed()) {
      handleNext();
    }
    if (isRightSwipe && canGoBack()) {
      handlePrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mise à jour des données
  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  // Validation d'étape
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: // Pays
        return Boolean(formData.country?.code);
      case 1: // Entreprise
        return Boolean(formData.company);
      case 2: // Collecte de données
        return Boolean(formData.collectedData?.completed);
      case 3: // Logo et finalisation
        return true; // Cette étape est optionnelle
      default:
        return false;
    }
  };

  // Peut passer à l'étape suivante
  const canProceed = (): boolean => {
    return validateCurrentStep() && currentStep < STEPS_CONFIG.length - 1;
  };

  // Peut revenir en arrière
  const canGoBack = (): boolean => {
    return currentStep > 0;
  };

  // Gestion de la fermeture
  const handleClose = () => {
    if (currentStep === STEPS_CONFIG.length - 1 || formData.company) {
      onClose();
    } else {
      // Confirmation avant fermeture si en cours
      if (confirm('Êtes-vous sûr de vouloir annuler la configuration de votre entreprise ?')) {
        onClose();
      }
    }
  };

  // Finalisation et redirection
  const handleComplete = async () => {
    setLoading(true);
    setError(null);

    try {
      // Sauvegarder les données de l'entreprise
      if (typeof window !== 'undefined') {
        const companyData = {
          country: formData.country,
          company: formData.company,
          collectedData: formData.collectedData,
          branding: formData.branding
        };
        
        localStorage.setItem('user_company', JSON.stringify(companyData));
        localStorage.setItem('company_setup_completed', 'true');
        
        // Mettre à jour le contexte utilisateur
        if (updateUser) {
          updateUser({
            company: companyData,
            hasCompletedCompanySetup: true
          });
        }
      }

      // Appeler le callback de completion
      onComplete?.();
      onClose();
    } catch (err) {
      setError('Erreur lors de l\'enregistrement');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          if (canGoBack() && e.altKey) {
            e.preventDefault();
            handlePrevious();
          }
          break;
        case 'ArrowRight':
          if (canProceed() && e.altKey) {
            e.preventDefault();
            handleNext();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStep]);

  // Rendu conditionnel des étapes
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CountrySelectionStepV2
            selectedCountry={formData.country || { code: 'FR', name: 'France', flag: '🇫🇷' }}
            onCountrySelect={(country) => updateFormData('country', country)}
            onNext={handleNext}
            canProceed={canProceed()}
          />
        );

      case 1:
        return (
          <CompanySearchStepV2
            selectedCompany={formData.company}
            onCompanySelect={(company) => updateFormData('company', company)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      case 2:
        return (
          <DataCollectionStepV2
            selectedCompany={formData.company}
            collectedData={formData.collectedData}
            onDataCollected={(data) => updateFormData('collectedData', data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      case 3:
        return (
          <LogoFinalizationStepV2
            selectedCompany={formData.company}
            brandingData={formData.branding}
            onBrandingUpdate={(data) => updateFormData('branding', data)}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      default:
        return null;
    }
  };

  // Statistiques de progression
  const progress = {
    current: currentStep + 1,
    total: STEPS_CONFIG.length,
    percentage: Math.round(((currentStep + 1) / STEPS_CONFIG.length) * 100)
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
        onClick={handleClose}
      >
        {/* Modal Container */}
        <motion.div
          variants={getDeviceVariants(modalVariants, mobileModalVariants)}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full flex flex-col onboarding-modal onboarding-orientation-transition
            ${isLandscape 
              ? 'h-full max-h-screen border-0 rounded-none'
              : isSmallScreen
                ? 'h-full max-h-screen border-0 rounded-none'
                : 'h-screen sm:h-[90vh] md:h-[85vh] lg:h-auto sm:max-w-5xl sm:max-h-[85vh] sm:rounded-2xl'
            }
            bg-white
            border-0
            shadow-2xl
            overflow-hidden
          `}
        >
          {/* Header avec effet Glass */}
          <motion.div
            variants={modalChildVariants}
            className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white"
          >
            <div className="flex items-center space-x-4">
              {/* Logo OKÉ avec effet Glow */}
              <motion.div 
                className="w-10 h-10 bg-[#4C34CE] rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Configuration de votre entreprise
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  {stepsConfig[currentStep].title}
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </motion.div>

          {/* Progress Bar */}
          <div className="relative h-1 bg-gray-200 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4C34CE] to-[#FAA016]"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <StepIndicator
              currentStep={currentStep}
              steps={stepsConfig}
              onStepClick={goToStep}
            />
          </div>

          {/* Content avec animations de transition */}
          <div
            className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={stepSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={isMobile ? mobileStepTransition : stepTransition}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer avec navigation (sur desktop uniquement) */}
          {!isSmallScreen && !isLandscape && (
            <motion.div
              variants={modalChildVariants}
              className="flex items-center justify-between p-4 sm:p-6 border-t border-gray-200 bg-gray-50"
            >
              <button
                onClick={handlePrevious}
                disabled={!canGoBack()}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  canGoBack()
                    ? 'text-gray-700 hover:bg-gray-200'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{progress.current}</span>
                <span>/</span>
                <span>{progress.total}</span>
              </div>

              <button
                onClick={currentStep === STEPS_CONFIG.length - 1 ? handleComplete : handleNext}
                disabled={!canProceed() && currentStep !== STEPS_CONFIG.length - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  canProceed() || currentStep === STEPS_CONFIG.length - 1
                    ? 'bg-[#4C34CE] text-white hover:bg-[#3A28B8]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {currentStep === STEPS_CONFIG.length - 1 ? 'Terminer' : 'Suivant'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Navigation mobile */}
          {(isSmallScreen || isLandscape) && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-4">
              <button
                onClick={handlePrevious}
                disabled={!canGoBack()}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  canGoBack()
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mx-auto" />
              </button>

              <div className="flex items-center gap-1">
                {STEPS_CONFIG.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentStep
                        ? 'w-6 bg-[#4C34CE]'
                        : index < currentStep
                        ? 'bg-[#4C34CE]/50'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={currentStep === STEPS_CONFIG.length - 1 ? handleComplete : handleNext}
                disabled={!canProceed() && currentStep !== STEPS_CONFIG.length - 1}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  canProceed() || currentStep === STEPS_CONFIG.length - 1
                    ? 'bg-[#4C34CE] text-white'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <ChevronRight className="w-5 h-5 mx-auto" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}