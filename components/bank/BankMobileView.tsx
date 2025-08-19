'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paperclip,
  CheckCircle,
  Clock,
  XCircle,
  Check,
  Link2,
  Eye,
  X
} from 'lucide-react';
import { BankTransactionExtended, bankAccounts, calculateBalanceSummary } from '@/lib/mock-data/bank-transactions';
import BankFilters from './BankFilters';
import BankBalanceWidgets, { BankAccount, BalanceSummary } from './BankBalanceWidgets';
import TransactionDetailsSheet from './TransactionDetailsSheet';
import { fadeInUp, bottomSheet } from '@/lib/animations/variants';
import { cn } from '@/lib/utils';

interface BankMobileViewProps {
  transactions: BankTransactionExtended[];
  selectedTransactions: Set<string>;
  onToggleSelection: (id: string) => void;
  onOpenJustificatif: (transaction: BankTransactionExtended) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  filters: any;
  onFiltersChange: (filters: any) => void;
  stats: {
    total: number;
    debits: number;
    credits: number;
    nonRapproche: number;
  };
  showBalances: boolean;
  onToggleVisibility: () => void;
  selectedAccounts: string[];
  onAccountToggle: (accountId: string) => void;
}

const statusConfig = {
  rapproche: {
    icon: <CheckCircle className="w-3 h-3" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    label: 'Rapproché'
  },
  en_attente: {
    icon: <Clock className="w-3 h-3" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    label: 'En attente'
  },
  non_rapproche: {
    icon: <XCircle className="w-3 h-3" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    label: 'Non rapproché'
  }
};

const paymentTypeLabels = {
  virement: 'Virement',
  carte: 'Carte',
  cheque: 'Chèque',
  especes: 'Espèces',
  prelevement: 'Prélèvement',
  remise_cheques: 'Remise'
};

export default function BankMobileView({
  transactions,
  selectedTransactions,
  onToggleSelection,
  onOpenJustificatif,
  searchTerm,
  onSearchChange,
  showFilters,
  onToggleFilters,
  filters,
  onFiltersChange,
  stats,
  showBalances,
  onToggleVisibility,
  selectedAccounts,
  onAccountToggle
}: BankMobileViewProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<BankTransactionExtended | null>(null);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);

  const handleTransactionClick = (transaction: BankTransactionExtended) => {
    setSelectedTransaction(transaction);
    setShowDetailsSheet(true);
  };

  const handleSwipeAction = (transaction: BankTransactionExtended, action: 'reconcile' | 'view' | 'link') => {
    if (action === 'view' && transaction.justificatif) {
      onOpenJustificatif(transaction);
    } else if (action === 'reconcile') {
      console.log('Rapprocher', transaction.id);
    } else if (action === 'link') {
      console.log('Lier comptabilité', transaction.id);
    }
  };

  // Exposer la fonction toggle filters pour le menu actions magiques
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).toggleBankFiltersMobile = onToggleFilters;
      return () => {
        delete (window as any).toggleBankFiltersMobile;
      };
    }
  }, [onToggleFilters]);

  // Calculer le summary avec les comptes sélectionnés
  const balanceSummary = calculateBalanceSummary(selectedAccounts);
  
  // Limiter les comptes affichés sur mobile (maximum 3 + le widget total)
  const mobileAccounts = bankAccounts.slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Widgets de solde mobile - limités */}
      <div className="px-1">
        <BankBalanceWidgets
          accounts={mobileAccounts}
          summary={balanceSummary}
          showBalances={showBalances}
          onToggleVisibility={onToggleVisibility}
          selectedAccounts={selectedAccounts}
          onAccountToggle={onAccountToggle}
          className="gap-2"
        />
      </div>

      {/* Actions de sélection uniquement si des items sont sélectionnés */}
      {selectedTransactions.size > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            {selectedTransactions.size} sélectionné(s)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => console.log('Rapprocher')}
              className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                // Clear selection logic would go here
              }}
              className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Filtres */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <BankFilters
              filters={filters}
              onFiltersChange={onFiltersChange}
              onClose={onToggleFilters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste des transactions */}
      <div className="space-y-2">
        <AnimatePresence>
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ delay: index * 0.02 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              onClick={() => handleTransactionClick(transaction)}
            >
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('fr-FR')}
                      </span>
                      <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded">
                        {paymentTypeLabels[transaction.typePaiement]}
                      </span>
                      {transaction.justificatif && (
                        <Paperclip className="w-3 h-3 text-[#4C34CE]" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">
                      {transaction.contrepartie}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {transaction.libelleComplet}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <p className={cn(
                      "font-semibold",
                      transaction.montant < 0 ? "text-red-600" : "text-green-600"
                    )}>
                      {transaction.montant < 0 ? '-' : '+'}{Math.abs(transaction.montant).toFixed(2)} €
                    </p>
                    <div className={cn(
                      "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs mt-1",
                      statusConfig[transaction.statut].bgColor,
                      statusConfig[transaction.statut].color
                    )}>
                      {statusConfig[transaction.statut].icon}
                      <span className="hidden xs:inline">{statusConfig[transaction.statut].label}</span>
                    </div>
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
                  {transaction.statut !== 'rapproche' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwipeAction(transaction, 'reconcile');
                      }}
                      className="flex-1 py-1 px-2 text-xs text-green-600 hover:bg-green-50 rounded transition-colors"
                    >
                      <Check className="w-3 h-3 inline mr-1" />
                      Rapprocher
                    </button>
                  )}
                  {transaction.justificatif && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSwipeAction(transaction, 'view');
                      }}
                      className="flex-1 py-1 px-2 text-xs text-[#4C34CE] hover:bg-[#4C34CE]/10 rounded transition-colors"
                    >
                      <Eye className="w-3 h-3 inline mr-1" />
                      Justif.
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSwipeAction(transaction, 'link');
                    }}
                    className="flex-1 py-1 px-2 text-xs text-gray-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Link2 className="w-3 h-3 inline mr-1" />
                    Compta
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Sheet pour les détails */}
      <AnimatePresence>
        {showDetailsSheet && selectedTransaction && (
          <TransactionDetailsSheet
            transaction={selectedTransaction}
            onClose={() => {
              setShowDetailsSheet(false);
              setSelectedTransaction(null);
            }}
            onOpenJustificatif={onOpenJustificatif}
          />
        )}
      </AnimatePresence>
    </div>
  );
}