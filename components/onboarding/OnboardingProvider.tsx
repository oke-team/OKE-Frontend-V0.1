'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Play } from 'lucide-react';

import OnboardingModal from './OnboardingModal';
import OnboardingTrigger from './OnboardingTrigger';
import { useOnboardingModal } from './hooks/useOnboardingModal';

interface OnboardingProviderProps {
  children: React.ReactNode;
  autoPrompt?: boolean;
  showSessionNotification?: boolean;
}

export default function OnboardingProvider({
  children,
  autoPrompt = false,
  showSessionNotification = false
}: OnboardingProviderProps) {
  const {
    isOpen,
    hasActiveSession,
    openModal,
    closeModal,
    resumeSession
  } = useOnboardingModal();

  const [showNotification, setShowNotification] = useState(false);
  const [hasCheckedSession, setHasCheckedSession] = useState(false);

  // Vérification au chargement de la page
  useEffect(() => {
    if (!hasCheckedSession) {
      const hasSession = hasActiveSession();
      
      if (hasSession && showSessionNotification) {
        // Délai pour laisser la page se charger
        setTimeout(() => {
          setShowNotification(true);
        }, 2000);
      } else if (!hasSession && autoPrompt) {
        // Auto-prompt pour nouveaux utilisateurs (optionnel)
        // Peut être utilisé pour une landing page par exemple
        // setTimeout(() => {
        //   openModal();
        // }, 5000);
      }
      
      setHasCheckedSession(true);
    }
  }, [hasCheckedSession, hasActiveSession, showSessionNotification, autoPrompt]);

  const handleResumeSession = () => {
    setShowNotification(false);
    resumeSession();
  };

  const handleDismissNotification = () => {
    setShowNotification(false);
  };

  const handleSuccessfulCompletion = () => {
    setShowNotification(false);
    // Ici on pourrait déclencher d'autres actions
    // comme une notification de succès, analytics, etc.
  };

  return (
    <>
      {children}

      {/* Notification de session en cours */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-40 max-w-sm"
          >
            <div className="bg-gradient-to-r from-orange-500/90 to-primary/90 backdrop-blur-sm border border-orange-400/30 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      Inscription en cours
                    </h4>
                    <p className="text-white/80 text-xs">
                      Vous avez une création de compte non terminée
                    </p>
                  </div>
                </div>
                
                <motion.button
                  onClick={handleDismissNotification}
                  className="w-6 h-6 text-white/60 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="flex space-x-2">
                <motion.button
                  onClick={handleResumeSession}
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-4 h-4" />
                  <span>Reprendre</span>
                </motion.button>
                
                <motion.button
                  onClick={handleDismissNotification}
                  className="px-4 py-2 text-white/80 hover:text-white text-sm transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Plus tard
                </motion.button>
              </div>

              {/* Animation de pulsation */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-primary/20 rounded-2xl blur-lg -z-10"
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal d'onboarding */}
      <OnboardingModal
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={handleSuccessfulCompletion}
      />
    </>
  );
}

// Export des composants individuels pour usage externe
export { OnboardingTrigger };

// Hook pour usage externe
export { useOnboardingModal };