'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import BankTransactionModal from './BankTransactionModal';
import {
  Download,
  Check,
  Eye,
  Paperclip,
  CreditCard,
  Banknote,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  Link
} from 'lucide-react';
import { 
  bankTransactions, 
  BankTransactionExtended,
  filterTransactions,
  sortTransactions,
  TypePaiement,
  StatutRapprochement,
  Banque,
  bankAccounts,
  calculateBalanceSummary,
  bankLogos
} from '@/lib/mock-data/bank-transactions';
import BankFilters from './BankFilters';
import BankMobileView from './BankMobileView';
import BankBalanceWidgets from './BankBalanceWidgets';
import { fadeIn, fadeInUp, staggerContainer } from '@/lib/animations/variants';
import { cn, formatCurrency } from '@/lib/utils';

// Icônes des banques
const bankIcons: Record<Banque, string> = {
  BNP: '🏦',
  SG: '🏛️',
  CA: '🌾',
  LCL: '🦁',
  CE: '🐿️',
  CM: '💙',
  HSBC: '🌏',
  BP: '🔵',
  CIC: '🔷',
  LaPoste: '📮'
};

// Icônes des types de paiement
const paymentIcons = {
  virement: <ArrowUpDown className="w-4 h-4" />,
  carte: <CreditCard className="w-4 h-4" />,
  cheque: <FileText className="w-4 h-4" />,
  especes: <Banknote className="w-4 h-4" />,
  prelevement: <RefreshCw className="w-4 h-4" />,
  remise_cheques: <FileText className="w-4 h-4" />
};

// Labels des types de paiement
const paymentLabels: Record<TypePaiement, string> = {
  virement: 'Virement',
  carte: 'Carte',
  cheque: 'Chèque',
  especes: 'Espèces',
  prelevement: 'Prélèvement',
  remise_cheques: 'Remise chèques'
};

// Statuts avec icônes et couleurs
const statusConfig = {
  rapproche: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Rapproché'
  },
  en_attente: {
    icon: <Clock className="w-4 h-4" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    label: 'En attente'
  },
  non_rapproche: {
    icon: <XCircle className="w-4 h-4" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'Non rapproché'
  }
};

interface BankTransactionTableProps {
  externalSelectedAccounts?: string[];
  onExternalAccountToggle?: (accountId: string) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalPages?: number;
  totalItems?: number;
  onPaginationUpdate?: (totalPages: number, totalItems: number) => void;
}

export default function BankTransactionTable({
  externalSelectedAccounts,
  onExternalAccountToggle,
  currentPage: externalCurrentPage,
  onPageChange,
  totalPages: externalTotalPages,
  totalItems: externalTotalItems,
  onPaginationUpdate
}: BankTransactionTableProps = {}) {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [transactions, setTransactions] = useState<BankTransactionExtended[]>(bankTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<BankTransactionExtended[]>(bankTransactions);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof BankTransactionExtended>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isMobile, setIsMobile] = useState(false);
  const [modalTransaction, setModalTransaction] = useState<BankTransactionExtended | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const setCurrentPage = onPageChange ?? setInternalCurrentPage;
  const itemsPerPage = 15;
  
  // Récupération du terme de recherche depuis le contexte global ou localStorage
  const [searchTerm, setSearchTerm] = useState('');
  
  // Refs pour synchroniser le scroll horizontal
  const headerScrollRef = React.useRef<HTMLDivElement>(null);
  const bodyScrollRef = React.useRef<HTMLDivElement>(null);
  
  // État pour la sélection des comptes (utilise les props externes si disponibles)
  const [internalSelectedAccounts, setInternalSelectedAccounts] = useState<string[]>(
    bankAccounts.map(acc => acc.id) // Tous sélectionnés par défaut
  );
  
  const selectedAccounts = externalSelectedAccounts || internalSelectedAccounts;
  const setSelectedAccounts = onExternalAccountToggle ? 
    (accounts: string[] | ((prev: string[]) => string[])) => {
      // Pour les props externes, on ne peut pas utiliser directement setSelectedAccounts
      // Cette fonction sera appelée via handleAccountToggle
    } : setInternalSelectedAccounts;

  // Filtres
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    typePaiement: [] as TypePaiement[],
    statut: [] as StatutRapprochement[],
    banque: [] as Banque[],
    montantMin: undefined as number | undefined,
    montantMax: undefined as number | undefined
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
    let filtered = filterTransactions(transactions, {
      search: searchTerm,
      ...filters
    });
    filtered = sortTransactions(filtered, sortField, sortOrder);
    setFilteredTransactions(filtered);
    if (onPageChange) {
      onPageChange(1);
    } else {
      setInternalCurrentPage(1);
    }
  }, [transactions, searchTerm, filters, sortField, sortOrder]);
  
  // Mise à jour des informations de pagination pour les widgets
  useEffect(() => {
    if (onPaginationUpdate) {
      const newTotalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
      const newTotalItems = filteredTransactions.length;
      onPaginationUpdate(newTotalPages, newTotalItems);
    }
  }, [filteredTransactions.length, itemsPerPage, onPaginationUpdate]);

  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const internalTotalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const totalPages = externalTotalPages ?? internalTotalPages;
  const totalItems = externalTotalItems ?? filteredTransactions.length;

  // Gestion du tri
  const handleSort = (field: keyof BankTransactionExtended) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Obtenir l'icône de tri pour une colonne
  const getSortIcon = (field: keyof BankTransactionExtended) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-[#FAA016]" />;
    }
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-[#4C34CE]" />
      : <ArrowDown className="w-3.5 h-3.5 text-[#4C34CE]" />;
  };

  // Sélection
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedTransactions);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedTransactions(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedTransactions.size === paginatedTransactions.length) {
      setSelectedTransactions(new Set());
    } else {
      setSelectedTransactions(new Set(paginatedTransactions.map(t => t.id)));
    }
  };

  // Calcul du total des transactions sélectionnées
  const selectedTotal = useMemo(() => {
    return Array.from(selectedTransactions).reduce((total, transactionId) => {
      const transaction = filteredTransactions.find(t => t.id === transactionId);
      return total + (transaction ? transaction.montant : 0);
    }, 0);
  }, [selectedTransactions, filteredTransactions]);

  // Ouvrir un justificatif
  const handleOpenJustificatif = (transaction: BankTransactionExtended) => {
    if (transaction.justificatif) {
      // Utiliser le PDF Pennylane pour la maquette
      openDocument({
        src: '/documents/facture-pennylane.pdf',
        title: transaction.justificatif.nom,
        type: 'pdf'
      });
    }
  };

  // Actions groupées
  const handleBulkAction = (action: 'reconcile' | 'export' | 'delete') => {
    console.log(`Action ${action} sur ${selectedTransactions.size} transactions`);
    // Implémenter les actions
  };

  // Gestion du double-clic pour ouvrir le modal de rapprochement
  const handleRowDoubleClick = (transaction: BankTransactionExtended) => {
    setModalTransaction(transaction);
  };

  // Exposer les filtres pour le menu actions magiques
  React.useEffect(() => {
    // Stocker la fonction toggle dans window pour y accéder depuis le header
    (window as any).toggleBankFilters = () => setShowFilters(!showFilters);
    return () => {
      delete (window as any).toggleBankFilters;
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
        <BankMobileView
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
              <BankFilters
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
                          src={bankLogos[transaction.banqueIcone]} 
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
      <BankTransactionModal
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