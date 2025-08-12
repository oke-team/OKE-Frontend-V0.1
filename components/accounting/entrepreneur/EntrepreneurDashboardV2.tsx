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
  Calculator, Trophy, TrendingUp, TrendingDown, ChevronRight, ArrowRight
} from 'lucide-react';

// Map des icônes
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Wallet, Users, Package, Users2, Shield, Receipt, FileText, Package2, CreditCard,
  BarChart3, ShoppingCart, Briefcase, Building, Percent, AlertTriangle, Plus,
  Calculator, Trophy
};

interface EntrepreneurDashboardV2Props {
  data?: Record<string, any>;
  loading?: boolean;
}

export const EntrepreneurDashboardV2: React.FC<EntrepreneurDashboardV2Props> = ({
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
        />
      );
    }
  }

  if (navigationState.level === 'timeline' && navigationState.selectedAccount) {
    // Récupérer le label du compte depuis le breadcrumb
    const accountLabel = navigationState.breadcrumb[navigationState.breadcrumb.length - 1]?.label || 'Compte';
    
    return (
      <TimelineAdapter
        accountId={navigationState.selectedAccount}
        accountLabel={accountLabel}
      />
    );
  }

  // Vue Dashboard (niveau 1)
  const renderCard = (card: typeof bilanCards[0] | typeof resultatCards[0], index: number) => {
    const Icon = iconMap[card.icon];
    const cardData = data[card.id] || {};
    
    // Utiliser des valeurs déterministes basées sur l'index de la carte
    const getDefaultAmount = (id: string) => {
      const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return (hash * 1000) % 100000 + 10000;
    };
    
    const getDefaultTrend = (id: string) => {
      const hash = id.charCodeAt(0);
      return ['up', 'down', 'stable'][hash % 3];
    };
    
    const getDefaultEvolution = (id: string) => {
      const hash = id.charCodeAt(1) || 0;
      return ((hash % 20) - 10).toFixed(1);
    };
    
    const amount = cardData.amount || getDefaultAmount(card.id);
    const trend = cardData.trend || getDefaultTrend(card.id);
    const evolution = cardData.evolution || getDefaultEvolution(card.id);

    return (
      <motion.div
        key={card.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        onClick={() => navigateToAccounts(card.id, card.title)}
        className={cn(
          "relative bg-white/80 backdrop-blur-xl rounded-xl border border-white/20",
          "p-6 cursor-pointer hover:shadow-lg transition-all duration-300",
          "hover:-translate-y-1 group"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              card.color === 'violet' && "bg-gradient-to-br from-violet-500 to-purple-600",
              card.color === 'green' && "bg-gradient-to-br from-green-500 to-emerald-600",
              card.color === 'red' && "bg-gradient-to-br from-red-500 to-rose-600",
              card.color === 'blue' && "bg-gradient-to-br from-blue-500 to-cyan-600",
              card.color === 'orange' && "bg-gradient-to-br from-orange-500 to-amber-600"
            )}>
              {Icon && <Icon className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-900">{card.title}</h3>
              {card.description && (
                <p className="text-xs text-neutral-500 mt-0.5">{card.description}</p>
              )}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
        </div>

        {/* Montant */}
        <div className="mb-3">
          <div className="text-2xl font-bold text-neutral-900">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(amount)}
          </div>
        </div>

        {/* Tendance */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : null}
            <span className={cn(
              "text-xs font-medium",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {trend === 'up' && '+'}{evolution}%
            </span>
          </div>
          <span className="text-xs text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Voir détails →
          </span>
        </div>
      </motion.div>
    );
  };

  const renderCalculatedCard = (card: typeof calculatedCards[0], index: number) => {
    const Icon = iconMap[card.icon];
    
    // Calculer les valeurs selon la formule
    let value = 0;
    if (card.id === 'gross_margin') {
      const revenue = data.revenue?.amount || 285000;
      const purchases = data.purchases?.amount || 60000;
      value = revenue - purchases;
    } else if (card.id === 'net_result') {
      // Calcul simplifié du résultat
      value = data.netResult?.amount || 45000;
    }

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
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
        <button
          onClick={() => setActiveTab('bilan')}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            activeTab === 'bilan'
              ? "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-white/10"
          )}
        >
          Bilan (Situation)
        </button>
        <button
          onClick={() => setActiveTab('resultat')}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg font-medium transition-all duration-300",
            activeTab === 'resultat'
              ? "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg"
              : "text-neutral-600 hover:text-neutral-900 hover:bg-white/10"
          )}
        >
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {bilanCards.map((card, index) => renderCard(card, index))}
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
            {/* Cartes de comptes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resultatCards.map((card, index) => renderCard(card, index))}
            </div>

            {/* Cartes calculées */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {calculatedCards.map((card, index) => renderCalculatedCard(card, index))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};