'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText,
  DollarSign,
  CreditCard,
  TrendingDown,
  Link2
} from 'lucide-react';
import { Transaction } from '@/types/accounting';
import { useExpertMode } from '@/contexts/ExpertModeContext';

interface TransactionItemProps {
  transaction: Transaction;
  isSelected: boolean;
  linkedTransactions: Transaction[];
  animationDelay?: number;
  onSelect: (transactionId: string) => void;
}

const TransactionItem = memo<TransactionItemProps>(({
  transaction,
  isSelected,
  linkedTransactions,
  animationDelay = 0,
  onSelect
}) => {
  const { formatAmount, expertMode } = useExpertMode();

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'invoice': return <FileText className="w-4 h-4" />;
      case 'payment': return <DollarSign className="w-4 h-4" />;
      case 'credit_note': return <CreditCard className="w-4 h-4" />;
      case 'expense': return <TrendingDown className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-50';
      case 'partial': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'overdue': return 'text-red-600 bg-red-50';
      default: return 'text-neutral-600 bg-neutral-50';
    }
  };

  const getStatusLabel = (status: string) => {
    if (!expertMode) {
      switch (status) {
        case 'paid': return 'Payé';
        case 'partial': return 'Partiel';
        case 'pending': return 'En attente';
        case 'overdue': return 'En retard';
        default: return status;
      }
    }
    switch (status) {
      case 'paid': return 'Lettré';
      case 'partial': return 'Lettrage partiel';
      case 'pending': return 'Non lettré';
      case 'overdue': return 'Échu';
      default: return status;
    }
  };

  const isDebit = transaction.type === 'invoice' || transaction.type === 'expense';
  const isCredit = transaction.type === 'payment' || transaction.type === 'credit_note';

  return (
    <motion.div
      initial={{ opacity: 0, x: isCredit ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: animationDelay }}
      className="relative"
    >
      <div 
        className={`p-4 rounded-lg border text-left ${
          isSelected 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-neutral-200 hover:border-neutral-300'
        } cursor-pointer transition-all`}
        onClick={() => onSelect(transaction.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${
              isCredit ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {getTransactionIcon(transaction.type)}
            </div>
            <div>
              <div className="font-medium">{transaction.label}</div>
              <div className="text-xs text-neutral-500 mt-1">
                {transaction.reference} • {new Date(transaction.date).toLocaleDateString('fr-FR')}
              </div>
              {transaction.paymentMethod && (
                <div className="text-xs text-neutral-500 mt-1">
                  {transaction.paymentMethod}
                </div>
              )}
              {linkedTransactions.length > 0 && (
                <div className={`flex items-center gap-1 mt-2 text-xs ${
                  isCredit ? 'text-blue-600' : 'text-green-600'
                }`}>
                  <Link2 className="w-3 h-3" />
                  {isCredit 
                    ? `Lié à ${linkedTransactions.map(t => t.reference).join(', ')}`
                    : `Lié à ${linkedTransactions.length} paiement(s)`
                  }
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className={`font-bold text-lg ${
              isCredit ? 'text-green-600' : ''
            }`}>
              {formatAmount(transaction.amount)}
            </div>
            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
              {getStatusLabel(transaction.status)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Ligne de connexion visuelle */}
      {linkedTransactions.length > 0 && (
        <div className={`absolute top-1/2 ${isCredit ? '-left-8 w-8' : 'left-full w-4 lg:w-8'} border-t-2 border-dashed border-neutral-300`} />
      )}
    </motion.div>
  );
});

TransactionItem.displayName = 'TransactionItem';

export default TransactionItem;