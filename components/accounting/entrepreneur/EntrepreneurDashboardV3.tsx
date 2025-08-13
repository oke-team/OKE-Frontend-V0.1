'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDrillDown } from '@/contexts/DrillDownContext';
import { AccountListView } from './AccountListView';
import { TimelineAdapter } from './TimelineAdapter';
import { 
  bilanCards, 
  resultatCards, 
  calculatedCards,
  getAccountGroupData 
} from '@/lib/entrepreneur-cards-config';

// Import des icônes Lucide
import { 
  Wallet, Users, Package, Users2, Shield, Receipt, FileText, Package2, CreditCard,
  BarChart3, ShoppingCart, Briefcase, Building, Percent, AlertTriangle, Plus,
  Calculator, Trophy, TrendingUp, TrendingDown, ChevronRight, ArrowUp, ArrowDown,
  Coins, HandCoins, Landmark, FileCheck, FileWarning, MoreHorizontal
} from 'lucide-react';

// Map des icônes
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Wallet, Users, Package, Users2, Shield, Receipt, FileText, Package2, CreditCard,
  BarChart3, ShoppingCart, Briefcase, Building, Percent, AlertTriangle, Plus,
  Calculator, Trophy, Landmark, FileCheck, FileWarning, MoreHorizontal, TrendingUp
};

interface EntrepreneurDashboardV3Props {
  data?: Record<string, any>;
  loading?: boolean;
}

