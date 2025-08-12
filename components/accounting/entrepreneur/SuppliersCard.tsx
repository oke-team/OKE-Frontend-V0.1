'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, TrendingDown, Clock, ArrowRight } from 'lucide-react';
import { StandardCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface SuppliersCardProps {
  totalAmount: number;
  overdueAmount: number;
  averageDays: number;
  trend: 'up' | 'down' | 'stable';
  onClick?: () => void;
  loading?: boolean;
}

export const SuppliersCard: React.FC<SuppliersCardProps> = ({
  totalAmount,
  overdueAmount,
  averageDays,
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
        <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg shadow-lg">
          <Package className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Fournisseurs
        </h3>
      </div>
      {overdueAmount > 0 && (
        <span className="px-2 py-0.5 text-xs bg-red-500/10 text-red-600 rounded-full">
          Échus
        </span>
      )}
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs text-neutral-500">
        <Clock className="w-3 h-3" />
        <span>{averageDays}j moy.</span>
      </div>
      <button className="flex items-center gap-1 text-xs text-orange-600 font-medium hover:text-orange-700">
        <span>Détail</span>
        <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );

  return (
    <StandardCard
      accentColor="orange"
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
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : trend === 'down' ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : null}
            <span className={cn(
              "text-xs font-medium",
              trend === 'up' && "text-red-600",
              trend === 'down' && "text-green-600",
              trend === 'stable' && "text-neutral-600"
            )}>
              {trend === 'stable' ? 'Stable' : trend === 'up' ? 'En hausse' : 'En baisse'}
            </span>
          </div>
        </div>

        {overdueAmount > 0 && (
          <div className="p-2 bg-red-500/5 rounded-lg border border-red-500/10">
            <div className="text-xs text-red-600 font-medium">
              {formatCurrency(overdueAmount)} échus
            </div>
          </div>
        )}
      </div>
    </StandardCard>
  );
};