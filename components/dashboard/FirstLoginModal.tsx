'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, Sparkles, ChevronRight, Info } from 'lucide-react';
import CompanySearchStepV2 from '@/components/onboarding/steps/CompanySearchStepV2';
import { useAuth } from '@/contexts/AuthContext';
import { entrepriseService } from '@/lib/services/api/entreprise.service';

interface FirstLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface Company {
  id: string;
  name: string;
  siren: string;
  siret?: string;
  address: string;
  city: string;
  postalCode: string;
  department: string;
  activity: string;
  nafCode: string;
  nafLabel: string;
  employees: string;
  revenue?: string;
  creationDate: string;
  legalForm: string;
  isActive: boolean;
}

export default function FirstLoginModal({ isOpen, onClose, onComplete }: FirstLoginModalProps) {
  const { user, updateUser } = useAuth();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);

  // Animations
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.3 }
    }
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleComplete = async () => {
    if (!selectedCompany) return;

    setLoading(true);
    setError(null);

    try {
      // Sauvegarder l'entreprise sélectionnée dans le profil utilisateur
      // Ici on pourrait faire un appel API pour associer l'entreprise à l'utilisateur
      
      // Pour l'instant, on stocke juste dans le localStorage
      if (typeof window !== 'undefined') {
        const userData = {
          ...user,
          company: selectedCompany,
          hasCompletedFirstLogin: true
        };
        localStorage.setItem('user_company', JSON.stringify(selectedCompany));
        localStorage.setItem('first_login_completed', 'true');
        
        // Mettre à jour le contexte utilisateur si possible
        if (updateUser) {
          updateUser(userData);
        }
      }

      // Fermer le modal et marquer comme complété
      onComplete();
      onClose();
    } catch (err) {
      setError('Erreur lors de l\'enregistrement de l\'entreprise');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    // Permettre à l'utilisateur de passer cette étape
    if (typeof window !== 'undefined') {
      localStorage.setItem('first_login_skipped', 'true');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleSkip();
          }
        }}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C34CE] to-[#6B46C1] rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {showWelcome ? 'Bienvenue sur OKÉ !' : 'Configurez votre entreprise'}
                </h2>
                <p className="text-sm text-gray-600">
                  {showWelcome 
                    ? 'Finalisez votre profil en ajoutant votre entreprise'
                    : 'Recherchez et sélectionnez votre entreprise'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {showWelcome ? (
              // Écran de bienvenue
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#4C34CE] to-[#FAA016] rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-12 h-12 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Félicitations {user?.firstName || ''} !
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Votre compte a été créé avec succès. Pour commencer, nous avons besoin 
                  de quelques informations sur votre entreprise.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 max-w-md mx-auto">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-sm text-blue-900 font-medium mb-1">
                        Pourquoi cette étape ?
                      </p>
                      <p className="text-sm text-blue-700">
                        Les informations de votre entreprise nous permettent de personnaliser 
                        votre expérience et d'adapter les fonctionnalités à vos besoins.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowWelcome(false)}
                  className="px-6 py-3 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] transition-colors inline-flex items-center gap-2"
                >
                  Continuer
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              // Recherche d'entreprise
              <div>
                <CompanySearchStepV2
                  selectedCompany={selectedCompany}
                  onCompanySelect={handleCompanySelect}
                  onNext={handleComplete}
                  canProceed={!!selectedCompany}
                />
              </div>
            )}
          </div>

          {/* Footer avec actions */}
          {!showWelcome && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={handleSkip}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Passer cette étape
              </button>
              
              <div className="flex gap-3">
                {selectedCompany && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={handleComplete}
                    disabled={loading}
                    className="px-6 py-2.5 bg-[#4C34CE] text-white rounded-xl font-medium hover:bg-[#3A28B8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        Valider et continuer
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          )}

          {/* Affichage des erreurs */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-20 left-6 right-6 p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-800">{error}</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}