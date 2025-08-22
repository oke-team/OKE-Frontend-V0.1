'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Check,
  Eye,
  Users,
  Building2,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  UserPlus,
  MessageCircle,
  CreditCard,
  Settings,
  TrendingUp,
  Euro,
  Activity,
  AlertCircle,
  Zap,
  ChevronRight
} from 'lucide-react';
import { 
  cabinetDossiers, 
  CabinetDossier,
  filterDossiers,
  sortDossiers,
  StatutDossier,
  TypeEntreprise,
  RoleCollaborateur,
  StatutBanque,
  calculateCabinetStats,
  getStatutBadgeProps,
  getBanqueStatutBadgeProps,
  companyLogos,
  collaborateurAvatars
} from '@/lib/mock-data/cabinet-dashboard-data';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations/variants';
import { cn, formatCurrency } from '@/lib/utils';
import TimeTrackingModal from './TimeTrackingModal';

// Configuration des statuts de dossier
const statutConfig = {
  actif: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Actif'
  },
  nouveau: {
    icon: <Activity className="w-4 h-4" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    label: 'Nouveau'
  },
  suspendu: {
    icon: <Clock className="w-4 h-4" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    label: 'Suspendu'
  },
  archive: {
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    label: 'Archivé'
  }
};

// Configuration des statuts bancaires
const statutBancaireConfig = {
  connectee: {
    icon: <CheckCircle className="w-3 h-3" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Connectée'
  },
  en_cours: {
    icon: <Clock className="w-3 h-3" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    label: 'En cours'
  },
  non_connectee: {
    icon: <XCircle className="w-3 h-3" />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    label: 'Non connectée'
  },
  erreur: {
    icon: <AlertCircle className="w-3 h-3" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'Erreur'
  }
};

