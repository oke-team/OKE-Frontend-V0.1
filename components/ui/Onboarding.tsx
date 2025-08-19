'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Shield, Sparkles, Zap, Check } from 'lucide-react';
import { useExpertMode } from '@/contexts/ExpertModeContext';

const onboardingSteps = [
  {
    title: "Bienvenue dans Oké",
    subtitle: "Découvrez les deux modes d'utilisation",
    icon: <Sparkles className="w-8 h-8" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Oké s'adapte à votre niveau d'expertise avec deux modes d'interface distincts.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">Mode Entrepreneur</h4>
            <p className="text-sm text-blue-700">
              Interface épurée et guidée pour les entrepreneurs
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
            <h4 className="font-semibold text-purple-900 mb-2">Mode Expert</h4>
            <p className="text-sm text-purple-700">
              Accès complet aux fonctionnalités avancées
            </p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Mode Entrepreneur",
    subtitle: "Pour une gestion simplifiée",
    icon: <Zap className="w-8 h-8 text-primary" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Terminologie simplifiée</p>
              <p className="text-sm text-gray-600">
                Les termes techniques sont traduits en langage courant
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Guidance contextuelle</p>
              <p className="text-sm text-gray-600">
                Des explications et conseils à chaque étape
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Actions assistées</p>
              <p className="text-sm text-gray-600">
                L'IA vous accompagne dans vos tâches quotidiennes
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Mode Expert",
    subtitle: "Pour les utilisateurs expérimentés",
    icon: <Shield className="w-8 h-8 text-secondary" />,
    content: (
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Terminologie professionnelle</p>
              <p className="text-sm text-gray-600">
                Tous les termes techniques et codes comptables
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Fonctionnalités avancées</p>
              <p className="text-sm text-gray-600">
                Accès aux paramètres backoffice et configurations
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Vue détaillée</p>
              <p className="text-sm text-gray-600">
                Toutes les données et options disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Basculer entre les modes",
    subtitle: "Changez de mode à tout moment",
    icon: <Sparkles className="w-8 h-8 text-gradient" />,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          Vous pouvez basculer entre les modes à tout moment via le bouton dans la barre de navigation.
        </p>
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm">
              <div className="w-9 h-5 bg-gray-300 rounded-full relative">
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Mode Entrepreneur</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div className="flex items-center gap-2 px-4 py-2 bg-primary bg-opacity-10 rounded-lg shadow-sm border-2 border-primary">
              <div className="w-9 h-5 bg-primary rounded-full relative">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Mode Expert</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Astuce : Utilisez le raccourci clavier <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">E</kbd> pour basculer rapidement
        </p>
      </div>
    )
  }
];

export default function Onboarding() {
  const { 
    showOnboarding, 
    onboardingStep, 
    nextOnboardingStep, 
    completeOnboarding,
    setExpertMode
  } = useExpertMode();

  // Gestion du raccourci clavier
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const currentMode = localStorage.getItem('expertMode') === 'true';
        setExpertMode(!currentMode);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setExpertMode]);

  const currentStep = onboardingSteps[onboardingStep];
  const isLastStep = onboardingStep === onboardingSteps.length - 1;

  return (
    <AnimatePresence>
      {showOnboarding && (
        <>
          {/* Overlay avec effet Liquid Glass */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/10 backdrop-blur-md z-50"
            onClick={completeOnboarding}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-br from-primary to-purple-600 p-6 text-white">
                <button
                  onClick={completeOnboarding}
                  className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-4">
                  <motion.div
                    key={onboardingStep}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="p-3 bg-white bg-opacity-20 rounded-xl"
                  >
                    {currentStep.icon}
                  </motion.div>
                  <div>
                    <motion.h3
                      key={`title-${onboardingStep}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xl font-bold"
                    >
                      {currentStep.title}
                    </motion.h3>
                    <motion.p
                      key={`subtitle-${onboardingStep}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-white text-opacity-90 text-sm"
                    >
                      {currentStep.subtitle}
                    </motion.p>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <motion.div
                key={`content-${onboardingStep}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                {currentStep.content}
              </motion.div>
              
              {/* Footer */}
              <div className="px-6 pb-6">
                {/* Progress dots */}
                <div className="flex justify-center gap-2 mb-4">
                  {onboardingSteps.map((_, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        width: index === onboardingStep ? 24 : 8,
                        backgroundColor: index === onboardingStep 
                          ? 'rgb(94, 114, 255)' 
                          : index < onboardingStep 
                            ? 'rgb(94, 114, 255, 0.5)' 
                            : 'rgb(229, 229, 229)'
                      }}
                      className="h-2 rounded-full transition-all duration-300"
                    />
                  ))}
                </div>
                
                {/* Actions */}
                <div className="flex justify-between items-center">
                  <button
                    onClick={completeOnboarding}
                    className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
                  >
                    Passer le tutoriel
                  </button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isLastStep ? completeOnboarding : nextOnboardingStep}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2"
                  >
                    {isLastStep ? (
                      <>
                        Commencer
                        <Check className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}