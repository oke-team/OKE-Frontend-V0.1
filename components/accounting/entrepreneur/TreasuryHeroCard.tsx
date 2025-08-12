'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowRight } from 'lucide-react';
import { HeroCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface TreasuryHeroCardProps {
  totalAmount: number;
  evolution: number;
  trend: 'up' | 'down' | 'stable';
  entriesAmount: number;
  exitsAmount: number;
  forecast30Days: number;
  onClick?: () => void;
  loading?: boolean;
}

export const TreasuryHeroCard: React.FC<TreasuryHeroCardProps> = ({
  totalAmount,
  evolution,
  trend,
  entriesAmount,
  exitsAmount,
  forecast30Days,
  onClick,
  loading = false,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompact = (amount: number) => {
    if (Math.abs(amount) >= 1000) {
      return `${(amount / 1000).toFixed(1)}k`;
    }
    return amount.toString();
  };

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg">
          <Wallet className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Trésorerie
          </h3>
          <p className="text-sm text-neutral-500">Disponible immédiatement</p>
        </div>
      </div>
      
      <div className={cn(
        "px-3 py-1 rounded-full text-xs font-medium",
        totalAmount > 50000 && "bg-green-500/10 border border-green-500/20 text-green-600",
        totalAmount > 10000 && totalAmount <= 50000 && "bg-blue-500/10 border border-blue-500/20 text-blue-600",
        totalAmount <= 10000 && "bg-orange-500/10 border border-orange-500/20 text-orange-600"
      )}>
        {totalAmount > 50000 ? 'Excellente' : totalAmount > 10000 ? 'Bonne' : 'Attention'}
      </div>
    </div>
  );

  const footer = (
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="text-xs text-neutral-500">Entrées</div>
        <div className="text-lg font-semibold text-green-600">
          +{formatCompact(entriesAmount)}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs text-neutral-500">Sorties</div>
        <div className="text-lg font-semibold text-red-600">
          -{formatCompact(exitsAmount)}
        </div>
      </div>
      <div className="text-center">
        <div className="text-xs text-neutral-500">Prév. 30j</div>
        <div className="text-lg font-semibold text-blue-600">
          {formatCompact(forecast30Days)}
        </div>
      </div>
    </div>
  );

  return (
    <HeroCard
      accentColor="violet"
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <div className="space-y-4">
        {/* Montant principal */}
        <div>
          <motion.div 
            className="text-5xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {formatCurrency(totalAmount)}
          </motion.div>
          
          <div className="flex items-center gap-2 mt-2">
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-4 h-4 text-red-500" />
            ) : null}
            <span className={cn(
              "text-sm font-medium",
              trend === 'up' && "text-green-600",
              trend === 'down' && "text-red-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {trend === 'up' && '+'}
              {evolution}% ce mois
            </span>
          </div>
        </div>

        {/* Mini graphique placeholder */}
        <div className="h-16 bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-lg flex items-end justify-around p-2">
          {[40, 65, 45, 70, 85, 60, 75].map((height, i) => (
            <motion.div
              key={i}
              className="w-2 bg-gradient-to-t from-violet-500 to-purple-500 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
            />
          ))}
        </div>

        {/* Action button */}
        <button className="flex items-center gap-2 text-sm text-violet-600 font-medium hover:text-violet-700 transition-colors">
          <span>Voir le détail</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </HeroCard>
  );
};