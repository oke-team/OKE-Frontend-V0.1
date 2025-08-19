'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, ArrowRight, RefreshCw, CheckCircle2, TrendingUp } from 'lucide-react';
import { contentFadeVariants, notificationSlideVariants } from '../animations/stepTransitions';
import { useDataCollection } from '../hooks/useDataCollection';
import ProgressNotification from '../ui/ProgressNotification';

interface DataCollectionStepProps {
  selectedCompany: {
    siren: string;
    nom_entreprise: string;
    adresse_complete: string;
  } | null;
  collectedData: {
    completed: boolean;
    data_count: number;
    documents_count: number;
  } | null;
  onDataCollected: (data: {
    completed: boolean;
    data_count: number;
    documents_count: number;
  }) => void;
  onNext: () => void;
  canProceed: boolean;
}

export default function DataCollectionStep({
  selectedCompany,
  collectedData,
  onDataCollected,
  onNext,
  canProceed
}: DataCollectionStepProps) {
  const {
    state,
    startDataCollection,
    retryDataCollection,
    resetDataCollection
  } = useDataCollection();

  const [showSummary, setShowSummary] = useState(false);
  const [stats, setStats] = useState<{
    completion_rate: number;
    total_documents: number;
    data_sources_count: number;
    collection_time: number;
  } | null>(null);

  // Lance automatiquement la collecte au chargement si pas déjà fait
  useEffect(() => {
    if (selectedCompany && !collectedData?.completed && !state.isCollecting && !state.isComplete) {
      setTimeout(() => {
        startDataCollection(selectedCompany.siren);
      }, 1000); // Délai pour effet dramatique
    }
  }, [selectedCompany, collectedData, state.isCollecting, state.isComplete, startDataCollection]);

  // Met à jour les données parent quand la collecte est terminée
  useEffect(() => {
    if (state.isComplete && state.collectedData) {
      const summary = state.collectedData.collection_summary;
      const docs = state.collectedData.documents_count;
      
      onDataCollected({
        completed: true,
        data_count: summary.filled_fields,
        documents_count: docs.total_documents
      });

      setStats({
        completion_rate: summary.completion_rate,
        total_documents: docs.total_documents,
        data_sources_count: Object.values(state.collectedData.data_sources).filter(Boolean).length,
        collection_time: Math.round((Date.now() - (state.notifications[0]?.timestamp || Date.now())) / 1000)
      });

      // Affiche le résumé après un petit délai
      setTimeout(() => {
        setShowSummary(true);
      }, 1000);
    }
  }, [state.isComplete, state.collectedData, onDataCollected]);

  const handleRetry = () => {
    if (selectedCompany) {
      setShowSummary(false);
      setStats(null);
      retryDataCollection(selectedCompany.siren);
    }
  };

  const handleContinue = () => {
    if (canProceed) {
      onNext();
    }
  };

  // Si déjà collecté (retour sur l'étape)
  if (collectedData?.completed && !state.isCollecting) {
    return (
      <motion.div
        variants={contentFadeVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl mx-auto space-y-8"
      >
        <motion.div
          variants={contentFadeVariants}
          className="text-center space-y-4"
        >
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Données déjà collectées ✨</h2>
          <p className="text-neutral-300">
            Les informations de <strong>{selectedCompany?.nom_entreprise}</strong> sont déjà dans votre compte.
          </p>
          
          {/* Résumé rapide */}
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 sm:p-6 max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">{collectedData.data_count}</div>
                <div className="text-xs sm:text-sm text-neutral-400">Champs collectés</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">{collectedData.documents_count}</div>
                <div className="text-xs sm:text-sm text-neutral-400">Documents</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={contentFadeVariants}
          className="flex justify-end"
        >
          <motion.button
            onClick={handleContinue}
            className="px-8 h-12 rounded-xl font-medium bg-primary hover:bg-primary-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Continuer</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={contentFadeVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center space-y-4"
      >
        <motion.div
          className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={state.isCollecting ? { 
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          } : {}}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity, ease: "linear" }
          }}
        >
          <Database className="w-8 h-8 text-primary-400" />
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {state.isCollecting ? 'Collecte des données en cours...' : 
             state.isComplete ? 'Collecte terminée !' :
             state.hasError ? 'Erreur lors de la collecte' :
             'Préparation de la collecte'}
          </h2>
          <p className="text-neutral-300">
            {selectedCompany ? (
              <>Récupération des données pour <strong>{selectedCompany.nom_entreprise}</strong></>
            ) : (
              'Collecte des informations de votre entreprise'
            )}
          </p>
        </div>

        {state.isCollecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-400"
          >
            <span className="whitespace-nowrap">📊 Données officielles</span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">📄 Documents légaux</span>
            <span className="hidden sm:inline">•</span>
            <span className="whitespace-nowrap">💰 Informations financières</span>
          </motion.div>
        )}
      </motion.div>

      {/* Barre de progression globale */}
      {(state.isCollecting || state.isComplete) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex justify-between text-sm text-neutral-400">
            <span>Progression globale</span>
            <span>{state.progress}%</span>
          </div>
          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-green-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${state.progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}

      {/* Liste des notifications de progression */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {state.notifications.map((notification, index) => (
            <motion.div
              key={String(notification.id)}
              variants={notificationSlideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={index}
              layout
            >
              <ProgressNotification
                id={notification.id}
                message={notification.message}
                details={notification.details}
                status={notification.status}
                timestamp={notification.timestamp}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Résumé final avec effet waow */}
      <AnimatePresence>
        {showSummary && stats && state.isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-gradient-to-r from-green-500/10 to-primary/10 border border-green-400/30 rounded-2xl p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 25 }}
              className="text-center mb-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Collecte réussie ! 🎉
              </h3>
              <p className="text-sm sm:text-base text-neutral-300">
                Toutes les données de votre entreprise ont été récupérées avec succès.
              </p>
            </motion.div>

            {/* Statistiques impressionnantes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 mb-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
                  className="text-3xl font-bold text-green-400 mb-1"
                >
                  {stats.completion_rate}%
                </motion.div>
                <div className="text-sm text-neutral-400">Complétude</div>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300 }}
                  className="text-3xl font-bold text-primary-400 mb-1"
                >
                  {stats.total_documents}
                </motion.div>
                <div className="text-sm text-neutral-400">Documents</div>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 300 }}
                  className="text-3xl font-bold text-orange-400 mb-1"
                >
                  {stats.data_sources_count}
                </motion.div>
                <div className="text-sm text-neutral-400">Sources</div>
              </div>
              
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
                  className="text-3xl font-bold text-purple-400 mb-1"
                >
                  {stats.collection_time}s
                </motion.div>
                <div className="text-sm text-neutral-400">Durée</div>
              </div>
            </motion.div>

            {/* Messages de succès avec émojis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-2 text-sm text-neutral-300"
            >
              <div className="flex items-center space-x-2">
                <span>✅</span>
                <span>Informations légales et administratives récupérées</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📊</span>
                <span>Données financières et comptes annuels collectés</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📋</span>
                <span>Documents officiels (statuts, actes) téléchargés</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🎯</span>
                <span>Profil entreprise optimisé pour OKÉ</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gestion des erreurs */}
      <AnimatePresence>
        {state.hasError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="font-semibold text-red-400 mb-2">Erreur lors de la collecte</h3>
            <p className="text-red-300 text-sm mb-4">
              {state.error || 'Une erreur est survenue pendant la collecte des données.'}
            </p>
            <motion.button
              onClick={handleRetry}
              className="inline-flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Réessayer la collecte</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton continuer */}
      <motion.div
        variants={contentFadeVariants}
        className="flex justify-end pt-4"
      >
        <AnimatePresence>
          {canProceed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleContinue}
              className="px-8 h-12 rounded-xl font-medium bg-gradient-to-r from-primary to-green-500 hover:from-primary-400 hover:to-green-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Continuer vers la personnalisation</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Note rassurante */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center text-sm text-neutral-500 bg-neutral-900/30 rounded-lg p-4 border border-neutral-800/50"
      >
        <p>
          🔒 Toutes les données sont collectées de manière sécurisée et conforme au RGPD. 
          Nous utilisons uniquement des sources officielles et publiques.
        </p>
      </motion.div>
    </motion.div>
  );
}