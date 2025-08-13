'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { useDrillDown } from '@/contexts/DrillDownContext';
import TimelineView from '../TimelineView';
import { cn } from '@/lib/utils';
import { extractTierFromLabel, getTierAvatar } from '@/lib/mock-data/tiers-avatars';
import { TierAvatar } from '@/components/ui/TierAvatar';

interface TimelineAdapterProps {
  accountId: string;
  accountLabel: string;
  cardColor?: 'violet' | 'green' | 'red' | 'blue' | 'orange';
}

export const TimelineAdapter: React.FC<TimelineAdapterProps> = ({
  accountId,
  accountLabel,
  cardColor = 'violet',
}) => {
  const { navigateBack, navigationState } = useDrillDown();

  // Couleurs basées sur la couleur du widget parent
  const getColors = () => {
    switch(cardColor) {
      case 'violet':
        return {
          title: 'from-purple-600 to-purple-500',
          balance: 'from-purple-600 to-purple-400',
          badge: 'bg-purple-100 text-purple-700 border-purple-200'
        };
      case 'green':
        return {
          title: 'from-green-600 to-green-500',
          balance: 'from-green-600 to-green-400',
          badge: 'bg-green-100 text-green-700 border-green-200'
        };
      case 'blue':
        return {
          title: 'from-blue-600 to-blue-500',
          balance: 'from-blue-600 to-blue-400',
          badge: 'bg-blue-100 text-blue-700 border-blue-200'
        };
      case 'orange':
        return {
          title: 'from-orange-600 to-orange-500',
          balance: 'from-orange-600 to-orange-400',
          badge: 'bg-orange-100 text-orange-700 border-orange-200'
        };
      case 'red':
        return {
          title: 'from-red-600 to-red-500',
          balance: 'from-red-600 to-red-400',
          badge: 'bg-red-100 text-red-700 border-red-200'
        };
      default:
        return {
          title: 'from-gray-600 to-gray-500',
          balance: 'from-gray-600 to-gray-400',
          badge: 'bg-gray-100 text-gray-700 border-gray-200'
        };
    }
  };

  const colors = getColors();

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

  // Extraire le tiers du libellé du compte
  const tierAvatar = extractTierFromLabel(accountLabel);

  // Calculer le solde N-1 (simulation)
  const balanceN1 = Math.round(totals.balance * 0.85);
  const trend = totals.balance > balanceN1 * 1.02 ? 'up' : 
                totals.balance < balanceN1 * 0.98 ? 'down' : 'stable';

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatVariation = (current: number, previous: number) => {
    if (previous === 0) return '0%';
    const variation = ((current - previous) / Math.abs(previous)) * 100;
    const sign = variation > 0 ? '+' : '';
    return `${sign}${variation.toFixed(1)}%`;
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-4">
      {/* Header amélioré avec style Liquid Glass */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg p-4 md:p-6"
      >
        {/* Mobile: Stack vertical, Desktop: Flex horizontal */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Titre et navigation avec avatar */}
          <div className="flex items-center gap-3">
            <button
              onClick={navigateBack}
              className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm flex-shrink-0"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            {/* Avatar du tiers si disponible */}
            {tierAvatar && (
              <TierAvatar tier={tierAvatar} size="md" />
            )}
            <h1 className={cn(
              "text-xl md:text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              colors.title
            )}>
              {accountLabel}
            </h1>
          </div>
          
          {/* Section droite : Solde et statistiques */}
          <div className="flex-1 sm:flex-initial text-left sm:text-right">
            {/* Montant principal */}
            <div className={cn(
              "text-2xl md:text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              colors.balance
            )}>
              {formatCurrency(totals.balance)}
            </div>
            <p className="text-xs text-gray-500 mb-1">Solde actuel</p>

            {/* Comparaison N-1 */}
            <div className="flex items-center gap-2 sm:justify-end mt-1">
              {trend === 'up' ? (
                <TrendingUp className="w-3 md:w-4 h-3 md:h-4 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-3 md:w-4 h-3 md:h-4 text-red-500" />
              ) : (
                <div className="w-3 md:w-4 h-3 md:h-4" />
              )}
              <div className="flex items-center gap-1">
                <span className="text-xs md:text-sm text-gray-500">N-1:</span>
                <span className={cn(
                  "text-xs md:text-sm font-semibold",
                  trend === 'up' && "text-green-600",
                  trend === 'down' && "text-red-600",
                  trend === 'stable' && "text-gray-600"
                )}>
                  {formatCurrency(balanceN1)}
                </span>
                <span className={cn(
                  "text-xs md:text-sm",
                  trend === 'up' && "text-green-600",
                  trend === 'down' && "text-red-600",
                  trend === 'stable' && "text-gray-600"
                )}>
                  ({formatVariation(totals.balance, balanceN1)})
                </span>
              </div>
            </div>

            {/* Mini stats */}
            <div className="flex gap-4 text-xs mt-2">
              <div className="text-left sm:text-right">
                <span className="text-gray-500">Débits</span>
                <div className="font-semibold text-red-600">{formatCurrency(totals.totalDebits)}</div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-gray-500">Crédits</span>
                <div className="font-semibold text-green-600">{formatCurrency(totals.totalCredits)}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Timeline View avec style moderne et élégant */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Bordure colorée en haut */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1",
          cardColor === 'violet' && "bg-gradient-to-r from-purple-400 to-purple-600",
          cardColor === 'green' && "bg-gradient-to-r from-green-400 to-green-600",
          cardColor === 'blue' && "bg-gradient-to-r from-blue-400 to-blue-600",
          cardColor === 'orange' && "bg-gradient-to-r from-orange-400 to-orange-600",
          cardColor === 'red' && "bg-gradient-to-r from-red-400 to-red-600",
          !cardColor && "bg-gradient-to-r from-gray-400 to-gray-600"
        )} />
        
        {/* Header de la section avec style moderne */}
        <div className="relative bg-gradient-to-br from-gray-50 to-white border-b border-gray-100 px-6 py-5 flex items-center justify-center">
          <div className={cn(
            "inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold border",
            cardColor === 'violet' && "bg-purple-100 text-purple-700 border-purple-200",
            cardColor === 'green' && "bg-green-100 text-green-700 border-green-200",
            cardColor === 'blue' && "bg-blue-100 text-blue-700 border-blue-200",
            cardColor === 'orange' && "bg-orange-100 text-orange-700 border-orange-200",
            cardColor === 'red' && "bg-red-100 text-red-700 border-red-200",
            !cardColor && "bg-gray-100 text-gray-700 border-gray-200"
          )}>
            Timeline
          </div>
        </div>
        
        {/* Contenu de la timeline */}
        <div className="p-6">
          <TimelineView
            debits={debits}
            credits={credits}
            totals={totals}
            selectedTransaction={null}
            findLinkedTransactions={() => []}
            onTransactionSelect={() => {}}
            clientType="client"
            themeColor={cardColor}
          />
        </div>
      </motion.div>
    </div>
  );
};