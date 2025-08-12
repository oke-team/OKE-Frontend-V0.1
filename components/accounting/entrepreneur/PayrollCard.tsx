'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users2, Calendar, ArrowRight } from 'lucide-react';
import { CompactCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface PayrollCardProps {
  totalAmount: number;
  employees: number;
  nextPayment: string;
  onClick?: () => void;
  loading?: boolean;
}

export const PayrollCard: React.FC<PayrollCardProps> = ({
  totalAmount,
  employees,
  nextPayment,
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
        <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow">
          <Users2 className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Salaires
        </h3>
      </div>
      <span className="text-xs text-neutral-500">
        {employees} employés
      </span>
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs text-neutral-500">
        <Calendar className="w-3 h-3" />
        <span>{nextPayment}</span>
      </div>
      <ArrowRight className="w-3 h-3 text-blue-600" />
    </div>
  );

  return (
    <CompactCard
      accentColor="blue"
      interactive
      onClick={onClick}
      loading={loading}
      header={header}
      footer={footer}
    >
      <motion.div 
        className="text-xl font-bold text-neutral-900 dark:text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {formatCurrency(totalAmount)}
      </motion.div>
    </CompactCard>
  );
};