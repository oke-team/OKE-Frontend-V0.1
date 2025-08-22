'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
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
  Zap
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
import CabinetFilters from './CabinetFilters';
import CabinetMobileView from './CabinetMobileView';
import CabinetBalanceWidgets from './CabinetBalanceWidgets';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations/variants';
import { cn, formatCurrency } from '@/lib/utils';

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
  'gestionnaire-paie': { label: 'Gestionnaire Paie', color: 'text-orange-600', bgColor: 'bg-orange-50' },
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
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [dossiers, setDossiers] = useState<CabinetDossier[]>(cabinetDossiers);
  const [filteredDossiers, setFilteredDossiers] = useState<CabinetDossier[]>(cabinetDossiers);
  const [selectedDossiers, setSelectedDossiers] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof CabinetDossier>('derniereActivite');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState<CabinetDossier | null>(null);
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
    return filteredDossiers.slice(startIndex, startIndex + itemsPerPage);
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
      chiffreAffaires: selectedData.reduce((sum, d) => sum + d.chiffreAffaires, 0),
      honoraires: selectedData.reduce((sum, d) => sum + d.budget.honoraires, 0),
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

  // Exposer les filtres pour le menu actions magiques
  React.useEffect(() => {
    // Stocker la fonction toggle dans window pour y accéder depuis le header
    (window as any).toggleCabinetFilters = () => setShowFilters(!showFilters);
    return () => {
      delete (window as any).toggleCabinetFilters;
    };
  }, [showFilters]);

  // Synchronisation du scroll horizontal entre header et body
  const syncScrollHeader = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    if (bodyScrollRef.current && target.scrollLeft !== bodyScrollRef.current.scrollLeft) {
      bodyScrollRef.current.scrollLeft = target.scrollLeft;
    }
  }, []);

  const syncScrollBody = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement;
    if (headerScrollRef.current && target.scrollLeft !== headerScrollRef.current.scrollLeft) {
      headerScrollRef.current.scrollLeft = target.scrollLeft;
    }
  }, []);

  // Ajout des event listeners pour la synchronisation du scroll
  useEffect(() => {
    const headerEl = headerScrollRef.current;
    const bodyEl = bodyScrollRef.current;

    if (headerEl && bodyEl) {
      headerEl.addEventListener('scroll', syncScrollHeader);
      bodyEl.addEventListener('scroll', syncScrollBody);

      return () => {
        headerEl.removeEventListener('scroll', syncScrollHeader);
        bodyEl.removeEventListener('scroll', syncScrollBody);
      };
    }
  }, [syncScrollHeader, syncScrollBody]);

  // Gestion de la sélection des comptes avec useCallback
  const handleAccountToggle = useCallback((accountId: string) => {
    if (onExternalAccountToggle) {
      onExternalAccountToggle(accountId);
    } else {
      setInternalSelectedAccounts(prev => 
        prev.includes(accountId) 
          ? prev.filter(id => id !== accountId)
          : [...prev, accountId]
      );
    }
  }, [onExternalAccountToggle]);


  // Vue mobile
  if (isMobile) {
    return (
      <>
        <CabinetMobileView
          transactions={paginatedTransactions}
          selectedTransactions={selectedTransactions}
          onToggleSelection={toggleSelection}
          onOpenJustificatif={handleOpenJustificatif}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          showFilters={showFilters}
          onToggleFilters={() => setShowFilters(!showFilters)}
          filters={filters}
          onFiltersChange={setFilters}
          stats={{ total: 0, debits: 0, credits: 0, nonRapproche: 0 }}
          showBalances={true}
          onToggleVisibility={() => {}}
          selectedAccounts={selectedAccounts}
          onAccountToggle={handleAccountToggle}
        />
        <ViewerComponent mode="auto" glassMorphism={true} />
      </>
    );
  }

  return (
    <div className="h-full flex flex-col">

      {/* Filtres directement en haut si activés */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="sticky top-0 z-20 px-4 lg:px-6 py-4 bg-white flex-shrink-0"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#FAA016]">
              <CabinetFilters
                filters={filters}
                onFiltersChange={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions de sélection groupée - sticky si des items sélectionnés */}
      {selectedTransactions.size > 0 && (
        <div className={cn(
          "sticky z-10 px-4 py-2 border-b border-gray-200 bg-gray-50 flex items-center gap-3 flex-shrink-0",
          showFilters ? "top-[80px]" : "top-0"
        )}>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">
              {selectedTransactions.size} sélectionné(s)
            </span>
            <div className="h-4 w-px bg-gray-300" />
            <span className="text-sm font-semibold text-gray-800">
              Total : <span className={cn(
                "font-bold",
                selectedTotal >= 0 ? "text-green-600" : "text-red-600"
              )}>
                {formatCurrency(selectedTotal)}
              </span>
            </span>
          </div>
          <button
            onClick={() => handleBulkAction('reconcile')}
            className="px-3 py-1 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <Check className="w-3 h-3" />
            Rapprocher
          </button>
          <button
            onClick={() => handleBulkAction('export')}
            className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            Exporter
          </button>
          <button
            onClick={() => setSelectedTransactions(new Set())}
            className="ml-auto px-3 py-1 text-sm text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Annuler
          </button>
        </div>
      )}

      {/* Contenu principal avec header fixe et données scrollables */}
      <div className="flex flex-col h-full">
        {/* Header de table - sticky avec couleurs du thème OKÉ */}
        <div 
          ref={headerScrollRef}
          className={cn(
            "sticky z-10 flex-shrink-0 overflow-x-auto scrollbar-hide",
            "bg-[#4C34CE]/5",
            "border-b border-[#4C34CE]/20",
            "backdrop-blur-sm",
            selectedTransactions.size > 0 
              ? (showFilters ? "top-[120px]" : "top-[40px]")
              : (showFilters ? "top-[80px]" : "top-0")
          )}
        >
          <table className="w-full table-fixed" style={{ minWidth: '1000px' }}>
            <thead>
              <tr>
                <th className="w-12 px-4 py-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={selectedTransactions.size === paginatedTransactions.length && paginatedTransactions.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-2 border-[#4C34CE]/40 text-[#4C34CE] focus:ring-[#FAA016] focus:ring-2 focus:ring-offset-1 transition-all hover:border-[#4C34CE]"
                    />
                  </div>
                </th>
                <th 
                  className="w-28 px-3 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('banqueIcone')}
                >
                  <div className="flex items-center gap-1.5">
                    Banque
                    {getSortIcon('banqueIcone')}
                  </div>
                </th>
                <th 
                  className="w-10 px-2 py-4 text-center cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('typePaiement')}
                  title="Type de paiement"
                >
                  <div className="flex items-center justify-center gap-1">
                    <CreditCard className="w-5 h-5 text-[#4C34CE]" />
                    {getSortIcon('typePaiement')}
                  </div>
                </th>
                <th 
                  className="w-20 px-2 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1.5">
                    Date
                    {getSortIcon('date')}
                  </div>
                </th>
                <th 
                  className="w-32 px-3 py-4 text-right text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('montant')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    Montant
                    {getSortIcon('montant')}
                  </div>
                </th>
                <th 
                  className="w-12 px-2 py-4 text-center cursor-help"
                  title="Justificatif"
                >
                  <div className="flex items-center justify-center">
                    <Paperclip className="w-4 h-4 text-[#4C34CE]" />
                  </div>
                </th>
                <th 
                  className="w-16 px-2 py-4 text-center cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('codeLettrage')}
                  title="Lettrage comptable"
                >
                  <div className="flex items-center justify-center gap-1">
                    <Link className="w-4 h-4 text-[#4C34CE]" />
                    {getSortIcon('codeLettrage')}
                  </div>
                </th>
                <th 
                  className="w-40 px-3 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('contrepartie')}
                >
                  <div className="flex items-center gap-1.5">
                    Objet
                    {getSortIcon('contrepartie')}
                  </div>
                </th>
                <th 
                  className="min-w-0 flex-1 px-3 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('libelleComplet')}
                >
                  <div className="flex items-center gap-1.5">
                    Libellé
                    {getSortIcon('libelleComplet')}
                  </div>
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Données de la table - zone scrollable */}
        <div 
          ref={bodyScrollRef}
          className="flex-1 overflow-auto"
        >
          <table className="w-full table-fixed" style={{ minWidth: '1000px' }}>
            <tbody className="bg-white">
              <AnimatePresence>
                {paginatedTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                    onDoubleClick={() => handleRowDoubleClick(transaction)}
                    className={cn(
                      "hover:bg-gray-50 transition-colors cursor-pointer",
                      index > 0 && "border-t border-gray-200"
                    )}
                    title="Double-cliquez pour ouvrir le modal de rapprochement"
                  >
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.has(transaction.id)}
                        onChange={() => toggleSelection(transaction.id)}
                        className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                      />
                    </td>
                    <td className="w-28 px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <img 
                          src={cabinetLogos[transaction.banqueIcone]} 
                          alt={transaction.banqueIcone}
                          className="w-8 h-8 rounded object-cover"
                          title={transaction.banqueIcone}
                        />
                        <span className="text-xs text-gray-500">
                          ••• {transaction.numeroCompte.slice(-3)}
                        </span>
                      </div>
                    </td>
                    <td className="w-10 px-2 py-3 text-center">
                      <div 
                        className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-help group relative" 
                        title={paymentLabels[transaction.typePaiement]}
                      >
                        <span className="text-gray-600 group-hover:text-[#4C34CE] transition-colors">
                          {paymentIcons[transaction.typePaiement]}
                        </span>
                        {/* Tooltip personnalisé plus visible */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                          {paymentLabels[transaction.typePaiement]}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </div>
                    </td>
                    <td className="w-20 px-2 py-3 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="w-32 px-3 py-3 text-sm text-right font-medium">
                      <span className={cn(
                        transaction.montant < 0 ? 'text-red-600' : 'text-gray-900'
                      )}>
                        {formatCurrency(transaction.montant, transaction.devise)}
                      </span>
                      {transaction.montantEUR && transaction.devise !== 'EUR' && (
                        <div className="text-xs text-gray-500">
                          {formatCurrency(transaction.montantEUR, 'EUR')}
                        </div>
                      )}
                    </td>
                    <td className="w-12 px-2 py-3 text-center">
                      {transaction.justificatif ? (
                        <button
                          onClick={() => handleOpenJustificatif(transaction)}
                          className="p-2 text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded-lg transition-colors group relative"
                        >
                          <Paperclip className="w-4 h-4" />
                          {/* Tooltip élégant personnalisé */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-2 bg-white text-gray-800 text-xs rounded-xl shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 pointer-events-none backdrop-blur-sm"
                               style={{
                                 background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                                 backdropFilter: 'blur(8px)',
                                 WebkitBackdropFilter: 'blur(8px)',
                                 boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)'
                               }}>
                            <div className="flex items-center gap-2">
                              <FileText className="w-3 h-3 text-[#4C34CE]" />
                              <span className="font-medium">{transaction.justificatif.nom}</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {transaction.justificatif.type.toUpperCase()} • {transaction.justificatif.taille}
                            </div>
                            {/* Flèche élégante */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-white"></div>
                          </div>
                        </button>
                      ) : (
                        <span className="text-gray-300 p-2">-</span>
                      )}
                    </td>
                    <td className="w-16 px-2 py-3 text-center">
                      {transaction.codeLettrage ? (
                        <div className="inline-flex items-center justify-center min-w-[20px] h-4 bg-[#4C34CE] text-white text-[10px] font-bold rounded px-1" title={`Code lettrage: ${transaction.codeLettrage}`}>
                          {transaction.codeLettrage}
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">-</span>
                      )}
                    </td>
                    <td className="w-40 px-3 py-3 text-sm text-gray-700">
                      <div className="truncate" title={transaction.contrepartie}>
                        {transaction.contrepartie}
                      </div>
                    </td>
                    <td className="min-w-0 flex-1 px-3 py-3">
                      <div className="max-w-full">
                        <p className="text-sm text-gray-900 truncate" title={transaction.libelleComplet}>
                          {transaction.libelleComplet}
                        </p>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                
                {/* Deux lignes vides systématiques en bas pour garantir la visibilité */}
                <tr key="empty-row-1" className="h-12">
                  <td colSpan={8} className="px-4 py-3 border-t border-transparent"></td>
                </tr>
                <tr key="empty-row-2" className="h-12">
                  <td colSpan={8} className="px-4 py-3 border-t border-transparent"></td>
                </tr>
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de rapprochement */}
      <CabinetTransactionModal
        isOpen={modalTransaction !== null}
        onClose={() => setModalTransaction(null)}
        transaction={modalTransaction}
        onUpdate={(updatedTransaction) => {
          setTransactions(prev => 
            prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
          );
          setModalTransaction(null);
        }}
      />

      {/* DocumentViewer */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </div>
  );
}