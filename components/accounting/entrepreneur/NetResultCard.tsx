'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Zap, DollarSign } from 'lucide-react';
import { CalculationCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface NetResultCardProps {
  amount: number;
  evolution: number;
  trend: 'up' | 'down' | 'stable';
  onClick?: () => void;
  loading?: boolean;
}

export const NetResultCard: React.FC<NetResultCardProps> = ({
  amount,
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

  const isProfit = amount > 0;
  const isExcellent = amount > 50000;

  const getStatusColor = () => {
    if (amount > 50000) return 'green';
    if (amount > 0) return 'blue';
    return 'red';
  };

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={cn(
          "p-2 rounded-lg shadow-lg",
          isExcellent && "bg-gradient-to-br from-yellow-500 to-amber-600",
          isProfit && !isExcellent && "bg-gradient-to-br from-green-500 to-emerald-600",
          !isProfit && "bg-gradient-to-br from-red-500 to-rose-600"
        )}>
          {isExcellent ? (
            <Trophy className="w-4 h-4 text-white" />
          ) : (
            <DollarSign className="w-4 h-4 text-white" />
          )}
        </div>
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Résultat Net
        </h3>
      </div>
      {isExcellent && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="w-4 h-4 text-yellow-500" />
        </motion.div>
      )}
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs">
        {trend === 'up' ? (
          <TrendingUp className="w-3 h-3 text-green-500" />
        ) : trend === 'down' ? (
          <TrendingDown className="w-3 h-3 text-red-500" />
        ) : null}
        <span className={cn(
          "font-medium",
          trend === 'up' && "text-green-600",
          trend === 'down' && "text-red-600",
          trend === 'stable' && "text-neutral-600"
        )}>
          {trend === 'up' && '+'}{evolution}%
        </span>
      </div>
      <span className={cn(
        "text-xs font-medium px-2 py-0.5 rounded-full",
        isExcellent && "bg-yellow-500/10 text-yellow-600",
        isProfit && !isExcellent && "bg-green-500/10 text-green-600",
        !isProfit && "bg-red-500/10 text-red-600"
      )}>
        {isExcellent ? 'Excellent' : isProfit ? 'Bénéfice' : 'Déficit'}
      </span>
    </div>
  );

  return (
    <CalculationCard
      accentColor={getStatusColor() as 'violet' | 'green' | 'red' | 'blue' | 'orange'}
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <div className="space-y-3">
        <motion.div 
          className={cn(
            "text-4xl font-bold",
            isExcellent && "bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent",
            isProfit && !isExcellent && "text-green-600",
            !isProfit && "text-red-600"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {formatCurrency(amount)}
        </motion.div>

        {isExcellent && (
          <motion.p
            className="text-xs text-yellow-600 font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Performance exceptionnelle !
          </motion.p>
        )}
      </div>
    </CalculationCard>
  );
};