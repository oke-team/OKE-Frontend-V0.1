'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { contentFadeVariants } from '../animations/stepTransitions';
import { useCompanySearch } from '../hooks/useCompanySearch';
import CompanySearchInput from '../ui/CompanySearchInput';
import FrenchCompanyCard from '../ui/FrenchCompanyCard';

interface CompanySearchStepProps {
  selectedCompany: {
    siren: string;
    nom_entreprise: string;
    adresse_complete: string;
    selected: boolean;
  } | null;
  onCompanySelect: (company: {
    siren: string;
    nom_entreprise: string;
    adresse_complete: string;
    selected: boolean;
  }) => void;
  onNext: () => void;
  canProceed: boolean;
}

export default function CompanySearchStep({
  selectedCompany,
  onCompanySelect,
  onNext,
  canProceed
}: CompanySearchStepProps) {
  const [hasSearched, setHasSearched] = useState(false);
  
  const {
    query,
    results,
    isLoading,
    error,
    selectedCompany: searchSelectedCompany,
    filters,
    searchType,
    searchStats,
    updateQuery,
    updateFilters,
    selectCompany,
    clearSelection,
    clearError
  } = useCompanySearch({
    minSearchLength: 3,
    debounceDelay: 300,
    maxResults: 10
  });

  // Met à jour l'état global quand une entreprise est sélectionnée localement
  useEffect(() => {
    if (searchSelectedCompany) {
      onCompanySelect({
        siren: searchSelectedCompany.siren,
        nom_entreprise: searchSelectedCompany.nom_entreprise,
        adresse_complete: searchSelectedCompany.adresse_complete,
        selected: true
      });
    }
  }, [searchSelectedCompany, onCompanySelect]);

  // Marque comme ayant effectué une recherche
  useEffect(() => {
    if (query.length >= 3 || results.length > 0) {
      setHasSearched(true);
    }
  }, [query, results.length]);

  const handleClearSelection = () => {
    clearSelection();
    onCompanySelect({
      siren: '',
      nom_entreprise: '',
      adresse_complete: '',
      selected: false
    });
  };

  const handleContinue = () => {
    if (canProceed) {
      onNext();
    }
  };

  const handleRetry = () => {
    clearError();
    if (query) {
      // Relance la dernière recherche
      updateQuery(query + ' '); // Force un update
      setTimeout(() => updateQuery(query), 100);
    }
  };

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
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-primary-400" />
        </div>
        <p className="text-neutral-300 text-lg">
          Recherchez votre entreprise dans les registres officiels français.
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-neutral-500">
          <span>📋 Base SIRENE (INSEE)</span>
          <span>•</span>
          <span>🔍 Recherche intelligente</span>
          <span>•</span>
          <span>⚡ Résultats en temps réel</span>
        </div>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        variants={contentFadeVariants}
        className="space-y-4"
      >
        <CompanySearchInput
          value={query}
          onChange={updateQuery}
          results={results}
          isLoading={isLoading}
          onSelectCompany={selectCompany}
          placeholder="Recherchez par nom d'entreprise ou SIREN (9 chiffres)..."
          filters={filters}
          onFiltersChange={updateFilters}
          searchType={searchType}
          error={error}
        />

        {/* Aide contextuelle selon le type de recherche */}
        <AnimatePresence>
          {query.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800 text-sm"
            >
              {searchType === 'siren' ? (
                <div className="space-y-2">
                  <h4 className="font-medium text-white">💡 Recherche par SIREN</h4>
                  <ul className="text-neutral-400 space-y-1 ml-4">
                    <li>• Format attendu : 9 chiffres (ex: 552100554)</li>
                    <li>• Le SIREN identifie uniquement votre entreprise</li>
                    <li>• Vous le trouverez sur vos documents officiels</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="font-medium text-white">🔍 Recherche par nom</h4>
                  <ul className="text-neutral-400 space-y-1 ml-4">
                    <li>• Minimum 3 caractères pour commencer la recherche</li>
                    <li>• Utilisez les filtres pour affiner les résultats</li>
                    <li>• La recherche inclut les dénominations sociales</li>
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Entreprise sélectionnée */}
      <AnimatePresence>
        {selectedCompany?.selected && searchSelectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Entreprise sélectionnée</h3>
              <motion.button
                onClick={handleClearSelection}
                className="text-sm text-neutral-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Modifier la sélection
              </motion.button>
            </div>
            
            <FrenchCompanyCard
              company={{
                siren: searchSelectedCompany.siren,
                nom_entreprise: searchSelectedCompany.nom_entreprise,
                adresse_complete: searchSelectedCompany.adresse_complete,
                code_naf: searchSelectedCompany.code_naf,
                libelle_code_naf: searchSelectedCompany.libelle_code_naf,
                effectif: searchSelectedCompany.effectif,
                statut: searchSelectedCompany.statut
              }}
              isSelected={true}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages d'état */}
      <AnimatePresence>
        {!selectedCompany?.selected && hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {isLoading && (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-2 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-neutral-400">Recherche en cours...</p>
                <p className="text-sm text-neutral-500 mt-1">
                  Consultation de la base SIRENE
                </p>
              </div>
            )}

            {!isLoading && results.length === 0 && query.length >= 3 && !error && (
              <div className="text-center py-8">
                <Building className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
                <p className="text-neutral-400 mb-2">Aucune entreprise trouvée</p>
                <div className="space-y-2 text-sm text-neutral-500">
                  <p>Vérifiez l'orthographe ou essayez :</p>
                  <ul className="space-y-1">
                    <li>• Un nom d'entreprise différent</li>
                    <li>• Le SIREN à 9 chiffres</li>
                    <li>• Moins de mots dans la recherche</li>
                  </ul>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-red-400 mb-1">Erreur de recherche</h4>
                    <p className="text-red-300 text-sm mb-3">{error}</p>
                    <motion.button
                      onClick={handleRetry}
                      className="inline-flex items-center space-x-2 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 px-3 py-1.5 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Réessayer</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* État initial - Aucune recherche */}
      {!hasSearched && !selectedCompany?.selected && (
        <motion.div
          variants={contentFadeVariants}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-neutral-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="w-12 h-12 text-neutral-500" />
          </div>
          <h3 className="text-xl font-semibold text-neutral-300 mb-2">
            Commencez votre recherche
          </h3>
          <p className="text-neutral-500 mb-6">
            Tapez le nom de votre entreprise ou son SIREN pour la retrouver
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto text-sm">
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <h4 className="font-medium text-white mb-2">Par nom</h4>
              <p className="text-neutral-500">
                Ex: "Apple France", "Carrefour"
              </p>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <h4 className="font-medium text-white mb-2">Par SIREN</h4>
              <p className="text-neutral-500">
                Ex: 552100554, 775665943
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bouton continuer */}
      <motion.div
        variants={contentFadeVariants}
        className="flex justify-end pt-4"
      >
        <motion.button
          onClick={handleContinue}
          disabled={!canProceed}
          className={`
            px-8 h-12 rounded-xl font-medium transition-all duration-200 flex items-center space-x-2
            ${canProceed
              ? 'bg-primary hover:bg-primary-400 text-white shadow-lg hover:shadow-xl'
              : 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
            }
          `}
          whileHover={canProceed ? { scale: 1.02, y: -1 } : {}}
          whileTap={canProceed ? { scale: 0.98 } : {}}
        >
          <span>Continuer avec cette entreprise</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Note légale */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center text-sm text-neutral-500 bg-neutral-900/30 rounded-lg p-4 border border-neutral-800/50"
      >
        <p>
          🏛️ Les données proviennent de la base SIRENE de l'INSEE, 
          registre officiel des entreprises françaises. 
          Elles sont publiques et mises à jour régulièrement.
        </p>
      </motion.div>
    </motion.div>
  );
}