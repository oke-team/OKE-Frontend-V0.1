'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type PeriodType = 'exercise' | 'situation' | 'custom';

export interface Period {
  id: string;
  type: PeriodType;
  label: string;
  startDate: Date;
  endDate: Date;
  isCurrent?: boolean;
}

interface PeriodSelectorProps {
  currentPeriod: Period;
  periods: Period[];
  onPeriodChange: (period: Period) => void;
  compact?: boolean;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  currentPeriod,
  periods,
  onPeriodChange,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatPeriodLabel = (period: Period) => {
    if (compact) {
      // Format court pour mobile
      if (period.type === 'exercise') {
        return period.startDate.getFullYear().toString();
      }
      const month = period.startDate.toLocaleDateString('fr-FR', { month: 'short' });
      return `${month} ${period.startDate.getFullYear()}`;
    }
    return period.label;
  };

  const groupedPeriods = {
    exercise: periods.filter(p => p.type === 'exercise'),
    situation: periods.filter(p => p.type === 'situation'),
    custom: periods.filter(p => p.type === 'custom'),
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "bg-white/10 backdrop-blur-sm border border-white/20",
          "hover:bg-white/20 transition-all",
          compact && "px-2 py-1.5 text-sm"
        )}
      >
        <Calendar className={cn("text-primary-600", compact ? "w-3 h-3" : "w-4 h-4")} />
        <span className={cn(
          "font-medium text-neutral-700 dark:text-neutral-300",
          compact && "hidden sm:inline"
        )}>
          {formatPeriodLabel(currentPeriod)}
        </span>
        <ChevronDown className={cn(
          "text-neutral-500 transition-transform",
          isOpen && "rotate-180",
          compact ? "w-3 h-3" : "w-4 h-4"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown desktop / Bottom sheet mobile */}
            <motion.div
              initial={{ opacity: 0, y: compact ? '100%' : -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: compact ? '100%' : -10 }}
              className={cn(
                "absolute z-50",
                compact ? [
                  "fixed bottom-0 left-0 right-0",
                  "md:absolute md:bottom-auto md:left-auto md:right-auto",
                  "md:top-full md:mt-2"
                ] : "top-full mt-2 right-0",
                "bg-white dark:bg-neutral-900 rounded-t-2xl md:rounded-2xl",
                "shadow-xl border border-neutral-200 dark:border-neutral-700",
                "min-w-[280px] max-h-[60vh] overflow-y-auto"
              )}
            >
              {/* Header mobile */}
              {compact && (
                <div className="md:hidden p-4 border-b border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Sélectionner une période</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="p-2">
                {/* Exercices */}
                {groupedPeriods.exercise.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase">
                      Exercices
                    </div>
                    {groupedPeriods.exercise.map(period => (
                      <button
                        key={period.id}
                        onClick={() => {
                          onPeriodChange(period);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                          currentPeriod.id === period.id && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-neutral-500" />
                          <div className="text-left">
                            <div className="font-medium">{period.label}</div>
                            <div className="text-xs text-neutral-500">
                              {period.startDate.toLocaleDateString('fr-FR')} - 
                              {period.endDate.toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                        </div>
                        {currentPeriod.id === period.id && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Situations */}
                {groupedPeriods.situation.length > 0 && (
                  <div className="mb-2">
                    <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase">
                      Situations
                    </div>
                    {groupedPeriods.situation.map(period => (
                      <button
                        key={period.id}
                        onClick={() => {
                          onPeriodChange(period);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                          currentPeriod.id === period.id && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                      >
                        <div className="text-left">
                          <div className="font-medium">{period.label}</div>
                          <div className="text-xs text-neutral-500">
                            Au {period.endDate.toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        {currentPeriod.id === period.id && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Périodes personnalisées */}
                {groupedPeriods.custom.length > 0 && (
                  <div>
                    <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase">
                      Périodes personnalisées
                    </div>
                    {groupedPeriods.custom.map(period => (
                      <button
                        key={period.id}
                        onClick={() => {
                          onPeriodChange(period);
                          setIsOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg",
                          "hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                          currentPeriod.id === period.id && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                      >
                        <div className="text-left">
                          <div className="font-medium">{period.label}</div>
                          <div className="text-xs text-neutral-500">
                            {period.startDate.toLocaleDateString('fr-FR')} - 
                            {period.endDate.toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        {currentPeriod.id === period.id && (
                          <Check className="w-4 h-4 text-primary-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};