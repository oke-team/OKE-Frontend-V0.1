'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronRight, 
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Building,
  Info
} from 'lucide-react';
import {
  PremiumCard,
  LiquidButton,
  PremiumInput,
  StepContainer,
  InfoCard
} from '../ui/PremiumComponents';

interface Company {
  id: string;
  name: string;
  siren: string;
  siret?: string;
  address: string;
  city: string;
  postalCode: string;
  activity: string;
  employees: string;
  revenue?: string;
  creationDate: string;
  legalForm: string;
  isActive: boolean;
}

interface CompanySearchStepProps {
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
  onNext: () => void;
  canProceed: boolean;
}

// Données mockées d'entreprises
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TECH SOLUTIONS FRANCE',
    siren: '123456789',
    siret: '12345678900001',
    address: '10 rue de la République',
    city: 'Paris',
    postalCode: '75001',
    activity: 'Conseil en technologies',
    employees: '10-50',
    revenue: '2.5M€',
    creationDate: '2020',
    legalForm: 'SAS',
    isActive: true
  },
  {
    id: '2',
    name: 'DIGITAL AGENCY',
    siren: '987654321',
    siret: '98765432100001',
    address: '25 boulevard Victor Hugo',
    city: 'Lyon',
    postalCode: '69001',
    activity: 'Agence digitale',
    employees: '5-10',
    revenue: '800k€',
    creationDate: '2019',
    legalForm: 'SARL',
    isActive: true
  },
  {
    id: '3',
    name: 'E-COMMERCE PLUS',
    siren: '456789123',
    siret: '45678912300001',
    address: '5 avenue des Champs',
    city: 'Marseille',
    postalCode: '13001',
    activity: 'Commerce en ligne',
    employees: '20-100',
    revenue: '5M€',
    creationDate: '2018',
    legalForm: 'SAS',
    isActive: true
  }
];

