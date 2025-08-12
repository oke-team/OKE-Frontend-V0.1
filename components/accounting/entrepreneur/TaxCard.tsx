'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Receipt, Calendar, AlertCircle } from 'lucide-react';
import { CompactCard } from '@/components/ui/CardBase';
import { cn } from '@/lib/utils';

interface TaxCardProps {
  totalAmount: number;
  nextDeadline: string;
  type: string;
  onClick?: () => void;
  loading?: boolean;
}

export const TaxCard: React.FC<TaxCardProps> = ({
  totalAmount,
  nextDeadline,
  type,
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

  const getDaysUntilDeadline = (deadline: string) => {
    const [day, month, year] = deadline.split('/');
    const deadlineDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline(nextDeadline);
  const isUrgent = daysLeft <= 7;

  const header = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <motion.div 
          className={cn(
            "p-1.5 rounded-lg shadow",
            isUrgent 
              ? "bg-gradient-to-br from-red-500 to-orange-600"
              : "bg-gradient-to-br from-amber-500 to-orange-600"
          )}
          animate={isUrgent ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Receipt className="w-3 h-3 text-white" />
        </motion.div>
        <h3 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
          Taxes
        </h3>
      </div>
      <span className={cn(
        "px-2 py-0.5 text-xs rounded-full font-medium",
        type === 'TVA' && "bg-purple-500/10 text-purple-600",
        type === 'IS' && "bg-blue-500/10 text-blue-600",
        type === 'CFE' && "bg-green-500/10 text-green-600"
      )}>
        {type}
      </span>
    </div>
  );

  const footer = (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-xs">
        {isUrgent ? (
          <>
            <AlertCircle className="w-3 h-3 text-red-500" />
            <span className="text-red-600 font-medium">{daysLeft}j restants</span>
          </>
        ) : (
          <>
            <Calendar className="w-3 h-3 text-neutral-500" />
            <span className="text-neutral-500">{nextDeadline}</span>
          </>
        )}
      </div>
    </div>
  );

  return (
    <CompactCard
      accentColor={isUrgent ? "red" : "orange"}
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