export const EntrepreneurDashboardV3: React.FC<EntrepreneurDashboardV3Props> = ({
  data = {},
  loading = false,
}) => {
  const { navigationState, navigateToAccounts } = useDrillDown();
  const [activeTab, setActiveTab] = useState<'bilan' | 'resultat'>('bilan');

  // Si on n'est pas au niveau dashboard, afficher la vue appropriée
  if (navigationState.level === 'accounts' && navigationState.selectedCard) {
    const groups = getAccountGroupData(navigationState.selectedCard);
    const card = [...bilanCards, ...resultatCards].find(c => c.id === navigationState.selectedCard);
    
    if (groups && card) {
      return (
        <AccountListView
          cardId={navigationState.selectedCard}
          cardLabel={card.title}
          groups={groups}
          cardColor={card.color}
        />
      );
    }
  }

  if (navigationState.level === 'timeline' && navigationState.selectedAccount) {
    const accountLabel = navigationState.breadcrumb[navigationState.breadcrumb.length - 1]?.label || 'Compte';
    // Récupérer la couleur depuis le card parent
    const parentCardId = navigationState.selectedCard;
    const parentCard = [...bilanCards, ...resultatCards].find(c => c.id === parentCardId);
    
    return (
      <TimelineAdapter
        accountId={navigationState.selectedAccount}
        accountLabel={accountLabel}
        cardColor={parentCard?.color}
      />
    );
  }

  // Séparer les cartes bilan en actif et passif
  const activeBilanCards = bilanCards.filter(card => 
    ['immobilisations', 'treasury', 'clients', 'stocks', 'other_receivables'].includes(card.id)
  );
  
  const passiveBilanCards = bilanCards.filter(card => 
    ['capital', 'group_associates', 'debts', 'suppliers', 'payroll', 'social', 'vat', 'tax', 'other_debts'].includes(card.id)
  );

  // Séparer les cartes résultat en produits et charges
  const productCards = resultatCards.filter(card => 
    ['revenue', 'financial_income', 'other_income'].includes(card.id)
  );
  
  const chargeCards = resultatCards.filter(card => 
    ['purchases', 'external', 'wages', 'taxes', 'financial', 'other_charges'].includes(card.id)
  );

  const renderCard = (card: typeof bilanCards[0] | typeof resultatCards[0], index: number, size: 'small' | 'normal' = 'normal') => {
    const Icon = iconMap[card.icon];
    const cardData = data[card.id] || {};
    
    const getDefaultAmount = (id: string) => {
      const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (hash * 1000) % 100000 + 10000;
    };
    
    const getDefaultAmountN1 = (currentAmount: number, id: string) => {
      // Génère un montant N-1 cohérent basé sur le montant actuel
      const hash = id.charCodeAt(0) || 0;
      const variation = (hash % 30 - 15) / 100; // Variation entre -15% et +15%
      return Math.round(currentAmount / (1 + variation));
    };
    
    const getDefaultTrend = (amount: number, amountN1: number) => {
      if (amount > amountN1 * 1.02) return 'up';
      if (amount < amountN1 * 0.98) return 'down';
      return 'stable';
    };
    
    const amount = cardData.amount || getDefaultAmount(card.id);
    const amountN1 = cardData.amountN1 || getDefaultAmountN1(amount, card.id);
    const trend = getDefaultTrend(amount, amountN1);

    const isSmall = size === 'small';

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => navigateToAccounts(card.id, card.title)}
        className={cn(
          "relative bg-white/80 backdrop-blur-xl rounded-xl border border-white/20",
          isSmall ? "p-4" : "p-6",
          "cursor-pointer hover:shadow-lg transition-all duration-300",
          "hover:-translate-y-1 group"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={cn(
              isSmall ? "p-1.5" : "p-2",
              "rounded-lg",
              card.color === 'violet' && "bg-gradient-to-br from-violet-500 to-purple-600",
              card.color === 'green' && "bg-gradient-to-br from-green-500 to-emerald-600",
              card.color === 'red' && "bg-gradient-to-br from-red-500 to-rose-600",
              card.color === 'blue' && "bg-gradient-to-br from-blue-500 to-cyan-600",
              card.color === 'orange' && "bg-gradient-to-br from-orange-500 to-amber-600"
            )}>
              {Icon && <Icon className={cn(isSmall ? "w-4 h-4" : "w-5 h-5", "text-white")} />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={cn("font-semibold text-neutral-900 truncate", isSmall && "text-sm")}>
                {card.title}
              </h3>
              {!isSmall && card.description && (
                <p className="text-xs text-neutral-500 mt-0.5 truncate">{card.description}</p>
              )}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0" />
        </div>

        {/* Montant */}
        <div className="mb-2">
          <div className={cn("font-bold text-neutral-900", isSmall ? "text-xl" : "text-2xl")}>
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(amount)}
          </div>
        </div>

        {/* Comparaison N-1 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="w-3 h-3 text-red-500" />
              ) : (
                <div className="w-3 h-3" />
              )}
              <span className="text-xs text-neutral-500">N-1:</span>
              <span className={cn(
                "text-xs font-medium",
                trend === 'up' && "text-green-600",
                trend === 'down' && "text-red-600",
                trend === 'stable' && "text-neutral-600"
              )}>
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(amountN1)}
              </span>
            </div>
          </div>
          <span className="text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Détails →
          </span>
        </div>
      </motion.div>
    );
  };

  const renderCalculatedCard = (card: typeof calculatedCards[0], index: number) => {
    const Icon = iconMap[card.icon];
    
    let value = 0;
    let valueN1 = 0;
    
    if (card.id === 'gross_margin') {
      const revenue = data.revenue?.amount || 285000;
      const purchases = data.purchases?.amount || 60000;
      value = revenue - purchases;
      
      const revenueN1 = data.revenue?.amountN1 || 250000;
      const purchasesN1 = data.purchases?.amountN1 || 55000;
      valueN1 = revenueN1 - purchasesN1;
    } else if (card.id === 'net_result') {
      value = data.netResult?.amount || 45000;
      valueN1 = data.netResult?.amountN1 || 38000;
    }
    
    const trend = value > valueN1 * 1.02 ? 'up' : value < valueN1 * 0.98 ? 'down' : 'stable';

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className={cn(
          "relative bg-gradient-to-br",
          card.color === 'violet' && "from-violet-50 to-purple-50",
          card.color === 'green' && "from-green-50 to-emerald-50",
          "rounded-xl border border-white/20 p-6"
        )}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              card.color === 'violet' && "bg-gradient-to-br from-violet-500 to-purple-600",
              card.color === 'green' && "bg-gradient-to-br from-green-500 to-emerald-600"
            )}>
              {Icon && <Icon className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{card.title}</h3>
              <p className="text-xs text-neutral-500">{card.description}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-3xl font-bold">
            <span className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              card.color === 'violet' && "from-violet-600 to-purple-600",
              card.color === 'green' && "from-green-600 to-emerald-600"
            )}>
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(value)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : (
              <div className="w-3 h-3" />
            )}
            <span className="text-xs text-neutral-500">N-1:</span>
            <span className={cn(
              "text-sm font-medium",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {new Intl.NumberFormat('fr-FR', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(valueN1)}
            </span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100/50 backdrop-blur-sm rounded-xl">
        <button
          onClick={() => setActiveTab('bilan')}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm relative overflow-hidden",
            activeTab === 'bilan'
              ? "bg-white text-purple-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        >
          {activeTab === 'bilan' && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-600" />
          )}
          Bilan (Situation)
        </button>
        <button
          onClick={() => setActiveTab('resultat')}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm relative overflow-hidden",
            activeTab === 'resultat'
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
          )}
        >
          {activeTab === 'resultat' && (
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600" />
          )}
          Résultat (Période)
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'bilan' ? (
          <motion.div
            key="bilan"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Section ACTIF (Ce que l'entreprise possède) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <HandCoins className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-neutral-800">Actif</h2>
                <span className="text-sm text-neutral-500">(Ce que l'entreprise possède)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeBilanCards.map((card, index) => renderCard(card, index))}
              </div>
            </div>

            {/* Séparateur visuel */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-neutral-500">•••</span>
              </div>
            </div>

            {/* Section PASSIF (D'où vient l'argent) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <Coins className="w-5 h-5 text-orange-600" />
                <h2 className="text-lg font-semibold text-neutral-800">Passif</h2>
                <span className="text-sm text-neutral-500">(D'où vient l'argent)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {passiveBilanCards.map((card, index) => renderCard(card, index))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="resultat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Section Produits (Entrées) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <ArrowUp className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-neutral-800">Vos revenus</h2>
                <span className="text-sm text-neutral-500">(Produits)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productCards.map((card, index) => renderCard(card, index))}
              </div>
            </div>

            {/* Séparateur visuel */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-neutral-500">•••</span>
              </div>
            </div>

            {/* Section Charges (Sorties) */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-2">
                <ArrowDown className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-neutral-800">Vos dépenses</h2>
                <span className="text-sm text-neutral-500">(Charges)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {chargeCards.map((card, index) => renderCard(card, index, 'small'))}
              </div>
            </div>

            {/* Cartes calculées */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-neutral-500">Résultats</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculatedCards.map((card, index) => renderCalculatedCard(card, index))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};