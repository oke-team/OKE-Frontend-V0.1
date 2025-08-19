'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Search, MapPin, ChevronRight, Check } from 'lucide-react';
import {
  PremiumCard,
  LiquidButton,
  PremiumInput,
  StepContainer,
  InfoCard
} from '../ui/PremiumComponents';

interface Country {
  code: string;
  name: string;
  flag: string;
  popular?: boolean;
}

interface CountrySelectionStepProps {
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
  onNext: () => void;
  canProceed: boolean;
}

// Liste des pays avec leur drapeau emoji
const countries: Country[] = [
  { code: 'FR', name: 'France', flag: '🇫🇷', popular: true },
  { code: 'US', name: 'États-Unis', flag: '🇺🇸', popular: true },
  { code: 'GB', name: 'Royaume-Uni', flag: '🇬🇧', popular: true },
  { code: 'DE', name: 'Allemagne', flag: '🇩🇪', popular: true },
  { code: 'ES', name: 'Espagne', flag: '🇪🇸', popular: true },
  { code: 'IT', name: 'Italie', flag: '🇮🇹', popular: true },
  { code: 'BE', name: 'Belgique', flag: '🇧🇪', popular: true },
  { code: 'CH', name: 'Suisse', flag: '🇨🇭', popular: true },
  { code: 'NL', name: 'Pays-Bas', flag: '🇳🇱' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australie', flag: '🇦🇺' },
  { code: 'JP', name: 'Japon', flag: '🇯🇵' },
  { code: 'CN', name: 'Chine', flag: '🇨🇳' },
  { code: 'IN', name: 'Inde', flag: '🇮🇳' },
  { code: 'BR', name: 'Brésil', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexique', flag: '🇲🇽' },
  { code: 'AR', name: 'Argentine', flag: '🇦🇷' },
  { code: 'ZA', name: 'Afrique du Sud', flag: '🇿🇦' },
  { code: 'SE', name: 'Suède', flag: '🇸🇪' },
  { code: 'NO', name: 'Norvège', flag: '🇳🇴' },
  { code: 'DK', name: 'Danemark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finlande', flag: '🇫🇮' },
  { code: 'PL', name: 'Pologne', flag: '🇵🇱' },
  { code: 'RU', name: 'Russie', flag: '🇷🇺' },
];

export default function CountrySelectionStepV2({
  selectedCountry,
  onCountrySelect,
  onNext,
  canProceed
}: CountrySelectionStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Filtrer les pays en fonction de la recherche
  const filteredCountries = useMemo(() => {
    if (!searchQuery) return countries;
    
    const query = searchQuery.toLowerCase();
    return countries.filter(country => 
      country.name.toLowerCase().includes(query) ||
      country.code.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Séparer les pays populaires
  const popularCountries = useMemo(() => 
    countries.filter(c => c.popular),
    []
  );

  const handleCountrySelect = (country: Country) => {
    onCountrySelect(country);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCountry && canProceed) {
      setLoading(true);
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
      onNext();
    }
  };

  return (
    <StepContainer
      title="Sélection du pays"
      subtitle="Dans quel pays votre entreprise est-elle établie ?"
      icon={<Globe className="w-7 h-7" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Barre de recherche */}
        <PremiumInput
          type="text"
          placeholder="Rechercher un pays..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />

        {/* Pays populaires (affichés seulement sans recherche) */}
        {!searchQuery && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#4C34CE]" />
              Pays populaires
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {popularCountries.map(country => (
                <motion.button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  onHoverStart={() => setHoveredCountry(country.code)}
                  onHoverEnd={() => setHoveredCountry(null)}
                  className={`
                    relative p-4 rounded-xl border-2 transition-all duration-200
                    ${selectedCountry?.code === country.code
                      ? 'bg-[#4C34CE]/5 border-[#4C34CE] shadow-md'
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Indicateur de sélection */}
                  {selectedCountry?.code === country.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-[#4C34CE] rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                  
                  <div className="text-3xl mb-2">{country.flag}</div>
                  <div className="text-sm font-medium text-gray-900">
                    {country.name}
                  </div>
                  
                  {/* Animation au survol */}
                  <AnimatePresence>
                    {hoveredCountry === country.code && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4C34CE]/5 to-[#FAA016]/5 pointer-events-none"
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Liste complète des pays */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            {searchQuery ? 'Résultats de recherche' : 'Tous les pays'}
          </h3>
          <PremiumCard variant="default" padding="sm" className="max-h-64 overflow-y-auto">
            <div className="space-y-1">
              {filteredCountries.length > 0 ? (
                filteredCountries.map(country => (
                  <motion.button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200
                      ${selectedCountry?.code === country.code
                        ? 'bg-[#4C34CE]/10 text-[#4C34CE]'
                        : 'hover:bg-gray-50 text-gray-900'
                      }
                    `}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium">{country.name}</span>
                      <span className="text-sm text-gray-500">({country.code})</span>
                    </div>
                    {selectedCountry?.code === country.code ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-[#4C34CE] rounded-full flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-white" />
                      </motion.div>
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Aucun pays trouvé pour "{searchQuery}"</p>
                </div>
              )}
            </div>
          </PremiumCard>
        </div>

        {/* Pays sélectionné */}
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="text-3xl">{selectedCountry.flag}</div>
              <div className="flex-1">
                <p className="text-sm text-green-600 font-medium">Pays sélectionné</p>
                <p className="text-lg font-semibold text-gray-900">{selectedCountry.name}</p>
              </div>
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </motion.div>
        )}

        {/* Information légale */}
        <InfoCard type="info" icon={<Globe className="w-5 h-5" />}>
          <p className="font-medium text-gray-900 mb-1">Conformité internationale</p>
          <p className="text-gray-600 text-xs">
            OKÉ s'adapte automatiquement aux réglementations fiscales et comptables de votre pays.
          </p>
        </InfoCard>

        {/* Bouton de soumission */}
        <LiquidButton
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!selectedCountry || !canProceed || loading}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            Continuer
            <ChevronRight className="w-5 h-5" />
          </span>
        </LiquidButton>

        {/* Note pour la France */}
        {selectedCountry?.code === 'FR' && (
          <p className="text-xs text-center text-gray-500">
            <span className="text-[#4C34CE] font-medium">🇫🇷 France :</span> Accédez à toutes les 
            fonctionnalités spécifiques aux entreprises françaises (TVA, CGA, liasses fiscales, etc.)
          </p>
        )}
      </form>
    </StepContainer>
  );
}