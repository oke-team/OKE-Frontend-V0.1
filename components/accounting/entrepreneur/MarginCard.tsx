'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, Zap } from 'lucide-react';
import { CalculationCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface MarginCardProps {
  percentage: number;
  amount: number;
  evolution: number;
  onClick?: () => void;
  loading?: boolean;
}

export const MarginCard: React.FC<MarginCardProps> = ({
  percentage,
  amount,
  evolution,
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

  const isGoodMargin = percentage >= 30;

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div 
          className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg shadow-lg"
          animate={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <Calculator className="w-4 h-4 text-white" />
        </motion.div>
        <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Marge
        </h3>
      </div>
      {isGoodMargin && <Zap className="w-4 h-4 text-yellow-500" />}
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs">
        <TrendingUp className="w-3 h-3 text-green-500" />
        <span className="text-green-600 font-medium">+{evolution}%</span>
      </div>
      <span className="text-xs text-neutral-500">{formatCurrency(amount)}</span>
    </div>
  );

  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <CalculationCard
      accentColor="violet"
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="w-24 h-24">
            <circle
              cx="48"
              cy="48"
              r="30"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-neutral-200"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="30"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
              transform="rotate(-90 48 48)"
            />
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {percentage.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculationCard>
  );
};