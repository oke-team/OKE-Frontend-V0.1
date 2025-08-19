'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, Check, ArrowRight } from 'lucide-react';
import { contentFadeVariants } from '../animations/stepTransitions';

interface Country {
  code: string;
  name: string;
  flag: string;
  supported: boolean;
  comingSoon?: boolean;
}

interface CountrySelectionStepProps {
  selectedCountry: { code: string; name: string; flag: string };
  onCountrySelect: (country: { code: string; name: string; flag: string }) => void;
  onNext: () => void;
  canProceed: boolean;
}

const COUNTRIES: Country[] = [
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    supported: true
  },
  {
    code: 'BE',
    name: 'Belgique',
    flag: '🇧🇪',
    supported: false,
    comingSoon: true
  },
  {
    code: 'CH',
    name: 'Suisse',
    flag: '🇨🇭',
    supported: false,
    comingSoon: true
  },
  {
    code: 'LU',
    name: 'Luxembourg',
    flag: '🇱🇺',
    supported: false,
    comingSoon: true
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    supported: false,
    comingSoon: true
  },
  {
    code: 'GB',
    name: 'Royaume-Uni',
    flag: '🇬🇧',
    supported: false,
    comingSoon: true
  },
  {
    code: 'US',
    name: 'États-Unis',
    flag: '🇺🇸',
    supported: false,
    comingSoon: true
  },
  {
    code: 'DE',
    name: 'Allemagne',
    flag: '🇩🇪',
    supported: false,
    comingSoon: true
  },
  {
    code: 'ES',
    name: 'Espagne',
    flag: '🇪🇸',
    supported: false,
    comingSoon: true
  },
  {
    code: 'IT',
    name: 'Italie',
    flag: '🇮🇹',
    supported: false,
    comingSoon: true
  },
  {
    code: 'NL',
    name: 'Pays-Bas',
    flag: '🇳🇱',
    supported: false,
    comingSoon: true
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    supported: false,
    comingSoon: true
  }
];

export default function CountrySelectionStep({
  selectedCountry,
  onCountrySelect,
  onNext,
  canProceed
}: CountrySelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Filtre les pays selon la recherche
  const filteredCountries = COUNTRIES.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sépare les pays supportés et non supportés
  const supportedCountries = filteredCountries.filter(country => country.supported);
  const upcomingCountries = filteredCountries.filter(country => !country.supported);

  const handleCountryClick = (country: Country) => {
    if (country.supported) {
      onCountrySelect({
        code: country.code,
        name: country.name,
        flag: country.flag
      });
    }
  };

  const handleContinue = () => {
    if (canProceed) {
      onNext();
    }
  };

  return (
    <motion.div
      variants={contentFadeVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto space-y-8"
    >
      {/* Header avec description */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center space-y-3"
      >
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8 text-primary-400" />
        </div>
        <p className="text-neutral-300 text-lg">
          Sélectionnez le pays où est située votre entreprise pour accéder aux bonnes sources de données.
        </p>
        <p className="text-sm text-neutral-500">
          Chaque pays dispose de ses propres registres d'entreprises et réglementations.
        </p>
      </motion.div>

      {/* Barre de recherche */}
      <motion.div
        variants={contentFadeVariants}
        className="relative"
      >
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-neutral-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un pays..."
          className="w-full h-12 pl-12 pr-4 rounded-xl border backdrop-blur-sm
            bg-white/5 border-white/10 text-white placeholder-neutral-400
            focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50
            transition-all duration-200"
        />
      </motion.div>

      {/* Pays sélectionné */}
      <AnimatePresence>
        {selectedCountry.code && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="p-4 bg-primary/10 border border-primary-400/30 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedCountry.flag}</span>
                <div>
                  <h3 className="font-semibold text-white">{selectedCountry.name}</h3>
                  <p className="text-sm text-primary-200">Pays sélectionné</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-green-400">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Disponible</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des pays */}
      <div className="space-y-6">
        {/* Pays supportés */}
        {supportedCountries.length > 0 && (
          <motion.div
            variants={contentFadeVariants}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              <span>Disponible maintenant</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supportedCountries.map((country, index) => (
                <motion.div
                  key={country.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleCountryClick(country)}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  className={`
                    p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all duration-200
                    ${selectedCountry.code === country.code
                      ? 'bg-primary/20 border-primary-400/50 shadow-lg shadow-primary/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                    }
                  `}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h4 className="font-medium text-white">{country.name}</h4>
                        <p className="text-sm text-green-400">Intégration complète disponible</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {selectedCountry.code === country.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                      <ArrowRight className={`w-4 h-4 transition-colors ${
                        hoveredCountry === country.code ? 'text-white' : 'text-neutral-400'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Pays à venir */}
        {upcomingCountries.length > 0 && (
          <motion.div
            variants={contentFadeVariants}
            className="space-y-3"
          >
            <h3 className="text-lg font-semibold text-neutral-400 flex items-center space-x-2">
              <span>Prochainement disponible</span>
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {upcomingCountries.map((country, index) => (
                <motion.div
                  key={country.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl border backdrop-blur-sm bg-neutral-800/30 border-neutral-600/30 cursor-not-allowed"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl opacity-50">{country.flag}</span>
                      <div>
                        <h4 className="font-medium text-neutral-300">{country.name}</h4>
                        <p className="text-sm text-orange-400">Bientôt disponible</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-neutral-500 bg-neutral-800/30 rounded-lg p-3 border border-neutral-700/50">
              💡 Nous travaillons activement sur ces intégrations. 
              Contactez-nous si votre pays vous intéresse particulièrement !
            </p>
          </motion.div>
        )}
      </div>

      {/* Message si aucun résultat */}
      {filteredCountries.length === 0 && searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Globe className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
          <p className="text-neutral-400">Aucun pays trouvé pour "{searchQuery}"</p>
          <p className="text-sm text-neutral-500 mt-1">
            Essayez de modifier votre recherche
          </p>
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
          <span>Continuer</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Note d'information */}
      <motion.div
        variants={contentFadeVariants}
        className="text-center text-sm text-neutral-500 bg-neutral-900/50 rounded-lg p-4 border border-neutral-800"
      >
        <p>
          🔒 Vos données sont traitées selon les réglementations locales de votre pays.
          Nous respectons le RGPD et toutes les lois sur la protection des données applicables.
        </p>
      </motion.div>
    </motion.div>
  );
}