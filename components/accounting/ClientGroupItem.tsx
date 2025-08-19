'use client';

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown,
  ChevronRight,
  FileText,
  DollarSign,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar
} from 'lucide-react';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { ClientGroup, TransactionDetail } from '@/types/accounting';

interface ClientGroupItemProps {
  group: ClientGroup;
  isExpanded: boolean;
  isReceivable: boolean;
  onToggle: (groupId: string) => void;
  onActionClick: (action: string, group: ClientGroup, event?: React.MouseEvent) => void;
  expertMode: boolean;
}

const ClientGroupItem = memo<ClientGroupItemProps>(({
  group,
  isExpanded,
  isReceivable,
  onToggle,
  onActionClick,
  expertMode
}) => {
  const { formatAmount } = useExpertMode();

  const getTransactionIcon = (type: TransactionDetail['type']) => {
    switch (type) {
      case 'invoice':
        return <FileText className="w-4 h-4" />;
      case 'payment':
        return <DollarSign className="w-4 h-4" />;
      case 'credit_note':
        return <CreditCard className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
            <CheckCircle className="w-3 h-3" />
            {expertMode ? 'Lettré' : 'Payé'}
          </span>
        );
      case 'partial':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            {expertMode ? 'Lettrage partiel' : 'Partiel'}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs">
            <Clock className="w-3 h-3" />
            {expertMode ? 'Non lettré' : 'En attente'}
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
            <AlertCircle className="w-3 h-3" />
            {expertMode ? 'Échu' : 'En retard'}
          </span>
        );
      default:
        return null;
    }
  };

  const getGroupStatus = (group: ClientGroup) => {
    const hasOverdue = group.transactions.some(t => t.status === 'overdue');
    const allPaid = group.transactions.every(t => t.status === 'paid');
    const hasPartial = group.transactions.some(t => t.status === 'partial');

    if (hasOverdue) return 'overdue';
    if (allPaid) return 'paid';
    if (hasPartial) return 'partial';
    return 'pending';
  };

  const groupStatus = getGroupStatus(group);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      {/* En-tête du groupe */}
      <div
        className="p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
        onClick={() => {
          onToggle(group.id);
          // Option pour ouvrir directement la vue détaillée
          if (!expertMode) {
            onActionClick('view_detail', group);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button className="p-1 hover:bg-neutral-100 rounded">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            <div className="flex items-center gap-3">
              {/* Avatar avec initiales */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                group.color || 'bg-gradient-to-br from-blue-500 to-purple-600'
              }`}>
                {group.initials || group.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold">{group.name}</h3>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mt-0.5">
                  <span>{group.transactions.length} {expertMode ? 'écritures' : 'opérations'}</span>
                  {group.daysOldest && group.daysOldest > 30 && (
                    <span className="text-orange-600">
                      Plus ancienne : {group.daysOldest} jours
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-neutral-500">
                {isReceivable ? 'Vous doit' : 'À payer'}
              </div>
              <div className={`text-xl font-bold ${
                group.totalDue > 0 
                  ? (isReceivable ? 'text-red-600' : 'text-red-600')
                  : 'text-neutral-400'
              }`}>
                {formatAmount(Math.abs(group.totalDue))}
              </div>
            </div>
            {getStatusBadge(groupStatus)}
          </div>
        </div>
      </div>

      {/* Détails expandés */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="border-t border-neutral-100"
          >
            <div className="p-4 bg-neutral-50">
              {/* Liste des transactions */}
              <div className="space-y-2 mb-4">
                {group.transactions.map((transaction) => (
                  <div
                    key={`${transaction.type}-${transaction.id}`}
                    className="flex items-center justify-between p-3 bg-white rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${
                        transaction.type === 'payment' 
                          ? 'bg-green-50 text-green-600'
                          : transaction.type === 'credit_note'
                          ? 'bg-orange-50 text-orange-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {transaction.label}
                          </span>
                          <span className="text-xs text-neutral-400">
                            {transaction.reference}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-neutral-500 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(transaction.date).toLocaleDateString('fr-FR')}
                          </span>
                          {transaction.linkedTo && transaction.linkedTo.length > 0 && (
                            <span className="text-green-600">
                              {expertMode 
                                ? `Lettré avec ${transaction.linkedTo.join(', ')}`
                                : `Lié à ${transaction.linkedTo.length} opération(s)`
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-semibold ${
                        transaction.type === 'payment'
                          ? 'text-green-600'
                          : transaction.type === 'credit_note'
                          ? 'text-orange-600'
                          : 'text-neutral-900'
                      }`}>
                        {transaction.type === 'payment' ? '-' : ''}
                        {formatAmount(transaction.amount)}
                      </div>
                      {getStatusBadge(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé et actions */}
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-sm">
                  <span className="text-neutral-500">Solde :</span>
                  <span className={`ml-2 font-bold ${
                    group.totalDue > 0 
                      ? (isReceivable ? 'text-green-600' : 'text-red-600')
                      : 'text-neutral-400'
                  }`}>
                    {formatAmount(Math.abs(group.totalDue))}
                    {group.totalDue > 0 && (
                      <span className="text-xs ml-1">
                        {isReceivable ? 'à recevoir' : 'à payer'}
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex gap-2">
                  {isReceivable ? (
                    <>
                      <button
                        onClick={(e) => onActionClick('send_reminder', group, e)}
                        className="px-3 py-1.5 text-xs bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100"
                      >
                        Relancer
                      </button>
                      <button
                        onClick={(e) => onActionClick('record_payment', group, e)}
                        className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                      >
                        Enregistrer paiement
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={(e) => onActionClick('schedule_payment', group, e)}
                        className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"
                      >
                        Planifier
                      </button>
                      <button
                        onClick={(e) => onActionClick('pay_now', group, e)}
                        className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                      >
                        Payer
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

ClientGroupItem.displayName = 'ClientGroupItem';

export default ClientGroupItem;