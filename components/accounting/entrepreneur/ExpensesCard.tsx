'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { StandardCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface ExpensesCardProps {
  totalAmount: number;
  evolution: number;
  trend: 'up' | 'down' | 'stable';
  onClick?: () => void;
  loading?: boolean;
}

export const ExpensesCard: React.FC<ExpensesCardProps> = ({
  totalAmount,
  evolution,
  trend,
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

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg shadow-lg">
          <PieChart className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Charges
        </h3>
      </div>
      <span className={cn(
        "px-2 py-0.5 text-xs rounded-full",
        trend === 'down' && "bg-green-500/10 text-green-600",
        trend === 'up' && "bg-red-500/10 text-red-600",
        trend === 'stable' && "bg-neutral-500/10 text-neutral-600"
      )}>
        {trend === 'down' ? 'Optimisé' : trend === 'up' ? 'En hausse' : 'Stable'}
      </span>
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <span className="w-2 h-2 rounded-full bg-red-400" />
        <span className="w-2 h-2 rounded-full bg-orange-400" />
        <span className="w-2 h-2 rounded-full bg-yellow-400" />
      </div>
      <button className="flex items-center gap-1 text-xs text-red-600 font-medium hover:text-red-700">
        <span>Détail</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <StandardCard
      accentColor="red"
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <div className="space-y-3">
        <div>
          <motion.div 
            className="text-2xl font-bold text-neutral-900 dark:text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {formatCurrency(totalAmount)}
          </motion.div>
          
          <div className="flex items-center gap-1 mt-1">
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3 text-red-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-green-500" />
            ) : null}
            <span className={cn(
              "text-xs font-medium",
              trend === 'up' && "text-red-600",
              trend === 'down' && "text-green-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{evolution}% ce mois
            </span>
          </div>
        </div>
      </div>
    </StandardCard>
  );
};