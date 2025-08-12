'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useDrillDown } from '@/contexts/DrillDownContext';
import TimelineView from '../TimelineView';

interface TimelineAdapterProps {
  accountId: string;
  accountLabel: string;
}

export const TimelineAdapter: React.FC<TimelineAdapterProps> = ({
  accountId,
  accountLabel,
}) => {
  const { navigateBack, navigationState } = useDrillDown();

  // Générer des données mockées pour la timeline selon le format attendu
  const mockTransactions = [
    {
      id: '1',
      date: new Date('2025-01-15'),
      label: 'Facture client ABC',
      amount: 5420,
      clientId: 'ABC',
      invoiceNumber: 'FA-2025-001',
      status: 'pending' as const,
      description: 'Prestation de service janvier',
    },
    {
      id: '2',
      date: new Date('2025-01-10'),
      label: 'Paiement reçu XYZ',
      amount: 3200,
      clientId: 'XYZ',
      invoiceNumber: 'FA-2024-042',
      status: 'paid' as const,
      description: 'Règlement facture décembre',
    },
    {
      id: '3',
      date: new Date('2025-01-05'),
      label: 'Avoir client DEF',
      amount: 450,
      clientId: 'DEF',
      invoiceNumber: 'AV-2025-001',
      status: 'paid' as const,
      description: 'Remise commerciale',
    },
    {
      id: '4',
      date: new Date('2024-12-28'),
      label: 'Facture client GHI',
      amount: 8750,
      clientId: 'GHI',
      invoiceNumber: 'FA-2024-038',
      status: 'overdue' as const,
      description: 'Vente marchandises',
    },
    {
      id: '5',
      date: new Date('2024-12-20'),
      label: 'Paiement partiel JKL',
      amount: 2000,
      clientId: 'JKL',
      invoiceNumber: 'FA-2024-035',
      status: 'partial' as const,
      description: 'Acompte sur commande',
    },
  ];

  // Séparer en débits et crédits
  const debits = mockTransactions.filter(t => t.label.includes('Avoir') || t.label.includes('Charge'));
  const credits = mockTransactions.filter(t => !t.label.includes('Avoir') && !t.label.includes('Charge'));
  
  // Calculer les totaux
  const totals = {
    totalDebits: debits.reduce((sum, t) => sum + t.amount, 0),
    totalCredits: credits.reduce((sum, t) => sum + t.amount, 0),
    balance: credits.reduce((sum, t) => sum + t.amount, 0) - debits.reduce((sum, t) => sum + t.amount, 0),
  };

  // Breadcrumb pour navigation
  const breadcrumb = navigationState.breadcrumb;

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-4">
      {/* Header avec navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 p-4"
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={navigateBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          
          <div className="text-xs text-neutral-500">
            {breadcrumb.map((item, index) => (
              <span key={index}>
                {index > 0 && ' / '}
                {item.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900">
            {accountLabel}
          </h2>
          <p className="text-neutral-600">
            Historique des mouvements du compte
          </p>
        </div>
      </motion.div>

      {/* Timeline View adaptée */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-xl rounded-xl border border-white/20 p-6"
      >
        <TimelineView
          debits={debits}
          credits={credits}
          totals={totals}
          selectedTransaction={null}
          findLinkedTransactions={() => []}
          onTransactionSelect={() => {}}
          clientType="client"
        />
      </motion.div>
    </div>
  );
};