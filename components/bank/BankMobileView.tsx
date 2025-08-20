'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paperclip,
  CheckCircle,
  Clock,
  XCircle,
  Check,
  X
} from 'lucide-react';
import { BankTransactionExtended, bankAccounts, calculateBalanceSummary } from '@/lib/mock-data/bank-transactions';
import BankFilters from './BankFilters';
import BankBalanceWidgets, { BankAccount, BalanceSummary } from './BankBalanceWidgets';
import TransactionDetailsSheet from './TransactionDetailsSheet';
import BankTransactionModal from './BankTransactionModal';
import { fadeInUp, bottomSheet } from '@/lib/animations/variants';
import { cn, formatTransactionAmount } from '@/lib/utils';

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
  const [modalTransaction, setModalTransaction] = useState<BankTransactionExtended | null>(null);

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

      {/* Liste des transactions - Cards compactes style Monzo */}
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
              className="bg-white rounded-xl shadow-sm border border-gray-50 overflow-hidden hover:shadow-md transition-all duration-200"
              onClick={() => handleTransactionClick(transaction)}
              onDoubleClick={() => setModalTransaction(transaction)}
            >
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    {/* Status indicator en début */}
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0",
                      transaction.statut === 'rapproche' ? 'bg-green-500' : 
                      transaction.statut === 'en_attente' ? 'bg-orange-500' : 'bg-red-500'
                    )}></div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Ligne 1: Contrepartie/Objet */}
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 truncate">
                          {transaction.objet || transaction.contrepartie}
                        </h3>
                      </div>
                      
                      {/* Ligne 2: Libellé compacte */}
                      <p className="text-xs text-gray-600 line-clamp-1 mb-1">
                        {transaction.libelleComplet}
                      </p>
                      
                      {/* Ligne 3: Métadonnées avec banque */}
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <span className="text-xs">{transaction.banqueIcone}</span>
                          {paymentTypeLabels[transaction.typePaiement]}
                        </span>
                        {transaction.justificatif && (
                          <span className="flex items-center gap-1 text-[#4C34CE]">
                            <Paperclip className="w-3 h-3" />
                          </span>
                        )}
                        {transaction.lettrage && (
                          <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                            {transaction.lettrage}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Date et Montant alignés à droite */}
                  <div className="text-right ml-3 flex-shrink-0">
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(transaction.date).toLocaleDateString('fr-FR', { 
                        day: '2-digit', 
                        month: 'short',
                        year: '2-digit'
                      })}
                    </div>
                    <p className={cn(
                      "text-sm font-bold",
                      transaction.montant < 0 ? "text-red-600" : "text-green-600"
                    )}>
                      {formatTransactionAmount(transaction.montant, 'EUR', false)}
                    </p>
                  </div>
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

      {/* Modal de rapprochement */}
      <BankTransactionModal
        isOpen={modalTransaction !== null}
        onClose={() => setModalTransaction(null)}
        transaction={modalTransaction}
        onUpdate={(updatedTransaction) => {
          // On ne peut pas directement modifier les transactions ici
          // car c'est géré par le composant parent
          console.log('Transaction mise à jour:', updatedTransaction);
          setModalTransaction(null);
        }}
      />
    </div>
  );
}