'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocumentViewer } from '@/components/ui/DocumentViewerAdvanced';
import {
  Download,
  Check,
  Eye,
  Paperclip,
  CreditCard,
  Banknote,
  ArrowUpDown,
  MoreHorizontal,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw
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
import { cn } from '@/lib/utils';

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

export default function BankTransactionTable() {
  const { open: openDocument, ViewerComponent } = useDocumentViewer();
  const [transactions, setTransactions] = useState<BankTransactionExtended[]>(bankTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<BankTransactionExtended[]>(bankTransactions);
  const [selectedTransactions, setSelectedTransactions] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<keyof BankTransactionExtended>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  
  // Récupération du terme de recherche depuis le contexte global ou localStorage
  const [searchTerm, setSearchTerm] = useState('');
  
  // État pour l'affichage des soldes
  const [showBalances, setShowBalances] = useState(true);
  
  // État pour la sélection des comptes
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(
    bankAccounts.map(acc => acc.id) // Tous sélectionnés par défaut
  );

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
    setCurrentPage(1);
  }, [transactions, searchTerm, filters, sortField, sortOrder]);

  // Pagination
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Gestion du tri
  const handleSort = (field: keyof BankTransactionExtended) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
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

  // Exposer les filtres pour le menu actions magiques
  React.useEffect(() => {
    // Stocker la fonction toggle dans window pour y accéder depuis le header
    (window as any).toggleBankFilters = () => setShowFilters(!showFilters);
    return () => {
      delete (window as any).toggleBankFilters;
    };
  }, [showFilters]);

  // Gestion de la sélection des comptes
  const handleAccountToggle = (accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId) 
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  };

  const balanceSummary = calculateBalanceSummary(selectedAccounts);

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
          showBalances={showBalances}
          onToggleVisibility={() => setShowBalances(!showBalances)}
          selectedAccounts={selectedAccounts}
          onAccountToggle={handleAccountToggle}
        />
        <ViewerComponent mode="auto" glassMorphism={true} />
      </>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Widgets de solde - Sticky au top */}
      <div className="sticky top-0 z-30 bg-white px-4 lg:px-6 py-3 flex-shrink-0">
        <BankBalanceWidgets
          accounts={bankAccounts}
          summary={balanceSummary}
          showBalances={showBalances}
          onToggleVisibility={() => setShowBalances(!showBalances)}
          selectedAccounts={selectedAccounts}
          onAccountToggle={handleAccountToggle}
        />
      </div>

      {/* Filtres directement en haut si activés */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="sticky top-[84px] z-20 px-4 lg:px-6 py-4 bg-white flex-shrink-0"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
          showFilters ? "top-[160px]" : "top-[84px]"
        )}>
          <span className="text-sm text-gray-600 font-medium">
            {selectedTransactions.size} sélectionné(s)
          </span>
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
        <div className={cn(
          "sticky z-10 flex-shrink-0",
          "bg-gradient-to-r from-white via-[#4C34CE]/5 to-white",
          "border-b-2 border-[#FAA016]",
          "backdrop-blur-sm",
          selectedTransactions.size > 0 
            ? (showFilters ? "top-[200px]" : "top-[120px]")
            : (showFilters ? "top-[160px]" : "top-[84px]")
        )}>
          <table className="w-full table-fixed">
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
                <th className="w-32 px-4 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Banque
                </th>
                <th 
                  className="w-24 px-4 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center gap-1.5">
                    Date
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#FAA016]" />
                  </div>
                </th>
                <th 
                  className="w-28 px-4 py-4 text-right text-xs font-semibold text-[#4C34CE] uppercase tracking-wider cursor-pointer hover:bg-[#4C34CE]/10 transition-colors rounded-lg"
                  onClick={() => handleSort('montant')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    Montant
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#FAA016]" />
                  </div>
                </th>
                <th className="w-64 px-4 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Libellé
                </th>
                <th className="w-48 px-4 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Contrepartie
                </th>
                <th className="w-28 px-4 py-4 text-left text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Type
                </th>
                <th className="w-16 px-4 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Justif.
                </th>
                <th className="w-32 px-4 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Statut
                </th>
                <th className="w-16 px-4 py-4 text-center text-xs font-semibold text-[#4C34CE] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Données de la table - zone scrollable */}
        <div className="flex-1 overflow-auto">
          <table className="w-full table-fixed">
            <tbody className="bg-white">
              <AnimatePresence>
                {paginatedTransactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.02 }}
                    className={cn(
                      "hover:bg-gray-50 transition-colors",
                      index > 0 && "border-t border-gray-200"
                    )}
                  >
                    <td className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.has(transaction.id)}
                        onChange={() => toggleSelection(transaction.id)}
                        className="rounded border-gray-300 text-[#4C34CE] focus:ring-[#4C34CE]"
                      />
                    </td>
                    <td className="w-32 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img 
                          src={bankLogos[transaction.banqueIcone]} 
                          alt={transaction.banqueIcone}
                          className="w-6 h-6 rounded object-cover"
                          title={transaction.banqueIcone}
                        />
                        <span className="text-xs text-gray-500">
                          ••• {transaction.numeroCompte.slice(-3)}
                        </span>
                      </div>
                    </td>
                    <td className="w-24 px-4 py-3 text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="w-28 px-4 py-3 text-sm text-right font-medium">
                      <span className={cn(
                        transaction.montant < 0 ? 'text-red-600' : 'text-gray-900'
                      )}>
                        {transaction.montant.toFixed(2)} €
                      </span>
                      {transaction.montantEUR && transaction.devise !== 'EUR' && (
                        <div className="text-xs text-gray-500">
                          {transaction.montantEUR.toFixed(2)} EUR
                        </div>
                      )}
                    </td>
                    <td className="w-64 px-4 py-3">
                      <div className="max-w-full">
                        <p className="text-sm text-gray-900 truncate" title={transaction.libelleComplet}>
                          {transaction.libelleComplet}
                        </p>
                      </div>
                    </td>
                    <td className="w-48 px-4 py-3 text-sm text-gray-700">
                      <div className="truncate" title={transaction.contrepartie}>
                        {transaction.contrepartie}
                      </div>
                    </td>
                    <td className="w-28 px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">
                          {paymentIcons[transaction.typePaiement]}
                        </span>
                        <span className="text-xs text-gray-700 truncate">
                          {paymentLabels[transaction.typePaiement]}
                        </span>
                      </div>
                    </td>
                    <td className="w-16 px-4 py-3 text-center">
                      {transaction.justificatif ? (
                        <button
                          onClick={() => handleOpenJustificatif(transaction)}
                          className="p-1 text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded transition-colors"
                        >
                          <Paperclip className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>
                    <td className="w-32 px-4 py-3">
                      <div className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        statusConfig[transaction.statut].bgColor,
                        statusConfig[transaction.statut].color
                      )}>
                        {statusConfig[transaction.statut].icon}
                        {statusConfig[transaction.statut].label}
                      </div>
                    </td>
                    <td className="w-16 px-4 py-3 text-center">
                      <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {/* Pagination - fixe au bas */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
          <div className="text-sm text-gray-700">
            Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} sur {filteredTransactions.length} transactions
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>

      {/* DocumentViewer */}
      <ViewerComponent mode="auto" glassMorphism={true} />
    </div>
  );
}