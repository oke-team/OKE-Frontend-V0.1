'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { useExpertMode } from '@/contexts/ExpertModeContext';
import { Transaction, ClientDetail, TransactionTotals } from '@/types/accounting';
import ClientHeader from './ClientHeader';
import ViewModeToggle from './ViewModeToggle';
import TimelineView from './TimelineView';
import ListView from './ListView';
import QuickActions from './QuickActions';

// Types importés depuis /types/accounting.ts

interface ClientDetailViewProps {
  client: ClientDetail;
  onBack: () => void;
  onActionClick?: (action: string, data?: unknown) => void;
}

export default function ClientDetailView({ 
  client, 
  onBack,
  onActionClick 
}: ClientDetailViewProps) {
  const { formatAmount, expertMode } = useExpertMode();
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');

  // Optimisation: Calculs coûteux avec useMemo
  const { debits, credits, totals } = useMemo(() => {
    const debitsTransactions = client.transactions.filter(t => 
      t.type === 'invoice' || t.type === 'expense'
    );
    
    const creditsTransactions = client.transactions.filter(t => 
      t.type === 'payment' || t.type === 'credit_note'
    );

    const totalDebits = debitsTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalCredits = creditsTransactions.reduce((sum, t) => sum + t.amount, 0);
    const balance = totalDebits - totalCredits;

    return {
      debits: debitsTransactions,
      credits: creditsTransactions,
      totals: {
        totalDebits,
        totalCredits,
        balance,
        countPaid: client.transactions.filter(t => t.status === 'paid').length,
        countPending: client.transactions.filter(t => t.status === 'pending').length,
        countOverdue: client.transactions.filter(t => t.status === 'overdue').length,
      } as TransactionTotals
    };
  }, [client.transactions]);

  // Optimisation: Handlers avec useCallback
  const handleTransactionSelect = useCallback((transactionId: string) => {
    setSelectedTransaction(prev => prev === transactionId ? null : transactionId);
  }, []);

  const handleViewModeChange = useCallback((mode: 'timeline' | 'list') => {
    setViewMode(mode);
  }, []);

  const handleActionClick = useCallback((action: string, data?: unknown) => {
    onActionClick?.(action, data);
  }, [onActionClick]);

  // Optimisation: Mise en cache des transactions liées
  const linkedTransactionsMap = useMemo(() => {
    const map = new Map<string, Transaction[]>();
    
    client.transactions.forEach(transaction => {
      if (transaction.linkedTo) {
        const linked = client.transactions.filter(t => 
          transaction.linkedTo?.includes(t.id) || t.linkedTo?.includes(transaction.id)
        );
        map.set(transaction.id, linked);
      } else {
        map.set(transaction.id, []);
      }
    });
    
    return map;
  }, [client.transactions]);

  const findLinkedTransactions = useCallback((transactionId: string) => {
    return linkedTransactionsMap.get(transactionId) || [];
  }, [linkedTransactionsMap]);

  return (
    <div className="space-y-4">
      <ClientHeader 
        client={client}
        totals={totals}
        onBack={onBack}
        onActionClick={handleActionClick}
      />

      <ViewModeToggle 
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />

      {viewMode === 'timeline' ? (
        <TimelineView 
          debits={debits}
          credits={credits}
          totals={totals}
          selectedTransaction={selectedTransaction}
          findLinkedTransactions={findLinkedTransactions}
          onTransactionSelect={handleTransactionSelect}
          clientType={client.type}
        />
      ) : (
        <ListView 
          transactions={client.transactions}
          totals={totals}
        />
      )}

      <QuickActions 
        client={client}
        onActionClick={handleActionClick}
      />
    </div>
  );
}