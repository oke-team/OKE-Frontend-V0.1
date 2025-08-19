'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import './styles/onboarding-glass.css';

// Hooks et utilitaires
import { useOnboardingFlow } from './hooks/useOnboardingFlow';

// Animations
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
} from './animations/stepTransitions';

// Composants UI
import StepIndicator from './ui/StepIndicator';

// Étapes
import PersonalInfoStepV2 from './steps/PersonalInfoStepV2';
import CountrySelectionStepV2 from './steps/CountrySelectionStepV2';
import CompanySearchStepV2 from './steps/CompanySearchStepV2';
import DataCollectionStepV2 from './steps/DataCollectionStepV2';
import LogoFinalizationStepV2 from './steps/LogoFinalizationStepV2';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onSuccess
}: OnboardingModalProps) {
  const router = useRouter();
  const {
    currentStep,
    stepsConfig,
    progress,
    formState,
    canProceed,
    canGoBack,
    nextStep,
    previousStep,
    updateFormData,
    completeOnboarding,
    cancelOnboarding,
    error,
    clearError
  } = useOnboardingFlow();

  const [direction, setDirection] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLandscape, setIsLandscape] = React.useState(false);
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Détection des différents types d'écrans
  React.useEffect(() => {
    const checkScreenTypes = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(isMobileDevice());
      setIsLandscape(width > height && height < 600); // Mobile paysage
      setIsSmallScreen(width < 375 || height < 600); // Très petits écrans
    };
    
    checkScreenTypes();
    window.addEventListener('resize', checkScreenTypes);
    window.addEventListener('orientationchange', checkScreenTypes);
    
    return () => {
      window.removeEventListener('resize', checkScreenTypes);
      window.removeEventListener('orientationchange', checkScreenTypes);
    };
  }, []);

  // Gestion de la navigation avec direction pour l'animation
  const handleNext = () => {
    setDirection(1);
    nextStep();
  };

  const handlePrevious = () => {
    setDirection(-1);
    previousStep();
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
    if (isRightSwipe && canGoBack) {
      handlePrevious();
    }

    // Reset
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Gestion de la fermeture
  const handleClose = () => {
    if (progress.isComplete) {
      onClose();
    } else {
      // Confirmation avant fermeture si en cours
      if (confirm('Êtes-vous sûr de vouloir annuler la création de votre compte ?')) {
        cancelOnboarding();
        onClose();
      }
    }
  };

  // Finalisation et redirection
  const handleComplete = () => {
    completeOnboarding();
    onSuccess?.();
    router.push('/dashboard');
    onClose();
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
          if (canGoBack && e.altKey) {
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
  }, [isOpen, canGoBack, canProceed]);

  // Rendu conditionnel des étapes
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoStepV2
            data={formState.personalInfo || {
              prenom: '',
              nom: '',
              email: '',
              password: '',
              telephone: ''
            }}
            onUpdate={(data) => updateFormData('personal_info', data)}
            onNext={handleNext}
            canProceed={canProceed()}
          />
        );

      case 1:
        return (
          <CountrySelectionStepV2
            selectedCountry={formState.country || { code: 'FR', name: 'France', flag: '🇫🇷' }}
            onCountrySelect={(country) => updateFormData('country', country)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      case 2:
        return (
          <CompanySearchStepV2
            selectedCompany={formState.company}
            onCompanySelect={(company) => updateFormData('company', company)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      case 3:
        return (
          <DataCollectionStepV2
            selectedCompany={formState.company}
            collectedData={formState.collectedData}
            onDataCollected={(data) => updateFormData('collected_data', data)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack()}
          />
        );

      case 4:
        return (
          <LogoFinalizationStepV2
            selectedCompany={formState.company}
            brandingData={formState.branding}
            onBrandingUpdate={(data) => updateFormData('branding', data)}
            onComplete={handleComplete}
            onPrevious={handlePrevious}
            canProceed={canProceed()}
            canGoBack={canGoBack}
          />
        );

      default:
        return null;
    }
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
              ? 'h-full max-h-screen border-0 rounded-none' // Mode paysage : plein écran
              : isSmallScreen
                ? 'h-full max-h-screen border-0 rounded-none' // Très petit écran : plein écran
                : 'h-screen sm:h-[90vh] md:h-[85vh] lg:h-auto sm:max-w-5xl sm:max-h-[85vh] sm:rounded-2xl' // Meilleur support tablette
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
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Créez votre compte
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">
                  <span className="hidden sm:inline">Étape {progress.current} sur {progress.total} • </span>
                  <span className="text-[#4C34CE] font-semibold">{progress.percentage}%</span> terminé
                </p>
              </div>
            </div>

            {/* Actions header */}
            <div className="flex items-center space-x-2">
              {/* Bouton retour avec effet Glass */}
              {canGoBack && (
                <motion.button
                  onClick={handlePrevious}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Étape précédente (Alt + ←)"
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
              )}

              {/* Bouton suivant avec effet Glass */}
              {canProceed() && currentStep < 4 && (
                <motion.button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-xl bg-[#FAA016] hover:bg-[#FAA016]/90 border border-[#FAA016] flex items-center justify-center text-white transition-all duration-200 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Étape suivante (Alt + →)"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}

              {/* Bouton fermer avec effet Glass */}
              <motion.button
                onClick={handleClose}
                className="w-10 h-10 rounded-xl bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 flex items-center justify-center text-gray-600 hover:text-red-600 transition-all duration-200 shadow-sm group"
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                title="Fermer (Escape)"
              >
                <X className="w-5 h-5 transition-transform duration-300" />
              </motion.button>
            </div>
          </motion.div>

          {/* Contenu principal */}
          <div className={`flex flex-col lg:flex-row flex-1 overflow-hidden
            ${isLandscape 
              ? 'h-[calc(100vh-100px)]' // Mode paysage : header plus compact
              : isSmallScreen
                ? 'h-[calc(100vh-120px)]' // Petit écran : optimisé
                : 'h-full sm:h-[calc(100vh-140px)] md:h-[600px]' // Normal avec meilleur support tablette
            }
          `}>
            {/* Sidebar gauche avec indicateur d'étapes - Desktop uniquement */}
            <motion.div
              variants={modalChildVariants}
              className="hidden lg:block w-80 p-6 border-r border-gray-100 bg-gray-50 flex-shrink-0"
            >
              <StepIndicator
                steps={stepsConfig}
                currentStep={currentStep}
              />
            </motion.div>

            {/* Contenu principal avec animation de slide */}
            <div className="flex-1 relative overflow-hidden min-h-0">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={String(currentStep)}
                  custom={direction}
                  variants={stepSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={isMobile ? mobileStepTransition : stepTransition}
                  className="h-full overflow-y-auto overscroll-contain onboarding-content onboarding-scroll onboarding-scrollbar-hide"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div className="p-4 sm:p-6 md:p-8 lg:p-12 pb-24">
                    {/* Indicateur mobile */}
                    <div className={`lg:hidden
                      ${isLandscape ? 'mb-3' : isSmallScreen ? 'mb-4' : 'mb-6'}
                    `}>
                      <StepIndicator
                        steps={stepsConfig}
                        currentStep={currentStep}
                        isMobile={true}
                        isCompact={isLandscape || isSmallScreen}
                      />
                    </div>

                    {/* Contenu de l'étape */}
                    <motion.div
                      variants={modalChildVariants}
                    >
                      {renderStep()}
                    </motion.div>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer avec indicateur de sécurité */}
          <motion.div
            variants={modalChildVariants}
            className="hidden lg:flex items-center justify-end p-4 border-t border-gray-100 bg-white"
          >
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Données sécurisées • Conforme RGPD</span>
            </div>
          </motion.div>

          {/* Gestion d'erreurs globales */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-4 left-4 right-4 p-4 bg-red-50 border border-red-200 rounded-xl shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-red-600 mb-1">Erreur</h4>
                    <p className="text-red-500 text-sm">{error}</p>
                  </div>
                  <motion.button
                    onClick={clearError}
                    className="ml-3 text-red-500 hover:text-red-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}