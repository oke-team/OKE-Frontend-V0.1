'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Search, 
  Plus, 
  ChevronRight,
  ChevronLeft, 
  TrendingUp,
  Users,
  MapPin,
  Calendar,
  Sparkles,
  Building,
  Info,
  Filter,
  X
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

interface CompanySearchStepProps {
  selectedCompany: Company | null;
  onCompanySelect: (company: Company) => void;
  onNext: () => void;
  onPrevious?: () => void;
  canProceed: boolean;
  canGoBack?: boolean;
}

// Données mockées d'entreprises enrichies
const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TECH SOLUTIONS FRANCE',
    siren: '123456789',
    siret: '12345678900001',
    address: '10 rue de la République',
    city: 'Paris',
    postalCode: '75001',
    department: '75',
    activity: 'Conseil en technologies',
    nafCode: '6202A',
    nafLabel: 'Conseil en systèmes et logiciels informatiques',
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
    department: '69',
    activity: 'Agence digitale',
    nafCode: '7311Z',
    nafLabel: 'Activités des agences de publicité',
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
    department: '13',
    activity: 'Commerce en ligne',
    nafCode: '4791B',
    nafLabel: 'Vente à distance sur catalogue spécialisé',
    employees: '20-100',
    revenue: '5M€',
    creationDate: '2018',
    legalForm: 'SAS',
    isActive: true
  },
  {
    id: '4',
    name: 'BOULANGERIE ARTISANALE DUPONT',
    siren: '234567890',
    siret: '23456789000012',
    address: '42 rue du Pain',
    city: 'Bordeaux',
    postalCode: '33000',
    department: '33',
    activity: 'Boulangerie-pâtisserie',
    nafCode: '1071C',
    nafLabel: 'Boulangerie et boulangerie-pâtisserie',
    employees: '1-5',
    revenue: '450k€',
    creationDate: '2015',
    legalForm: 'SARL',
    isActive: true
  },
  {
    id: '5',
    name: 'CABINET MEDICAL DU CENTRE',
    siren: '345678901',
    siret: '34567890100023',
    address: '15 place de la Santé',
    city: 'Toulouse',
    postalCode: '31000',
    department: '31',
    activity: 'Cabinet médical',
    nafCode: '8621Z',
    nafLabel: 'Activité des médecins généralistes',
    employees: '5-10',
    revenue: '1.2M€',
    creationDate: '2010',
    legalForm: 'SCM',
    isActive: true
  },
  {
    id: '6',
    name: 'GARAGE AUTO PERFORMANCE',
    siren: '567890123',
    siret: '56789012300034',
    address: '89 route Nationale',
    city: 'Lille',
    postalCode: '59000',
    department: '59',
    activity: 'Garage automobile',
    nafCode: '4520A',
    nafLabel: 'Entretien et réparation de véhicules automobiles légers',
    employees: '5-10',
    revenue: '750k€',
    creationDate: '2012',
    legalForm: 'EURL',
    isActive: true
  },
  {
    id: '7',
    name: 'RESTAURANT LE GOURMET',
    siren: '678901234',
    siret: '67890123400045',
    address: '7 place du Marché',
    city: 'Nice',
    postalCode: '06000',
    department: '06',
    activity: 'Restaurant traditionnel',
    nafCode: '5610A',
    nafLabel: 'Restauration traditionnelle',
    employees: '10-20',
    revenue: '1.5M€',
    creationDate: '2008',
    legalForm: 'SAS',
    isActive: true
  },
  {
    id: '8',
    name: 'PLOMBERIE MARTIN ET FILS',
    siren: '789012345',
    siret: '78901234500056',
    address: '23 rue des Artisans',
    city: 'Nantes',
    postalCode: '44000',
    department: '44',
    activity: 'Plomberie',
    nafCode: '4322A',
    nafLabel: 'Travaux d\'installation d\'eau et de gaz',
    employees: '1-5',
    revenue: '320k€',
    creationDate: '2005',
    legalForm: 'SARL',
    isActive: true
  },
  {
    id: '9',
    name: 'CABINET COMPTABLE EXPERT',
    siren: '890123456',
    siret: '89012345600067',
    address: '56 avenue des Finances',
    city: 'Strasbourg',
    postalCode: '67000',
    department: '67',
    activity: 'Expertise comptable',
    nafCode: '6920Z',
    nafLabel: 'Activités comptables',
    employees: '10-20',
    revenue: '2.1M€',
    creationDate: '2003',
    legalForm: 'SELARL',
    isActive: true
  },
  {
    id: '10',
    name: 'IMMOBILIERE DE LA COTE',
    siren: '901234567',
    siret: '90123456700078',
    address: '12 boulevard de la Mer',
    city: 'Montpellier',
    postalCode: '34000',
    department: '34',
    activity: 'Agence immobilière',
    nafCode: '6831Z',
    nafLabel: 'Agences immobilières',
    employees: '5-10',
    revenue: '890k€',
    creationDate: '2014',
    legalForm: 'SAS',
    isActive: true
  },
  {
    id: '11',
    name: 'TRANSPORT EXPRESS LOGISTIQUE',
    siren: '012345678',
    siret: '01234567800089',
    address: '45 zone industrielle',
    city: 'Rennes',
    postalCode: '35000',
    department: '35',
    activity: 'Transport routier',
    nafCode: '4941A',
    nafLabel: 'Transports routiers de fret interurbains',
    employees: '20-50',
    revenue: '3.8M€',
    creationDate: '2011',
    legalForm: 'SASU',
    isActive: true
  },
  {
    id: '12',
    name: 'COIFFURE STYLE ET BEAUTE',
    siren: '112233445',
    siret: '11223344500090',
    address: '18 rue de la Mode',
    city: 'Paris',
    postalCode: '75011',
    department: '75',
    activity: 'Salon de coiffure',
    nafCode: '9602A',
    nafLabel: 'Coiffure',
    employees: '1-5',
    revenue: '180k€',
    creationDate: '2016',
    legalForm: 'EIRL',
    isActive: true
  }
];