// Configuration des rôles
const roleConfig = {
  'expert-comptable': { label: 'Expert-Comptable', color: 'text-purple-600', bgColor: 'bg-purple-50' },
  'superviseur': { label: 'Superviseur', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  'collaborateur': { label: 'Collaborateur', color: 'text-green-600', bgColor: 'bg-green-50' },
  'gestionnaire-paie': { label: 'Gest. Paie', color: 'text-orange-600', bgColor: 'bg-orange-50' },
  'juriste': { label: 'Juriste', color: 'text-red-600', bgColor: 'bg-red-50' },
  'stagiaire': { label: 'Stagiaire', color: 'text-gray-600', bgColor: 'bg-gray-50' }
};

interface CabinetDossierTableProps {
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  totalItems?: number;
  onPaginationUpdate?: (totalPages: number, totalItems: number) => void;
}

export default function CabinetDossierTable({
  currentPage: externalCurrentPage,
  onPageChange,
  totalPages: externalTotalPages,
  totalItems: externalTotalItems,
  onPaginationUpdate
}: CabinetDossierTableProps = {}) {
  const [dossiers, setDossiers] = useState<CabinetDossier[]>(cabinetDossiers);
  const [filteredDossiers, setFilteredDossiers] = useState<CabinetDossier[]>(cabinetDossiers);
  const [selectedDossiers, setSelectedDossiers] = useState<Set<string>>(new Set());

  // Debug: Log des données au chargement
  React.useEffect(() => {
    console.log('CabinetDossiers loaded:', cabinetDossiers.length);
    console.log('Filtered dossiers:', filteredDossiers.length);
  }, [filteredDossiers]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof CabinetDossier>('derniereActivite');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<CabinetDossier | null>(null);
  const [timeTrackingDossier, setTimeTrackingDossier] = useState<CabinetDossier | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const setCurrentPage = onPageChange ?? setInternalCurrentPage;
  const itemsPerPage = 15;
  
  // Récupération du terme de recherche
  const [searchTerm, setSearchTerm] = useState('');
  
  // Refs pour synchroniser le scroll horizontal
  const headerScrollRef = React.useRef<HTMLDivElement>(null);
  const bodyScrollRef = React.useRef<HTMLDivElement>(null);

  // Filtres pour les dossiers
  const [filters, setFilters] = useState({
    statut: [] as StatutDossier[],
    formeJuridique: [] as TypeEntreprise[],
    secteur: '',
    chiffreAffairesMin: undefined as number | undefined,
    chiffreAffairesMax: undefined as number | undefined,
    banquesConnectees: [] as StatutBanque[]
  });

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filtrage et tri
  useEffect(() => {
    let filtered = filterDossiers(dossiers, {
      search: searchTerm,
      ...filters
    });
    filtered = sortDossiers(filtered, sortField, sortOrder);
    setFilteredDossiers(filtered);
    if (onPageChange) {
      onPageChange(1);
    } else {
      setInternalCurrentPage(1);
    }
  }, [dossiers, searchTerm, filters, sortField, sortOrder]);
  
  // Mise à jour des informations de pagination
  useEffect(() => {
    if (onPaginationUpdate) {
      const newTotalPages = Math.ceil(filteredDossiers.length / itemsPerPage);
      const newTotalItems = filteredDossiers.length;
      onPaginationUpdate(newTotalPages, newTotalItems);
    }
  }, [filteredDossiers.length, itemsPerPage, onPaginationUpdate]);

  // Pagination
  const paginatedDossiers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const result = filteredDossiers.slice(startIndex, startIndex + itemsPerPage);
    console.log('Paginated dossiers:', result.length, 'Current page:', currentPage);
    return result;
  }, [filteredDossiers, currentPage]);

  const internalTotalPages = Math.ceil(filteredDossiers.length / itemsPerPage);
  const totalPages = externalTotalPages ?? internalTotalPages;
  const totalItems = externalTotalItems ?? filteredDossiers.length;

  // Gestion du tri
  const handleSort = (field: keyof CabinetDossier) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Obtenir l'icône de tri pour une colonne
  const getSortIcon = (field: keyof CabinetDossier) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#FAA016]" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-[#4C34CE]" />
      : <ArrowDown className="w-3.5 h-3.5 text-[#4C34CE]" />;
  };

  // Sélection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedDossiers);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedDossiers(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedDossiers.size === paginatedDossiers.length) {
      setSelectedDossiers(new Set());
    } else {
      setSelectedDossiers(new Set(paginatedDossiers.map(d => d.id)));
    }
  };

  // Calcul des totaux des dossiers sélectionnés
  const selectedTotals = useMemo(() => {
    const selectedData = Array.from(selectedDossiers).map(dossierId => 
      filteredDossiers.find(d => d.id === dossierId)
    ).filter(Boolean) as CabinetDossier[];
    
    return {
      chiffreAffaires: selectedData.reduce((sum, d) => sum + (d.chiffreAffaires?.actuel || 0), 0),
      tresorerie: selectedData.reduce((sum, d) => sum + (d.tresorerie?.montant || 0), 0),
      honoraires: selectedData.reduce((sum, d) => sum + (d.budget?.honorairesPrevu || 0), 0),
      count: selectedData.length
    };
  }, [selectedDossiers, filteredDossiers]);

  // Actions sur les dossiers
  const handleInviteClient = (dossier: CabinetDossier) => {
    console.log(`Inviter un client pour ${dossier.raisonSociale}`);
    // Implémenter l'invitation client
  };

  const handleInviteCollaborateur = (dossier: CabinetDossier) => {
    console.log(`Inviter un collaborateur pour ${dossier.raisonSociale}`);
    // Implémenter l'invitation collaborateur
  };

  const handleOpenChat = (dossier: CabinetDossier) => {
    console.log(`Ouvrir chat avec ${dossier.raisonSociale}`);
    // Implémenter l'ouverture du chat
  };

  const handleViewDossier = (dossier: CabinetDossier) => {
    console.log(`Voir détails dossier ${dossier.raisonSociale}`);
    // Implémenter l'ouverture du dossier détaillé
  };

  const handleTimeTracking = (dossier: CabinetDossier) => {
    setTimeTrackingDossier(dossier);
  };

  // Actions groupées
  const handleBulkAction = (action: 'export' | 'archive' | 'invite') => {
    console.log(`Action ${action} sur ${selectedDossiers.size} dossiers`);
    // Implémenter les actions
  };

  // Gestion du double-clic pour voir le détail d'un dossier
  const handleRowDoubleClick = (dossier: CabinetDossier) => {
    setSelectedDossier(dossier);
    handleViewDossier(dossier);
  };

  // Vue mobile (simplifiée pour l'instant)
  if (isMobile) {
    return (
      <div className="h-full p-4">
        <div className="text-center py-8">
          <Building2 className="w-12 h-12 text-[#4C34CE] mx-auto mb-4" />
          <p className="text-gray-600">Vue mobile en développement</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Actions de sélection groupée */}
      {selectedDossiers.size > 0 && (
        <div className="sticky top-0 z-10 px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center gap-3 flex-shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">
              {selectedDossiers.size} dossier(s) sélectionné(s)
            </span>
            <div className="h-4 w-px bg-gray-300" />
            <span className="text-sm font-semibold text-gray-800">
              CA : <span className="text-green-600 font-bold">
                {formatCurrency(selectedTotals.chiffreAffaires)}
              </span>
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Trésorerie : <span className="text-blue-600 font-bold">
                {formatCurrency(selectedTotals.tresorerie)}
              </span>
            </span>
            <span className="text-sm font-semibold text-gray-800">
              Budget : <span className="text-purple-600 font-bold">
                {formatCurrency(selectedTotals.honoraires)}
              </span>
            </span>
          </div>
          <button
            onClick={() => handleBulkAction('invite')}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <UserPlus className="w-3 h-3" />
            Inviter
          </button>
          <button
            onClick={() => handleBulkAction('export')}
            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Exporter
          </button>
          <button
            onClick={() => setSelectedDossiers(new Set())}
            className="ml-auto px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Contenu principal avec header fixe et données scrollables */}
      <div className="flex flex-col h-full">
        {/* Header de table */}
        <div 
          ref={headerScrollRef}
          className={cn(
            "sticky top-0 z-10 flex-shrink-0 overflow-x-auto scrollbar-hide",
            "bg-[#4C34CE]/5",
            "border-b border-[#4C34CE]/20",
            "backdrop-blur-sm",
            selectedDossiers.size > 0 ? "top-[40px]" : "top-0"
          )}
        >
          <table className="w-full table-fixed" style={{ minWidth: '1400px' }}>
            <thead>
              <tr>
                <th className="w-12 px-4 py-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedDossiers.size === paginatedDossiers.length && paginatedDossiers.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-2 border-[#4C34CE]/40 text-[#4C34CE] focus:ring-[#FAA016] focus:ring-2 focus:ring-offset-1 transition-all hover:border-[#4C34CE]"
                    />
                  </div>
                </th>
                <th 
                  className="w-60 px-3 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('raisonSociale')}
                >
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" />
                    Entreprise
                    {getSortIcon('raisonSociale')}
                  </div>
                </th>
                <th 
                  className="w-32 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('statut')}
                >
                  <div className="flex items-center justify-center gap-1.5">
                    Statut
                    {getSortIcon('statut')}
                  </div>
                </th>
                <th 
                  className="w-40 px-3 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('superviseur')}
                >
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    Équipe
                    {getSortIcon('superviseur')}
                  </div>
                </th>
                <th 
                  className="w-24 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Banques
                </th>
                <th 
                  className="w-32 px-3 py-4 text-right text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('chiffreAffaires')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    CA / Résultat
                    {getSortIcon('chiffreAffaires')}
                  </div>
                </th>
                <th 
                  className="w-28 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Trésorerie
                </th>
                <th 
                  className="w-24 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Budget
                </th>
                <th 
                  className="w-28 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Compta/TVA
                </th>
                <th 
                  className="w-24 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Chat
                </th>
                <th 
                  className="w-20 px-3 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Données de la table */}
        <div 
          ref={bodyScrollRef}
          className="flex-1 overflow-auto"
        >
          <table className="w-full table-fixed" style={{ minWidth: '1400px' }}>
            <tbody className="bg-white">
              <AnimatePresence>
                {paginatedDossiers.map((dossier, index) => (
                  <motion.tr
                    key={dossier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                    onDoubleClick={() => handleRowDoubleClick(dossier)}
                    className={cn(
                      "hover:bg-gray-50 transition-colors cursor-pointer",
                      index > 0 && "border-t border-gray-200"
                    )}
                    title="Double-cliquez pour voir les détails"
                  >
                    {/* Checkbox */}
                    <td className="w-12 px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedDossiers.has(dossier.id)}
                        onChange={() => toggleSelection(dossier.id)}
                        className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                      />
                    </td>
                    
                    {/* Entreprise */}
                    <td className="w-60 px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {dossier.logo ? (
                            <img 
                              src={dossier.logo} 
                              alt={dossier.raisonSociale}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-[#4C34CE]/10 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-[#4C34CE]" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {dossier.raisonSociale}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{dossier.formeJuridique}</span>
                            <span>•</span>
                            <span>{dossier.nombreEmployes} emp.</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Statut */}
                    <td className="w-32 px-3 py-4">
                      <div className="flex justify-center">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium",
                          statutConfig[dossier.statut]?.color,
                          statutConfig[dossier.statut]?.bgColor
                        )}>
                          {statutConfig[dossier.statut]?.icon}
                          {statutConfig[dossier.statut]?.label}
                        </div>
                      </div>
                    </td>

                    {/* Équipe */}
                    <td className="w-40 px-3 py-4">
                      <div className="space-y-1">
                        {/* Superviseur */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200">
                            {dossier.superviseur.avatar ? (
                              <img 
                                src={dossier.superviseur.avatar} 
                                alt={dossier.superviseur.prenom}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xs text-blue-600 font-medium">
                                  {dossier.superviseur.prenom[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs text-gray-900 truncate">
                              {dossier.superviseur.prenom} {dossier.superviseur.nom}
                            </div>
                            <div className={cn(
                              "text-xs px-1 py-0.5 rounded text-center",
                              roleConfig[dossier.superviseur.role]?.color,
                              roleConfig[dossier.superviseur.role]?.bgColor
                            )}>
                              {roleConfig[dossier.superviseur.role]?.label}
                            </div>
                          </div>
                        </div>
                        {/* Autres collaborateurs */}
                        {dossier.collaborateurs.length > 0 && (
                          <div className="flex -space-x-1">
                            {dossier.collaborateurs.slice(0, 3).map(collab => (
                              <div key={collab.id} className="w-5 h-5 rounded-full overflow-hidden border-2 border-white bg-gray-200">
                                {collab.avatar ? (
                                  <img 
                                    src={collab.avatar} 
                                    alt={collab.prenom}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-xs text-gray-600 font-medium">
                                      {collab.prenom[0]}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                            {dossier.collaborateurs.length > 3 && (
                              <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                                <span className="text-xs text-gray-600 font-medium">
                                  +{dossier.collaborateurs.length - 3}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Banques */}
                    <td className="w-24 px-3 py-4">
                      <div className="space-y-1">
                        {dossier.banquesConnectees.slice(0, 2).map((banque, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              statutBancaireConfig[banque.statut]?.bgColor.replace('bg-', 'bg-'),
                              statutBancaireConfig[banque.statut]?.color.replace('text-', 'bg-').replace('-600', '-500')
                            )} />
                            <span className="text-xs text-gray-600 truncate">
                              {banque.nom}
                            </span>
                          </div>
                        ))}
                        {dossier.banquesConnectees.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dossier.banquesConnectees.length - 2}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* CA / Résultat */}
                    <td className="w-32 px-3 py-4 text-right">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(dossier.chiffreAffaires?.actuel || 0)}
                        </div>
                        <div className={cn(
                          "text-xs font-medium",
                          (dossier.chiffreAffaires?.evolution || 0) >= 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {(dossier.chiffreAffaires?.evolution || 0) >= 0 ? "+" : ""}{(dossier.chiffreAffaires?.evolution || 0).toFixed(1)}% vs N-1
                        </div>
                        <div className="text-xs text-gray-600">
                          Résultat: {formatCurrency(dossier.resultat?.actuel || 0)}
                        </div>
                      </div>
                    </td>

                    {/* Trésorerie */}
                    <td className="w-28 px-3 py-4 text-center">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-blue-600">
                          {formatCurrency(dossier.tresorerie?.montant || 0)}
                        </div>
                        <div className={cn(
                          "text-xs font-medium",
                          (dossier.tresorerie?.evolution || 0) >= 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {(dossier.tresorerie?.evolution || 0) >= 0 ? "+" : ""}{(dossier.tresorerie?.evolution || 0).toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500">
                          {dossier.effectifSalarie || 0} sal.
                        </div>
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="w-24 px-3 py-4 text-center">
                      <div className="space-y-1 text-xs">
                        <div className="font-medium text-gray-900">
                          {Math.round(((dossier.budget?.honorairesConsomme || 0) / (dossier.budget?.honorairesPrevu || 1)) * 100)}%
                        </div>
                        <div className="text-green-600">
                          {formatCurrency(dossier.budget?.honorairesConsomme || 0, 'EUR', false)}
                        </div>
                        <div className="text-gray-500">
                          / {formatCurrency(dossier.budget?.honorairesPrevu || 0, 'EUR', false)}
                        </div>
                      </div>
                    </td>

                    {/* Compta/TVA */}
                    <td className="w-28 px-3 py-4 text-center">
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-center">
                          <div className={cn(
                            "px-2 py-1 rounded-full text-xs font-medium",
                            (dossier.comptabilite?.avancementCompta || 0) >= 80 ? "bg-green-100 text-green-700" :
                            (dossier.comptabilite?.avancementCompta || 0) >= 50 ? "bg-orange-100 text-orange-700" :
                            "bg-red-100 text-red-700"
                          )}>
                            {dossier.comptabilite?.avancementCompta || 0}%
                          </div>
                        </div>
                        <div className={cn(
                          "font-medium",
                          dossier.tva?.statut === 'deposee' ? "text-green-600" :
                          dossier.tva?.statut === 'en_retard' ? "text-red-600" :
                          "text-orange-600"
                        )}>
                          {dossier.tva?.statut === 'deposee' ? 'TVA OK' :
                           dossier.tva?.statut === 'en_retard' ? 'TVA retard' :
                           dossier.tva?.statut === 'en_cours' ? 'TVA cours' : 'TVA N/A'}
                        </div>
                        {(dossier.comptabilite?.operationsAttente || 0) > 0 && (
                          <div className="text-red-600">
                            {dossier.comptabilite?.operationsAttente || 0} att.
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Chat */}
                    <td className="w-24 px-3 py-4">
                      <div className="flex justify-center">
                        {dossier.chatActif ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenChat(dossier);
                            }}
                            className={cn(
                              "relative p-2 rounded-lg transition-colors",
                              dossier.derniersMessages > 0 
                                ? "text-green-600 bg-green-50 hover:bg-green-100"
                                : "text-gray-400 bg-gray-50 hover:bg-gray-100"
                            )}
                          >
                            <MessageCircle className="w-4 h-4" />
                            {dossier.derniersMessages > 0 && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {dossier.derniersMessages}
                              </div>
                            )}
                          </button>
                        ) : (
                          <div className="p-2 text-gray-300">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="w-20 px-3 py-4">
                      <div className="flex justify-center">
                        <div className="relative">
                          <button 
                            className="p-2 text-gray-400 hover:text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded-lg transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle menu (simple version pour demo)
                              const menu = e.currentTarget.nextElementSibling as HTMLElement;
                              menu?.classList.toggle('hidden');
                            }}
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                          
                          {/* Menu dropdown */}
                          <div className="hidden absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                            <button
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewDossier(dossier);
                                (e.currentTarget.parentNode as HTMLElement)?.classList.add('hidden');
                              }}
                            >
                              <Eye className="w-4 h-4" />
                              Voir détails
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTimeTracking(dossier);
                                (e.currentTarget.parentNode as HTMLElement)?.classList.add('hidden');
                              }}
                            >
                              <Clock className="w-4 h-4" />
                              Saisir temps
                            </button>
                            <button
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleInviteCollaborateur(dossier);
                                (e.currentTarget.parentNode as HTMLElement)?.classList.add('hidden');
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Inviter collaborateur
                            </button>
                            {dossier.chatActif && (
                              <button
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenChat(dossier);
                                  (e.currentTarget.parentNode as HTMLElement)?.classList.add('hidden');
                                }}
                              >
                                <MessageCircle className="w-4 h-4" />
                                Chat client
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de saisie de temps */}
      <TimeTrackingModal
        isOpen={!!timeTrackingDossier}
        onClose={() => setTimeTrackingDossier(null)}
        dossier={timeTrackingDossier}
      />
    </div>
  );
}