export default function CompanySearchStepV2({
  selectedCompany,
  onCompanySelect,
  onNext,
  canProceed
}: CompanySearchStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'siren'>('name');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulation de recherche
  useEffect(() => {
    if (searchQuery.length >= 3) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const results = mockCompanies.filter(company => {
          if (searchType === 'name') {
            return company.name.toLowerCase().includes(searchQuery.toLowerCase());
          } else {
            return company.siren.includes(searchQuery) || 
                   (company.siret && company.siret.includes(searchQuery));
          }
        });
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchType]);

  const handleCompanySelect = (company: Company) => {
    onCompanySelect(company);
    setShowCreateForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCompany && canProceed) {
      setLoading(true);
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
      onNext();
    }
  };

  const handleCreateCompany = () => {
    setShowCreateForm(true);
    // Pour la démo, on sélectionne automatiquement une entreprise créée
    const newCompany: Company = {
      id: 'new',
      name: searchQuery || 'Mon Entreprise',
      siren: '000000000',
      address: 'À compléter',
      city: 'À compléter',
      postalCode: '00000',
      activity: 'À définir',
      employees: '1-5',
      creationDate: new Date().getFullYear().toString(),
      legalForm: 'SASU',
      isActive: true
    };
    handleCompanySelect(newCompany);
  };

  return (
    <StepContainer
      title="Recherche d'entreprise"
      subtitle="Trouvez votre entreprise dans notre base de données"
      icon={<Building2 className="w-7 h-7" />}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
        {/* Type de recherche */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            type="button"
            onClick={() => setSearchType('name')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              searchType === 'name'
                ? 'bg-white text-[#4C34CE] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Par nom
          </button>
          <button
            type="button"
            onClick={() => setSearchType('siren')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              searchType === 'siren'
                ? 'bg-white text-[#4C34CE] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Par SIREN/SIRET
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="relative">
          <PremiumInput
            type="text"
            placeholder={searchType === 'name' ? 'Nom de votre entreprise...' : 'SIREN ou SIRET...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
          {isSearching && (
            <div className="absolute right-3 top-3">
              <motion.div
                className="w-5 h-5 border-2 border-[#4C34CE]/30 border-t-[#4C34CE] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          )}
        </div>

        {/* Résultats de recherche */}
        <AnimatePresence mode="wait">
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-medium text-gray-700">
                {searchResults.length} entreprise{searchResults.length > 1 ? 's' : ''} trouvée{searchResults.length > 1 ? 's' : ''}
              </h3>
              <div className="space-y-3">
                {searchResults.map((company) => (
                  <motion.div
                    key={company.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <PremiumCard
                      variant={selectedCompany?.id === company.id ? 'elevated' : 'interactive'}
                      padding="md"
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedCompany?.id === company.id
                          ? 'ring-2 ring-[#4C34CE] bg-[#4C34CE]/5'
                          : ''
                      }`}
                      onClick={() => handleCompanySelect(company)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          {/* En-tête */}
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900">
                                {company.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {company.legalForm} • SIREN: {company.siren}
                              </p>
                            </div>
                            {company.isActive && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Active
                              </span>
                            )}
                          </div>

                          {/* Informations */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{company.city} ({company.postalCode})</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span>{company.employees} employés</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span>{company.activity}</span>
                            </div>
                            {company.revenue && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="w-4 h-4 text-gray-400" />
                                <span>CA: {company.revenue}</span>
                              </div>
                            )}
                          </div>

                          {/* Adresse */}
                          <div className="pt-2 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                              {company.address}, {company.postalCode} {company.city}
                            </p>
                          </div>
                        </div>

                        {/* Indicateur de sélection */}
                        {selectedCompany?.id === company.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-4 w-8 h-8 bg-[#4C34CE] rounded-full flex items-center justify-center flex-shrink-0"
                          >
                            <Sparkles className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </PremiumCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Aucun résultat */}
          {searchQuery.length >= 3 && !isSearching && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <Building2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500 mb-4">
                Aucune entreprise trouvée pour "{searchQuery}"
              </p>
              <LiquidButton
                type="button"
                variant="outline"
                onClick={handleCreateCompany}
                className="mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Créer mon entreprise
              </LiquidButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Formulaire de création (mockup) */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PremiumCard variant="elevated" padding="md" className="bg-blue-50/50 border-blue-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-1">
                    Création d'entreprise
                  </h4>
                  <p className="text-sm text-blue-700">
                    Votre entreprise "{searchQuery || 'Mon Entreprise'}" sera créée. 
                    Vous pourrez compléter les informations dans l'étape suivante.
                  </p>
                </div>
              </div>
            </PremiumCard>
          </motion.div>
        )}

        {/* Entreprise sélectionnée */}
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium mb-1">Entreprise sélectionnée</p>
                <p className="text-lg font-semibold text-gray-900">{selectedCompany.name}</p>
                <p className="text-sm text-gray-600">SIREN: {selectedCompany.siren}</p>
              </div>
              <Sparkles className="w-6 h-6 text-green-600" />
            </div>
          </motion.div>
        )}

        {/* Information Pappers */}
        <InfoCard type="info" icon={<Info className="w-5 h-5" />}>
          <p className="font-medium text-gray-900 mb-1">Source des données</p>
          <p className="text-gray-600 text-xs">
            Les informations d'entreprise proviennent de la base Pappers, 
            synchronisée avec les registres officiels français.
          </p>
        </InfoCard>

        {/* Bouton de soumission */}
        <LiquidButton
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={!selectedCompany || !canProceed || loading}
          className="w-full"
        >
          <span className="flex items-center justify-center gap-2">
            Continuer
            <ChevronRight className="w-5 h-5" />
          </span>
        </LiquidButton>

        {/* Option de création manuelle */}
        {!showCreateForm && (
          <div className="text-center">
            <button
              type="button"
              onClick={handleCreateCompany}
              className="text-sm text-[#4C34CE] hover:text-[#3A28B8] font-medium"
            >
              Mon entreprise n'apparaît pas ? Créez-la manuellement
            </button>
          </div>
        )}
      </form>
    </StepContainer>
  );
}