export default function CompanySearchStepV2({
  selectedCompany,
  onCompanySelect,
  onNext,
  onPrevious,
  canProceed,
  canGoBack = false
}: CompanySearchStepProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'siren'>('name');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [activityFilter, setActivityFilter] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  // Simulation de recherche avec filtres
  useEffect(() => {
    if (searchQuery.length >= 3 || selectedDepartment || activityFilter) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        let results = [...mockCompanies];
        
        // Filtre par recherche
        if (searchQuery.length >= 3) {
          results = results.filter(company => {
            if (searchType === 'name') {
              return company.name.toLowerCase().includes(searchQuery.toLowerCase());
            } else {
              return company.siren.includes(searchQuery) || 
                     (company.siret && company.siret.includes(searchQuery));
            }
          });
        }
        
        // Filtre par département
        if (selectedDepartment) {
          results = results.filter(company => 
            company.department === selectedDepartment
          );
        }
        
        // Filtre par activité (NAF ou nom d'activité)
        if (activityFilter) {
          const filter = activityFilter.toLowerCase();
          results = results.filter(company => 
            company.nafCode.toLowerCase().includes(filter) ||
            company.nafLabel.toLowerCase().includes(filter) ||
            company.activity.toLowerCase().includes(filter)
          );
        }
        
        setSearchResults(results);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, searchType, selectedDepartment, activityFilter]);

  const handleCompanySelect = (company: Company) => {
    onCompanySelect(company);
    setShowCreateForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCompany) {
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
      department: '00',
      activity: 'À définir',
      nafCode: '0000Z',
      nafLabel: 'Activité à définir',
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
        {/* Type de recherche et filtres */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 flex gap-2 p-1 bg-gray-100 rounded-lg">
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
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                showFilters || selectedDepartment || activityFilter
                  ? 'bg-[#4C34CE] text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filtres
              {(selectedDepartment || activityFilter) && (
                <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  {[selectedDepartment, activityFilter].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>

          {/* Panneau de filtres */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <PremiumCard variant="default" padding="md" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Filtre par département */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Département
                      </label>
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C34CE] focus:border-transparent"
                      >
                        <option value="">Tous les départements</option>
                        <option value="06">06 - Alpes-Maritimes</option>
                        <option value="13">13 - Bouches-du-Rhône</option>
                        <option value="31">31 - Haute-Garonne</option>
                        <option value="33">33 - Gironde</option>
                        <option value="34">34 - Hérault</option>
                        <option value="35">35 - Ille-et-Vilaine</option>
                        <option value="44">44 - Loire-Atlantique</option>
                        <option value="59">59 - Nord</option>
                        <option value="67">67 - Bas-Rhin</option>
                        <option value="69">69 - Rhône</option>
                        <option value="75">75 - Paris</option>
                      </select>
                    </div>

                    {/* Filtre par activité */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Activité (NAF/APE ou nom)
                      </label>
                      <PremiumInput
                        type="text"
                        placeholder="Ex: 6202A ou informatique"
                        value={activityFilter}
                        onChange={(e) => setActivityFilter(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Bouton pour réinitialiser les filtres */}
                  {(selectedDepartment || activityFilter) && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedDepartment('');
                          setActivityFilter('');
                        }}
                        className="text-sm text-[#4C34CE] hover:text-[#3A28B8] font-medium flex items-center gap-1"
                      >
                        <X className="w-4 h-4" />
                        Réinitialiser les filtres
                      </button>
                    </div>
                  )}
                </PremiumCard>
              </motion.div>
            )}
          </AnimatePresence>
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
                        <div className="flex-1 space-y-2">
                          {/* Nom de l'entreprise */}
                          <div className="flex items-start justify-between">
                            <h4 className="text-lg font-semibold text-gray-900">
                              {company.name}
                            </h4>
                            {company.isActive && (
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                Active
                              </span>
                            )}
                          </div>

                          {/* Forme juridique */}
                          <p className="text-sm font-medium text-gray-600">
                            {company.legalForm}
                          </p>

                          {/* Adresse */}
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600">
                              {company.address}, {company.postalCode} {company.city}
                            </p>
                          </div>

                          {/* Activité principale */}
                          <div className="flex items-start gap-2">
                            <Building className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-600">
                              {company.activity}
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
              <div className="space-y-1">
                <p className="text-sm text-green-600 font-medium">Entreprise sélectionnée</p>
                <p className="text-lg font-semibold text-gray-900">{selectedCompany.name}</p>
                <p className="text-sm text-gray-600">{selectedCompany.legalForm} • {selectedCompany.activity}</p>
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

        {/* Boutons de navigation */}
        <div className="flex gap-3">
          {canGoBack && onPrevious && (
            <LiquidButton
              type="button"
              variant="secondary"
              size="lg"
              onClick={onPrevious}
              className="flex-1"
            >
              <span className="flex items-center justify-center gap-2">
                <ChevronLeft className="w-5 h-5" />
                Retour
              </span>
            </LiquidButton>
          )}
          <LiquidButton
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={!selectedCompany || loading}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-2">
              Continuer
              <ChevronRight className="w-5 h-5" />
            </span>
          </LiquidButton>
        </div>

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