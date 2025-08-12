'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Sparkles, BarChart3, ArrowRight } from 'lucide-react';
import { HeroCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface RevenueCardProps {
  totalAmount: number;
  evolution: number;
  trend: 'up' | 'down' | 'stable';
  onClick?: () => void;
  loading?: boolean;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({
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

  const objective = 300000;
  const progress = (totalAmount / objective) * 100;
  const hasMetObjective = progress >= 100;

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Chiffre d&apos;Affaires
          </h3>
          <p className="text-sm text-neutral-500">Performance commerciale</p>
        </div>
      </div>
      {hasMetObjective && (
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          <Sparkles className="w-5 h-5 text-yellow-500" />
        </motion.div>
      )}
    </div>
  );

  const footer = (
    <div className="space-y-3">
      <div className="relative h-2 bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-neutral-500">Objectif: {formatCurrency(objective)}</span>
        <span className="font-medium text-blue-600">{progress.toFixed(0)}%</span>
      </div>
    </div>
  );

  return (
    <HeroCard
      accentColor="blue"
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <div className="space-y-4">
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
              {trend === 'up' && '+'}{evolution}% vs mois précédent
            </span>
          </div>
        </div>

        <button className="flex items-center gap-2 text-sm text-blue-600 font-medium hover:text-blue-700 transition-colors">
          <span>Analyser les ventes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </HeroCard>
  );
};