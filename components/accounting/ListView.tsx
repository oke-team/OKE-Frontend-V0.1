'use client';

import React, { memo } from 'react';
import { MoreVertical, FileText, DollarSign, CreditCard, TrendingDown } from 'lucide-react';
import { Transaction, TransactionTotals } from '@/types/accounting';
import { useExpertMode } from '@/contexts/ExpertModeContext';

interface ListViewProps {
  transactions: Transaction[];
  totals: TransactionTotals;
}

const ListView = memo<ListViewProps>(({ transactions, totals }) => {
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

  const sortedTransactions = transactions.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Référence</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Libellé</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Débit</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Crédit</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-neutral-500 uppercase">Statut</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {sortedTransactions.map((transaction) => (
              <tr key={`${transaction.type}-${transaction.id}`} className="hover:bg-neutral-50">
                <td className="px-4 py-3 text-sm">
                  {new Date(transaction.date).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-4 py-3">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                    transaction.type === 'invoice' ? 'bg-blue-50 text-blue-600' :
                    transaction.type === 'payment' ? 'bg-green-50 text-green-600' :
                    transaction.type === 'credit_note' ? 'bg-orange-50 text-orange-600' :
                    'bg-neutral-50 text-neutral-600'
                  }`}>
                    {getTransactionIcon(transaction.type)}
                    <span>
                      {transaction.type === 'invoice' ? 'Facture' :
                       transaction.type === 'payment' ? 'Paiement' :
                       transaction.type === 'credit_note' ? 'Avoir' :
                       'Dépense'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-mono">{transaction.reference}</td>
                <td className="px-4 py-3 text-sm">{transaction.label}</td>
                <td className="px-4 py-3 text-sm text-right font-semibold">
                  {(transaction.type === 'invoice' || transaction.type === 'expense') && formatAmount(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">
                  {(transaction.type === 'payment' || transaction.type === 'credit_note') && formatAmount(transaction.amount)}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${getStatusColor(transaction.status)}`}>
                    {getStatusLabel(transaction.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="p-1 hover:bg-neutral-100 rounded">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-neutral-50 border-t-2 border-neutral-200">
            <tr>
              <td colSpan={4} className="px-4 py-3 text-sm font-semibold">Totaux</td>
              <td className="px-4 py-3 text-right font-bold text-red-600">{formatAmount(totals.totalDebits)}</td>
              <td className="px-4 py-3 text-right font-bold text-green-600">{formatAmount(totals.totalCredits)}</td>
              <td colSpan={2} className="px-4 py-3 text-right">
                <span className="text-sm text-neutral-500 mr-2">Solde:</span>
                <span className={`font-bold ${totals.balance > 0 ? 'text-red-600' : totals.balance < 0 ? 'text-green-600' : 'text-neutral-600'}`}>
                  {formatAmount(Math.abs(totals.balance))}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
});

ListView.displayName = 'ListView';

export default ListView;